// Killzone Zamanları (New York / ET) - killzone.txt referansı
const KILLZONE_TIMES = {
  asia: {
    name: "Asia",
    start: "20:00",
    end: "00:00",
    timezone: "America/New_York"
  },
  london: {
    name: "London",
    start: "02:00",
    end: "05:00",
    timezone: "America/New_York"
  },
  ny_am: {
    name: "NY AM",
    start: "09:30",
    end: "12:00",
    timezone: "America/New_York"
  },
  ny_lunch: {
    name: "NY Lunch",
    start: "12:00",
    end: "13:00",
    timezone: "America/New_York"
  },
  ny_pm: {
    name: "NY PM",
    start: "13:30",
    end: "16:00",
    timezone: "America/New_York"
  }
};

// Macro Zamanları (New York / ET) - newtime.md referansı
const MACRO_TIMES = {
  london: [
    { time: "01:50", label: "London Macro" },
    { time: "02:10", label: "London Macro" },
    { time: "02:50", label: "London Macro" },
    { time: "03:10", label: "London Macro" }
  ],
  ny_pm: [
    { time: "20:50", label: "Asia Macro" },
    { time: "21:10", label: "Asia Macro" }
  ],
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
  timezone: "America/New_York",
  warningMinutes: 10,
  workDays: [1, 2, 3, 4, 5],
  retryAttempts: 3
};

module.exports = {
  KILLZONE_TIMES,
  MACRO_TIMES,
  BOT_CONFIG
};
