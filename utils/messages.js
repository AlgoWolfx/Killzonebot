const moment = require('moment-timezone');
const { KILLZONE_TIMES } = require('../config');

// Killzone başlangıç mesajı
function getKillzoneStartMessage(timezone, currentTime) {
  const time = moment(currentTime).tz('Europe/Lisbon').format('HH:mm');
  
  return `🚨 ${timezone.toUpperCase()} BAŞLADI HABERİN OLSUN HA! 🚨

⏰ Saat: ${time} (Lisbon Time)
🌍 Session: ${timezone}

⚠️ ICT Killzone aktif!
📊 Trade fırsatları için hazır olun
💰 Risk yönetimi önemli!`;
}

// 10 dakika öncesi uyarı mesajı (Portekiz için)
function getWarningMessage(timezone, startTime) {
  // startTime format düzeltmesi (HH:MM formatını doğru şekilde parse et)
  const [hours, minutes] = startTime.split(':').map(Number);
  const today = new Date();
  const timeDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
  const time = moment(timeDate).tz('Europe/Lisbon').format('HH:mm');
  
  return `⚠️ ${timezone.toUpperCase()} YAKLAŞIYOR HABERİN OLSUN! ⚠️

⏰ ${timezone} başlamasına 10 dakika
🕐 Başlangıç: ${time} (Lisbon Time)

📱 Hazırlık yapın!`;
}

// Tüm killzone zamanlarını listele
function getAllKillzonesMessage() {
  let message = `📅 KILLZONE ZAMANLARI (Lizbon Saati) 📅\n\n`;
  
  Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
    message += `🎯 ${zone.name.toUpperCase()}\n`;
    message += `⏰ ${zone.start} - ${zone.end}\n`;
    message += `⚠️ Uyarı: ${getWarningTime(zone.start)}\n\n`;
  });
  
  message += `📍 Timezone: Europe/Lisbon\n`;
  message += `📅 Aktif: Pazartesi-Cuma`;
  
  return message;
}

// Uyarı zamanını hesapla
function getWarningTime(startTime) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const warningMinutes = minutes - 10;
  const warningHour = warningMinutes < 0 ? hours - 1 : hours;
  const adjustedWarningMinutes = warningMinutes < 0 ? warningMinutes + 60 : warningMinutes;
  
  return `${warningHour.toString().padStart(2, '0')}:${adjustedWarningMinutes.toString().padStart(2, '0')}`;
}

// Sonraki killzone zamanını göster
function getNextKillzoneMessage() {
  const now = moment().tz('Europe/Lisbon');
  const today = now.day(); // 0=Pazar, 1=Pazartesi
  
  if (today === 0 || today === 6) {
    return `📅 HAFTA SONU - KİLLZONE YOK 📅\n\n⏰ Pazartesi 01:00'da Asia başlar\n🎯 İyi dinlenmeler!`;
  }
  
  // Şu anki zaman (dakika cinsinden)
  const currentTimeInMinutes = now.hour() * 60 + now.minute();
  let nextZone = null;
  let minTimeDiff = Infinity;
  
  // En yakın killzone'u bul
  Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
    const [startHour, startMinute] = zone.start.split(':').map(Number);
    const zoneTimeInMinutes = startHour * 60 + startMinute;
    
    // Sadece gelecekteki killzone'ları kontrol et
    if (zoneTimeInMinutes > currentTimeInMinutes) {
      const timeDiff = zoneTimeInMinutes - currentTimeInMinutes;
      if (timeDiff < minTimeDiff) {
        minTimeDiff = timeDiff;
        nextZone = zone;
      }
    }
  });
  
  if (nextZone) {
    const hours = Math.floor(minTimeDiff / 60);
    const minutes = minTimeDiff % 60;
    const timeLeft = hours > 0 ? `${hours}s ${minutes}dk` : `${minutes}dk`;
    
    return `⏰ SONRAKİ KİLLZONE ⏰\n\n🎯 ${nextZone.name.toUpperCase()}\n🕐 ${nextZone.start} - ${nextZone.end}\n⏳ ${timeLeft} sonra\n⚠️ Uyarı: ${getWarningTime(nextZone.start)}`;
  }
  
  return `📅 BUGÜN KİLLZONE TAMAMLANDI 📅\n\n⏰ Yarın 01:00'da Asia başlar\n🌙 İyi geceler!`;
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