const axios = require('axios');
const moment = require('moment-timezone');
const { MACRO_TIMES, BOT_CONFIG } = require('../config');
const { getMacroMessage } = require('../utils/messages');

// Telegram mesaj gönderme fonksiyonu
async function sendTelegramMessage(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN || "8490023246:AAHeg137jaNnW_-hIbv56NSb-Eqiuc7GBZs";
  const chatId = process.env.TELEGRAM_CHAT_ID || "6870670610";
  
  if (!token || !chatId) {
    console.error('Telegram token veya chat ID eksik');
    return false;
  }
  
  try {
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'KillzoneBot/1.0'
      }
    });
    
    console.log('Mesaj başarıyla gönderildi:', response.data);
    return true;
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error.response?.data || error.message);
    return false;
  }
}

// Vercel serverless function
module.exports = async (req, res) => {
  try {
    const { action, time } = req.query;
    const now = moment().tz('America/New_York');
    
    // Tüm macro zamanlarını listele
    if (action === 'list') {
      let allMacros = [];
      for (const [sessionKey, macroList] of Object.entries(MACRO_TIMES)) {
        allMacros = allMacros.concat(macroList);
      }
      
      return res.status(200).json({
        success: true,
        currentTime: now.format('HH:mm'),
        totalMacros: allMacros.length,
        macros: allMacros.map(m => ({
          time: m.time,
          label: m.label
        }))
      });
    }
    
    // Belirli bir zamanı test et
    if (action === 'test' && time) {
      const [testHour, testMinute] = time.split(':').map(Number);
      
      // Tüm macro zamanlarında ara
      let foundMacro = null;
      for (const [sessionKey, macroList] of Object.entries(MACRO_TIMES)) {
        for (const macro of macroList) {
          const [macroHour, macroMinute] = macro.time.split(':').map(Number);
          if (macroHour === testHour && macroMinute === testMinute) {
            foundMacro = macro;
            break;
          }
        }
        if (foundMacro) break;
      }
      
      if (foundMacro) {
        const message = getMacroMessage(foundMacro.label, foundMacro.time);
        const sent = await sendTelegramMessage(message);
        
        return res.status(200).json({
          success: true,
          message: 'Test mesajı gönderildi',
          macro: foundMacro,
          telegramSent: sent,
          testMessage: message
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Zaman ${time} için macro bulunamadı`
        });
      }
    }
    
    // Tüm macro'ları test et (hepsini gönder)
    if (action === 'test-all') {
      const results = [];
      let allMacros = [];
      
      for (const [sessionKey, macroList] of Object.entries(MACRO_TIMES)) {
        allMacros = allMacros.concat(macroList);
      }
      
      for (const macro of allMacros) {
        const message = getMacroMessage(macro.label, macro.time);
        const sent = await sendTelegramMessage(message);
        results.push({
          macro: macro,
          sent: sent,
          message: message
        });
        // Her mesaj arasında 1 saniye bekle (rate limit önleme)
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      return res.status(200).json({
        success: true,
        message: `${results.length} macro mesajı gönderildi`,
        results: results
      });
    }
    
    // Yardım mesajı
    return res.status(200).json({
      success: true,
      message: 'Macro Test Endpoint',
      usage: {
        list: '/api/test-macro?action=list - Tüm macro zamanlarını listele',
        test: '/api/test-macro?action=test&time=20:50 - Belirli bir zamanı test et',
        testAll: '/api/test-macro?action=test-all - Tüm macro mesajlarını gönder'
      },
      currentTime: now.format('HH:mm:ss'),
      exampleMacros: [
        '20:50 - Asia Macro',
        '21:10 - Asia Macro',
        '01:50 - London Macro',
        '07:00 - Newyork Hazırlıkta'
      ]
    });
    
  } catch (error) {
    console.error('❌ Test hatası:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

