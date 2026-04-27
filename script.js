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
    "Initializing UEFI firmware...",
    "Loading kernel: ashish_profile.efi",
    "Mounting /dev/self partition",
    "Reading user modules...",
    "Starting interface manager..."
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
  const bootOverlay = document.getElementById("boot-overlay");
  const mainPortfolio = document.getElementById("main-portfolio");
  
  if (!loadingScreen || !bannerScreen) return;
  
  loadingScreen.classList.remove("active");
  bannerScreen.classList.add("active");
  
  playSuccess();
  
  const bannerLines = document.querySelectorAll(".banner-line");
  const bannerMessages = [
    "ASHISH.EXE LOADED",
    "System integrity verified.",
    "Ready for interaction.",
    "> Transitioning to main interface..."
  ];
  
  for (let i = 0; i < bannerLines.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 600));
    await typeText(bannerLines[i], bannerMessages[i], 15);
    playBeep();
  }
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Fade out boot overlay, fade in main portfolio
  if (bootOverlay) {
    bootOverlay.classList.remove("active");
  }
  if (mainPortfolio) {
    mainPortfolio.classList.add("active");
  }
  
  setTimeout(() => {
    initMainUIAfterBoot();
  }, 100);
}

function initMainUIAfterBoot() {
  bootComplete = true;
  markBootAsCompleted();
  updateSoundToggle();
  
  // Hide boot overlay completely
  const bootOverlay = document.getElementById("boot-overlay");
  if (bootOverlay) {
    bootOverlay.style.display = "none";
  }
  
  // Make sure main portfolio is visible
  const mainPortfolio = document.getElementById("main-portfolio");
  if (mainPortfolio) {
    mainPortfolio.classList.add("active");
  }
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

/* ═════════════════════════════════════════ */
/* PORTFOLIO NAVIGATION FUNCTIONS */
/* ═════════════════════════════════════════ */

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function updateSoundToggle() {
  const soundToggle = document.getElementById("soundToggle");
  if (soundToggle) {
    soundToggle.textContent = soundEnabled ? "🔊" : "🔇";
  }
}

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
window.scrollToSection = scrollToSection;
window.toggleSound = toggleSound;
window.updateSoundToggle = updateSoundToggle;
window.startArcadeGame = startArcadeGame;
window.toggleArcadeMode = toggleArcadeMode;
window.closeArcade = closeArcade;

loadSavedAvatar();

/* ═════════════════════════════════════════ */
/* ARCADE.EXE GAME WINDOW LOGIC */
/* ═════════════════════════════════════════ */

let arcadeMode = "pong";
let arcadeGameRunning = false;
let arcadeScore = 0;
let arcadeHighScore = Number(localStorage.getItem("arcadeHighScore") || 0);

const arcadeCanvas = document.getElementById("arcadeCanvas");
const arcadeCtx = arcadeCanvas ? arcadeCanvas.getContext("2d") : null;

// Arcade Pong Game State
const arcadePaddle = { y: arcadeCanvas ? arcadeCanvas.height / 2 - 45 : 155, h: 90, w: 8, speed: 6 };
const arcadeBall = { x: 300, y: 200, dx: 3, dy: 3, r: 5, maxSpeed: 7 };
const arcadeGame = { width: 600, height: 400 };

function startArcadeGame() {
  if (!arcadeCanvas) return;
  arcadeGameRunning = true;
  arcadeBall.x = arcadeCanvas.width / 2;
  arcadeBall.y = arcadeCanvas.height / 2;
  arcadeBall.dx = (Math.random() > 0.5 ? 1 : -1) * 3;
  arcadeBall.dy = (Math.random() * 4 - 2);
  updateArcadeStatus("PLAYING");
  arcadeGameLoop();
}

function arcadeGameLoop() {
  if (!arcadeGameRunning || !arcadeCtx) return;

  // Clear canvas
  arcadeCtx.fillStyle = "#000";
  arcadeCtx.fillRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

  // Draw border
  arcadeCtx.strokeStyle = "#00e5ff";
  arcadeCtx.lineWidth = 2;
  arcadeCtx.strokeRect(1, 1, arcadeCanvas.width - 2, arcadeCanvas.height - 2);

  // Draw center line
  arcadeCtx.strokeStyle = "rgba(0, 229, 255, 0.3)";
  arcadeCtx.setLineDash([5, 5]);
  arcadeCtx.beginPath();
  arcadeCtx.moveTo(arcadeCanvas.width / 2, 0);
  arcadeCtx.lineTo(arcadeCanvas.width / 2, arcadeCanvas.height);
  arcadeCtx.stroke();
  arcadeCtx.setLineDash([]);

  // Draw paddle (player)
  arcadeCtx.fillStyle = "#00e5ff";
  arcadeCtx.fillRect(arcadeCanvas.width - 20, arcadePaddle.y, arcadePaddle.w, arcadePaddle.h);

  // Draw ball
  arcadeCtx.fillStyle = "#ff4b81";
  arcadeCtx.beginPath();
  arcadeCtx.arc(arcadeBall.x, arcadeBall.y, arcadeBall.r, 0, Math.PI * 2);
  arcadeCtx.fill();

  // Update ball position
  arcadeBall.x += arcadeBall.dx;
  arcadeBall.y += arcadeBall.dy;

  // Ball collision with top/bottom
  if (arcadeBall.y - arcadeBall.r < 0 || arcadeBall.y + arcadeBall.r > arcadeCanvas.height) {
    arcadeBall.dy *= -1;
    arcadeBall.y = Math.max(arcadeBall.r, Math.min(arcadeCanvas.height - arcadeBall.r, arcadeBall.y));
  }

  // Ball collision with paddle
  if (arcadeBall.x + arcadeBall.r > arcadeCanvas.width - 20 &&
      arcadeBall.x + arcadeBall.r < arcadeCanvas.width &&
      arcadeBall.y > arcadePaddle.y &&
      arcadeBall.y < arcadePaddle.y + arcadePaddle.h) {
    arcadeBall.dx = -Math.abs(arcadeBall.dx);
    arcadeScore += 10;
    updateArcadeScore();
    // Increase difficulty
    arcadeBall.dx *= 1.02;
    arcadeBall.dy *= 1.02;
  }

  // Ball out of bounds (lose)
  if (arcadeBall.x < 0 || arcadeBall.x > arcadeCanvas.width) {
    arcadeGameRunning = false;
    if (arcadeScore > arcadeHighScore) {
      arcadeHighScore = arcadeScore;
      localStorage.setItem("arcadeHighScore", arcadeHighScore);
      updateArcadeHighScore();
      updateArcadeStatus("🏆 NEW HIGH!");
    } else {
      updateArcadeStatus("GAME OVER");
    }
    return;
  }

  requestAnimationFrame(arcadeGameLoop);
}

function updateArcadeScore() {
  const scoreEl = document.getElementById("arcadeScore");
  if (scoreEl) scoreEl.textContent = arcadeScore;
}

function updateArcadeHighScore() {
  const highEl = document.getElementById("arcadeHigh");
  if (highEl) highEl.textContent = arcadeHighScore;
}

function updateArcadeStatus(text) {
  const statusEl = document.getElementById("arcadeStatus");
  if (statusEl) statusEl.textContent = text;
}

function toggleArcadeMode(mode) {
  arcadeMode = mode || "pong";
  arcadeGameRunning = false;
  arcadeScore = 0;
  updateArcadeScore();
  updateArcadeStatus("READY");
  
  // Clear canvas
  if (arcadeCtx) {
    arcadeCtx.fillStyle = "#000";
    arcadeCtx.fillRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);
  }
}

