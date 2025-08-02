const axios = require('axios');
const moment = require('moment-timezone');
const { KILLZONE_TIMES, BOT_CONFIG } = require('../config');
const { 
  getKillzoneStartMessage, 
  getWarningMessage,
  getAllKillzonesMessage, 
  getNextKillzoneMessage, 
  getStatusMessage 
} = require('../utils/messages');

// Telegram mesaj gönderme fonksiyonu
async function sendTelegramMessage(message, chatId = null) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const defaultChatId = process.env.TELEGRAM_CHAT_ID;
  const targetChatId = chatId || defaultChatId;
  
  if (!token || !targetChatId) {
    console.error('Telegram token veya chat ID eksik');
    return false;
  }
  
  try {
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: targetChatId,
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

// Komut işleme fonksiyonu
async function handleCommand(chatId, command) {
  let message = '';
  
  switch (command) {
    case '/killzones':
      message = getAllKillzonesMessage();
      break;
      
    case '/next':
      message = getNextKillzoneMessage();
      break;
      
    case '/status':
      message = getStatusMessage();
      break;
      
    case '/start':
      message = `🤖 Welcome to Killzone Bot!

📋 Available commands:
/killzones - Show all killzone times
/next - Show next killzone time
/status - Check bot status

⚠️ Bot will automatically send you messages during killzone times.`;
      break;
      
    default:
      message = `❓ Unknown command: ${command}

📋 Available commands:
/killzones - Show all killzone times
/next - Show next killzone time
/status - Check bot status`;
  }
  
  await sendTelegramMessage(message, chatId);
}

// Telegram polling fonksiyonu
async function pollTelegramUpdates() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!token) {
    console.error('Telegram token eksik');
    return;
  }
  
  try {
    // Son mesajları al
    const response = await axios.get(`https://api.telegram.org/bot${token}/getUpdates`);
    
    if (response.data.ok && response.data.result.length > 0) {
      const updates = response.data.result;
      
      for (const update of updates) {
        if (update.message && update.message.text) {
          const text = update.message.text;
          const chatId = update.message.chat.id;
          
          console.log('Gelen mesaj:', { chatId, text });
          
          // Komut işleme
          if (text.startsWith('/')) {
            await handleCommand(chatId, text);
          } else {
            // Normal mesaj için yardım
            await sendTelegramMessage(`💬 Hello! 

📋 Available commands:
/killzones - Show all killzone times
/next - Show next killzone time
/status - Check bot status`, chatId);
          }
        }
      }
    }
  } catch (error) {
    console.error('Polling hatası:', error);
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
    // Killzone kontrolü
    await checkAndSendKillzoneMessage();
    
    // Telegram polling (komutları kontrol et)
    await pollTelegramUpdates();
    
    res.status(200).json({ 
      success: true, 
      message: 'Killzone kontrolü ve polling tamamlandı',
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