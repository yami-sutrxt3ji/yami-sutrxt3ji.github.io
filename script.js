let unlocked = false;
let currentSection = "start";
const historyStack = [];

/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE STATE */
/* ═════════════════════════════════════════ */
let bootComplete = false;
let biosMenuIndex = 0;
let bootInProgress = false;
let bootSkipped = false;

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

/* ═════════════════════════════════════════ */
/* BOOT STATE PERSISTENCE */
/* ═════════════════════════════════════════ */
function hasBootedBefore() {
  return localStorage.getItem("bootCompleted") === "true";
}

function markBootAsCompleted() {
  localStorage.setItem("bootCompleted", "true");
  localStorage.setItem("lastBootTime", new Date().toISOString());
}

function resetBootState() {
  localStorage.removeItem("bootCompleted");
  localStorage.removeItem("lastBootTime");
}

const player = {
  name: "ASHISH",
  level: 2,
  focus: 2,
  curiosity: 10,
  xp: 120,
};

let mode = "pong";
let score = 0;
let highScore = Number(localStorage.getItem("highScore") || 0);
let scoreTick = 0;
const contactEmail = "gator77@t3jiyami.page";
let terminalSequenceToken = 0;
let selectedMission = "kenkoDetail";
const missionConfig = {
  kenkoDetail: { xp: 50, mode: null, unlockedTitle: "KENKO_AAHARA" },
  mission02Detail: { xp: 150, mode: "shooter", unlockedTitle: "NUTRI_TRACE" },
  mission03Detail: { xp: 260, mode: "shooter", unlockedTitle: "UNKNOWN_SIGNAL" },
};
const missionUnlockState = {
  mission02Detail: false,
  mission03Detail: false,
};

/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE FUNCTIONS - MULTI-STAGE */
/* ═════════════════════════════════════════ */

async function startBootSequence() {
  bootInProgress = true;
  
  // Stage 1: Power On (1s)
  await powerOnSequence();
  
  // Stage 2: Diagnostics (2s)
  await diagnosticsSequence();
  
  // Stage 3: Bootloader Menu (user waits here)
  // biosMenuConfirm() will call diskSeekSequence()
  showBootloaderMenu();
}

async function powerOnSequence() {
  const powerOnScreen = document.getElementById("power-on");
  if (!powerOnScreen) return;
  
  powerOnScreen.classList.add("active");
  playBeep(); // Initial power beep
  
  return new Promise(resolve => {
    setTimeout(() => {
      powerOnScreen.classList.remove("active");
      resolve();
    }, 1000);
  });
}

async function diagnosticsSequence() {
  const diagScreen = document.getElementById("diagnostics");
  if (!diagScreen) return;
  
  diagScreen.classList.add("active");
  
  // Let CSS animations handle the scrolling
  return new Promise(resolve => {
    setTimeout(() => {
      diagScreen.classList.remove("active");
      resolve();
    }, 2000);
  });
}

function showBootloaderMenu() {
  const biosScreen = document.getElementById("bios");
  if (biosScreen) {
    biosScreen.classList.add("active");
  }
}

function biosMenuUp() {
  biosMenuIndex = (biosMenuIndex - 1 + 3) % 3;
  updateBiosMenuDisplay();
  playBeep();
}

function biosMenuDown() {
  biosMenuIndex = (biosMenuIndex + 1) % 3;
  updateBiosMenuDisplay();
  playBeep();
}

function biosMenuConfirm() {
  if (bootInProgress) return;
  bootInProgress = true;
  playSelect();
  transitionToDiskSeek();
}

function updateBiosMenuDisplay() {
  const items = document.querySelectorAll(".bios-menu-item");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === biosMenuIndex);
  });
}

function transitionToDiskSeek() {
  const biosScreen = document.getElementById("bios");
  if (biosScreen) {
    biosScreen.classList.remove("active");
  }
  setTimeout(() => {
    playDiskLoadingSequence();
  }, 300);
}

