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
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
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
  const now = moment().tz('Europe/Lisbon'); // Portekiz Lizbon saati
  const currentHour = now.hour();
  const currentMinute = now.minute();
  const currentDay = now.day(); // 0=Pazar, 1=Pazartesi
  
  console.log(`Şu anki zaman (Lizbon): ${currentHour}:${currentMinute} (${currentDay}. gün)`);
  
  // Test için hafta sonu kontrolü kaldırıldı
  
  // Killzone zamanlarını kontrol et
  Object.entries(KILLZONE_TIMES).forEach(async ([key, zone]) => {
    const [startHour, startMinute] = zone.start.split(':').map(Number);
    const [endHour, endMinute] = zone.end.split(':').map(Number);
    
    console.log(`Kontrol edilen killzone: ${zone.name} - ${zone.start}`);
    
    // 5 dakika öncesi uyarı (Portekiz için)
    if (currentHour === startHour && currentMinute === (startMinute - 5)) {
      const message = getWarningMessage(zone.name, zone.start);
      await sendTelegramMessage(message);
      console.log(`${zone.name} 5 dakika uyarısı gönderildi`);
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
      timestamp: moment().tz('Europe/Lisbon').format()
    });
  } catch (error) {
    console.error('Cron job hatası:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}; 