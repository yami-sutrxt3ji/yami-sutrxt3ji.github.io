/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE STATE & PERSISTENCE */
/* ═════════════════════════════════════════ */
let bootComplete = false;
let biosMenuIndex = 0;
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

function hasBootedBefore() {
  return localStorage.getItem("bootCompleted") === "true";
}

function markBootAsCompleted() {
  localStorage.setItem("bootCompleted", "true");
  localStorage.setItem("lastBootTime", new Date().toISOString());
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
  if (window.playBeep) window.playBeep();
}

function biosMenuDown() {
  biosMenuIndex = (biosMenuIndex + 1) % 3;
  updateBiosMenuDisplay();
  if (window.playBeep) window.playBeep();
}

function biosMenuConfirm() {
  if (bootComplete || bootSkipped) return;
  if (window.playSelect) window.playSelect();
  transitionToDiskSeek();
}

async function startBootSequence() {
  if (bootInProgress) return;
  bootInProgress = true;
  
  console.log("Starting cinematic boot...");

  // Phase 1: SIGNAL DETECTED (3s with visible timer)
  showScreen("power-on");
  if (window.playBeep) window.playBeep();
  
  const timerEl = document.getElementById("boot-timer");
  let timeLeft = 3;
  const timerInterval = setInterval(() => {
    timeLeft--;
    if (timerEl) timerEl.textContent = `INITIALIZING IN ${timeLeft}s...`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
  bootTimeouts.push(timerInterval);

  bootTimeouts.push(setTimeout(() => {
    if (bootSkipped) return;
    // Phase 2: UEFI INITIALIZATION (3s)
    showScreen("diagnostics");
    diagnosticsSequence();
  }, 3000));

  // Phase 3: BOOTLOADER MENU (Auto-confirm after 5s)
  bootTimeouts.push(setTimeout(() => {
    if (bootSkipped) return;
    showScreen("bios");
    updateBiosMenuDisplay();
    
    const autoBootEl = document.getElementById("auto-boot-text");
    let autoTimeLeft = 5;
    const autoBootInterval = setInterval(() => {
      autoTimeLeft--;
      if (autoBootEl) autoBootEl.textContent = `Auto-boot in ${autoTimeLeft}s...`;
      if (autoTimeLeft <= 0) {
        clearInterval(autoBootInterval);
      }
    }, 1000);
    bootTimeouts.push(autoBootInterval);

    bootTimeouts.push(setTimeout(() => {
      if (!bootComplete && !bootSkipped) {
        biosMenuConfirm();
      }
    }, 5000));
  }, 7500));
}

async function diagnosticsSequence() {
  if (window.playDiskSeek) window.playDiskSeek();
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
        if (window.playBeep) window.playBeep();
        resolve();
      }, 400);
      bootTimeouts.push(t);
    });
  }
}

function transitionToDiskSeek() {
  // Phase 4: KERNEL LOADING (Progress Bar)
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
  const logContainer = document.querySelector(".loading-log");
  
  if (!progressFill) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2;
    if (progress > 100) progress = 100;
    
    if (progress % 15 < 5 && window.playDiskSeek) window.playDiskSeek();
    
    progressFill.style.width = progress + "%";
    progressText.textContent = `BOOTING KERNEL... ${Math.floor(progress)}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      if (window.playLoad) window.playLoad();
      bootTimeouts.push(setTimeout(() => {
        playAsciiReveal();
      }, 800));
    }
  }, 200);

  for (let i = 0; i < logLines.length; i++) {
    await new Promise(resolve => {
      const t = setTimeout(() => {
        const p = document.createElement("p");
        p.className = "log-line";
        p.textContent = logLines[i];
        if (logContainer) logContainer.appendChild(p);
        if (window.playDiskSeek) window.playDiskSeek();
        resolve();
      }, 400);
      bootTimeouts.push(t);
    });
  }
}

async function playAsciiReveal() {
  // Phase 5: ASCII BANNER (1.5s)
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
  }, 1500));
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
      bootOverlay.classList.remove("active");
    }, 800);
  }
  
  const mainPortfolio = document.getElementById("main-portfolio");
  if (mainPortfolio) {
    mainPortfolio.classList.add("active");
    // Trigger any entry animations
    document.body.classList.add("portfolio-ready");
  }
  
  if (window.updateSoundToggle) window.updateSoundToggle();
}
