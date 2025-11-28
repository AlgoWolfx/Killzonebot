const axios = require('axios');
const { MACRO_TIMES } = require('../config');
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
    const { time } = req.query;
    
    if (!time) {
      return res.status(400).json({
        success: false,
        message: 'time parametresi gerekli (örn: ?time=20:50)',
        example: '/api/test-macro-now?time=20:50'
      });
    }
    
    const [testHour, testMinute] = time.split(':').map(Number);
    
    if (isNaN(testHour) || isNaN(testMinute)) {
      return res.status(400).json({
        success: false,
        message: 'Geçersiz zaman formatı. Format: HH:MM (örn: 20:50)'
      });
    }
    
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
    
    if (!foundMacro) {
      return res.status(404).json({
        success: false,
        message: `Zaman ${time} için macro bulunamadı`,
        availableTimes: Object.values(MACRO_TIMES).flat().map(m => m.time)
      });
    }
    
    // Mesajı gönder
    const message = getMacroMessage(foundMacro.label, foundMacro.time);
    const sent = await sendTelegramMessage(message);
    
    return res.status(200).json({
      success: true,
      message: 'Test mesajı gönderildi',
      macro: foundMacro,
      telegramSent: sent,
      testMessage: message,
      note: 'Telegram\'da mesajı kontrol edin!'
    });
    
  } catch (error) {
    console.error('❌ Test hatası:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