function closeArcade() {
  arcadeGameRunning = false;
  updateArcadeStatus("CLOSED");
}

// Mouse movement for paddle control
document.addEventListener("mousemove", (event) => {
  if (!arcadeGameRunning || !arcadeCanvas) return;
  const rect = arcadeCanvas.getBoundingClientRect();
  const mouseY = event.clientY - rect.top;
  arcadePaddle.y = Math.max(0, Math.min(arcadeCanvas.height - arcadePaddle.h, mouseY - arcadePaddle.h / 2));
});

// Touch support for mobile
arcadeCanvas?.addEventListener("touchmove", (event) => {
  if (!arcadeGameRunning) return;
  const rect = arcadeCanvas.getBoundingClientRect();
  const touchY = event.touches[0].clientY - rect.top;
  arcadePaddle.y = Math.max(0, Math.min(arcadeCanvas.height - arcadePaddle.h, touchY - arcadePaddle.h / 2));
});

// Initialize arcade high score display
updateArcadeHighScore();

/* ═════════════════════════════════════════ */
/* BOOT SKIP LOGIC - CHECK IF ALREADY BOOTED */
/* ═════════════════════════════════════════ */
if (hasBootedBefore()) {
  // Skip boot sequence for returning visitors
  bootInProgress = true;
  
  // Hide boot overlay
  const bootOverlay = document.getElementById("boot-overlay");
  if (bootOverlay) {
    bootOverlay.classList.remove("active");
  }
  
  // Show main portfolio
  const mainPortfolio = document.getElementById("main-portfolio");
  if (mainPortfolio) {
    mainPortfolio.classList.add("active");
  }
  
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
      
      const bootOverlay = document.getElementById("boot-overlay");
      if (bootOverlay) {
        bootOverlay.classList.remove("active");
      }
      
      const mainPortfolio = document.getElementById("main-portfolio");
      if (mainPortfolio) {
        mainPortfolio.classList.add("active");
      }
      
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

/* ═══════════════════════════════════════════════════════════════ */
/* KENKO DECK VIEWER - Inline Slide Player */
/* ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════ */
/* KENKO_DECK.EXE - Windows 98 Application Viewer */
/* ═══════════════════════════════════════════════════════════════ */

let kenkoCurrentSlide = 1;
const kenkoTotalSlides = 21;
let kenkoBootComplete = false;
let kenkoDragging = false;
let kenkoDragStartX = 0;
let kenkoDragStartY = 0;
let kenkoWindowX = 0;
let kenkoWindowY = 0;
let kenkoBootInterval = null;
let kenkoBootIndex = 0;

const kenkoBootMessages = [
  "> mount project://kenko",
  "> checking memory...",
  "> loading nutrition_engine.dll",
  "> rendering slide_viewer...",
  "> analyzing patient cohorts...",
  "> initializing meal database...",
  "> ready"
];

// OPEN KENKO APP
function openKenkoApp() {
  const app = document.getElementById("kenkoApp");
  const window = document.getElementById("kenkoWindow");
  const terminal = document.getElementById("kenkoTerminal");
  const content = document.getElementById("kenkoContent");
  const controls = document.getElementById("kenkoControls");
  
  app.classList.remove("hidden");
  app.classList.remove("minimized");
  kenkoBootComplete = false;
  kenkoBootIndex = 0;
  
  // Hide content during boot
  content.style.display = "none";
  controls.style.display = "none";
  terminal.style.display = "block";
  
  // Reset terminal
  document.getElementById("terminalOutput").textContent = "";
  
  // Center window on screen
  window.style.left = "50%";
  window.style.top = "50%";
  window.style.transform = "translate(-50%, -50%)";
  
  // Start boot sequence
  startBootSequence();
  
  // Add keyboard listener
  document.addEventListener("keydown", handleKenkoKeyboard);
}

// CLOSE KENKO APP
function closeKenkoApp() {
  const app = document.getElementById("kenkoApp");
  app.classList.add("hidden");
  
  if (kenkoBootInterval) {
    clearInterval(kenkoBootInterval);
  }
  
  document.removeEventListener("keydown", handleKenkoKeyboard);
}

// MINIMIZE KENKO APP
function minimizeKenkoApp() {
  const app = document.getElementById("kenkoApp");
  app.classList.add("minimized");
}

// BOOT SEQUENCE ANIMATION
function startBootSequence() {
  const terminal = document.getElementById("terminalOutput");
  
  kenkoBootInterval = setInterval(() => {
    if (kenkoBootIndex < kenkoBootMessages.length) {
      const msg = kenkoBootMessages[kenkoBootIndex];
      terminal.textContent += (terminal.textContent ? "\n" : "") + msg;
      
      // Scroll terminal
      document.getElementById("kenkoTerminal").scrollTop = 
        document.getElementById("kenkoTerminal").scrollHeight;
      
      kenkoBootIndex++;
    } else {
      // Boot sequence complete
      clearInterval(kenkoBootInterval);
      kenkoBootComplete = true;
      
      setTimeout(() => {
        // Fade out terminal
        document.getElementById("kenkoTerminal").style.opacity = "0";
        document.getElementById("kenkoTerminal").style.transition = "opacity 0.5s";
        
        setTimeout(() => {
          document.getElementById("kenkoTerminal").style.display = "none";
          document.getElementById("kenkoContent").style.display = "flex";
          document.getElementById("kenkoControls").style.display = "flex";
          
          // Show first slide
          showKenkoSlide();
          
          // Play boot sound (optional)
          playBootSound();
          
          // Update status
          updateKenkoStatus("AHAARA SYSTEM ONLINE");
        }, 100);
      }, 800);
    }
  }, 300); // 300ms per line
}

// SHOW SLIDE
function showKenkoSlide() {
  const slideNum = String(kenkoCurrentSlide).padStart(2, "0");
  const slideImg = document.getElementById("kenkoSlideImage");
  const slideNumEl = document.getElementById("kenkoSlideNumber");
  const prevBtn = document.getElementById("kenkoPrevBtn");
  const nextBtn = document.getElementById("kenkoNextBtn");
  
  slideImg.src = `assets/slides/kenko/${slideNum}.webp`;
  slideImg.onerror = () => {
    slideImg.src = `assets/slides/kenko/01.webp`;
  };
  
  slideNumEl.textContent = slideNum;
  
  // Disable buttons at edges
  prevBtn.disabled = kenkoCurrentSlide <= 1;
  nextBtn.disabled = kenkoCurrentSlide >= kenkoTotalSlides;
  
  updateKenkoStatus(`SLIDE ${slideNum} ACTIVE`);
}

// NEXT SLIDE
function nextKenkoSlide() {
  if (kenkoCurrentSlide < kenkoTotalSlides && kenkoBootComplete) {
    kenkoCurrentSlide++;
    showKenkoSlide();
    playClickSound();
  }
}

// PREV SLIDE
function prevKenkoSlide() {
  if (kenkoCurrentSlide > 1 && kenkoBootComplete) {
    kenkoCurrentSlide--;
    showKenkoSlide();
    playClickSound();
  }
}

// FULLSCREEN
function toggleKenkoFullscreen() {
  const window = document.querySelector(".win98-window");
  if (!window) return;
  
  if (!document.fullscreenElement) {
    window.requestFullscreen().catch(() => {
      console.log("Fullscreen request denied");
    });
  } else {
    document.exitFullscreen();
  }
}

// UPDATE STATUS BAR
function updateKenkoStatus(message) {
  document.getElementById("kenkoStatusText").textContent = message;
}

// DRAG FUNCTIONALITY
document.addEventListener("mousedown", startKenkoDrag);
document.addEventListener("mousemove", dragKenkoWindow);
document.addEventListener("mouseup", stopKenkoDrag);
document.addEventListener("touchstart", startKenkoDragTouch);
document.addEventListener("touchmove", dragKenkoWindowTouch);
document.addEventListener("touchend", stopKenkoDrag);

function startKenkoDrag(e) {
  const titlebar = e.target.closest(".win98-titlebar");
  if (!titlebar || titlebar.querySelector("button")) return;
  
  kenkoDragging = true;
  kenkoDragStartX = e.clientX;
  kenkoDragStartY = e.clientY;
  
  const window = document.getElementById("kenkoWindow");
  const rect = window.getBoundingClientRect();
  kenkoWindowX = rect.left;
  kenkoWindowY = rect.top;
}

function startKenkoDragTouch(e) {
  const titlebar = e.target.closest(".win98-titlebar");
  if (!titlebar || titlebar.querySelector("button")) return;
  
  kenkoDragging = true;
  kenkoDragStartX = e.touches[0].clientX;
  kenkoDragStartY = e.touches[0].clientY;
  
  const window = document.getElementById("kenkoWindow");
  const rect = window.getBoundingClientRect();
  kenkoWindowX = rect.left;
  kenkoWindowY = rect.top;
}

function dragKenkoWindow(e) {
  if (!kenkoDragging) return;
  
  const window = document.getElementById("kenkoWindow");
  const deltaX = e.clientX - kenkoDragStartX;
  const deltaY = e.clientY - kenkoDragStartY;
  
  const newX = Math.max(0, Math.min(window.clientWidth, kenkoWindowX + deltaX));
  const newY = Math.max(0, Math.min(window.clientHeight, kenkoWindowY + deltaY));
  
  window.style.left = newX + "px";
  window.style.top = newY + "px";
  window.style.transform = "none";
}

function dragKenkoWindowTouch(e) {
  if (!kenkoDragging) return;
  
  const window = document.getElementById("kenkoWindow");
  const deltaX = e.touches[0].clientX - kenkoDragStartX;
  const deltaY = e.touches[0].clientY - kenkoDragStartY;
  
  const newX = Math.max(0, kenkoWindowX + deltaX);
  const newY = Math.max(0, kenkoWindowY + deltaY);
  
  window.style.left = newX + "px";
  window.style.top = newY + "px";
  window.style.transform = "none";
}

function stopKenkoDrag() {
  kenkoDragging = false;
}

// KEYBOARD CONTROLS
function handleKenkoKeyboard(e) {
  const app = document.getElementById("kenkoApp");
  if (app.classList.contains("hidden")) return;
  
  if (!kenkoBootComplete) return; // Ignore during boot
  
  switch (e.key) {
    case "ArrowRight":
    case " ":
      e.preventDefault();
      nextKenkoSlide();
      break;
    case "ArrowLeft":
      e.preventDefault();
      prevKenkoSlide();
      break;
    case "f":
    case "F":
      e.preventDefault();
      toggleKenkoFullscreen();
      break;
    case "Escape":
      e.preventDefault();
      closeKenkoApp();
      break;
  }
}

// OPTIONAL AUDIO FEEDBACK
function playBootSound() {
  // Create a simple beep using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // Audio API not available, silent
  }
}

