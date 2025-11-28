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

// Macro Zamanları (Portekiz Lizbon) - Trade Macro Bildirimleri
const MACRO_TIMES = {
  // Asia seansı içindeki macro'lar (London macro'ları)
  london: [
    { time: "01:50", label: "London Macro" },
    { time: "02:10", label: "London Macro" },
    { time: "02:50", label: "London Macro" },
    { time: "03:10", label: "London Macro" }
  ],
  // NY PM seansı içindeki macro'lar (Asia için macro'lar)
  ny_pm: [
    { time: "20:50", label: "Asia Macro" },
    { time: "21:10", label: "Asia Macro" }
  ],
  // Newyork genel macro'lar (seans dışı veya özel durumlar)
  newyork: [
    { time: "07:00", label: "Newyork Hazırlıkta" },
    { time: "08:30", label: "Newyork Açılıyor" },
    { time: "08:50", label: "Newyork Macro" },
    { time: "09:10", label: "Newyork Macro" },
    { time: "09:50", label: "Newyork Macro" },
    { time: "10:10", label: "Newyork Macro" },
    { time: "10:30", label: "Newyork Macro" },
    { time: "10:50", label: "Newyork Macro" },
    { time: "11:10", label: "Newyork Macro" },
    { time: "11:50", label: "Newyork Lunch Macro" },
    { time: "12:10", label: "Newyork Lunch Macro" },
    { time: "12:50", label: "Newyork Lunch Macro" },
    { time: "13:10", label: "Newyork Lunch Macro" },
    { time: "13:50", label: "Newyork PM Macro" },
    { time: "14:10", label: "Newyork PM Macro" }
  ]
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
  MACRO_TIMES,
  BOT_CONFIG
}; 