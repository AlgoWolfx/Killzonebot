require('dotenv').config();
const axios = require('axios');
const moment = require('moment-timezone');

// Test mesajı gönderme fonksiyonu
async function sendTestMessage() {
  const token = process.env.TELEGRAM_BOT_TOKEN || "8490023246:AAHeg137jaNnW_-hIbv56NSb-Eqiuc7GBZs";
  const chatId = process.env.TELEGRAM_CHAT_ID || "6870670610";
  
  console.log('🔍 Environment Variables:');
  console.log(`   Token: ${token ? '✅ Var' : '❌ Yok'}`);
  console.log(`   Chat ID: ${chatId ? '✅ Var' : '❌ Yok'}`);
  
  if (!token || !chatId) {
    console.error('❌ Token veya Chat ID eksik!');
    return;
  }
  
  try {
    console.log('📤 Manuel test mesajı gönderiliyor...');
    const now = moment().tz('Europe/Lisbon').format('HH:mm:ss');
    
    const message = `🔄 MANUEL TEST MESAJI 🔄

⏰ Şu anki saat: ${now} (Lizbon)
🤖 Bot çalışıyor ve mesaj gönderebiliyor
✅ Telegram API bağlantısı başarılı

📱 Bu mesaj test-now.js script'i ile gönderildi.`;
    
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    
    console.log('✅ Test mesajı başarıyla gönderildi!');
    console.log(`📊 Response: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('❌ Mesaj gönderme hatası:', error.message);
    if (error.response) {
      console.error('📝 API yanıtı:', JSON.stringify(error.response.data));
    }
  }
}

// Test'i çalıştır
sendTestMessage();