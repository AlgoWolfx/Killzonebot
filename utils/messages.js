const moment = require('moment-timezone');
const { KILLZONE_TIMES } = require('../config');

// Killzone başlangıç mesajı
function getKillzoneStartMessage(timezone, currentTime) {
  const time = moment(currentTime).tz('Europe/Lisbon').format('HH:mm');
  
  return `🚨 KILLZONE BAŞLADI! 🚨

⏰ Saat: ${time} (Lisbon Time)
🌍 Zaman Dilimi: ${timezone}

⚠️ ICT Killzone aktif!
📊 Trade fırsatları için hazır olun
💰 Risk yönetimi önemli!`;
}

// 5 dakika öncesi uyarı mesajı (Portekiz için)
function getWarningMessage(timezone, startTime) {
  // startTime format düzeltmesi (HH:MM formatını doğru şekilde parse et)
  const [hours, minutes] = startTime.split(':').map(Number);
  const today = new Date();
  const timeDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
  const time = moment(timeDate).tz('Europe/Lisbon').format('HH:mm');
  
  return `⚠️ KILLZONE YAKLAŞIYOR! ⚠️

⏰ ${timezone} Killzone başlamasına 10 dakika
🕐 Başlangıç: ${time} (Lisbon Time)

📱 Hazırlık yapın!`;
}

// Tüm killzone zamanlarını listele
function getAllKillzonesMessage() {
  let message = `📅 KILLZONE ZAMANLARI 📅\n\n`;
  
  Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
    const startLisbon = moment.tz(`2024-01-01 ${zone.start}`, 'Europe/Lisbon').tz('Europe/Lisbon').format('HH:mm');
    message += `🌍 ${zone.name}\n`;
    message += `⏰ ${zone.start}-${zone.end} (${startLisbon} Lisbon)\n\n`;
  });
  
  return message;
}

// Sonraki killzone zamanını göster
function getNextKillzoneMessage() {
  const now = moment().tz('Europe/Lisbon');
  const today = now.day(); // 0=Pazar, 1=Pazartesi
  
  if (today === 0 || today === 6) {
    return `📅 Hafta sonu - Killzone yok\n⏰ Pazartesi 08:00 Lisbon'da başlar`;
  }
  
  // Bugünkü killzone'ları kontrol et
  const currentHour = now.hour();
  let nextZone = null;
  
  // Test zamanlarına göre kontrol
  Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
    const [startHour, startMinute] = zone.start.split(':').map(Number);
    if (currentHour < startHour || (currentHour === startHour && now.minute() < startMinute)) {
      if (!nextZone) nextZone = zone;
    }
  });
  
  if (nextZone) {
    const startLisbon = moment.tz(`2024-01-01 ${nextZone.start}`, 'Europe/Lisbon').tz('Europe/Lisbon').format('HH:mm');
    return `⏰ Sonraki Killzone: ${nextZone.name}\n🕐 ${nextZone.start} (${startLisbon} Lisbon)`;
  }
  
  return `📅 Bugün killzone tamamlandı\n⏰ Yarın 08:00 Lisbon'da başlar`;
}

// Bot durumu mesajı
function getStatusMessage() {
  const now = moment().tz('Europe/Lisbon');
  const time = now.format('HH:mm');
  const day = now.format('dddd');
  
  return `🤖 BOT DURUMU 🤖

⏰ Şu anki zaman: ${time} (Lisbon)
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