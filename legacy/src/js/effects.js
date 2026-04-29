/* ═════════════════════════════════════════ */
/* WEB AUDIO API - SOUND EFFECTS */
/* ═════════════════════════════════════════ */
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundEnabled = localStorage.getItem("soundEnabled") !== "false";

function playTone(frequency, duration = 100, type = "sine", volume = 0.1) {
  if (!soundEnabled || audioContext.state === "suspended") return;
  
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.frequency.value = frequency;
  osc.type = type;
  
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);
  
  osc.start(now);
  osc.stop(now + duration / 1000);
}

function playBeep() { playTone(800, 80, "sine", 0.08); }
function playSelect() { playTone(600, 120, "sine", 0.1); }
function playDiskSeek() { playTone(400, 60, "square", 0.06); }
function playLoad() { playTone(1200, 150, "sine", 0.08); }
function playSuccess() { 
  playTone(800, 100, "sine", 0.08);
  setTimeout(() => playTone(1000, 100, "sine", 0.08), 120);
}

function playBootSound() {
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.value = 800;
    osc.type = "sine";
    
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.1);
  } catch (e) {}
}

function playClickSound() {
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.value = 600;
    osc.type = "sine";
    
    gain.gain.setValueAtTime(0.05, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.05);
  } catch (e) {}
}

/* ═════════════════════════════════════════ */
/* TERMINAL TYPING EFFECTS */
/* ═════════════════════════════════════════ */
function typeText(el, text, speed = 30) {
  return new Promise((resolve) => {
    if (!el) {
      resolve();
      return;
    }
    el.textContent = "";
    let i = 0;
    const type = () => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i += 1;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    };
    type();
  });
}

/* ═════════════════════════════════════════ */
/* QUOTES & ASCII EFFECTS */
/* ═════════════════════════════════════════ */
const quotes = [
  '"I like systems more than surfaces."',
  '"Frontend scares me less now."',
  '"One day I will finish Rust."',
  '"Breaking things to understand them."',
  '"Low-level > high-level."',
  '"Why buy new when you can revive old?"',
  '"Consistency > brilliance."',
  '"Building discipline, shipping projects."'
];

let currentQuoteIndex = 0;

/* ═════════════════════════════════════════ */
/* KONAMI CODE & EASTER EGGS */
/* ═════════════════════════════════════════ */
const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateKonamiMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateKonamiMode() {
  playSuccess();
  document.body.classList.add("konami-mode");
  
  const msg = document.createElement("div");
  msg.className = "konami-message";
  msg.innerHTML = "<h1>GOD MODE ACTIVATED</h1><p>System stability at 100%</p>";
  document.body.appendChild(msg);
  
  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 1000);
  }, 3000);
}

function _rotateQuote() {
  const quoteEl = document.getElementById('rotatingQuote');
  if (!quoteEl) return;
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  quoteEl.textContent = quotes[currentQuoteIndex];
  quoteEl.style.animation = 'none';
  setTimeout(() => {
    quoteEl.style.animation = 'fadeInQuote 0.8s ease-out';
  }, 10);
}

// Expose to window
window.playBeep = playBeep;
window.playSelect = playSelect;
window.playDiskSeek = playDiskSeek;
window.playLoad = playLoad;
window.playSuccess = playSuccess;
window.playBootSound = playBootSound;
window.playClickSound = playClickSound;
window.typeText = typeText;
window.rotateQuote = _rotateQuote;
window.soundEnabled = soundEnabled;
