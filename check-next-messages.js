const moment = require('moment-timezone');
const { KILLZONE_TIMES, BOT_CONFIG } = require('./config');

console.log('\n' + '='.repeat(60));
console.log('KILLZONE MESAJ ZAMANLARI KONTROLÜ');
console.log('='.repeat(60));

const now = moment().tz('Europe/Lisbon');
console.log(`\nŞu anki zaman (Lizbon): ${now.format('YYYY-MM-DD HH:mm:ss')}`);
console.log(`Gün: ${['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][now.day()]}`);

// Hafta sonu kontrolü
if (!BOT_CONFIG.workDays.includes(now.day())) {
  console.log('\n⚠️  UYARI: Bugün çalışma günü değil! (config.js\'de workDays ayarına bakın)');
}

console.log('\n' + '-'.repeat(60));
console.log('KONFİGÜRE EDİLMİŞ KILLZONE ZAMANLARI:');
console.log('-'.repeat(60));

Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
  console.log(`\n${zone.name}:`);
  console.log(`  Başlangıç: ${zone.start}`);
  console.log(`  Bitiş: ${zone.end}`);
  
  const [startHour, startMinute] = zone.start.split(':').map(Number);
  const warningTime = moment.tz('Europe/Lisbon')
    .hour(startHour)
    .minute(startMinute)
    .subtract(10, 'minutes');
  
  console.log(`  Uyarı zamanı: ${warningTime.format('HH:mm')} (10 dakika önce)`);
});

console.log('\n' + '-'.repeat(60));
console.log('SONRAKİ 24 SAATTEKİ MESAJLAR:');
console.log('-'.repeat(60));

let messages = [];

// Bugün ve yarın için mesajları hesapla
for (let dayOffset = 0; dayOffset <= 1; dayOffset++) {
  const checkDate = now.clone().add(dayOffset, 'days');
  
  // Hafta sonu kontrolü
  if (!BOT_CONFIG.workDays.includes(checkDate.day())) {
    continue;
  }
  
  Object.entries(KILLZONE_TIMES).forEach(([key, zone]) => {
    const [startHour, startMinute] = zone.start.split(':').map(Number);
    
    // Uyarı mesajı
    const warningTime = checkDate.clone()
      .hour(startHour)
      .minute(startMinute)
      .second(0)
      .subtract(10, 'minutes');
    
    if (warningTime.isAfter(now)) {
      messages.push({
        time: warningTime,
        type: '⚠️  Uyarı',
        zone: zone.name,
        message: `10 dakika sonra başlayacak`
      });
    }
    
    // Başlangıç mesajı
    const startTime = checkDate.clone()
      .hour(startHour)
      .minute(startMinute)
      .second(0);
    
    if (startTime.isAfter(now)) {
      messages.push({
        time: startTime,
        type: '🚨 Başlangıç',
        zone: zone.name,
        message: 'Killzone başladı!'
      });
    }
  });
}

// Zamanına göre sırala
messages.sort((a, b) => a.time.diff(b.time));

if (messages.length === 0) {
  console.log('\n❌ Önümüzdeki 24 saatte mesaj yok!');
  console.log('   Muhtemel sebepler:');
  console.log('   - Tüm killzone zamanları geçmiş olabilir');
  console.log('   - Hafta sonu olabilir (workDays ayarını kontrol edin)');
} else {
  console.log(`\nToplam ${messages.length} mesaj planlanmış:\n`);
  
  messages.forEach((msg, index) => {
    const timeUntil = moment.duration(msg.time.diff(now));
    const hours = Math.floor(timeUntil.asHours());
    const minutes = timeUntil.minutes();
    
    console.log(`${index + 1}. ${msg.type} - ${msg.zone}`);
    console.log(`   Zaman: ${msg.time.format('YYYY-MM-DD HH:mm')} (${hours} saat ${minutes} dakika sonra)`);
    console.log(`   Mesaj: ${msg.message}`);
    console.log('');
  });
}

console.log('-'.repeat(60));
console.log('CRON JOB DURUMU:');
console.log('-'.repeat(60));
console.log(`Cron Schedule: * * * * * (Her dakika çalışır)`);
console.log(`Şu anki dakika: ${now.format('HH:mm')}`);
console.log(`Bir sonraki çalışma: ${now.clone().add(1, 'minute').startOf('minute').format('HH:mm:00')}`);

console.log('\n💡 İPUCU: Eğer mesajlar gitmiyorsa:');
console.log('   1. Vercel\'de TELEGRAM_BOT_TOKEN ve TELEGRAM_CHAT_ID tanımlı mı?');
console.log('   2. Vercel Functions > Logs\'dan hataları kontrol edin');
console.log('   3. test-message-now.js ile manuel test yapın');
console.log('   4. Killzone zamanlarını kontrol edin (config.js)');
console.log('');