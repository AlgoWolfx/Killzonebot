const moment = require('moment-timezone');
const { KILLZONE_TIMES, MACRO_TIMES } = require('../config');

const TZ = 'America/New_York';
const TZ_LABEL = 'New York (ET)';

// Killzone başlangıç mesajı
function getKillzoneStartMessage(timezone, currentTime) {
  const time = moment(currentTime).tz(TZ).format('HH:mm');

  return `🚨 ${timezone.toUpperCase()} BAŞLADI

⏰ Saat: ${time} (${TZ_LABEL})
🌍 Seans: ${timezone}

ICT Killzone aktif. Trade fırsatları için hazır olun.`;
}

// 10 dakika öncesi uyarı mesajı
function getWarningMessage(timezone, startTime) {
  const time = moment.tz(startTime, 'HH:mm', TZ).format('HH:mm');

  return `⚠️ ${timezone.toUpperCase()} YAKLAŞIYOR

⏰ ${timezone} başlamasına 10 dakika kaldı
🕐 Başlangıç: ${time} (${TZ_LABEL})

Hazır olun.`;
}

// Tüm killzone zamanlarını listele
function getAllKillzonesMessage() {
  let message = `📅 Killzone Zamanları (${TZ_LABEL})\n\n`;

  Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
    message += `🎯 ${zone.name}\n`;
    message += `⏰ ${zone.start} – ${zone.end}\n`;
    message += `⚠️ Uyarı: ${getWarningTime(zone.start)}\n\n`;
  });

  message += `📍 Saat dilimi: America/New_York\n`;
  message += `📅 Aktif: Pazartesi–Cuma`;

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
  const now = moment().tz(TZ);
  const today = now.day();

  if (today === 0 || today === 6) {
    return `Hafta sonu – bugün killzone yok.\n\nPazartesi 02:00'da London seansı başlar.\nİyi hafta sonu.`;
  }

  const currentTimeInMinutes = now.hour() * 60 + now.minute();
  let nextZone = null;
  let minTimeDiff = Infinity;

  Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
    const [startHour, startMinute] = zone.start.split(':').map(Number);
    const zoneTimeInMinutes = startHour * 60 + startMinute;

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

    return `⏰ Sonraki Killzone\n\n🎯 ${nextZone.name}\n🕐 ${nextZone.start} – ${nextZone.end}\n⏳ ${timeLeft} sonra\n⚠️ Uyarı: ${getWarningTime(nextZone.start)}`;
  }

  return `Bugün tüm killzone seansları tamamlandı.\n\nYarın 02:00'da London seansı başlar.\nİyi geceler.`;
}

// Bot durumu mesajı
function getStatusMessage() {
  const now = moment().tz(TZ);
  const time = now.format('HH:mm');
  const day = now.format('dddd');

  return `🤖 Bot Durumu

⏰ Şu anki zaman: ${time} (${TZ_LABEL})
📅 Gün: ${day}
✅ Bot aktif
📱 Bildirimler otomatik gönderiliyor`;
}

// Tüm macro zamanlarını listele
function getAllMacrosMessage() {
  let message = `📊 Macro Zamanları (${TZ_LABEL})\n\n`;

  if (MACRO_TIMES.london && MACRO_TIMES.london.length > 0) {
    message += `🇬🇧 London Macro\n`;
    MACRO_TIMES.london.forEach(macro => {
      message += `   ⏰ ${macro.time} – ${macro.label}\n`;
    });
    message += `\n`;
  }

  if (MACRO_TIMES.ny_pm && MACRO_TIMES.ny_pm.length > 0) {
    message += `🌏 Asia Macro\n`;
    MACRO_TIMES.ny_pm.forEach(macro => {
      message += `   ⏰ ${macro.time} – ${macro.label}\n`;
    });
    message += `\n`;
  }

  if (MACRO_TIMES.newyork && MACRO_TIMES.newyork.length > 0) {
    message += `📈 New York Macro'lar\n`;

    const specialMacros = MACRO_TIMES.newyork.filter(m =>
      m.label.includes('Hazırlıkta') || m.label.includes('Açılıyor')
    );
    if (specialMacros.length > 0) {
      specialMacros.forEach(macro => {
        message += `   ⏰ ${macro.time} – ${macro.label}\n`;
      });
      message += `\n`;
    }

    const normalMacros = MACRO_TIMES.newyork.filter(m => m.label === 'Newyork Macro');
    if (normalMacros.length > 0) {
      message += `   📊 Newyork Macro:\n`;
      normalMacros.forEach(macro => {
        message += `      ${macro.time}\n`;
      });
      message += `\n`;
    }

    const lunchMacros = MACRO_TIMES.newyork.filter(m => m.label.includes('Lunch Macro'));
    if (lunchMacros.length > 0) {
      message += `   🍽️ Lunch Macro:\n`;
      lunchMacros.forEach(macro => {
        message += `      ${macro.time}\n`;
      });
      message += `\n`;
    }

    const pmMacros = MACRO_TIMES.newyork.filter(m => m.label.includes('PM Macro'));
    if (pmMacros.length > 0) {
      message += `   🌆 PM Macro:\n`;
      pmMacros.forEach(macro => {
        message += `      ${macro.time}\n`;
      });
      message += `\n`;
    }
  }

  message += `📍 Saat dilimi: America/New_York\n`;
  message += `📅 Aktif: Pazartesi–Cuma`;

  return message;
}

// Macro zamanı mesajı
function getMacroMessage(label, time) {
  const formattedTime = moment.tz(time, 'HH:mm', TZ).format('HH:mm');

  let sessionName = '';
  let emoji = '📊';
  let actionText = 'Macro zamanı aktif.';

  if (label.includes('Asia Macro')) {
    sessionName = 'Asia';
    emoji = '🌏';
    actionText = 'Asia macro zamanı.';
  } else if (label.includes('London Macro')) {
    sessionName = 'London';
    emoji = '🇬🇧';
    actionText = 'London macro zamanı.';
  } else if (label.includes('Lunch Macro')) {
    sessionName = 'NY Lunch';
    emoji = '🍽️';
    actionText = 'Lunch macro zamanı.';
  } else if (label.includes('PM Macro')) {
    sessionName = 'NY PM';
    emoji = '🌆';
    actionText = 'PM macro zamanı.';
  } else if (label.includes('Hazırlıkta')) {
    sessionName = 'London';
    emoji = '⏳';
    actionText = 'New York seansı hazırlanıyor.';
  } else if (label.includes('Açılıyor')) {
    sessionName = 'London';
    emoji = '🚀';
    actionText = 'New York seansı açılıyor.';
  } else if (label.includes('Newyork Macro')) {
    sessionName = 'New York';
    emoji = '📈';
    actionText = 'New York macro zamanı.';
  }

  if (label.includes('Hazırlıkta') || label.includes('Açılıyor')) {
    return `${emoji} ${label}

⏰ Saat: ${formattedTime} (${TZ_LABEL})
🌍 Seans: ${sessionName}

${actionText} Trade fırsatları için hazır olun.`;
  }

  return `${emoji} ${label}

⏰ Saat: ${formattedTime} (${TZ_LABEL})
🌍 Seans: ${sessionName}

${actionText} Trade fırsatları için hazır olun.`;
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
