const { KILLZONE_TIMES } = require('../config');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  try {
    console.log('🔍 Killzone\'lar getiriliyor...');
    
    // Config dosyasından killzone'ları al
    const killzones = KILLZONE_TIMES;
    
    console.log('✅ Killzone\'lar başarıyla getirildi:', Object.keys(killzones).length, 'adet');
    
    res.status(200).json({
      success: true,
      killzones: killzones,
      count: Object.keys(killzones).length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Killzone\'lar getirilirken hata:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};