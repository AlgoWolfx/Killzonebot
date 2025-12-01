const axios = require('axios');
const { 
  getAllKillzonesMessage, 
  getNextKillzoneMessage, 
  getStatusMessage,
  getAllMacrosMessage
} = require('../utils/messages');

// Telegram mesaj gönderme fonksiyonu
async function sendTelegramMessage(chatId, message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  try {
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
    
    console.log('Komut yanıtı gönderildi:', response.data);
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
        
        console.log('Retry başarılı, komut yanıtı gönderildi:', retryResponse.data);
        return true;
      } catch (retryError) {
        console.error('Retry da başarısız:', retryError.response?.data || retryError.message);
        return false;
      }
    }
    
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
      
    case '/macros':
      message = getAllMacrosMessage();
      break;
      
    case '/start':
      message = `🤖 Welcome to Killzone Bot!

📋 Available commands:
/killzones - Show all killzone times
/macros - Show all macro times
/next - Show next killzone time
/status - Check bot status

⚠️ Bot will automatically send you messages during killzone and macro times.`;
      break;
      
    default:
      message = `❓ Unknown command: ${command}

📋 Available commands:
/killzones - Show all killzone times
/macros - Show all macro times
/next - Show next killzone time
/status - Check bot status`;
  }
  
  await sendTelegramMessage(chatId, message);
}

// Vercel serverless function
module.exports = async (req, res) => {
  console.log('Webhook called:', req.method, req.url);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    console.log('Request body:', JSON.stringify(req.body));
    const { message } = req.body;
    
    if (!message) {
      console.log('No message:', req.body);
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const chatId = message.chat.id;
    const text = message.text || '';
    
    console.log('Received message:', { chatId, text });
    
    // Komut işleme
    if (text.startsWith('/')) {
      await handleCommand(chatId, text);
    } else {
      // Normal mesaj için yardım
      await sendTelegramMessage(chatId, `💬 Hello! 

📋 Available commands:
/killzones - Show all killzone times
/macros - Show all macro times
/next - Show next killzone time
/status - Check bot status`);
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
}; 