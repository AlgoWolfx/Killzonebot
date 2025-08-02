const axios = require('axios');
require('dotenv').config();

async function getChatId() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  console.log('🔍 Environment Variables:');
  console.log(`   Token: ${token ? '✅ Var' : '❌ Yok'}`);
  console.log(`   Chat ID: ${chatId ? '✅ Var' : '❌ Yok'}`);
  console.log('');
  
  if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN eksik!');
    return;
  }
  
  try {
    // Bot bilgilerini al
    const botInfo = await axios.get(`https://api.telegram.org/bot${token}/getMe`);
    console.log('🤖 Bot Bilgileri:');
    console.log(`   İsim: ${botInfo.data.result.first_name}`);
    console.log(`   Kullanıcı Adı: @${botInfo.data.result.username}`);
    console.log(`   Bot ID: ${botInfo.data.result.id}`);
    console.log('');
    
    if (chatId) {
      console.log('✅ Chat ID zaten mevcut:', chatId);
      console.log('');
      console.log('🧪 Test mesajı gönderelim...');
      
      try {
        const testMessage = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
          chat_id: chatId,
          text: '🤖 Killzone Bot test mesajı!\n✅ Bağlantı başarılı!'
        });
        console.log('✅ Test mesajı gönderildi!');
      } catch (error) {
        console.error('❌ Test mesajı gönderilemedi:', error.message);
      }
    } else {
      console.log('📝 Chat ID eksik. Bot\'unuza mesaj gönderin ve webhook\'tan alacağız.');
    }
    
    console.log('');
    console.log('💡 Bot\'unuza şu komutları gönderin:');
    console.log('   /start');
    console.log('   /killzones');
    console.log('   /status');
    console.log('');
    console.log('🔗 Webhook URL\'niz hazır olduğunda:');
    console.log('   https://your-vercel-app.vercel.app/api/webhook');
    
  } catch (error) {
    console.error('❌ Bot bilgileri alınamadı:', error.message);
  }
}

getChatId(); 