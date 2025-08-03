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
    if (error.response) {
      console.error('API Hatası:', error.response.data);
    }
    return false;
  }
}

// Zaman penceresi içinde mi kontrol et
function shouldSendMessage(now, targetTime, type = 'exact') {
  const [targetHour, targetMinute] = targetTime.split(':').map(Number);
  const currentHour = now.hour();
  const currentMinute = now.minute();
  
  if (type === 'exact') {
    // Başlangıç mesajı için: tam saat ve dakika eşleşmesi
    // Cron her dakika çalıştığı için, o dakika içinde sadece bir kez gönderilecek
    return currentHour === targetHour && currentMinute === targetMinute;
  } else if (type === 'warning') {
    // Uyarı mesajı için: hedef zamandan 10 dakika önce
    const targetMoment = now.clone().hour(targetHour).minute(targetMinute).second(0);
    const warningMoment = targetMoment.clone().subtract(10, 'minutes');
    
    return currentHour === warningMoment.hour() && currentMinute === warningMoment.minute();
  }
  
  return false;
}

// Killzone kontrolü ve mesaj gönderme
async function checkAndSendKillzoneMessage() {
  const now = moment().tz('Europe/Lisbon'); // Portekiz Lizbon saati
  const currentDay = now.day(); // 0=Pazar, 1=Pazartesi
  
  console.log(`=== Cron Job Çalıştı ===`);
  console.log(`Zaman (Lizbon): ${now.format('YYYY-MM-DD HH:mm:ss')}`);
  console.log(`Gün: ${['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][currentDay]}`);
  
  // Hafta sonu kontrolü (gerekirse etkinleştir)
  // if (!BOT_CONFIG.workDays.includes(currentDay)) {
  //   console.log('Hafta sonu - Killzone yok');
  //   return;
  // }
  
  let messagesSent = 0;
  
  // Killzone zamanlarını kontrol et
  for (const [key, zone] of Object.entries(KILLZONE_TIMES)) {
    console.log(`\nKontrol: ${zone.name} (${zone.start} - ${zone.end})`);
    
    // 10 dakika öncesi uyarı kontrolü
    if (shouldSendMessage(now, zone.start, 'warning')) {
      console.log(`⚠️  ${zone.name} için uyarı zamanı!`);
      const message = getWarningMessage(zone.name, zone.start);
      const sent = await sendTelegramMessage(message);
      if (sent) {
        messagesSent++;
        console.log(`✅ ${zone.name} uyarı mesajı gönderildi`);
      }
    }
    
    // Killzone başlangıç mesajı kontrolü
    if (shouldSendMessage(now, zone.start, 'exact')) {
      console.log(`🚨 ${zone.name} başlangıç zamanı!`);
      const message = getKillzoneStartMessage(zone.name, now.format());
      const sent = await sendTelegramMessage(message);
      if (sent) {
        messagesSent++;
        console.log(`✅ ${zone.name} başlangıç mesajı gönderildi`);
      }
    }
  }
  
  if (messagesSent === 0) {
    console.log('ℹ️  Bu dakika için gönderilecek mesaj yok');
  } else {
    console.log(`📨 Toplam ${messagesSent} mesaj gönderildi`);
  }
  
  return messagesSent;
}

// Vercel serverless function
module.exports = async (req, res) => {
  try {
    console.log('\n' + '='.repeat(50));
    console.log('CRON JOB BAŞLADI');
    console.log('='.repeat(50));
    
    // Environment variables kontrolü
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!token || !chatId) {
      console.error('❌ HATA: Telegram credentials eksik!');
      console.error(`Token: ${token ? 'Var' : 'YOK'}`);
      console.error(`Chat ID: ${chatId ? 'Var' : 'YOK'}`);
      
      return res.status(500).json({ 
        success: false, 
        error: 'Telegram credentials missing',
        details: {
          hasToken: !!token,
          hasChatId: !!chatId
        }
      });
    }
    
    console.log('✅ Telegram credentials mevcut');
    console.log(`Chat ID: ${chatId}`);
    
    const messagesSent = await checkAndSendKillzoneMessage();
    
    const response = {
      success: true, 
      message: 'Killzone kontrolü tamamlandı',
      timestamp: moment().tz('Europe/Lisbon').format('YYYY-MM-DD HH:mm:ss'),
      timezone: 'Europe/Lisbon',
      messagesSent: messagesSent,
      nextCheck: moment().tz('Europe/Lisbon').add(1, 'minute').format('HH:mm:ss')
    };
    
    console.log('\n✅ Cron job başarıyla tamamlandı');
    console.log('Response:', JSON.stringify(response, null, 2));
    console.log('='.repeat(50) + '\n');
    
    res.status(200).json(response);
  } catch (error) {
    console.error('❌ CRON JOB HATASI:', error);
    console.error('Stack:', error.stack);
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}; 