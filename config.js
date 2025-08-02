// Killzone Zamanları (GMT)
const KILLZONE_TIMES = {
  london: {
    name: "London Killzone",
    start: "08:00",
    end: "10:00",
    timezone: "Europe/London"
  },
  newyork: {
    name: "New York Killzone", 
    start: "13:00",
    end: "15:00",
    timezone: "America/New_York"
  },
  tokyo: {
    name: "Tokyo Killzone",
    start: "00:00", 
    end: "02:00",
    timezone: "Asia/Tokyo"
  }
};

// Bot Konfigürasyonu
const BOT_CONFIG = {
  timezone: "America/New_York",
  warningMinutes: 10, // 10 dakika öncesi uyarı
  workDays: [1, 2, 3, 4, 5], // Pazartesi-Cuma
  retryAttempts: 3
};

module.exports = {
  KILLZONE_TIMES,
  BOT_CONFIG
}; 