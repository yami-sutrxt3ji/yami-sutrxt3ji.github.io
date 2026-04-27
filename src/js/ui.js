let unlocked = false;
let currentSection = "start";
const historyStack = [];

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
/* UI CONTROLS */
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
    // Also update the other toggle if it exists
    const soundToggle = document.getElementById("soundToggle");
    if (soundToggle) {
      soundToggle.textContent = soundEnabled ? "🔊" : "🔇";
    }
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
  // Track Event
  if (window.trackEvent) window.trackEvent('contact_copy_email');

  navigator.clipboard
    .writeText(contactEmail)
    .then(() => {
      alert("Copied to clipboard ⚡");
    })
    .catch(() => {
      alert("Clipboard blocked. Copy manually: gator77@t3jiyami.page");
    });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    
    // Close mobile menu if open
    const menu = document.getElementById("navbarMenu");
    const hamburger = document.getElementById("navHamburger");
    if (menu && menu.classList.contains("active")) {
      menu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById("navbarMenu");
  const hamburger = document.getElementById("navHamburger");
  if (menu && hamburger) {
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
  }
}

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

let avatarClickCount = 0;
