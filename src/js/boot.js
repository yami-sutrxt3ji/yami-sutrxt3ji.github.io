/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE STATE & PERSISTENCE */
/* ═════════════════════════════════════════ */
let bootComplete = false;
let biosMenuIndex = 0;
let bootInProgress = false;
let bootSkipped = false;
let bootTimeouts = [];

function showScreen(id) {
  document.querySelectorAll(".boot-screen").forEach(screen => {
    screen.classList.remove("active");
  });
  const next = document.getElementById(id);
  if (next) next.classList.add("active");
}

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

/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE FUNCTIONS - MULTI-STAGE */
/* ═════════════════════════════════════════ */

function updateBiosMenuDisplay() {
  const items = document.querySelectorAll(".bios-menu-item");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === biosMenuIndex);
    const cursor = item.querySelector(".bios-cursor");
    if (cursor) cursor.innerHTML = index === biosMenuIndex ? "→ " : "&nbsp;&nbsp;&nbsp;";
  });
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
  if (bootComplete || bootSkipped) return;
  playSelect();
  transitionToDiskSeek();
}

async function startBootSequence() {
  if (bootInProgress) return;
  bootInProgress = true;
  
  console.log("Starting cinematic boot...");

  // Hard Fail-safe: 20 seconds
  const failSafe = setTimeout(() => {
    if (!bootComplete) {
      console.warn("Boot timeout: force entering site.");
      initMainUIAfterBoot();
    }
  }, 20000);
  bootTimeouts.push(failSafe);

  // Phase 1: Power On - 0s
  showScreen("power-on");
  await powerOnSequence();

  // Phase 2: BIOS Diagnostics - 2.5s
  bootTimeouts.push(setTimeout(async () => {
    if (bootSkipped) return;
    showScreen("diagnostics");
    await diagnosticsSequence();
  }, 2500));

  // Phase 3: BIOS Menu (Auto-confirm) - 5.5s
  bootTimeouts.push(setTimeout(() => {
    if (bootSkipped) return;
    showScreen("bios");
    updateBiosMenuDisplay();
    // Auto-confirm after 1.5s
    bootTimeouts.push(setTimeout(() => {
      if (!bootComplete && !bootSkipped) {
        biosMenuConfirm();
      }
    }, 1500));
  }, 5500));
}

async function powerOnSequence() {
  playBeep(); 
  const powerText = document.querySelector("#power-on .power-text");
  if (!powerText) return;

  // Power LED blink simulation
  let blinks = 0;
  const interval = setInterval(() => {
    powerText.style.opacity = powerText.style.opacity === "0" ? "1" : "0";
    blinks++;
    if (blinks >= 6) {
      clearInterval(interval);
      powerText.style.opacity = "1";
    }
  }, 150);
}

async function diagnosticsSequence() {
  playDiskSeek();
  const diagScreen = document.getElementById("diagnostics");
  if (!diagScreen) return;
  
  const values = diagScreen.querySelectorAll(".value");
  values.forEach(v => {
    if (!v.dataset.original) v.dataset.original = v.textContent;
    v.textContent = "";
  });

  for (let i = 0; i < values.length; i++) {
    await new Promise(resolve => {
      const t = setTimeout(() => {
        values[i].textContent = values[i].dataset.original;
        playBeep();
        resolve();
      }, 200);
      bootTimeouts.push(t);
    });
  }
}

function transitionToDiskSeek() {
  showScreen("disk-loading");
  bootTimeouts.push(setTimeout(() => {
    playDiskLoadingSequence();
  }, 300));
}

async function playDiskLoadingSequence() {
  const logLines = [
    "Loading kernel: ashish_profile.efi",
    "Verifying sectors: [OK]",
    "Reading system configuration...",
    "Mounting storage: ideas.img",
    "Starting interface manager..."
  ];
  
  const progressFill = document.querySelector(".progress-fill");
  const progressText = document.querySelector(".progress-text");
  const logElements = document.querySelectorAll("#disk-loading .log-line");
  
  if (!progressFill) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress > 100) progress = 100;
    
    if (progress % 20 < 5) playDiskSeek();
    
    progressFill.style.width = progress + "%";
    progressText.textContent = `PROGRESS: ${Math.floor(progress)}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      playLoad();
      bootTimeouts.push(setTimeout(() => {
        playAsciiReveal();
      }, 500));
    }
  }, 180);

  for (let i = 0; i < logElements.length; i++) {
    await new Promise(resolve => {
      const t = setTimeout(() => {
        if (logElements[i]) {
          logElements[i].textContent = logLines[i] || "";
          playDiskSeek();
        }
        resolve();
      }, 300);
      bootTimeouts.push(t);
    });
  }
}

async function playAsciiReveal() {
  showScreen("ascii-banner");
  playSuccess();
  
  const bannerLines = document.querySelectorAll(".banner-line");
  const bannerMessages = [
    "ASHISH.EXE LOADED",
    "System integrity verified.",
    "Ready for interaction.",
    "> Entering Shell..."
  ];
  
  for (let i = 0; i < bannerLines.length; i++) {
    await new Promise(resolve => {
      const t = setTimeout(async () => {
        await typeText(bannerLines[i], bannerMessages[i], 10);
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
    bootOverlay.style.transition = "opacity 0.8s ease-out";
    setTimeout(() => {
      bootOverlay.style.display = "none";
    }, 800);
  }
  
  const mainPortfolio = document.getElementById("main-portfolio");
  if (mainPortfolio) {
    mainPortfolio.classList.add("active");
  }
  
  updateSoundToggle();
}
