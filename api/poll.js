const axios = require('axios');
const { 
  getAllKillzonesMessage, 
  getNextKillzoneMessage, 
  getStatusMessage 
} = require('../utils/messages');

// Telegram mesaj gönderme fonksiyonu
async function sendTelegramMessage(chatId, message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  try {
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    
    console.log('Komut yanıtı gönderildi:', response.data);
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
      message = `🤖 Killzone Bot'a hoş geldiniz!

📋 Kullanılabilir komutlar:
/killzones - Tüm killzone zamanlarını göster
/next - Sonraki killzone zamanını göster
/status - Bot durumunu kontrol et

⚠️ Bot otomatik olarak killzone zamanlarında size mesaj gönderecek.`;
      break;
      
    default:
      message = `❓ Bilinmeyen komut: ${command}

📋 Kullanılabilir komutlar:
/killzones - Tüm killzone zamanlarını göster
/next - Sonraki killzone zamanını göster
/status - Bot durumunu kontrol et`;
  }
  
  await sendTelegramMessage(chatId, message);
}

// Vercel serverless function
module.exports = async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!token || !chatId) {
    return res.status(500).json({ error: 'Token veya Chat ID eksik' });
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
            await sendTelegramMessage(chatId, `💬 Merhaba! 

📋 Kullanılabilir komutlar:
/killzones - Tüm killzone zamanlarını göster
/next - Sonraki killzone zamanını göster
/status - Bot durumunu kontrol et`);
          }
        }
      }
    }
    
    res.status(200).json({ 
      success: true, 
      updates: response.data.result.length 
    });
  } catch (error) {
    console.error('Polling hatası:', error);
    res.status(500).json({ error: error.message });
  }
}; 