# CronJob Mesaj Gönderme Sorunu Çözümü

## Sorun Analizi

CronJob'unuz 200 durum kodu döndürüyor ancak mesaj göndermiyor. Bunun başlıca sebepleri:

1. **Zaman Karşılaştırma Hatası**: Eski kod tam dakika eşleşmesi arıyordu, bu da cron job'un tam saniyede çalışmaması durumunda mesajları kaçırmasına neden oluyordu.

2. **Uyarı Mesajı Zamanlama Hatası**: 10 dakika öncesi hesaplaması saat sınırlarını geçtiğinde hatalı çalışıyordu.

3. **Duplicate Mesaj Riski**: Aynı dakika içinde birden fazla çalışma olursa, aynı mesaj tekrar gönderiliyordu.

4. **Environment Variables**: Telegram credentials'ların Vercel'de doğru tanımlanmamış olabilir.

## Yapılan Düzeltmeler

### 1. api/cron.js Güncellendi

- **Daha İyi Zaman Karşılaştırması**: `shouldSendMessage` fonksiyonu ile dakika bazlı kontrol
- **Düzgün Uyarı Zamanlaması**: moment.js ile 10 dakika öncesi hesaplaması
- **Detaylı Loglama**: Her adımda ne olduğunu görmek için console.log'lar
- **Hata Yönetimi**: Daha iyi hata mesajları ve API response logları

### 2. config.js Güncellendi

- Test için daha mantıklı zamanlar (08:00, 13:00, 16:30)
- Gerçek killzone zamanlarınızı eklemeniz için örnekler
- Debug modu eklendi

## Kurulum Adımları

### 1. Vercel Environment Variables

Vercel dashboard'a gidin ve şu environment variables'ları ekleyin:

```
TELEGRAM_BOT_TOKEN=your_actual_bot_token_here
TELEGRAM_CHAT_ID=your_actual_chat_id_here
```

**ÖNEMLİ**: Test değerleri değil, gerçek değerleri kullanın!

### 2. Telegram Bot Token Alma

1. Telegram'da @BotFather'a gidin
2. `/newbot` komutunu gönderin veya mevcut botunuzun token'ını alın
3. Token'ı kopyalayın (format: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 3. Chat ID Bulma

1. Botunuza bir mesaj gönderin
2. Tarayıcıda şu URL'yi açın: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. `"chat":{"id":` kısmındaki sayıyı bulun (negatif olabilir)

### 4. Test Etme

Lokal test için:

```bash
# .env dosyası oluşturun
echo "TELEGRAM_BOT_TOKEN=your_bot_token" > .env
echo "TELEGRAM_CHAT_ID=your_chat_id" >> .env

# Test mesajı gönderin
node test-message-now.js

# Cron job'u test edin
node test-cron-local.js
```

### 5. Zaman Ayarlama

`config.js` dosyasında killzone zamanlarınızı ayarlayın:

```javascript
const KILLZONE_TIMES = {
  london: {
    name: "London Killzone",
    start: "08:00",  // Lizbon saatine göre
    end: "09:00",
    timezone: "Europe/Lisbon"
  },
  newyork: {
    name: "New York Killzone",
    start: "13:00",  // Lizbon saatine göre
    end: "14:00",
    timezone: "Europe/Lisbon"
  }
};
```

## Deploy Etme

```bash
# Değişiklikleri commit edin
git add .
git commit -m "Fix cron job message sending issue"
git push

# Vercel otomatik deploy edecektir
```

## Kontrol Listesi

- [ ] Telegram Bot Token'ı Vercel'de tanımlı mı?
- [ ] Telegram Chat ID Vercel'de tanımlı mı?
- [ ] Killzone zamanları doğru ayarlanmış mı?
- [ ] vercel.json'da cron schedule `"* * * * *"` (her dakika) olarak ayarlı mı?
- [ ] Bot'a mesaj atmış ve chat ID'yi doğrulamış mıyım?

## Debug İpuçları

1. **Vercel Functions Log'larını kontrol edin**: Vercel dashboard > Functions > Logs
2. **Test mesajı gönderin**: `node test-message-now.js`
3. **Zaman dilimini kontrol edin**: Tüm zamanlar Lizbon saatine göre

## Yaygın Hatalar

1. **404 Not Found**: Bot token yanlış
2. **400 Bad Request**: Chat ID yanlış
3. **Mesaj gitmiyor**: Environment variables tanımlı değil
4. **Yanlış zamanda mesaj**: Zaman dilimi karışıklığı

## Destek

Hala sorun yaşıyorsanız:
1. Vercel function logs'larını kontrol edin
2. `test-cron-local.js` ile lokal test yapın
3. Environment variables'ların doğru tanımlandığından emin olun