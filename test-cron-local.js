require('dotenv').config();
const moment = require('moment-timezone');
const { KILLZONE_TIMES, BOT_CONFIG } = require('./config');

// Cron fonksiyonunu içe aktar
const cronHandler = require('./api/cron');

// Mock request ve response objelerini oluştur
const mockReq = {};
const mockRes = {
  status: (code) => ({
    json: (data) => {
      console.log(`\nResponse Status: ${code}`);
      console.log('Response Data:', JSON.stringify(data, null, 2));
    }
  })
};

// Şu anki zamanı göster
const now = moment().tz('Europe/Lisbon');
console.log('\n' + '='.repeat(60));
console.log('TEST CRON JOB - LOCAL');
console.log('='.repeat(60));
console.log(`Şu anki zaman (Lisbon): ${now.format('YYYY-MM-DD HH:mm:ss')}`);
console.log(`Gün: ${['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][now.day()]}`);

// Environment variables kontrolü
console.log('\nEnvironment Variables:');
console.log(`TELEGRAM_BOT_TOKEN: ${process.env.TELEGRAM_BOT_TOKEN ? '✅ Mevcut' : '❌ Eksik'}`);
console.log(`TELEGRAM_CHAT_ID: ${process.env.TELEGRAM_CHAT_ID ? '✅ Mevcut' : '❌ Eksik'}`);

// Killzone zamanlarını göster
console.log('\nKonfigüre edilmiş Killzone zamanları:');
Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
  const startTime = moment.tz(`${now.format('YYYY-MM-DD')} ${zone.start}`, 'Europe/Lisbon');
  const warningTime = startTime.clone().subtract(10, 'minutes');
  
  console.log(`\n${zone.name}:`);
  console.log(`  - Başlangıç: ${zone.start}`);
  console.log(`  - Uyarı zamanı: ${warningTime.format('HH:mm')}`);
  console.log(`  - Bitiş: ${zone.end}`);
});

// Sonraki mesaj zamanını hesapla
console.log('\nSonraki mesaj zamanları:');
let nextMessages = [];

Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
  const [startHour, startMinute] = zone.start.split(':').map(Number);
  
  // Bugün için zamanları kontrol et
  const startToday = now.clone().hour(startHour).minute(startMinute).second(0);
  const warningToday = startToday.clone().subtract(10, 'minutes');
  
  // Yarın için zamanları kontrol et
  const startTomorrow = startToday.clone().add(1, 'day');
  const warningTomorrow = startTomorrow.clone().subtract(10, 'minutes');
  
  // Uyarı mesajı
  if (warningToday.isAfter(now)) {
    nextMessages.push({
      time: warningToday,
      type: 'Uyarı',
      zone: zone.name
    });
  } else {
    nextMessages.push({
      time: warningTomorrow,
      type: 'Uyarı',
      zone: zone.name
    });
  }
  
  // Başlangıç mesajı
  if (startToday.isAfter(now)) {
    nextMessages.push({
      time: startToday,
      type: 'Başlangıç',
      zone: zone.name
    });
  } else {
    nextMessages.push({
      time: startTomorrow,
      type: 'Başlangıç',
      zone: zone.name
    });
  }
});

// Zamanına göre sırala
nextMessages.sort((a, b) => a.time.diff(b.time));

// İlk 5 mesajı göster
nextMessages.slice(0, 5).forEach(msg => {
  const timeUntil = moment.duration(msg.time.diff(now));
  const hours = Math.floor(timeUntil.asHours());
  const minutes = timeUntil.minutes();
  
  console.log(`- ${msg.time.format('HH:mm')} - ${msg.zone} ${msg.type} (${hours}s ${minutes}dk sonra)`);
});

// Cron job'u test et
console.log('\n' + '='.repeat(60));
console.log('CRON JOB TEST ÇALIŞTIRILIYOR...');
console.log('='.repeat(60));

cronHandler(mockReq, mockRes);