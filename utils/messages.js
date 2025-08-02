const moment = require('moment-timezone');
const { KILLZONE_TIMES } = require('../config');

// Killzone başlangıç mesajı
function getKillzoneStartMessage(timezone, currentTime) {
  const time = moment(currentTime).tz('America/New_York').format('HH:mm');
  
  return `🚨 KILLZONE BAŞLADI! 🚨

⏰ Saat: ${time} (NY Time)
🌍 Zaman Dilimi: ${timezone}

⚠️ ICT Killzone aktif!
📊 Trade fırsatları için hazır olun
💰 Risk yönetimi önemli!`;
}

// 10 dakika öncesi uyarı mesajı
function getWarningMessage(timezone, startTime) {
  const time = moment(startTime).tz('America/New_York').format('HH:mm');
  
  return `⚠️ KILLZONE YAKLAŞIYOR! ⚠️

⏰ ${timezone} Killzone başlamasına 10 dakika
🕐 Başlangıç: ${time} (NY Time)

📱 Hazırlık yapın!`;
}

// Tüm killzone zamanlarını listele
function getAllKillzonesMessage() {
  let message = `📅 KILLZONE ZAMANLARI 📅\n\n`;
  
  Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
    const startNY = moment.tz(`2024-01-01 ${zone.start}`, 'GMT').tz('America/New_York').format('HH:mm');
    message += `🌍 ${zone.name}\n`;
    message += `⏰ ${zone.start}-${zone.end} GMT (${startNY} NY)\n\n`;
  });
  
  return message;
}

// Sonraki killzone zamanını göster
function getNextKillzoneMessage() {
  const now = moment().tz('America/New_York');
  const today = now.day(); // 0=Pazar, 1=Pazartesi
  
  if (today === 0 || today === 6) {
    return `📅 Hafta sonu - Killzone yok\n⏰ Pazartesi 08:00 GMT'de başlar`;
  }
  
  // Bugünkü killzone'ları kontrol et
  const currentHour = now.hour();
  let nextZone = null;
  
  if (currentHour < 8) {
    nextZone = KILLZONE_TIMES.london;
  } else if (currentHour < 13) {
    nextZone = KILLZONE_TIMES.newyork;
  } else if (currentHour < 24) {
    nextZone = KILLZONE_TIMES.tokyo;
  }
  
  if (nextZone) {
    const startNY = moment.tz(`2024-01-01 ${nextZone.start}`, 'GMT').tz('America/New_York').format('HH:mm');
    return `⏰ Sonraki Killzone: ${nextZone.name}\n🕐 ${nextZone.start} GMT (${startNY} NY)`;
  }
  
  return `📅 Bugün killzone tamamlandı\n⏰ Yarın 08:00 GMT'de başlar`;
}

// Bot durumu mesajı
function getStatusMessage() {
  const now = moment().tz('America/New_York');
  const time = now.format('HH:mm');
  const day = now.format('dddd');
  
  return `🤖 BOT DURUMU 🤖

⏰ Şu anki zaman: ${time} (NY)
📅 Gün: ${day}
✅ Bot aktif ve çalışıyor
📱 Mesajlar otomatik gönderiliyor`;
}

module.exports = {
  getKillzoneStartMessage,
  getWarningMessage,
  getAllKillzonesMessage,
  getNextKillzoneMessage,
  getStatusMessage
}; 