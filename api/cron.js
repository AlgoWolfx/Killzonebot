const axios = require('axios');
const moment = require('moment-timezone');
const { KILLZONE_TIMES, MACRO_TIMES, BOT_CONFIG } = require('../config');
const { 
  getKillzoneStartMessage, 
  getWarningMessage,
  getMacroMessage
} = require('../utils/messages');

// Telegram mesaj gönderme fonksiyonu
async function sendTelegramMessage(message) {
  // Hardcoded token ve chat ID (güvenlik için gerçek ortamda kullanmayın)
  // Bu sadece test amaçlıdır
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
    
    // Retry mekanizması
    if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.message.includes('socket hang up')) {
      console.log('Bağlantı hatası, 3 saniye sonra tekrar deneniyor...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      try {
        const retryResponse = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        }, {
          timeout: 15000, // Retry'da daha uzun timeout
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'KillzoneBot/1.0'
          }
        });
        
        console.log('Retry başarılı, mesaj gönderildi:', retryResponse.data);
        return true;
      } catch (retryError) {
        console.error('Retry da başarısız:', retryError.response?.data || retryError.message);
        return false;
      }
    }
    
    return false;
  }
}

// Macro kontrolü ve mesaj gönderme
async function checkAndSendMacroMessage() {
  const now = moment().tz('America/New_York');
  const currentHour = now.hour();
  const currentMinute = now.minute();
  const currentDay = now.day(); // 0=Pazar, 1=Pazartesi
  
  // Hafta içi kontrolü (1=Pazartesi, 5=Cuma)
  if (!BOT_CONFIG.workDays.includes(currentDay)) {
    return;
  }
  
  // Tüm macro zamanlarını kontrol et
  for (const [sessionKey, macroList] of Object.entries(MACRO_TIMES)) {
    for (const macro of macroList) {
      const [macroHour, macroMinute] = macro.time.split(':').map(Number);
      
      // Tam saat eşleşmesi kontrolü
      if (currentHour === macroHour && currentMinute === macroMinute) {
        console.log(`📊 ${macro.label} zamanı: ${macro.time}`);
        const message = getMacroMessage(macro.label, macro.time);
        const sent = await sendTelegramMessage(message);
        if (sent) {
          console.log(`✅ ${macro.label} mesajı gönderildi: ${macro.time}`);
        } else {
          console.log(`❌ ${macro.label} mesajı gönderilemedi: ${macro.time}`);
        }
      }
    }
  }
}

// Killzone kontrolü ve mesaj gönderme
async function checkAndSendKillzoneMessage() {
  const now = moment().tz('America/New_York');
  const currentHour = now.hour();
  const currentMinute = now.minute();
  const currentDay = now.day(); // 0=Pazar, 1=Pazartesi
  
  console.log(`🕐 Şu anki zaman (New York): ${currentHour}:${currentMinute} (${currentDay}. gün)`);
  console.log(`📅 Tam tarih: ${now.format('YYYY-MM-DD HH:mm:ss')}`);
  
  // Hafta içi kontrolü (1=Pazartesi, 5=Cuma)
  if (!BOT_CONFIG.workDays.includes(currentDay)) {
    console.log('📅 Hafta sonu - Killzone kontrolü yapılmıyor');
    return;
  }
  
  // Killzone zamanlarını kontrol et
  for (const [key, zone] of Object.entries(KILLZONE_TIMES)) {
    const [startHour, startMinute] = zone.start.split(':').map(Number);
    const [endHour, endMinute] = zone.end.split(':').map(Number);
    
    console.log(`🔍 Kontrol edilen killzone: ${zone.name} - ${zone.start}`);
    console.log(`   Başlangıç: ${startHour}:${startMinute}, Şu an: ${currentHour}:${currentMinute}`);
    
    // 10 dakika öncesi uyarı kontrolü - Daha esnek kontrol
    const warningMinute = startMinute - 10;
    const warningHour = warningMinute < 0 ? startHour - 1 : startHour;
    const adjustedWarningMinute = warningMinute < 0 ? warningMinute + 60 : warningMinute;
    
    console.log(`   Uyarı zamanı: ${warningHour}:${adjustedWarningMinute}`);
    
    // Başlangıç zamanı yaklaşıyor mu kontrolü (2 dakika içinde)
    const startTimeInMinutes = startHour * 60 + startMinute;
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const timeToStart = startTimeInMinutes - currentTimeInMinutes;
    
    console.log(`   Başlangıca kalan dakika: ${timeToStart}`);
    
    // Uyarı zamanı kontrolü - TAM EŞLEŞme (aşırı mesaj önleme)
    if (currentHour === warningHour && currentMinute === adjustedWarningMinute) {
      console.log(`⚠️  ${zone.name} 10 dakika uyarısı gönderiliyor...`);
      const message = getWarningMessage(zone.name, zone.start);
      const sent = await sendTelegramMessage(message);
      if (sent) {
        console.log(`✅ ${zone.name} 10 dakika uyarısı gönderildi`);
      } else {
        console.log(`❌ ${zone.name} 10 dakika uyarısı gönderilemedi`);
      }
    }
    
    // Killzone başlangıç mesajı kontrolü - TAM EŞLEŞme (aşırı mesaj önleme)
    if (currentHour === startHour && currentMinute === startMinute) {
      console.log(`🚀 ${zone.name} başlangıç mesajı gönderiliyor...`);
      const message = getKillzoneStartMessage(zone.name, now.format());
      const sent = await sendTelegramMessage(message);
      if (sent) {
        console.log(`✅ ${zone.name} başlangıç mesajı gönderildi`);
      } else {
        console.log(`❌ ${zone.name} başlangıç mesajı gönderilemedi`);
      }
    }
  }
}

// Test modu - Belirli bir macro zamanını test et
async function testMacroTime(testTime) {
  const [testHour, testMinute] = testTime.split(':').map(Number);
  
  // Tüm macro zamanlarında ara
  for (const [sessionKey, macroList] of Object.entries(MACRO_TIMES)) {
    for (const macro of macroList) {
      const [macroHour, macroMinute] = macro.time.split(':').map(Number);
      if (macroHour === testHour && macroMinute === testMinute) {
        console.log(`🧪 TEST: ${macro.label} zamanı: ${macro.time}`);
        const message = getMacroMessage(macro.label, macro.time);
        const sent = await sendTelegramMessage(message);
        return {
          found: true,
          macro: macro,
          message: message,
          sent: sent
        };
      }
    }
  }
  
  return { found: false };
}

// Vercel serverless function
module.exports = async (req, res) => {
  try {
    // Test modu kontrolü
    const { test, time } = req.query;
    
    if (test === 'macro' && time) {
      console.log('🧪 TEST MODU: Macro test ediliyor...');
      const result = await testMacroTime(time);
      
      if (result.found) {
        return res.status(200).json({
          success: true,
          test: true,
          message: 'Test mesajı gönderildi',
          macro: result.macro,
          telegramSent: result.sent,
          testMessage: result.message
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Zaman ${time} için macro bulunamadı`
        });
      }
    }
    
    // Normal cron job
    console.log('🔄 Cron job başlatılıyor...');
    await checkAndSendKillzoneMessage();
    await checkAndSendMacroMessage();
    console.log('✅ Cron job tamamlandı');
    res.status(200).json({ 
      success: true, 
      message: 'Killzone ve Macro kontrolü tamamlandı',
      timestamp: moment().tz('America/New_York').format()
    });
  } catch (error) {
    console.error('❌ Cron job hatası:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}; 