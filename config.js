// Killzone Zamanları (Portekiz Lizbon) - TEST ZAMANLARI
const KILLZONE_TIMES = {
  test1: {
    name: "Test Killzone 1",
    start: "22:40",
    end: "22:42",
    timezone: "Europe/Lisbon"
  },
  test2: {
    name: "Test Killzone 2",
    start: "22:42",
    end: "22:44",
    timezone: "Europe/Lisbon"
  }
};

// Bot Konfigürasyonu
const BOT_CONFIG = {
  timezone: "Europe/Lisbon",
  warningMinutes: 5, // 5 dakika öncesi uyarı (Portekiz için)
  workDays: [0, 1, 2, 3, 4, 5, 6], // Hafta sonu dahil (test için)
  retryAttempts: 3
};

module.exports = {
  KILLZONE_TIMES,
  BOT_CONFIG
}; 