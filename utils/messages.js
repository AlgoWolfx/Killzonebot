const moment = require('moment-timezone');
const { KILLZONE_TIMES, MACRO_TIMES } = require('../config');

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
  // Saat bilgisini doğrudan Lisbon timezone'unda parse et (DST hatasını önler)
  const time = moment.tz(startTime, 'HH:mm', 'Europe/Lisbon').format('HH:mm');
  
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

// Tüm macro zamanlarını listele
function getAllMacrosMessage() {
  let message = `📊 MACRO ZAMANLARI (Lizbon Saati) 📊\n\n`;
  
  // London Macro'ları (Asia seansı içinde)
  if (MACRO_TIMES.london && MACRO_TIMES.london.length > 0) {
    message += `🇬🇧 LONDON MACRO (Asia Seansı İçinde)\n`;
    MACRO_TIMES.london.forEach(macro => {
      message += `   ⏰ ${macro.time} - ${macro.label}\n`;
    });
    message += `\n`;
  }
  
  // Asia Macro'ları (NY PM seansı içinde)
  if (MACRO_TIMES.ny_pm && MACRO_TIMES.ny_pm.length > 0) {
    message += `🌏 ASIA MACRO (NY PM Seansı İçinde)\n`;
    MACRO_TIMES.ny_pm.forEach(macro => {
      message += `   ⏰ ${macro.time} - ${macro.label}\n`;
    });
    message += `\n`;
  }
  
  // Newyork Macro'ları
  if (MACRO_TIMES.newyork && MACRO_TIMES.newyork.length > 0) {
    message += `📈 NEWYORK MACRO'LAR\n`;
    
    // Özel durumlar (Hazırlıkta, Açılıyor)
    const specialMacros = MACRO_TIMES.newyork.filter(m => 
      m.label.includes('Hazırlıkta') || m.label.includes('Açılıyor')
    );
    if (specialMacros.length > 0) {
      specialMacros.forEach(macro => {
        message += `   ⏰ ${macro.time} - ${macro.label}\n`;
      });
      message += `\n`;
    }
    
    // Normal Newyork Macro'lar
    const normalMacros = MACRO_TIMES.newyork.filter(m => 
      m.label === 'Newyork Macro'
    );
    if (normalMacros.length > 0) {
      message += `   📊 Newyork Macro:\n`;
      normalMacros.forEach(macro => {
        message += `      ${macro.time}\n`;
      });
      message += `\n`;
    }
    
    // Lunch Macro'lar
    const lunchMacros = MACRO_TIMES.newyork.filter(m => 
      m.label.includes('Lunch Macro')
    );
    if (lunchMacros.length > 0) {
      message += `   🍽️ Newyork Lunch Macro:\n`;
      lunchMacros.forEach(macro => {
        message += `      ${macro.time}\n`;
      });
      message += `\n`;
    }
    
    // PM Macro'lar
    const pmMacros = MACRO_TIMES.newyork.filter(m => 
      m.label.includes('PM Macro')
    );
    if (pmMacros.length > 0) {
      message += `   🌆 Newyork PM Macro:\n`;
      pmMacros.forEach(macro => {
        message += `      ${macro.time}\n`;
      });
      message += `\n`;
    }
  }
  
  message += `📍 Timezone: Europe/Lisbon\n`;
  message += `📅 Aktif: Pazartesi-Cuma\n`;
  message += `\n💡 Bot otomatik olarak macro zamanlarında bildirim gönderir!`;
  
  return message;
}

// Macro zamanı mesajı
function getMacroMessage(label, time) {
  const formattedTime = moment.tz(time, 'HH:mm', 'Europe/Lisbon').format('HH:mm');
  
  // Macro türüne göre seans adını belirle
  let sessionName = '';
  let emoji = '📊';
  let actionText = 'Macro zamanı aktif!';
  
  if (label.includes('Asia Macro')) {
    sessionName = 'NY PM';
    emoji = '🌏';
    actionText = 'Asia Macro zamanı!';
  } else if (label.includes('London Macro')) {
    sessionName = 'Asia';
    emoji = '🇬🇧';
    actionText = 'London Macro zamanı!';
  } else if (label.includes('Lunch Macro')) {
    sessionName = 'NY Lunch';
    emoji = '🍽️';
    actionText = 'Lunch Macro zamanı!';
  } else if (label.includes('PM Macro')) {
    sessionName = 'NY PM';
    emoji = '🌆';
    actionText = 'PM Macro zamanı!';
  } else if (label.includes('Hazırlıkta')) {
    sessionName = 'London';
    emoji = '⏳';
    actionText = 'Newyork seansı hazırlanıyor!';
  } else if (label.includes('Açılıyor')) {
    sessionName = 'London';
    emoji = '🚀';
    actionText = 'Newyork seansı açılıyor!';
  } else if (label.includes('Newyork Macro')) {
    sessionName = 'Newyork';
    emoji = '📈';
    actionText = 'Newyork Macro zamanı!';
  }
  
  // Özel durumlar için farklı format
  if (label.includes('Hazırlıkta') || label.includes('Açılıyor')) {
    return `${emoji} ${label.toUpperCase()} ${emoji}

⏰ Saat: ${formattedTime} (Lisbon Time)
🌍 Session: ${sessionName}

⚠️ ${actionText}
📊 Trade fırsatları için hazır olun
💰 Risk yönetimi önemli!`;
  }
  
  // Normal macro mesajları
  return `${emoji} ${label.toUpperCase()} ZAMANI ${emoji}

⏰ Saat: ${formattedTime} (Lisbon Time)
🌍 Session: ${sessionName}

⚠️ ${actionText}
📈 Trade fırsatları için hazır olun
💰 Risk yönetimi önemli!`;
}

module.exports = {
  getKillzoneStartMessage,
  getWarningMessage,
  getAllKillzonesMessage,
  getNextKillzoneMessage,
  getStatusMessage,
  getMacroMessage,
  getAllMacrosMessage
}; 