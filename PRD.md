# Killzone Hatırlatma Botu - PRD

## Proje Özeti
ICT teknikleri ile trade eden kullanıcı için killzone zamanlarını hatırlatan otomatik bot sistemi.

## Teknik Gereksinimler

### Platform
- **Vercel** - Serverless deployment
- **Node.js** - Backend runtime
- **Telegram Bot API** - Mesaj gönderimi

### Mimari
```
/api/cron.js        - Zamanlanmış görevler
/api/webhook.js     - Telegram bot komutları
/config.js          - Killzone zamanları
/utils/messages.js  - Mesaj şablonları
```

## Fonksiyonel Gereksinimler

### Ana Özellikler
1. **Otomatik Hatırlatma**
   - Hafta içi her gün belirlenen saatlerde
   - Telegram üzerinden mesaj gönderimi
   - Killzone zamanlarını listeleme

2. **Killzone Zamanları** (Kod üzerinden ayarlanacak)
   - London Killzone: 08:00-10:00 GMT
   - New York Killzone: 13:00-15:00 GMT
   - Tokyo Killzone: 00:00-02:00 GMT

3. **Mesaj Formatları**

   **Killzone Başlangıç Mesajı:**
   ```
   🚨 KILLZONE BAŞLADI! 🚨
   
   ⏰ Saat: [CURRENT_TIME] (NY Time)
   🌍 Zaman Dilimi: [TIMEZONE]
   
   ⚠️ ICT Killzone aktif!
   📊 Trade fırsatları için hazır olun
   💰 Risk yönetimi önemli!
   ```

   **10 Dakika Öncesi Uyarı:**
   ```
   ⚠️ KILLZONE YAKLAŞIYOR! ⚠️
   
   ⏰ [TIMEZONE] Killzone başlamasına 10 dakika
   🕐 Başlangıç: [START_TIME] (NY Time)
   
   📱 Hazırlık yapın!
   ```

   **Kullanıcı Komutları:**
   - `/killzones` - Tüm killzone zamanlarını göster
   - `/next` - Sonraki killzone zamanını göster
   - `/status` - Bot durumunu kontrol et

### Teknik Detaylar
- **Cron Schedule**: 
  - Killzone başlangıç: 08:00, 13:00, 00:00 GMT
  - 10 dakika öncesi: 07:50, 12:50, 23:50 GMT
- **API Rate Limit**: Minimal (günde 6 istek)
- **Error Handling**: Telegram API hatalarında retry
- **Timezone**: America/New_York (kullanıcı tercihi)
- **Bot Komutları**: Telegram webhook ile interaktif

## Deployment
- Vercel ücretsiz plan
- GitHub repository
- Otomatik deployment
- 7/24 çalışma

## Güvenlik
- Environment variables kullanımı
- Telegram bot token güvenliği
- API rate limiting

## Monitoring
- Vercel dashboard
- Telegram mesaj gönderim logları
- Error tracking

## Gelecek Özellikler (Opsiyonel)
- Zaman dilimi özelleştirme
- Farklı mesaj şablonları
- Web dashboard (opsiyonel)
- WhatsApp entegrasyonu 