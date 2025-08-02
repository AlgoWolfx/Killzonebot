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
    const { message } = req.body;
    
    if (!message) {
      console.log('Message yok:', req.body);
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const chatId = message.chat.id;
    const text = message.text || '';
    
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
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook hatası:', error);
    res.status(500).json({ error: error.message });
  }
}; 