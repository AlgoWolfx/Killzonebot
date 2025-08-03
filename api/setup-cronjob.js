const axios = require('axios');

// Cronjob.org API ile job oluşturma
async function createCronJob() {
  const apiKey = process.env.CRON_JOB_ORG_API_KEY;
  const cronUrl = 'https://killzonebot-gev12tbqk-geraltxeths-projects.vercel.app/api/cron';
  
  if (!apiKey) {
    throw new Error('CRON_JOB_ORG_API_KEY environment variable is missing');
  }
  
  try {
    const response = await axios.post('https://api.cron-job.org/jobs', {
      job: {
        title: 'Killzone Bot Cron',
        url: cronUrl,
        enabled: true,
        saveResponses: true,
        schedule: {
          timezone: 'Europe/Lisbon',
          hours: [-1], // Her saat
          mdays: [-1], // Her gün
          months: [-1], // Her ay
          wdays: [-1], // Her hafta günü
          minutes: [0] // Her dakika (0. dakika)
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Cronjob oluşturuldu:', response.data);
    return response.data;
  } catch (error) {
    console.error('Cronjob oluşturma hatası:', error.response?.data || error.message);
    throw error;
  }
}

// Vercel serverless function
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const result = await createCronJob();
    res.status(200).json({ 
      success: true, 
      message: 'Cronjob başarıyla oluşturuldu',
      data: result
    });
  } catch (error) {
    console.error('Setup cronjob hatası:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}; 