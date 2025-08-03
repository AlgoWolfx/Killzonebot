require('dotenv').config();
const { KILLZONE_TIMES, BOT_CONFIG } = require('./config');
const axios = require('axios');
const moment = require('moment-timezone');
const { getKillzoneStartMessage, getWarningMessage } = require('./utils/messages');

// Telegram mesaj gönderme fonksiyonu
async function sendTelegramMessage(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN || "8490023246:AAHeg137jaNnW_-hIbv56NSb-Eqiuc7GBZs";
  const chatId = process.env.TELEGRAM_CHAT_ID || "6870670610";
  
  if (!token || !chatId) {
    console.error('Telegram token veya chat ID eksik');
    console.error('Token:', token ? 'Mevcut' : 'Eksik');
    console.error('Chat ID:', chatId ? 'Mevcut' : 'Eksik');
    return false;
  }
  
  try {
    console.log('Telegram mesajı gönderiliyor...');
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }, {
      timeout: 10000, // 10 saniye timeout
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'KillzoneBot/1.0'
      }
    });
    
    console.log('Mesaj başarıyla gönderildi:', response.data);
    return true;
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error.response?.data || error.message);
    return false;
  }
}

// Test fonksiyonu
async function testKillzoneMessages() {
  console.log('🔄 Test başlatılıyor...');
  console.log('📋 Killzone zamanları:', Object.keys(KILLZONE_TIMES).map(key => `${key}: ${KILLZONE_TIMES[key].start}-${KILLZONE_TIMES[key].end}`));
  
  const now = moment().tz('Europe/Lisbon');
  console.log(`🕐 Şu anki zaman (Lizbon): ${now.format('HH:mm:ss')} (${now.day()}. gün)`);
  
  // Her killzone için test mesajı gönder
  for (const [key, zone] of Object.entries(KILLZONE_TIMES)) {
    console.log(`\n🔍 Test edilen killzone: ${zone.name} (${zone.start}-${zone.end})`);
    
    // Başlangıç mesajı
    console.log(`🚀 ${zone.name} başlangıç mesajı gönderiliyor...`);
    const startMessage = getKillzoneStartMessage(zone.name, now.format());
    const startSent = await sendTelegramMessage(startMessage);
    console.log(startSent ? `✅ ${zone.name} başlangıç mesajı gönderildi` : `❌ ${zone.name} başlangıç mesajı gönderilemedi`);
    
    // 5 saniye bekle
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Uyarı mesajı
    console.log(`⚠️ ${zone.name} uyarı mesajı gönderiliyor...`);
    const warningMessage = getWarningMessage(zone.name, zone.start);
    const warningSent = await sendTelegramMessage(warningMessage);
    console.log(warningSent ? `✅ ${zone.name} uyarı mesajı gönderildi` : `❌ ${zone.name} uyarı mesajı gönderilemedi`);
    
    // 5 saniye bekle
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  
  console.log('\n✅ Test tamamlandı!');
}

// Testi çalıştır
testKillzoneMessages();