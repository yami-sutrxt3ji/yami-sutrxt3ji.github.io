/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE STATE & PERSISTENCE */
/* ═════════════════════════════════════════ */
let bootComplete = false;
let bootInProgress = false;
let bootSkipped = false;
let bootTimeouts = [];

function showScreen(id) {
  // Hard clean all boot screens
  document.querySelectorAll(".boot-screen").forEach(screen => {
    screen.classList.remove("active");
  });
  const next = document.getElementById(id);
  if (next) {
    next.classList.add("active");
    console.log(`[BOOT] Screen active: ${id}`);
  }
}

// Removed hasBootedBefore check to ensure boot runs every time

function markBootAsCompleted() {
  localStorage.setItem("bootCompleted", "true");
  localStorage.setItem("lastBootTime", new Date().toISOString());
}

/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE FUNCTIONS - NEW FLOW */
/* ═════════════════════════════════════════ */

async function startBootSequence() {
  if (bootInProgress) return;
  bootInProgress = true;
  
  console.log("Starting intentional boot sequence...");

  // Hard Fail-safe: 8 seconds to main site
  const failSafe = setTimeout(() => {
    if (!bootComplete) {
      console.warn("Boot timeout: entering site.");
      initMainUIAfterBoot();
    }
  }, 8000);
  bootTimeouts.push(failSafe);

  // Phase 1: SIGNAL DETECTED
  showScreen("power-on");
  if (window.playBeep) window.playBeep();
  
  // Quick transition to terminal logs
  bootTimeouts.push(setTimeout(() => {
    if (bootSkipped || bootComplete) return;
    showScreen("diagnostics");
    runTerminalLogs();
  }, 1000));
}

async function runTerminalLogs() {
  const diagScreen = document.getElementById("diagnostics");
  if (!diagScreen) return;

  const logLines = [
    "mounting profile.fs...",
    "starting network manager...",
    "loading projects.service...",
    "initializing ui.target...",
    "launching ashish.desktop...",
    "system ready"
  ];

  const container = diagScreen.querySelector(".diag-container");
  if (container) {
    container.innerHTML = '<div class="diag-header">SYSTEM_BOOT_INIT</div><div id="boot-log-content"></div>';
  }
  
  const logContent = document.getElementById("boot-log-content");
  
  for (let i = 0; i < logLines.length; i++) {
    if (bootSkipped || bootComplete) break;
    
    await new Promise(resolve => {
      const t = setTimeout(() => {
        const p = document.createElement("p");
        p.className = "diag-line";
        p.style.textAlign = "left";
        p.style.opacity = "1";
        p.innerHTML = `<span class="label">></span> <span class="value">${logLines[i]}</span>`;
        if (logContent) logContent.appendChild(p);
        
        if (window.playDiskSeek) window.playDiskSeek();
        resolve();
      }, 600);
      bootTimeouts.push(t);
    });
  }

  if (!bootSkipped && !bootComplete) {
    bootTimeouts.push(setTimeout(() => {
      playAsciiReveal();
    }, 800));
  }
}

async function playAsciiReveal() {
  showScreen("ascii-banner");
  if (window.playSuccess) window.playSuccess();
  
  const bannerLines = document.querySelectorAll(".banner-line");
  const bannerMessages = [
    "ASHISH.EXE LOADED",
    "System integrity verified.",
    "Ready for interaction.",
    "> Entering Portfolio UI..."
  ];
  
  for (let i = 0; i < bannerLines.length; i++) {
    if (bootSkipped || bootComplete) break;
    await new Promise(resolve => {
      const t = setTimeout(async () => {
        if (window.typeText) {
          await window.typeText(bannerLines[i], bannerMessages[i], 10);
        } else {
          bannerLines[i].textContent = bannerMessages[i];
        }
        resolve();
      }, 200);
      bootTimeouts.push(t);
    });
  }
  
  bootTimeouts.push(setTimeout(() => {
    initMainUIAfterBoot();
  }, 1000));
}

function initMainUIAfterBoot() {
  if (bootComplete) return;
  bootComplete = true;
  markBootAsCompleted();
  
  // Clear all boot timeouts
  bootTimeouts.forEach(t => clearTimeout(t));
  bootTimeouts = [];
  
  const bootOverlay = document.getElementById("boot-overlay");
  if (bootOverlay) {
    bootOverlay.style.opacity = "0";
    bootOverlay.style.transition = "opacity 1s ease-in-out"; // Smooth fade
    setTimeout(() => {
      bootOverlay.style.display = "none";
      bootOverlay.classList.remove("active");
    }, 1000);
  }
  
  const mainPortfolio = document.getElementById("main-portfolio");
  if (mainPortfolio) {
    mainPortfolio.classList.add("active");
    document.body.classList.add("portfolio-ready");
  }
  
  if (window.updateSoundToggle) window.updateSoundToggle();
}

// Added back for main.js compatibility
function biosMenuUp() {}
function biosMenuDown() {}
function biosMenuConfirm() {}
function updateBiosMenuDisplay() {}
