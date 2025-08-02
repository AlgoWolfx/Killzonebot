require('dotenv').config();
const cron = require('./api/cron');

// Local test fonksiyonu
async function testLocal() {
  console.log('🔄 Local test başlatılıyor...');
  
  try {
    // Cron job'ı simüle et
    const mockReq = {};
    const mockRes = {
      status: (code) => ({
        json: (data) => {
          console.log('📤 Response:', data);
        }
      })
    };
    
    await cron(mockReq, mockRes);
    console.log('✅ Test tamamlandı!');
    
  } catch (error) {
    console.error('❌ Test hatası:', error);
  }
}

// Test'i çalıştır
testLocal(); 