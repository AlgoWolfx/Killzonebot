# ICT Killzone Hatırlatma Botu - PRD v2.0

## 📋 Proje Özeti
ICT (Inner Circle Trading) teknikleri kullanan traderlar için killzone zamanlarında otomatik hatırlatma gönderen Telegram botu. Vercel serverless altyapısında çalışan, günlük trading seansları için kritik zamanları bildiren otomasyon sistemi.

## 🎯 İş Hedefleri
- **Ana Amaç**: ICT trader'larını önemli killzone zamanları konusunda proaktif olarak bilgilendirmek
- **Problem**: Manuel zaman takibi, killzone zamanlarını kaçırma riski
- **Çözüm**: Otomatik, güvenilir ve zamanında bildirim sistemi

## 👥 Hedef Kullanıcı
- ICT trading teknikleri kullanan bireysel traderlar
- Avrupa/Lizbon timezone'unda çalışan traderlar
- Telegram kullanıcıları
- Manuel zaman takibi yapmak istemeyen aktif traderlar

## ⚙️ Teknik Mimari

### Platform ve Teknolojiler
```
├── Runtime: Node.js (v22.x)
├── Framework: Express.js (Serverless)
├── Deployment: Vercel (Ücretsiz Plan)
├── Database: Yok (Config-based)
├── Messaging: Telegram Bot API
├── Scheduling: Cronjob.org (External)
├── Time Management: moment-timezone
└── HTTP Client: axios
```

### Dosya Yapısı
```
/api/
  ├── cron.js        # Zamanlanmış killzone kontrolleri
  ├── webhook.js     # Telegram bot komut işleyicisi
  └── setup-cronjob.js # Cronjob kurulum yardımcısı

/utils/
  └── messages.js    # Mesaj şablonları ve formatları

├── config.js        # Killzone zamanları ve bot ayarları
├── vercel.json      # Deployment konfigürasyonu
└── package.json     # Dependencies ve scripts
```

## 🔧 Ana Fonksiyonlar

### 1. Otomatik Killzone Hatırlatmaları
**Özellik**: Belirlenen killzone zamanlarında otomatik mesaj gönderimi
- **Frekans**: Dakikada bir kontrol (cron job)
- **Zaman Dilimi**: Europe/Lisbon
- **Mesaj Türleri**: 
  - 10 dakika öncesi uyarı
  - Killzone başlangıç bildirimi

### 2. Telegram Bot Komutları
**Özellik**: Kullanıcı ile interaktif iletişim
- `/start` - Bot'u başlat ve yardım mesajı
- `/killzones` - Tüm killzone zamanlarını listele
- `/next` - Sonraki killzone zamanını göster
- `/status` - Bot çalışma durumunu kontrol et

### 3. Intelligent Mesaj Sistemi
**Özellik**: Akıllı mesaj formatları ve zamanlama
- HTML parse mode desteği
- Retry mekanizması (network hatalarında)
- Timeout kontrolü (10-15 saniye)
- User-Agent tanımlaması

## 📊 Mevcut Killzone Yapılandırması

### Test Zamanları (Aktif)
```javascript
test_1min: 16:43-16:45
test_2min: 16:44-16:46  
test_3min: 16:45-16:47
test_5min: 16:47-16:49
test_10min: 16:52-16:54
```

### Production Zamanları (Planlanan)
```
Asia Killzone:    01:00-05:00 (Lisbon)
London Killzone:  07:00-10:00 (Lisbon) 
NY AM Killzone:   14:30-17:00 (Lisbon)
NY Lunch:         17:00-18:00 (Lisbon)
NY PM Killzone:   18:30-21:00 (Lisbon)
```

## 🎨 Kullanıcı Deneyimi

### Mesaj Formatları

#### Killzone Başlangıç Mesajı
```
🚨 KILLZONE BAŞLADI! 🚨

⏰ Saat: [HH:MM] (Lisbon Time)
🌍 Zaman Dilimi: [TIMEZONE_NAME]

⚠️ ICT Killzone aktif!
📊 Trade fırsatları için hazır olun
💰 Risk yönetimi önemli!
```

#### 10 Dakika Öncesi Uyarı
```
⚠️ KILLZONE YAKLAŞIYOR! ⚠️

⏰ [TIMEZONE] Killzone başlamasına 5 dakika
🕐 Başlangıç: [HH:MM] (Lisbon Time)

📱 Hazırlık yapın!
```

## 🚀 Deployment Süreci

