// Killzone Zamanları (Portekiz Lizbon) - TEST ZAMANLARI
const KILLZONE_TIMES = {
  test1: {
    name: "Test Killzone 1",
    start: "22:30",
    end: "22:32",
    timezone: "Europe/Lisbon"
  },
  test2: {
    name: "Test Killzone 2",
    start: "22:31",
    end: "22:33",
    timezone: "Europe/Lisbon"
  },
  test3: {
    name: "Test Killzone 3",
    start: "22:32",
    end: "22:34",
    timezone: "Europe/Lisbon"
  },
  test4: {
    name: "Test Killzone 4",
    start: "22:33",
    end: "22:35",
    timezone: "Europe/Lisbon"
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