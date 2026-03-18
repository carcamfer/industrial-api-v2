/**
 * easter-eggs.js — Visitantes espaciales aleatorios
 * Cometas, nave espacial y robot aparecen sorpresivamente en todas las páginas.
 */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── Styles ── */
  const css = document.createElement('style');
  css.textContent = `
    .eg-visitor {
      position: fixed;
      z-index: 99999;
      pointer-events: none;
      will-change: transform, opacity;
    }

    /* COMET */
    @keyframes eg-comet {
      from { transform: translate(0, 0);           opacity: 1; }
      80%  {                                        opacity: 0.9; }
      to   { transform: translate(-130vw, 55vh);   opacity: 0; }
    }
    .eg-comet-body {
      width: 220px;
      height: 3px;
      background: linear-gradient(to left, transparent 0%, #a78bfa 60%, #ffffff 100%);
      border-radius: 999px;
      box-shadow: 0 0 8px #764DF0, 0 0 22px #a78bfa;
      transform: rotate(-32deg);
      transform-origin: right center;
    }
    .eg-comet-body::after {
      content: '';
      position: absolute;
      left: -5px;
      top: -4px;
      width: 11px;
      height: 11px;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 6px #fff, 0 0 16px #a78bfa, 0 0 30px #764DF0;
    }
    .eg-comet-trail {
      position: absolute;
      left: -1px;
      top: -8px;
      width: 80px;
      height: 19px;
      background: radial-gradient(ellipse at left, rgba(167,139,250,0.25) 0%, transparent 70%);
      transform: rotate(-32deg);
      transform-origin: left center;
    }

    /* SPACESHIP */
    @keyframes eg-ship {
      from { transform: translateX(-160px); }
      to   { transform: translateX(calc(100vw + 160px)); }
    }
    @keyframes eg-ship-bob {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-7px); }
    }
    @keyframes eg-flame {
      0%, 100% { transform: scaleX(1) scaleY(1);    opacity: 1; }
      50%       { transform: scaleX(0.65) scaleY(0.8); opacity: 0.7; }
    }
    .eg-ship-inner {
      animation: eg-ship-bob 1.4s ease-in-out infinite;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .eg-flames {
      display: flex;
      gap: 6px;
      margin-top: -4px;
      justify-content: center;
    }
    .eg-flame {
      width: 7px;
      height: 14px;
      background: linear-gradient(to bottom, #FF5722, #ffaa00, transparent);
      border-radius: 0 0 50% 50%;
      animation: eg-flame 0.12s ease-in-out infinite alternate;
    }
    .eg-flame:nth-child(2) { animation-delay: 0.06s; height: 10px; opacity: 0.8; }

    /* ROBOT */
    @keyframes eg-robot-walk {
      from { transform: translateX(-120px); }
      to   { transform: translateX(calc(100vw + 120px)); }
    }
    @keyframes eg-robot-bob {
      from { transform: translateY(0); }
      to   { transform: translateY(-5px); }
    }
    @keyframes eg-eye-blink {
      0%, 90%, 100% { transform: scaleY(1); }
      95%            { transform: scaleY(0.15); }
    }
    .eg-robot-inner {
      animation: eg-robot-bob 0.45s ease-in-out infinite alternate;
    }
    .eg-robot-eye {
      animation: eg-eye-blink 3s ease-in-out infinite;
      transform-origin: center;
    }

    /* ASTEROID */
    @keyframes eg-asteroid {
      from { transform: translate(0, 0) rotate(0deg);           opacity: 1; }
      85%  {                                                      opacity: 0.8; }
      to   { transform: translate(-110vw, 45vh) rotate(720deg); opacity: 0; }
    }
    @keyframes eg-asteroid-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(css);

  /* ── Helpers ── */
  function rnd(min, max) { return Math.random() * (max - min) + min; }
  function rndInt(min, max) { return Math.floor(rnd(min, max + 1)); }

  /* ── Spawners ── */

  function spawnComet() {
    const el = document.createElement('div');
    el.className = 'eg-visitor';
    el.style.top  = rnd(2, 45) + 'vh';
    el.style.left = '105vw';
    const dur = rnd(1.8, 3.2).toFixed(2);
    el.style.animation = `eg-comet ${dur}s ease-in forwards`;

    el.innerHTML = `
      <div class="eg-comet-trail"></div>
      <div class="eg-comet-body"></div>
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }

  function spawnShip() {
    const el = document.createElement('div');
    el.className = 'eg-visitor';
    el.style.top  = rnd(8, 65) + 'vh';
    el.style.left = '0';
    const dur = rnd(4.5, 8).toFixed(2);
    el.style.animation = `eg-ship ${dur}s linear forwards`;

    el.innerHTML = `
      <div class="eg-ship-inner">
        <svg width="96" height="51" viewBox="0 0 64 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 8px #764DF0) drop-shadow(0 0 18px rgba(139,92,246,0.6))">
          <!-- wings back -->
          <polygon points="5,18 0,32 22,22" fill="#3b2080"/>
          <polygon points="59,18 64,32 42,22" fill="#3b2080"/>
          <!-- body -->
          <ellipse cx="32" cy="17" rx="24" ry="9" fill="#764DF0"/>
          <!-- cockpit glass -->
          <ellipse cx="36" cy="15" rx="9" ry="6" fill="#a78bfa"/>
          <ellipse cx="37" cy="13.5" rx="5" ry="3.5" fill="#e9e0ff" opacity="0.85"/>
          <!-- wing detail -->
          <line x1="10" y1="18" x2="5"  y2="26" stroke="#9b6dff" stroke-width="1.2" stroke-linecap="round"/>
          <line x1="54" y1="18" x2="59" y2="26" stroke="#9b6dff" stroke-width="1.2" stroke-linecap="round"/>
          <!-- engine glow -->
          <circle cx="14" cy="18" r="3" fill="#FF5722" opacity="0.9"/>
          <circle cx="50" cy="18" r="3" fill="#FF5722" opacity="0.9"/>
          <circle cx="32" cy="20" r="4" fill="#ff7043" opacity="0.8"/>
        </svg>
        <div class="eg-flames">
          <div class="eg-flame"></div>
          <div class="eg-flame"></div>
          <div class="eg-flame"></div>
        </div>
      </div>
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }

  function spawnRobot() {
    const el = document.createElement('div');
    el.className = 'eg-visitor';
    el.style.bottom = rnd(6, 14) + 'px';
    el.style.left   = '0';
    const dur = rnd(7, 12).toFixed(2);
    el.style.animation = `eg-robot-walk ${dur}s linear forwards`;

    el.innerHTML = `
      <div class="eg-robot-inner">
        <svg width="44" height="62" viewBox="0 0 44 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- antenna -->
          <line x1="22" y1="5" x2="22" y2="0" stroke="#FF5722" stroke-width="2" stroke-linecap="round"/>
          <circle cx="22" cy="0" r="3" fill="#FF5722"/>
          <!-- head -->
          <rect x="8" y="5" width="28" height="20" rx="5" fill="#0F1F3D" stroke="#764DF0" stroke-width="1.8"/>
          <!-- left eye -->
          <g class="eg-robot-eye">
            <rect x="11" y="10" width="8" height="6" rx="2" fill="#764DF0"/>
            <rect x="13" y="11" width="4" height="4" rx="1" fill="#c4b5fd"/>
          </g>
          <!-- right eye -->
          <g class="eg-robot-eye" style="animation-delay:0.4s">
            <rect x="25" y="10" width="8" height="6" rx="2" fill="#764DF0"/>
            <rect x="27" y="11" width="4" height="4" rx="1" fill="#c4b5fd"/>
          </g>
          <!-- mouth -->
          <rect x="14" y="20" width="16" height="2.5" rx="1.2" fill="#FF5722" opacity="0.85"/>
          <!-- neck -->
          <rect x="19" y="25" width="6" height="4" rx="1" fill="#0A0F1E"/>
          <!-- body -->
          <rect x="5"  y="29" width="34" height="20" rx="4" fill="#0F1F3D" stroke="#764DF0" stroke-width="1.8"/>
          <!-- chest panel -->
          <rect x="9"  y="33" width="10" height="8" rx="2" fill="#764DF0" opacity="0.4"/>
          <circle cx="28" cy="37" r="4" fill="#FF5722" opacity="0.75"/>
          <circle cx="35" cy="35" r="2.2" fill="#764DF0" opacity="0.6"/>
          <circle cx="35" cy="40" r="2.2" fill="#a78bfa" opacity="0.6"/>
          <!-- left arm -->
          <rect x="0"  y="31" width="6" height="14" rx="3" fill="#0F1F3D" stroke="#764DF0" stroke-width="1.4"/>
          <!-- right arm -->
          <rect x="38" y="31" width="6" height="14" rx="3" fill="#0F1F3D" stroke="#764DF0" stroke-width="1.4"/>
          <!-- left leg -->
          <rect x="10" y="49" width="10" height="11" rx="3" fill="#0F1F3D" stroke="#764DF0" stroke-width="1.4"/>
          <!-- right leg -->
          <rect x="24" y="49" width="10" height="11" rx="3" fill="#0F1F3D" stroke="#764DF0" stroke-width="1.4"/>
          <!-- feet -->
          <rect x="7"  y="57" width="14" height="5" rx="2.5" fill="#764DF0"/>
          <rect x="23" y="57" width="14" height="5" rx="2.5" fill="#764DF0"/>
        </svg>
      </div>
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }

  function spawnAsteroid() {
    const el = document.createElement('div');
    el.className = 'eg-visitor';
    el.style.top  = rnd(5, 55) + 'vh';
    el.style.left = '108vw';
    const dur = rnd(2.5, 4.5).toFixed(2);
    el.style.animation = `eg-asteroid ${dur}s ease-in forwards`;

    const size = rndInt(22, 42);
    el.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,2 28,5 36,12 38,22 34,32 25,38 14,37 6,30 3,20 7,10 14,4"
          fill="#1e1b4b" stroke="#764DF0" stroke-width="1.5"/>
        <circle cx="14" cy="16" r="3" fill="#2d1b69" stroke="#a78bfa" stroke-width="1"/>
        <circle cx="26" cy="26" r="2" fill="#2d1b69" stroke="#a78bfa" stroke-width="0.8"/>
        <circle cx="22" cy="11" r="1.5" fill="#2d1b69" stroke="#764DF0" stroke-width="0.8"/>
      </svg>
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }

  /* ── Weighted pool ── */
  // comets & asteroids more frequent, ship & robot rarer
  const pool = [
    spawnComet, spawnComet, spawnComet,
    spawnAsteroid, spawnAsteroid,
    spawnShip, spawnShip,
    spawnRobot,
  ];

  function scheduleNext() {
    const delay = rnd(14000, 32000);
    setTimeout(() => {
      pool[rndInt(0, pool.length - 1)]();
      scheduleNext();
    }, delay);
  }

  /* First visitor appears quickly to let the user notice the feature */
  setTimeout(() => {
    spawnComet();
    scheduleNext();
  }, rnd(4000, 9000));

  /* Occasional double-appearance for drama */
  setTimeout(() => {
    pool[rndInt(0, pool.length - 1)]();
  }, rnd(20000, 45000));

})();
