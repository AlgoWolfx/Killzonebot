# Killzone Hatırlatma Botu

ICT teknikleri ile trade eden kullanıcılar için killzone zamanlarını hatırlatan Telegram botu.

## Özellikler

- ✅ Otomatik killzone hatırlatmaları
- ✅ 10 dakika öncesi uyarılar
- ✅ Hafta içi sadece çalışma
- ✅ Telegram komutları (`/killzones`, `/next`, `/status`)
- ✅ NY timezone desteği

## Killzone Zamanları

- **London Killzone**: 08:00-10:00 GMT
- **New York Killzone**: 13:00-15:00 GMT  
- **Tokyo Killzone**: 00:00-02:00 GMT

## Kurulum

1. **Telegram Bot Oluşturma**
   - @BotFather'a gidin
   - `/newbot` komutunu gönderin
   - Bot token'ını alın

2. **Environment Variables**
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEGRAM_CHAT_ID=your_chat_id
   ```

3. **Deployment**
   ```bash
   npm install
   vercel --prod
   ```

4. **Cronjob.org Ayarları**
   - `cronjob-settings.md` dosyasındaki ayarları kullan
   - Test için: "Every 1 minute(s)"
   - Production için: Custom crontab expression

## Kullanım

Bot'a şu komutları gönderebilirsiniz:
- `/start` - Bot'u başlat
- `/killzones` - Tüm killzone zamanlarını göster
- `/next` - Sonraki killzone zamanını göster
- `/status` - Bot durumunu kontrol et

## Teknolojiler

- Node.js
- Vercel (Serverless)
- Telegram Bot API
- Moment.js (Timezone) 