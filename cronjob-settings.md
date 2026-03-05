# Cronjob.org Ayarları

## 🔗 Cronjob URL
```
https://killzonebot-mkwr02dfy-geraltxeths-projects.vercel.app/api/cron
```

## ⚙️ Mevcut Ayarlar

### Job Details
- **Title:** killzone-bot
- **URL:** https://killzonebot-mkwr02dfy-geraltxeths-projects.vercel.app/api/cron
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

## 📅 Killzone Zamanları (New York / ET)

Sistem **America/New_York** saatine göre çalışır. Tüm bildirimler bu saat dilimine göre tetiklenir.

| Killzone | Başlangıç | Bitiş | Uyarı (10 dk önce) |
|----------|-----------|-------|-------------------|
| Asia | 20:00 | 00:00 | 19:50 |
| London | 02:00 | 05:00 | 01:50 |
| NY AM | 09:30 | 12:00 | 09:20 |
| NY Lunch | 12:00 | 13:00 | 11:50 |
| NY PM | 13:30 | 16:00 | 13:20 |

## 🔔 Bildirim Ayarları
- **Execution fails:** ❌ Kapalı
- **Execution succeeds after failure:** ❌ Kapalı
- **Too many failures:** ✅ Açık

## 🌍 Gelişmiş Ayarlar
- **Logic timezone:** America/New_York (api/cron.js içinde kullanılır)
- **Cronjob.org timezone:** Europe/Lisbon (tetikleme – değiştirilmedi)
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