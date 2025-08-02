module.exports = async (req, res) => {
  res.status(200).json({ 
    message: 'Test API çalışıyor!',
    timestamp: new Date().toISOString(),
    env: {
      token: process.env.TELEGRAM_BOT_TOKEN ? 'Var' : 'Yok',
      chatId: process.env.TELEGRAM_CHAT_ID ? 'Var' : 'Yok'
    }
  });
}; 