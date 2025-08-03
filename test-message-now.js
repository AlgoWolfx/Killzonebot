require('dotenv').config();
const axios = require('axios');
const moment = require('moment-timezone');

async function sendTestMessage() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  console.log('='.repeat(50));
  console.log('TEST MESAJI GÖNDERİLİYOR');
  console.log('='.repeat(50));
  
  if (!token || !chatId) {
    console.error('❌ HATA: Telegram credentials eksik!');
    console.error(`Token: ${token ? 'Var' : 'YOK'}`);
    console.error(`Chat ID: ${chatId ? 'Var' : 'YOK'}`);
    return;
  }
  
  console.log('✅ Telegram credentials mevcut');
  console.log(`Chat ID: ${chatId}`);
  
  const now = moment().tz('Europe/Lisbon');
  const testMessage = `🧪 TEST MESAJI 🧪

⏰ Gönderim zamanı: ${now.format('HH:mm:ss')}
📅 Tarih: ${now.format('YYYY-MM-DD')}
🌍 Zaman dilimi: Europe/Lisbon

✅ Bot çalışıyor ve mesaj gönderebiliyor!

Bu bir test mesajıdır. Eğer bu mesajı görüyorsanız, bot düzgün çalışıyor demektir.`;
  
  try {
    console.log('\nMesaj gönderiliyor...');
    const response = await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        chat_id: chatId,
        text: testMessage,
        parse_mode: 'HTML'
      }
    );
    
    console.log('✅ Mesaj başarıyla gönderildi!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Mesaj gönderme hatası:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
  }
}

// Test mesajını gönder
sendTestMessage();