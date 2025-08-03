# Vercel URL Yapısı ve Cronjob Ayarları

## 🔄 Vercel URL Davranışı

### Her Deploy'da URL Değişir Mi?
**EVET** - Her yeni deploy'da Vercel otomatik olarak yeni bir unique URL oluşturur:

```
Deploy 1: https://killzonebot-abc123-geraltxeths-projects.vercel.app
Deploy 2: https://killzonebot-def456-geraltxeths-projects.vercel.app
Deploy 3: https://killzonebot-ghi789-geraltxeths-projects.vercel.app
```

## 🎯 Cronjob İçin Sabit URL Çözümü

### Seçenek 1: Vercel Domain Alias (Önerilen)
1. Vercel Dashboard'a gidin
2. Project Settings > Domains
3. Özel domain ekleyin veya vercel subdomain kullanın
4. Sabit URL: `https://killzonebot.vercel.app/api/cron`

### Seçenek 2: Mevcut URL'yi Manuel Güncelleme
Her deploy sonrası cronjob.org'da URL'yi güncelleyin.

## 📋 Güncel Cronjob Ayarları

**Mevcut URL (Deploy sonrası güncellenmeli):**
```
https://killzonebot-7a7qcwcyv-geraltxeths-projects.vercel.app/api/cron
```

**Zamanlamalar:**
- Test: `* * * * *` (her dakika)
- Production: `0 1,7,14,17,18 * * 1-5` (hafta içi belirli saatler)

## 💡 Config Yönetimi

Artık config.js dosyasını manuel olarak güncelleyip deploy edebilirsiniz:

1. `config.js` dosyasını düzenleyin
2. `vercel --prod` ile deploy edin
3. Yeni URL'yi cronjob.org'da güncelleyin
4. Test edin

## 🔧 Deploy Sonrası Kontrol

Her deploy sonrası şunları kontrol edin:
1. Yeni Vercel URL'si
2. Cronjob.org'da URL güncelleme
3. Test mesajı gönderimi