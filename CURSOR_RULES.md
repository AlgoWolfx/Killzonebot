# Cursor Kuralları - Killzone Bot Projesi

## Genel Kurallar
- **Dil**: Türkçe iletişim
- **Açıklamalar**: Kısa ve net
- **Kod**: Sadece gerekli kod
- **Performans**: Gereksiz import'lardan kaçın

## Proje Yapısı
- **Framework**: Node.js + Express
- **Deployment**: Vercel
- **Database**: Yok (config dosyası kullan)
- **UI**: Yok (sadece API)

## Kod Standartları
- **Import/Export**: Mevcut import'ları silme
- **Architecture**: Temel yapıyı koru
- **Design**: Mevcut tasarımı değiştirme
- **Dependencies**: Minimal kullan

## Özel Kurallar
- **Test Dosyaları**: test.py dosyalarını sil
- **Onay**: Her modül için onay iste
- **Hata Kontrolü**: Test hatalarını kontrol et
- **Dev Komutu**: `npm run dev` kullan

## Bot Özellikleri
- **Rate Limiting**: Minimal API istekleri
- **Timezone**: America/New_York
- **Mesajlar**: İngilizce metin
- **Cron**: Hafta içi günlük

## Güvenlik
- **Environment Variables**: Hassas bilgiler için
- **Token Güvenliği**: Telegram bot token
- **Error Handling**: Retry mekanizması

## Deployment
- **Vercel**: Ücretsiz plan
- **GitHub**: Otomatik deploy
- **Monitoring**: Vercel dashboard 