# Cronjob.org Ayarları

## 🔗 Cronjob URL
```
https://killzonebot-l154ctke6-geraltxeths-projects.vercel.app/api/cron
```

## ⚙️ Mevcut Ayarlar

### Job Details
- **Title:** killzone-bot
- **URL:** https://killzonebot-l154ctke6-geraltxeths-projects.vercel.app/api/cron
- **Enable job:** ✅ Açık
- **Save responses:** ❌ Kapalı

### Execution Schedule
- **Schedule:** Every 1 minute(s) (test için)
- **Production:** Custom crontab expression

### Crontab Expression (Production)
```
0 1,7,14,17,18 * * 1-5
```

### Test Crontab Expression
```
* * * * * (her dakika)
```

## 📅 Killzone Zamanları (Portekiz Saati)

| Killzone | Başlangıç | Bitiş | Uyarı (10 dk önce) |
|----------|-----------|-------|-------------------|
| Asia | 01:00 | 05:00 | 00:50 |
| London | 07:00 | 10:00 | 06:50 |
| NY AM | 14:30 | 17:00 | 14:20 |
| NY Lunch | 17:00 | 18:00 | 16:50 |
| NY PM | 18:30 | 21:00 | 18:20 |

## 🔔 Bildirim Ayarları
- **Execution fails:** ❌ Kapalı
- **Execution succeeds after failure:** ❌ Kapalı
- **Too many failures:** ✅ Açık

## 🌍 Gelişmiş Ayarlar
- **Timezone:** Europe/Lisbon
- **Request method:** GET
- **Timeout:** 30 saniye
- **Treat redirects as success:** ✅ Açık

## 🧪 Test Durumu
- **Test modu:** Her dakika çalışıyor
- **Başlangıç:** 3 Ağustos 2025
- **Durum:** Aktif

## 📝 Notlar
- Test tamamlandıktan sonra production ayarlarına geç
- Hafta içi sadece çalışacak şekilde ayarla
- Uyarı sistemi aktif 