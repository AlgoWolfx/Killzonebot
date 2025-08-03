// Killzone Zamanları (Portekiz Lizbon) - CANLI TEST ZAMANLARI
const KILLZONE_TIMES = {
  // Canlı test zamanları - Şu anki saat 17:40'a göre ayarlandı
  london_open: {
    name: "London Open",
    start: "17:45",
    end: "17:50",
    timezone: "Europe/Lisbon"
  },
  ny_open: {
    name: "New York Open",
    start: "17:50",
    end: "17:55",
    timezone: "Europe/Lisbon"
  },
  tokyo_open: {
    name: "Tokyo Open",
    start: "17:55",
    end: "18:00",
    timezone: "Europe/Lisbon"
  },
  london_close: {
    name: "London Close",
    start: "18:00",
    end: "18:05",
    timezone: "Europe/Lisbon"
  },
  ny_close: {
    name: "New York Close",
    start: "18:05",
    end: "18:10",
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