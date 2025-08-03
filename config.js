// Killzone Zamanları (Portekiz Lizbon) - ICT GERÇEK ZAMANLAR
const KILLZONE_TIMES = {
  // killzone_table.md'deki saatlere göre ayarlandı
  asia: {
    name: "Asia",
    start: "01:00",
    end: "05:00",
    timezone: "Europe/Lisbon"
  },
  london: {
    name: "London", 
    start: "07:00",
    end: "10:00",
    timezone: "Europe/Lisbon"
  },
  ny_am: {
    name: "NY AM",
    start: "14:30",
    end: "17:00", 
    timezone: "Europe/Lisbon"
  },
  ny_lunch: {
    name: "NY Lunch",
    start: "17:00",
    end: "18:00",
    timezone: "Europe/Lisbon"
  },
  ny_pm: {
    name: "NY PM", 
    start: "18:30",
    end: "21:00",
    timezone: "Europe/Lisbon"
  }
};

// Bot Konfigürasyonu
const BOT_CONFIG = {
  timezone: "Europe/Lisbon",
  warningMinutes: 10, // 10 dakika öncesi uyarı
  workDays: [1, 2, 3, 4, 5], // Pazartesi-Cuma (hafta içi)
  retryAttempts: 3
};

module.exports = {
  KILLZONE_TIMES,
  BOT_CONFIG
}; 