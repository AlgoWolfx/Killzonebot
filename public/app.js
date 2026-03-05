const appRoot = document.getElementById('app');

function render() {
  document.getElementById('app').innerHTML = `
    <div class="container">
      <header class="header">
        <div class="brand">
          <svg class="logo" viewBox="0 0 64 64" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#7ec3ff"/>
                <stop offset="100%" stop-color="#c2baff"/>
              </linearGradient>
            </defs>
            <rect x="10" y="16" width="44" height="34" rx="12" ry="12" fill="url(#logo-g)" opacity="0.9"/>
            <rect x="17" y="10" width="2" height="10" rx="1" fill="#95a9ff"/>
            <circle cx="18" cy="10" r="3" fill="#a8bbff"/>
            <rect x="45" y="10" width="2" height="10" rx="1" fill="#95a9ff"/>
            <circle cx="46" cy="10" r="3" fill="#a8bbff"/>
            <circle cx="26" cy="33" r="4" fill="#0d1b3d" opacity="0.9"/>
            <circle cx="38" cy="33" r="4" fill="#0d1b3d" opacity="0.9"/>
            <rect x="28" y="41" width="8" height="2" rx="1" fill="#0d1b3d" opacity="0.8"/>
          </svg>
          <h1 class="title">Killzone Bot</h1>
        </div>
        <p>Smart reminder system for ICT trading</p>
        <div class="status is-active">
          <span class="label">BOT ACTIVE</span>
        </div>
      </header>

      <section class="features">
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          <h3>Automatic Reminders</h3>
          <p>Receive automated messages during killzone windows on weekdays. Never miss key opportunities.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3>10-Minute Warning</h3>
          <p>Get alerted 10 minutes before a killzone starts so you can prepare and act on time.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3>Telegram Commands</h3>
          <p>Control schedules and check bot status easily via Telegram.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <h3>New York Timezone</h3>
          <p>Timezone-aware messaging aligned with New York trading hours.</p>
        </div>
      </section>

      <section class="killzone-times">
        <h2>Killzone Times (New York Time)</h2>
        <div id="times" class="time-grid"></div>
      </section>

      <section class="commands">
        <h2>Telegram Commands</h2>
        <div class="command-list">
          <div class="command-item">
            <code>/start</code>
            <p>Start the bot</p>
          </div>
          <div class="command-item">
            <code>/killzones</code>
            <p>List all killzone times</p>
          </div>
          <div class="command-item">
            <code>/next</code>
            <p>Show the next killzone window</p>
          </div>
          <div class="command-item">
            <code>/status</code>
            <p>Check current bot status</p>
          </div>
        </div>
      </section>

      <section class="how-it-works">
        <h2>How Killzone Bot Works</h2>
        <div class="workflow-grid">
          <div class="workflow-step">
            <div class="step-number">1</div>
            <h3>Session Detection</h3>
            <p>Bot continuously monitors global market sessions and identifies optimal trading windows based on high volatility periods.</p>
          </div>
          <div class="workflow-step">
            <div class="step-number">2</div>
            <h3>Smart Alerts</h3>
            <p>Automated notifications are sent 10 minutes before each killzone session, ensuring you're prepared for market opportunities.</p>
          </div>
          <div class="workflow-step">
            <div class="step-number">3</div>
            <h3>Real-time Updates</h3>
            <p>Live status updates and session tracking provide real-time information about active trading windows and market conditions.</p>
          </div>
          <div class="workflow-step">
            <div class="step-number">4</div>
            <h3>Performance Tracking</h3>
            <p>Monitor your trading performance during killzone sessions with detailed analytics and session history.</p>
          </div>
        </div>
      </section>

      <section class="upcoming-features">
        <h2>Upcoming Features</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
              </svg>
            </div>
            <h3>Advanced Analytics</h3>
            <p>Detailed performance metrics and session analysis with historical data visualization.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
            </div>
            <h3>Custom Alerts</h3>
            <p>Personalized notification settings and custom alert preferences for different market conditions.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="M9 9h1v6H9z"/>
                <path d="M12 12h1v3h-1z"/>
                <path d="M15 6h1v12h-1z"/>
              </svg>
            </div>
            <h3>Market Insights</h3>
            <p>Real-time market analysis and trading recommendations during active killzone sessions.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.75 17.25l-1.5-1.5L9 16.5"/>
                <path d="M14.25 17.25l-1.5-1.5L14 16.5"/>
                <path d="M9.75 12.75l-1.5-1.5L9 12"/>
                <path d="M14.25 12.75l-1.5-1.5L14 12"/>
                <path d="M9.75 8.25l-1.5-1.5L9 7.5"/>
                <path d="M14.25 8.25l-1.5-1.5L14 7.5"/>
                <path d="M3 6h18"/>
                <path d="M3 12h18"/>
                <path d="M3 18h18"/>
              </svg>
            </div>
            <h3>AI Integration</h3>
            <p>Machine learning algorithms for improved session prediction and market trend analysis.</p>
          </div>
        </div>
      </section>

      <section class="social-links">
        <h2>Connect With Us</h2>
        <div class="social-grid">
          <div class="social-card">
            <div class="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <path d="M13 8H7"/>
                <path d="M17 12H7"/>
              </svg>
            </div>
            <h3>Telegram</h3>
            <p>Join our community for updates and discussions</p>
            <a href="https://t.me/yagizxx1" target="_blank" rel="noopener noreferrer" class="social-link">Join Group</a>
          </div>
          <div class="social-card">
            <div class="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-1.94-2.61c-.9-.38.07-.38.07-.38h1.69m-13.5 4.31c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V9.31c0-1.1-.9-2-2-2H7.5a2 2 0 0 0-2 2v10.38Z"/>
              </svg>
            </div>
            <h3>GitHub</h3>
            <p>Check out our open source projects</p>
            <a href="https://github.com/AlgoWolfx" target="_blank" rel="noopener noreferrer" class="social-link">View Projects</a>
          </div>
          <div class="social-card">
            <div class="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <h3>Website</h3>
            <p>Visit our main website for more info</p>
            <a href="https://algowolf.vercel.app/" target="_blank" rel="noopener noreferrer" class="social-link">Visit Site</a>
          </div>
          <div class="social-card">
            <div class="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </div>
            <h3>Twitter</h3>
            <p>Follow us for latest updates</p>
            <a href="https://x.com/GeraltxG" target="_blank" rel="noopener noreferrer" class="social-link">Follow</a>
          </div>
          <div class="social-card">
            <div class="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3>Email</h3>
            <p>Get in touch with us directly</p>
            <a href="mailto:contact@algowolf.com" class="social-link">Send Email</a>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="credit-pill">
          <svg class="aw-logo" viewBox="0 0 24 24" aria-hidden="true" role="img">
            <defs>
              <linearGradient id="aw-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#00e7f3"/>
                <stop offset="100%" stop-color="#7d59ff"/>
              </linearGradient>
            </defs>
            <path fill="url(#aw-g)" d="M12 2l2.2 4.5 4.9.7-3.6 3.5.9 4.9L12 13.8 7.6 15.6l.9-4.9L4.9 7.2l4.9-.7L12 2z" opacity="0.9"/>
          </svg>
          <p class="credit">Made by <a class="name" href="https://algowolf.vercel.app/" target="_blank" rel="noopener noreferrer">AlgoWolf</a></p>
        </div>
      </footer>
    </div>
  `;
}

