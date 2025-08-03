// Killzone Zamanları (Portekiz Lizbon) - ICT GERÇEK ZAMANLAR
const KILLZONE_TIMES = {
  // New York saatinden Lizbon saatine çevrilmiş ICT killzone zamanları (killzone.txt'e göre)
  asia_killzone: {
    name: "Asia Killzone",
    start: "00:00",
    end: "03:00",
    timezone: "Europe/Lisbon"
  },
  london_killzone: {
    name: "London Killzone", 
    start: "05:00",
    end: "08:00",
    timezone: "Europe/Lisbon"
  },
  ny_am_killzone: {
    name: "New York AM Killzone",
    start: "12:00",
    end: "15:00", 
    timezone: "Europe/Lisbon"
  },
  ny_lunch_killzone: {
    name: "New York Lunch Killzone",
    start: "13:00",
    end: "14:00",
    timezone: "Europe/Lisbon"
  },
  ny_pm_killzone: {
    name: "New York PM Killzone", 
    start: "16:00",
    end: "19:00",
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