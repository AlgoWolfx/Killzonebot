// Killzone Zamanları (GMT) - TEST ZAMANLARI
const KILLZONE_TIMES = {
  test1: {
    name: "Test Killzone 1",
    start: "22:06",
    end: "22:08",
    timezone: "Europe/London"
  },
  test2: {
    name: "Test Killzone 2", 
    start: "22:07",
    end: "22:09",
    timezone: "Europe/London"
  },
  test3: {
    name: "Test Killzone 3",
    start: "22:08", 
    end: "22:10",
    timezone: "Europe/London"
  },
  test4: {
    name: "Test Killzone 4",
    start: "22:09",
    end: "22:11", 
    timezone: "Europe/London"
  },
  test5: {
    name: "Test Killzone 5",
    start: "22:10",
    end: "22:12",
    timezone: "Europe/London"
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