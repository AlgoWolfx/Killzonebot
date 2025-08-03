# Killzone Hatırlatma Botu

ICT teknikleri ile trade eden kullanıcılar için killzone zamanlarını hatırlatan Telegram botu.

## Özellikler

- ✅ Otomatik killzone hatırlatmaları
- ✅ 10 dakika öncesi uyarılar
- ✅ Hafta içi sadece çalışma
- ✅ Telegram komutları (`/killzones`, `/next`, `/status`)
- ✅ NY timezone desteği

## Killzone Zamanları (Lizbon Saati)

- **Asia Killzone**: 00:00-03:00
- **London Killzone**: 05:00-08:00
- **New York AM Killzone**: 12:00-15:00
- **New York Lunch Killzone**: 13:00-14:00
- **New York PM Killzone**: 16:00-19:00

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