const axios = require('axios');
const moment = require('moment-timezone');
const { KILLZONE_TIMES, BOT_CONFIG } = require('../config');
const { 
  getKillzoneStartMessage, 
  getWarningMessage 
} = require('../utils/messages');

// Telegram mesaj gönderme fonksiyonu
async function sendTelegramMessage(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.CHAT_ID;
  
  if (!token || !chatId) {
    console.error('Telegram token veya chat ID eksik');
    return false;
  }
  
  try {
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    
    console.log('Mesaj gönderildi:', response.data);
    return true;
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error.message);
    return false;
  }
}

// Killzone kontrolü ve mesaj gönderme
async function checkAndSendKillzoneMessage() {
  const now = moment().tz('GMT');
  const currentHour = now.hour();
  const currentMinute = now.minute();
  const currentDay = now.day(); // 0=Pazar, 1=Pazartesi
  
  // Hafta sonu kontrolü
  if (currentDay === 0 || currentDay === 6) {
    console.log('Hafta sonu - killzone yok');
    return;
  }
  
  // Killzone zamanlarını kontrol et
  Object.entries(KILLZONE_TIMES).forEach(async ([key, zone]) => {
    const [startHour, startMinute] = zone.start.split(':').map(Number);
    const [endHour, endMinute] = zone.end.split(':').map(Number);
    
    // 10 dakika öncesi uyarı
    if (currentHour === startHour && currentMinute === (startMinute - 10)) {
      const message = getWarningMessage(zone.name, zone.start);
      await sendTelegramMessage(message);
      console.log(`${zone.name} 10 dakika uyarısı gönderildi`);
    }
    
    // Killzone başlangıç mesajı
    if (currentHour === startHour && currentMinute === startMinute) {
      const message = getKillzoneStartMessage(zone.name, now.format());
      await sendTelegramMessage(message);
      console.log(`${zone.name} başlangıç mesajı gönderildi`);
    }
  });
}

// Vercel serverless function
module.exports = async (req, res) => {
  try {
    await checkAndSendKillzoneMessage();
    res.status(200).json({ 
      success: true, 
      message: 'Killzone kontrolü tamamlandı',
      timestamp: moment().tz('America/New_York').format()
    });
  } catch (error) {
    console.error('Cron job hatası:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}; 