// Killzone Zamanları (Portekiz Lizbon) 
const KILLZONE_TIMES = {
  // Test için yakın zamanlar - gerçek kullanımda bunları değiştirin
  test1: {
    name: "Test Killzone 1",
    start: "08:00",  // Sabah 8:00
    end: "09:00",
    timezone: "Europe/Lisbon"
  },
  test2: {
    name: "Test Killzone 2", 
    start: "13:00",  // Öğleden sonra 1:00
    end: "14:00",
    timezone: "Europe/Lisbon"
  },
  test3: {
    name: "Test Killzone 3",
    start: "16:30",  // Akşamüstü 4:30
    end: "17:30",
    timezone: "Europe/Lisbon"
  }
  // Gerçek killzone zamanlarınızı buraya ekleyin:
  // london: {
  //   name: "London Killzone",
  //   start: "08:00",
  //   end: "09:00",
  //   timezone: "Europe/Lisbon"
  // },
  // newyork: {
  //   name: "New York Killzone",
  //   start: "13:00",
  //   end: "14:00",
  //   timezone: "Europe/Lisbon"
  // }
};

// Bot Konfigürasyonu
const BOT_CONFIG = {
  timezone: "Europe/Lisbon",
  warningMinutes: 10, // 10 dakika öncesi uyarı
  workDays: [1, 2, 3, 4, 5], // Pazartesi-Cuma (0=Pazar, 6=Cumartesi)
  // Test için tüm günler: [0, 1, 2, 3, 4, 5, 6]
  retryAttempts: 3,
  debugMode: true // Detaylı log için
};

module.exports = {
  KILLZONE_TIMES,
  BOT_CONFIG
}; 