### Mevcut Durum
- **Platform**: Vercel (killzonebot-gya0v2jz6-geraltxeths-projects.vercel.app)
- **Cron Service**: Cronjob.org
- **Test Schedule**: Her dakika (`* * * * *`)
- **Production Schedule**: `0 1,7,14,17,18 * * 1-5`

### Environment Variables
```env
TELEGRAM_BOT_TOKEN=[Bot Token]
TELEGRAM_CHAT_ID=[Target Chat ID]
```

### API Endpoints
```
GET  /api/cron     # Killzone kontrol endpoint'i
POST /api/webhook  # Telegram webhook endpoint'i
```

## 🔒 Güvenlik ve Güvenilirlik

### Hata Yönetimi
- **Network Timeouts**: 10-15 saniye timeout
- **Retry Logic**: Bağlantı hatalarında otomatik tekrar deneme
- **Error Logging**: Detaylı hata kayıtları
- **Graceful Degradation**: Hata durumunda sistem çalışmaya devam eder

### Rate Limiting
- **Telegram API**: Minimal kullanım (günde ~6-12 istek)
- **External Dependencies**: Sadece Cronjob.org
- **Resource Optimization**: Serverless cold start optimizasyonu

## 📈 Performans Metrikleri

### Başarım Hedefleri
- **Mesaj Delivery Rate**: %99+
- **Response Time**: <3 saniye
- **Uptime**: %99.9
- **Accuracy**: Killzone zamanlarında %100 doğruluk

### Monitoring
- **Vercel Dashboard**: Deployment ve function logs
- **Cronjob.org**: Scheduled job monitoring
- **Telegram API**: Message delivery status

## 🔄 Geliştirme Yol Haritası

### Kısa Vadeli (1 ay)
1. **Production Deployment**
   - Test modundan production moduna geçiş
   - Gerçek killzone zamanlarını aktif etme
   - Hafta içi-hafta sonu kontrolü

2. **Monitoring İyileştirmeleri**
   - Detaylı error tracking
   - Success rate monitoring
   - Performance analytics

### Orta Vadeli (3 ay)
1. **Özellik Genişletme**
   - Çoklu timezone desteği
   - Kişiselleştirilebilir uyarı zamanları
   - Sesli bildirim seçenekleri

2. **Kullanıcı Yönetimi**
   - Çoklu kullanıcı desteği
   - Kullanıcı tercihleri yönetimi
   - Grup chat desteği

### Uzun Vadeli (6 ay+)
1. **Platform Genişletme**
   - WhatsApp Business API entegrasyonu
   - Discord bot versiyonu
   - Mobile app companion

2. **Analitik ve İntelligence**
   - Trading session analytics
   - Market volatility integration
   - Economic calendar sync

## 💰 Maliyet Analizi

### Operasyonel Maliyetler
- **Vercel**: $0/ay (Ücretsiz plan)
- **Cronjob.org**: $0/ay (Ücretsiz plan)
- **Telegram Bot API**: $0/ay (Ücretsiz)
- **Domain/DNS**: Opsiyonel (~$10/yıl)

### Ölçeklendirme Maliyetleri
- **Vercel Pro**: $20/ay (advanced features)
- **Premium Cron Service**: $5-15/ay
- **Monitoring Services**: $10-30/ay

## 🎯 Başarı Kriterleri

### Fonksiyonel Başarı
- [x] Killzone zamanlarında doğru bildirim gönderimi
- [x] Telegram komutlarına doğru yanıt verme
- [x] 7/24 kesintisiz çalışma
- [ ] Production killzone zamanlarına geçiş

### Kullanıcı Memnuniyeti
- Zamanında ve doğru bildirimler
- Kolay kullanılabilir komut arayüzü
- Güvenilir ve istikrarlı hizmet
- Minimal sistem kaynak kullanımı

## 📞 Teknik Destek ve Bakım

### Bakım Planı
- **Günlük**: Log monitoring ve error tracking
- **Haftalık**: Performance review ve optimization
- **Aylık**: Feature updates ve security patches
- **Üç Aylık**: Architecture review ve scaling planning

### Acil Durum Planı
1. **Bot Yanıt Vermiyorsa**: Vercel function restart
2. **Mesaj Gönderilmiyorsa**: Telegram token kontrolü
3. **Zaman Senkronizasyonu**: Timezone ve cron ayarları kontrolü
4. **API Rate Limit**: Alternative delivery methods

---

**Doküman Versiyonu**: 2.0  
**Son Güncelleme**: 2025-01-03  
**Güncelleyen**: Development Team  
**Onay**: Product Owner