render();

// Static killzone times (New York / ET)
(() => {
  const killzones = [
    { title: 'Asia Killzone', start: '20:00', end: '00:00' },
    { title: 'London Killzone', start: '02:00', end: '05:00' },
    { title: 'New York AM', start: '09:30', end: '12:00' },
    { title: 'New York Lunch', start: '12:00', end: '13:00' },
    { title: 'New York PM', start: '13:30', end: '16:00' }
  ];

  const timesRoot = document.getElementById('times');
  if (!timesRoot) return;

  const now = new Date();
  const nyOpts = { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: false };
  const [h, m] = now.toLocaleTimeString('en-US', nyOpts).split(':').map(Number);
  const nowMinutes = h * 60 + m;
  const toMinutes = t => {
    const [hh, mm] = t.split(':').map(Number);
    return (hh * 60 + mm);
  };
  const isActive = (s) => {
    const start = toMinutes(s.start);
    let end = toMinutes(s.end);
    if (end === 0) end = 24 * 60;
    if (end < start) {
      return nowMinutes >= start || nowMinutes < end;
    }
    return nowMinutes >= start && nowMinutes <= end;
  };

  timesRoot.innerHTML = killzones.map(s => `
    <div class="time-item ${isActive(s) ? 'active' : ''}">
      <h4>${s.title}</h4>
      <p class="time-range">${s.start} – ${s.end} ET</p>
      ${isActive(s) ? '<div class="live-badge">LIVE</div>' : ''}
    </div>
  `).join('');
})();