function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = 600;
    oscillator.type = "sine";
    
    gain.gain.setValueAtTime(0.05, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  } catch (e) {
    // Audio API not available, silent
  }
}

/* ═══════════════════════════════════════════════════════════════ */
/* INTERACTIVE ABOUT SECTION */
/* ═══════════════════════════════════════════════════════════════ */

// Terminal command handler
function handleTerminalCommand(event) {
  if (event.key !== 'Enter') return;
  
  const field = event.target;
  const command = field.value.toLowerCase().trim();
  let output = '';
  
  switch (command) {
    case 'skills':
      output = '> skills\nFirmware • OS Internals • Embedded Systems\n3D Printing • Game Development • Binary Analysis';
      break;
    case 'graveyard':
      output = '> graveyard\n47 unfinished projects detected\nRust: 2 weeks progress\nHalf-done game engine\nSmart robot v2\nTelemetry dashboard\n...opening graveyard folder';
      toggleGraveyard();
      break;
    case 'quote':
      rotateQuote();
      output = '> quote\nGenerating wisdom...';
      break;
    case 'help':
      output = '> help\nAvailable commands:\nskills | graveyard | quote | clear';
      break;
    case 'clear':
      field.value = '';
      return;
    default:
      output = `> ${command}\nCommand not found. Try: skills, graveyard, quote, help`;
  }
  
  if (output) {
    field.value = '';
    alert(output);
  }
}

