# Vercel Environment Değişkenleri Kurulumu

Vercel'de environment değişkenlerini ayarlamak için şu adımları izleyin:

1. Vercel Dashboard'a gidin: https://vercel.com/dashboard
2. Killzonebot projesini seçin
3. "Settings" sekmesine tıklayın
4. Sol menüden "Environment Variables" seçin
5. Aşağıdaki değişkenleri ekleyin:

## Eklenecek Environment Değişkenleri

| İsim | Değer | Ortam |
|------|-------|-------|
| `TELEGRAM_BOT_TOKEN` | `8490023246:AAHeg137jaNnW_-hIbv56NSb-Eqiuc7GBZs` | Production, Preview, Development |
| `TELEGRAM_CHAT_ID` | `6870670610` | Production, Preview, Development |

6. "Save" butonuna tıklayın
7. Projeyi yeniden deploy edin

## Cronjob.org Ayarları

Cronjob.org'da şu URL'yi kullanın:

```
https://killzonebot-l154ctke6-geraltxeths-projects.vercel.app/api/cron
```

Zamanlamayı "Every 1 minute" olarak ayarlayın.