// =========================
// HD Starfield Background
// =========================
(() => {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const config = {
    density: 0.12, // stars per 1000 px^2
    maxSpeed: 0.25, // base speed
    twinkleSpeed: 0.015,
    parallax: 0.02,
    hueBase: 220, // bluish-purple range
    hueVariance: 40,
    sizeMin: 0.6,
    sizeMax: 1.8,
    depthLayers: 3,
  };

  let width = 0; let height = 0; let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  let stars = [];
  let mouseX = 0, mouseY = 0; // normalized -0.5..0.5

  const rand = (min, max) => Math.random() * (max - min) + min;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createStars();
  }

  function createStars() {
    const areaK = (width * height) / 1000;
    const count = Math.floor(areaK * config.density);
    stars = new Array(count).fill(0).map(() => createStar());
  }

  function createStar() {
    const depth = Math.floor(rand(0, config.depthLayers)); // 0..depthLayers-1
    const depthFactor = 1 + depth * 0.6; // deeper = faster and larger
    const hue = config.hueBase + rand(-config.hueVariance, config.hueVariance);
    return {
      x: rand(0, width),
      y: rand(0, height),
      size: rand(config.sizeMin, config.sizeMax) * (1 + depth * 0.25),
      speedX: rand(-config.maxSpeed, config.maxSpeed) * depthFactor,
      speedY: rand(config.maxSpeed * 0.2, config.maxSpeed) * depthFactor,
      phase: Math.random() * Math.PI * 2,
      depth,
      hue,
    };
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i += 1) {
      const s = stars[i];

      // Parallax drift with pointer influence
      const px = (mouseX) * config.parallax * (s.depth + 1);
      const py = (mouseY) * config.parallax * (s.depth + 1);

      s.x += s.speedX + px;
      s.y += s.speedY + py;

      // Wrap around edges
      if (s.x < -5) s.x = width + 5;
      if (s.x > width + 5) s.x = -5;
      if (s.y > height + 5) {
        s.y = -5;
        s.x = rand(0, width);
      }

      // Twinkle
      s.phase += config.twinkleSpeed + (s.depth * 0.002);
      const twinkle = 0.6 + Math.sin(s.phase) * 0.4; // 0.2..1.0

      // Draw
      const radius = s.size;
      const alpha = 0.35 + twinkle * 0.65; // 0.35..1.0
      const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius * 3);
      gradient.addColorStop(0, `hsla(${s.hue}, 80%, 90%, ${alpha})`);
      gradient.addColorStop(0.5, `hsla(${s.hue}, 80%, 70%, ${alpha * 0.6})`);
      gradient.addColorStop(1, `hsla(${s.hue}, 90%, 60%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  function onPointerMove(e) {
    const x = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? width / 2;
    const y = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY) ?? height / 2;
    mouseX = (x / width) - 0.5;
    mouseY = (y / height) - 0.5;
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  resize();
  requestAnimationFrame(step);
})();