// Graveyard folder toggle
function toggleGraveyard() {
  const list = document.getElementById('graveyardList');
  const toggle = document.getElementById('graveyardToggle');
  
  if (list.classList.contains('hidden')) {
    list.classList.remove('hidden');
    toggle.classList.add('open');
  } else {
    list.classList.add('hidden');
    toggle.classList.remove('open');
  }
}

// Rotating quotes
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

function rotateQuote() {
  const quoteEl = document.getElementById('rotatingQuote');
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  quoteEl.textContent = quotes[currentQuoteIndex];
  quoteEl.style.animation = 'none';
  setTimeout(() => {
    quoteEl.style.animation = 'fadeInQuote 0.8s ease-out';
  }, 10);
}

// Avatar click counter for easter egg
let avatarClickCount = 0;

document.addEventListener('DOMContentLoaded', function() {
  const avatar = document.getElementById('profileAvatar');
  if (avatar) {
    avatar.addEventListener('click', function() {
      avatarClickCount++;
      if (avatarClickCount === 5) {
        alert('🎮 PROCRASTINATION LEVEL: 9000\n\nYou found the hidden stat!\nReward: +50 XP, +10 Guilt');
        avatarClickCount = 0;
      }
    });
  }
  
  // Initialize quote rotation
  rotateQuote();
});

