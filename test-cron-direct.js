require('dotenv').config();
const axios = require('axios');

// Vercel cron endpoint'ini çağırma
async function callCronEndpoint() {
  try {
    console.log('🔄 Vercel cron endpoint\'i çağrılıyor...');
    
    const response = await axios.get('https://killzonebot-l154ctke6-geraltxeths-projects.vercel.app/api/cron', {
      timeout: 30000 // 30 saniye timeout
    });
    
    console.log('✅ Cron endpoint yanıtı:', response.data);
    console.log('📊 Status:', response.status);
    console.log('⏱️ Timestamp:', response.data.timestamp);
    
    return true;
  } catch (error) {
    console.error('❌ Cron endpoint hatası:', error.message);
    if (error.response) {
      console.error('📝 API yanıtı:', JSON.stringify(error.response.data));
    }
    return false;
  }
}

// Fonksiyonu çağır
callCronEndpoint();