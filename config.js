// Killzone Zamanları (Portekiz Lizbon) - CANLI TEST ZAMANLARI
const KILLZONE_TIMES = {
  // Canlı test zamanları - Şu anki saat 17:48'e göre güncellendi
  test_now: {
    name: "Test Şimdi",
    start: "17:49",
    end: "17:51",
    timezone: "Europe/Lisbon"
  },
  test_1min: {
    name: "Test 1 Dakika",
    start: "17:50",
    end: "17:52",
    timezone: "Europe/Lisbon"
  },
  test_2min: {
    name: "Test 2 Dakika",
    start: "17:51",
    end: "17:53",
    timezone: "Europe/Lisbon"
  },
  test_5min: {
    name: "Test 5 Dakika",
    start: "17:54",
    end: "17:56",
    timezone: "Europe/Lisbon"
  },
  test_10min: {
    name: "Test 10 Dakika",
    start: "17:59",
    end: "18:01",
    timezone: "Europe/Lisbon"
  }
};

// Bot Konfigürasyonu
const BOT_CONFIG = {
  timezone: "Europe/Lisbon",
  warningMinutes: 10, // 10 dakika öncesi uyarı
  workDays: [0, 1, 2, 3, 4, 5, 6], // Hafta sonu dahil (test için)
  retryAttempts: 3
};

module.exports = {
  KILLZONE_TIMES,
  BOT_CONFIG
}; 