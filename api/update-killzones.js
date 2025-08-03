const fs = require('fs');
const path = require('path');

// In-memory storage for killzones (temporary solution)
let currentKillzones = null;

// Config dosyasını oku
function readConfig() {
  try {
    const configPath = path.join(process.cwd(), 'config.js');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // KILLZONE_TIMES objesini extract et
    const match = configContent.match(/const KILLZONE_TIMES = ({[\s\S]*?});/);
    if (match) {
      // Evaluate the object (güvenli değil ama test için)
      const killzoneString = match[1];
      return eval('(' + killzoneString + ')');
    }
    return {};
  } catch (error) {
    console.error('Config okuma hatası:', error);
    return {};
  }
}

// Config dosyasını yaz
function writeConfig(killzones) {
  try {
    const configPath = path.join(process.cwd(), 'config.js');
    
    // Killzone objesini string'e çevir
    const killzoneString = JSON.stringify(killzones, null, 2)
      .replace(/"/g, '')
      .replace(/,\n/g, ',\n  ')
      .replace(/{\n/g, '{\n  ')
      .replace(/\n}/g, '\n}');

    const configContent = `// Killzone Zamanları (Portekiz Lizbon) - WEB PANEL İLE GÜNCELLENDİ
const KILLZONE_TIMES = ${killzoneString.split('\n').map((line, index) => 
  index === 0 ? line : '  ' + line
).join('\n')};

// Bot Konfigürasyonu
const BOT_CONFIG = {
  timezone: "Europe/Lisbon",
  warningMinutes: 10, // 10 dakika öncesi uyarı
  workDays: [0, 1, 2, 3, 4, 5, 6], // Hafta sonu dahil (test için)
  retryAttempts: 3
};

module.exports = {
  KILLZONE_TIMES,
  BOT_CONFIG
};`;

    fs.writeFileSync(configPath, configContent, 'utf8');
    return true;
  } catch (error) {
    console.error('Config yazma hatası:', error);
    return false;
  }
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  try {
    const { action, killzone, key } = req.body;
    
    console.log('🔧 Killzone güncelleme işlemi:', action);
    
    // Mevcut killzone'ları oku
    if (!currentKillzones) {
      currentKillzones = readConfig();
    }
    
    if (action === 'add') {
      if (!killzone || !killzone.name || !killzone.start || !killzone.end) {
        return res.status(400).json({
          success: false,
          error: 'Geçersiz killzone verisi'
        });
      }
      
      // Yeni killzone için key oluştur
      const killzoneKey = killzone.name.toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
      
      // Killzone'u ekle
      currentKillzones[killzoneKey] = {
        name: killzone.name,
        start: killzone.start,
        end: killzone.end,
        timezone: killzone.timezone || "Europe/Lisbon"
      };
      
      console.log(`✅ Yeni killzone eklendi: ${killzone.name}`);
      
    } else if (action === 'delete') {
      if (!key || !currentKillzones[key]) {
        return res.status(400).json({
          success: false,
          error: 'Geçersiz killzone key'
        });
      }
      
      const deletedName = currentKillzones[key].name;
      delete currentKillzones[key];
      
      console.log(`🗑️ Killzone silindi: ${deletedName}`);
      
    } else {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz action'
      });
    }
    
    // Config dosyasını güncelle
    const writeSuccess = writeConfig(currentKillzones);
    
    if (!writeSuccess) {
      return res.status(500).json({
        success: false,
        error: 'Config dosyası güncellenemedi'
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Killzone ${action === 'add' ? 'eklendi' : 'silindi'}`,
      killzones: currentKillzones,
      timestamp: new Date().toISOString(),
      note: 'Değişiklikler geçicidir. Kalıcı hale getirmek için projeyi yeniden deploy edin.'
    });
    
  } catch (error) {
    console.error('❌ Killzone güncelleme hatası:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};