async function playDiskLoadingSequence() {
  const loadingScreen = document.getElementById("disk-loading");
  if (loadingScreen) {
    loadingScreen.classList.add("active");
  }
  
  const logLines = [
    "> Mounting /dev/self...",
    "> Reading partition: /dev/ideas1",
    "> Scanning sectors: building personality traits...",
    "> Loading passion modules...",
    "> Compiling core identity..."
  ];
  
  const progressFill = document.querySelector(".progress-fill");
  const progressText = document.querySelector(".progress-text");
  const logElements = document.querySelectorAll("#disk-loading .log-line");
  
  if (!progressFill) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    
    // Play disk seek sounds during loading
    if (progress % 20 < 5) playDiskSeek();
    
    if (progressFill) progressFill.style.width = progress + "%";
    if (progressText) progressText.textContent = `PROGRESS: ${Math.floor(progress)}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      playLoad();
      setTimeout(() => {
        playAsciiReveal();
      }, 500);
    }
  }, 200);
  
  for (let i = 0; i < logElements.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 300 + i * 400));
    if (logElements[i]) {
      logElements[i].textContent = logLines[i] || "";
      playDiskSeek();
    }
  }
}

async function playAsciiReveal() {
  const loadingScreen = document.getElementById("disk-loading");
  const bannerScreen = document.getElementById("ascii-banner");
  const mainStack = document.getElementById("main-ui-stack");
  
  if (!loadingScreen || !bannerScreen) return;
  
  loadingScreen.classList.remove("active");
  bannerScreen.classList.add("active");
  
  playSuccess();
  
  const bannerLines = document.querySelectorAll(".banner-line");
  const bannerMessages = [
    "ASHISH.EXE LOADED",
    "Traits enumerated.",
    "Ready for interaction.",
    "> Transitioning to main interface..."
  ];
  
  for (let i = 0; i < bannerLines.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 600));
    await typeText(bannerLines[i], bannerMessages[i], 15);
    playBeep();
  }
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  bannerScreen.classList.remove("active");
  if (mainStack) {
    mainStack.classList.add("active");
  }
  
  setTimeout(() => {
    initMainUIAfterBoot();
  }, 100);
}

function initMainUIAfterBoot() {
  bootComplete = true;
  markBootAsCompleted();
  updateSoundToggle();
  const startScreen = document.getElementById("start");
  if (startScreen) {
    startScreen.classList.add("active");
  }
  setActiveNav("start");
  updateHUD();
  resizeCanvas();
  gameLoop();
}

/* ═════════════════════════════════════════ */
/* END BOOT SEQUENCE */
/* ═════════════════════════════════════════ */

function toggleSound() {
  const newState = soundEnabled ? "false" : "true";
  localStorage.setItem("soundEnabled", newState);
  location.reload();
}

function updateSoundToggle() {
  const btn = document.getElementById("soundToggle");
  if (btn) {
    btn.textContent = soundEnabled ? "[ 🔊 ON ]" : "[ 🔇 OFF ]";
  }
}

function updateHUD() {
  const hudPlayer = document.getElementById("hudPlayer");
  const hudLvl = document.getElementById("hudLvl");
  const hudFocus = document.getElementById("hudFocus");
  const hudXP = document.getElementById("hudXP");
  const hudMode = document.getElementById("hudMode");
  const hudScore = document.getElementById("hudScore");
  const hudHigh = document.getElementById("hudHigh");

  if (!hudPlayer || !hudLvl || !hudFocus || !hudXP || !hudMode || !hudScore || !hudHigh) {
    return;
  }

  hudPlayer.textContent = `PLAYER: ${player.name}`;
  hudLvl.textContent = `LVL: ${player.level}`;
  hudFocus.textContent = `FOCUS: ${player.focus}/10`;
  hudXP.textContent = `XP: ${player.xp}`;
  hudMode.textContent = `MODE: ${mode.toUpperCase()}`;
  hudScore.textContent = `SCORE: ${score}`;
  hudHigh.textContent = `HIGH: ${highScore}`;
}

function gainXP(amount) {
  player.xp += amount;
  player.level = Math.max(2, Math.floor(player.xp / 100) + 1);
  checkUnlock();
  updateHUD();
}

function updateScore(amount = 1) {
  score += amount;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", String(highScore));
  }
  checkUnlock();
  updateHUD();
}

function checkUnlock() {
  const gems = document.getElementById("gems");
  if (gems) {
    gems.hidden = highScore <= 50;
  }
  updateMissionUnlocks();
}

function setActiveNav(id) {
  document.querySelectorAll(".nav-btn[data-target]").forEach((button) => {
    button.classList.toggle("active-nav", button.dataset.target === id);
  });
}

function openSection(id, pushHistory = true) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  if (pushHistory && currentSection && currentSection !== id) {
    historyStack.push(currentSection);
  }

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  target.classList.add("active");
  target.classList.remove("section-glitch");
  void target.offsetWidth;
  target.classList.add("section-glitch");
  currentSection = id;
  setActiveNav(id);
  if (id === "projects") {
    updateMissionUnlocks();
    const selectedCard = document.querySelector(`.mission-node[data-mission="${selectedMission}"]`);
    if (selectedCard && selectedCard.classList.contains("locked")) {
      selectedMission = "kenkoDetail";
    }
    openMission(selectedMission);
  }
  if (id === "terminal") {
    playTerminalSequence();
  }
}

function navigateTo(id) {
  if (id === "projects" && (!unlocked || player.xp < 50)) {
    alert("LOCKED. PRESS START.");
    return;
  }
  openSection(id);
  gainXP(2);
}

function goBack() {
  const previous = historyStack.pop();
  if (!previous) {
    openSection("start", false);
    return;
  }
  openSection(previous, false);
}

function startGame() {
  unlocked = true;
  gainXP(5);
  navigateTo("profile");
}

function toggleMode() {
  mode = mode === "pong" ? "shooter" : "pong";
  score = 0;
  checkUnlock();
  updateHUD();
}

function changeAvatar() {
  const avatarInput = document.getElementById("avatarInput");
  if (avatarInput) {
    avatarInput.click();
  }
}

function loadSavedAvatar() {
  const avatar = document.getElementById("avatar");
  const saved = localStorage.getItem("avatar");
  if (avatar && saved) {
    avatar.src = saved;
  }

  const avatarInput = document.getElementById("avatarInput");
  if (!avatarInput || !avatar) {
    return;
  }

  avatarInput.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) {
        return;
      }
      avatar.src = result;
      localStorage.setItem("avatar", result);
    };
    reader.readAsDataURL(file);
  });
}

function updateMissionUnlocks() {
  const missionTwoCard = document.getElementById("mission02Card");
  const missionThreeCard = document.getElementById("mission03Card");
  if (!missionTwoCard || !missionThreeCard) {
    return;
  }

  const missionTwoState = getMissionState("mission02Detail");
  const missionThreeState = getMissionState("mission03Detail");

  setMissionCardState(
    missionTwoCard,
    ".mission-node-title",
    ".mission-node-status",
    missionConfig.mission02Detail.unlockedTitle,
    missionTwoState
  );
  setMissionCardState(
    missionThreeCard,
    ".mission-node3-title",
    ".mission-node3-status",
    missionConfig.mission03Detail.unlockedTitle,
    missionThreeState
  );

  if (!missionUnlockState.mission02Detail && missionTwoState.unlocked) {
    pulseMissionUnlock(missionTwoCard);
  }
  if (!missionUnlockState.mission03Detail && missionThreeState.unlocked) {
    pulseMissionUnlock(missionThreeCard);
  }
  missionUnlockState.mission02Detail = missionTwoState.unlocked;
  missionUnlockState.mission03Detail = missionThreeState.unlocked;
  updateMissionProgress();
}

function openMission(id) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const selectedCard = document.querySelector(`.mission-node[data-mission="${id}"]`);
  if (selectedCard && selectedCard.classList.contains("locked")) {
    alert("MISSION LOCKED. GAIN MORE XP.");
    return;
  }

  document.querySelectorAll(".mission-detail").forEach((panel) => {
    panel.hidden = true;
  });
  target.hidden = false;
  selectedMission = id;

  document.querySelectorAll(".mission-node").forEach((card) => {
    card.classList.toggle("active", card.dataset.mission === id && !card.classList.contains("locked"));
  });
}

function getMissionState(id) {
  const config = missionConfig[id];
  if (!config) {
    return { unlocked: true, progress: 100, modeUnlocked: true, xpUnlocked: true, xp: 0 };
  }
  const progress = Math.min(100, Math.floor((player.xp / config.xp) * 100));
  const xpUnlocked = player.xp >= config.xp;
  const modeUnlocked = !config.mode || mode === config.mode;
  return {
    unlocked: xpUnlocked && modeUnlocked,
    progress,
    xpUnlocked,
    modeUnlocked,
    xp: config.xp,
    mode: config.mode,
  };
}

function setMissionCardState(card, titleSelector, statusSelector, unlockedTitle, state) {
  const title = card.querySelector(titleSelector);
  const status = card.querySelector(statusSelector);
  card.classList.toggle("locked", !state.unlocked);
  if (title) {
    title.textContent = state.unlocked ? unlockedTitle : "LOCKED";
  }
  if (!status) {
    return;
  }
  if (!state.xpUnlocked) {
    status.textContent = `REQUIRES XP ${state.xp}`;
    return;
  }
  if (!state.modeUnlocked) {
    status.textContent = `REQUIRES MODE ${String(state.mode || "").toUpperCase()}`;
    return;
  }
  status.textContent = "STATUS: UNLOCKED";
}

function pulseMissionUnlock(card) {
  card.classList.remove("unlocked-flash");
  void card.offsetWidth;
  card.classList.add("unlocked-flash");
}

function setProgressBar(fillId, textId, value) {
  const fill = document.getElementById(fillId);
  const label = document.getElementById(textId);
  if (fill) {
    fill.style.width = `${value}%`;
  }
  if (label) {
    label.textContent = `PROGRESS: ${value}%`;
  }
}

function updateMissionProgress() {
  setProgressBar("mission01Progress", "mission01ProgressText", getMissionState("kenkoDetail").progress);
  setProgressBar("mission02Progress", "mission02ProgressText", getMissionState("mission02Detail").progress);
  setProgressBar("mission03Progress", "mission03ProgressText", getMissionState("mission03Detail").progress);
}

function syncMissionMode() {
  const config = missionConfig[selectedMission];
  if (!config || !config.mode) {
    alert("CURRENT MISSION RUNS ON ANY MODE.");
    return;
  }
  if (mode === config.mode) {
    alert("MODE ALREADY SYNCED.");
    return;
  }
  mode = config.mode;
  score = 0;
  checkUnlock();
  updateHUD();
  alert(`MODE SYNCED: ${config.mode.toUpperCase()}`);
}

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

async function playTerminalSequence() {
  terminalSequenceToken += 1;
  const token = terminalSequenceToken;
  const terminalLog = document.getElementById("terminalLog");
  const terminalSignal = document.getElementById("terminalSignal");
  const terminalStatus = document.getElementById("terminalStatus");
  const contactEl = document.getElementById("contactEmail");
  if (contactEl) {
    contactEl.textContent = contactEmail;
  }

  await typeText(terminalLog, "> establishing connection...", 24);
  if (token !== terminalSequenceToken) return;
  await typeText(terminalSignal, "> routing signal...", 24);
  if (token !== terminalSequenceToken) return;
  await typeText(terminalStatus, "✔ secure link established", 24);
}

function copyEmail() {
  navigator.clipboard
    .writeText(contactEmail)
    .then(() => {
      alert("Copied to clipboard ⚡");
    })
    .catch(() => {
      alert("Clipboard blocked. Copy manually: gator77@t3jiyami.page");
    });
}

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas ? gameCanvas.getContext("2d") : null;
const ball = { x: 240, y: 180, dx: 2, dy: 2, r: 6 };
const paddle = { x: 20, y: 140, w: 12, h: 90 };
const shooter = {
  shipX: 320,
  bullets: [],
  enemies: [],
  tick: 0,
};

function resizeCanvas() {
  if (!gameCanvas) return;
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;
}

function drawPong() {
  if (!gameCanvas || !ctx) return;
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y - ball.r <= 0 || ball.y + ball.r >= gameCanvas.height) {
    ball.dy *= -1;
  }
  if (ball.x + ball.r >= gameCanvas.width || ball.x - ball.r <= 0) {
    ball.dx *= -1;
  }

  if (
    ball.x - ball.r <= paddle.x + paddle.w &&
    ball.y >= paddle.y &&
    ball.y <= paddle.y + paddle.h
  ) {
    ball.dx = Math.abs(ball.dx);
    gainXP(1);
    updateScore(2);
  }

  ctx.fillStyle = "#00e5ff";
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#ff4b81";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();
}

function drawShooter() {
  if (!gameCanvas || !ctx) return;
  shooter.tick += 1;
  if (shooter.tick % 24 === 0) {
    shooter.bullets.push({ x: shooter.shipX + 12, y: gameCanvas.height - 44 });
  }
  if (shooter.tick % 38 === 0) {
    shooter.enemies.push({
      x: Math.random() * (gameCanvas.width - 24) + 8,
      y: -20,
    });
  }

  shooter.bullets.forEach((bullet) => {
    bullet.y -= 6;
  });
  shooter.enemies.forEach((enemy) => {
    enemy.y += 2;
  });

  shooter.bullets = shooter.bullets.filter((b) => b.y > -10);
  shooter.enemies = shooter.enemies.filter((e) => e.y < gameCanvas.height + 20);

  shooter.bullets.forEach((bullet) => {
    shooter.enemies = shooter.enemies.filter((enemy) => {
      const hit = Math.abs(bullet.x - enemy.x) < 10 && Math.abs(bullet.y - enemy.y) < 10;
      if (hit) {
        gainXP(2);
        updateScore(3);
      }
      return !hit;
    });
  });

  ctx.fillStyle = "#b4ff9f";
  ctx.fillRect(shooter.shipX, gameCanvas.height - 30, 24, 10);
  ctx.fillStyle = "#fff3b0";
  shooter.bullets.forEach((bullet) => ctx.fillRect(bullet.x, bullet.y, 3, 8));
  ctx.fillStyle = "#7b61ff";
  shooter.enemies.forEach((enemy) => ctx.fillRect(enemy.x, enemy.y, 12, 12));
}

function gameLoop() {
  if (!bootComplete || !gameCanvas || !ctx) return;
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  scoreTick += 1;
  if (scoreTick % 60 === 0) {
    updateScore(1);
  }
  if (mode === "pong") {
    drawPong();
  } else {
    drawShooter();
  }
  requestAnimationFrame(gameLoop);
}

document.addEventListener("mousemove", (event) => {
  paddle.y = event.clientY - paddle.h / 2;
  paddle.y = Math.max(0, Math.min(gameCanvas.height - paddle.h, paddle.y));
  shooter.shipX = Math.max(0, Math.min(gameCanvas.width - 24, event.clientX - 12));
});

window.addEventListener("resize", resizeCanvas);

window.startGame = startGame;
window.openSection = openSection;
window.navigateTo = navigateTo;
window.goBack = goBack;
window.toggleMode = toggleMode;
window.gainXP = gainXP;
window.changeAvatar = changeAvatar;
window.copyEmail = copyEmail;
window.openMission = openMission;
window.syncMissionMode = syncMissionMode;
window.biosMenuUp = biosMenuUp;
window.biosMenuDown = biosMenuDown;
window.biosMenuConfirm = biosMenuConfirm;

loadSavedAvatar();

/* ═════════════════════════════════════════ */
/* BOOT SKIP LOGIC - CHECK IF ALREADY BOOTED */
/* ═════════════════════════════════════════ */
if (hasBootedBefore()) {
  // Skip boot sequence for returning visitors
  bootInProgress = true;
  
  // Hide all boot screens instantly
  const biosScreen = document.getElementById("bios");
  const loadingScreen = document.getElementById("disk-loading");
  const bannerScreen = document.getElementById("ascii-banner");
  
  if (biosScreen) biosScreen.classList.remove("active");
  if (loadingScreen) loadingScreen.classList.remove("active");
  if (bannerScreen) bannerScreen.classList.remove("active");
  
  // Show main UI
  const mainStack = document.getElementById("main-ui-stack");
  if (mainStack) mainStack.classList.add("active");
  
  // Initialize after 1s for smooth appearance
  setTimeout(() => {
    initMainUIAfterBoot();
  }, 1000);
}

/* KEYBOARD LISTENERS FOR BIOS NAVIGATION */
document.addEventListener("keydown", (event) => {
  // ESC key can also skip boot (and toggle sound)
  if (event.key === "Escape") {
    event.preventDefault();
    if (!bootComplete && !bootInProgress) {
      // Instant skip to main UI
      bootInProgress = true;
      const biosScreen = document.getElementById("bios");
      const loadingScreen = document.getElementById("disk-loading");
      const bannerScreen = document.getElementById("ascii-banner");
      const mainStack = document.getElementById("main-ui-stack");
      
      if (biosScreen) biosScreen.classList.remove("active");
      if (loadingScreen) loadingScreen.classList.remove("active");
      if (bannerScreen) bannerScreen.classList.remove("active");
      if (mainStack) mainStack.classList.add("active");
      
      markBootAsCompleted();
      bootSkipped = true;
      setTimeout(() => {
        initMainUIAfterBoot();
      }, 300);
    } else if (bootComplete) {
      // Toggle sound when boot is complete
      const newSoundState = soundEnabled ? "false" : "true";
      localStorage.setItem("soundEnabled", newSoundState);
      console.log("🔊 Sound:", newSoundState === "false" ? "OFF" : "ON");
    }
  }
  
  if (!bootComplete && !bootInProgress) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      biosMenuUp();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      biosMenuDown();
    } else if (event.key === "Enter") {
      event.preventDefault();
      biosMenuConfirm();
    }
  }
});

/* INITIAL SETUP */
resizeCanvas();
updateBiosMenuDisplay();

/* START BOOT SEQUENCE (will initialize main UI when complete) */
console.log("Boot sequence starting...");
console.log("💡 Tip: Press ESC to skip boot or toggle sound");

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    if (bootComplete) {
      gainXP(1);
    }
  });
});
