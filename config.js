// Killzone Zamanları (Portekiz Lizbon) - TEST ZAMANLARI
const KILLZONE_TIMES = {
  test1: {
    name: "Test Killzone 1",
    start: "22:15",
    end: "22:17",
    timezone: "Europe/Lisbon"
  },
  test2: {
    name: "Test Killzone 2", 
    start: "22:16",
    end: "22:18",
    timezone: "Europe/Lisbon"
  },
  test3: {
    name: "Test Killzone 3",
    start: "22:17", 
    end: "22:19",
    timezone: "Europe/Lisbon"
  },
  test4: {
    name: "Test Killzone 4",
    start: "22:18",
    end: "22:20", 
    timezone: "Europe/Lisbon"
  },
  test5: {
    name: "Test Killzone 5",
    start: "22:19",
    end: "22:21",
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