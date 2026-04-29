/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE STATE & PERSISTENCE */
/* ═════════════════════════════════════════ */
let bootComplete = false;
let bootInProgress = false;
let bootSkipped = false;
let bootTimeouts = [];
let biosMenuIndex = 0;

function showScreen(id) {
  document.querySelectorAll(".boot-screen").forEach(screen => {
    screen.classList.remove("active");
  });
  const next = document.getElementById(id);
  if (next) {
    next.classList.add("active");
  }
}

function markBootAsCompleted() {
  localStorage.setItem("bootCompleted", "true");
  localStorage.setItem("lastBootTime", new Date().toISOString());
}

/* ═════════════════════════════════════════ */
/* BOOT SEQUENCE FUNCTIONS - CINEMATIC FLOW */
/* ═════════════════════════════════════════ */

async function startBootSequence() {
  if (bootInProgress) return;
  bootInProgress = true;
  
  // Hard Fail-safe: 35 seconds total
  const failSafe = setTimeout(() => {
    if (!bootComplete) initMainUIAfterBoot();
  }, 35000);
  bootTimeouts.push(failSafe);

  // Phase 1: SIGNAL (2s)
  showScreen("power-on");
  if (window.playBeep) window.playBeep();
  
  // Phase 2: BIOS / BOOTLOADER (7s)
  bootTimeouts.push(setTimeout(() => {
    if (bootSkipped || bootComplete) return;
    showScreen("bios");
    updateBiosMenuDisplay();
    
    // Auto-confirm BIOS countdown
    const autoEl = document.getElementById("auto-boot-text");
    let autoTime = 6;
    if (autoEl) autoEl.textContent = `Auto-boot in ${autoTime}s...`;
    
    const autoInt = setInterval(() => {
      autoTime--;
      if (autoEl) autoEl.textContent = `Auto-boot in ${autoTime}s...`;
      if (autoTime <= 0) clearInterval(autoInt);
    }, 1000);
    bootTimeouts.push(autoInt);

    // Auto-confirm BIOS after 6 seconds
    bootTimeouts.push(setTimeout(() => {
      if (!bootComplete && !bootSkipped) biosMenuConfirm();
    }, 6000));
  }, 2000));
}

function biosMenuConfirm() {
  if (bootComplete || bootSkipped) return;
  if (window.playSelect) window.playSelect();
  runInitializationLogs();
}

async function runInitializationLogs() {
  showScreen("diagnostics");
  const logContent = document.getElementById("boot-log-content");
  if (!logContent) return;

  const logs = [
    "loading kernel modules...",
    "detecting hardware architecture: x86_64 confirmed",
    "mounting root filesystem (ro)...",
    "checking disk integrity: 100% clean",
    "starting systemd-udevd...",
    "initializing entropy pool...",
    "mounting /dev/sda1 to /mnt/profile...",
    "loading graphics driver: creative-rtx.ko",
    "starting network stack...",
    "dhcp discover on eth0...",
    "assigned ip: 192.168.1.104",
    "starting projects.service...",
    "indexing source code assets...",
    "loading archive: 2021-2024_work.tar.gz",
    "extracting project metadata...",
    "initializing nutrition_engine.dll...",
    "mounting ashish_os_core...",
    "starting port 8080 listener...",
    "checking memory leaks: none found",
    "optimizing ui.target rendering...",
    "applying retro-aesthetic filters...",
    "loading contact_manager.service...",
    "syncing github.repo.metadata...",
    "validating system certificates...",
    "starting interactive shell...",
    "setting up environment variables...",
    "loading user preferences...",
    "starting window manager: ashish.desktop",
    "launching portfolio_v3...",
    "finalizing system targets...",
    "checking thermal levels: optimal",
    "battery status: ac connected",
    "display refresh rate: 144hz",
    "keyboard layout: us-intl confirmed",
    "mounting shared_memory...",
    "starting analytics_daemon...",
    "initializing audio_buffer...",
    "cleaning temporary files...",
    "system integrity verified: 100%",
    "launching main interface...",
    "READY."
  ];

  for (let i = 0; i < logs.length; i++) {
    if (bootSkipped || bootComplete) break;
    
    await new Promise(resolve => {
      const delay = Math.random() * 300 + 300; // avg 450ms per line
      const t = setTimeout(() => {
        const p = document.createElement("p");
        p.className = "diag-line";
        p.innerHTML = `<span class="label">></span> <span class="value">${logs[i]}</span>`;
        logContent.appendChild(p);
        
        // Auto-scroll
        const container = document.getElementById("diagnostics");
        if (container) container.scrollTop = container.scrollHeight;

        if (window.playDiskSeek) window.playDiskSeek();
        resolve();
      }, delay);
      bootTimeouts.push(t);
    });
  }

  if (!bootSkipped && !bootComplete) {
    bootTimeouts.push(setTimeout(playAsciiReveal, 1000));
  }
}

async function playAsciiReveal() {
  showScreen("ascii-banner");
  if (window.playSuccess) window.playSuccess();
  
  const bannerLines = document.querySelectorAll(".banner-line");
  const messages = ["SYSTEM INITIALIZED", "SECURE LINK STABLE", "WELCOME, OPERATOR", "> ACCESSING DATA..."];
  
  for (let i = 0; i < bannerLines.length; i++) {
    if (bootSkipped || bootComplete) break;
    await new Promise(resolve => {
      const t = setTimeout(async () => {
        if (window.typeText) await window.typeText(bannerLines[i], messages[i], 15);
        else bannerLines[i].textContent = messages[i];
        resolve();
      }, 300);
      bootTimeouts.push(t);
    });
  }
  
  bootTimeouts.push(setTimeout(initMainUIAfterBoot, 1500));
}

function initMainUIAfterBoot() {
  if (bootComplete) return;
  bootComplete = true;
  markBootAsCompleted();
  
  bootTimeouts.forEach(t => clearTimeout(t));
  bootTimeouts = [];
  
  const overlay = document.getElementById("boot-overlay");
  if (overlay) {
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 1.5s ease-in-out";
    setTimeout(() => {
      overlay.style.display = "none";
      overlay.classList.remove("active");
    }, 1500);
  }
  
  const main = document.getElementById("main-portfolio");
  if (main) main.classList.add("active");
}

/* BIOS STUBS */
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
function updateBiosMenuDisplay() {
  const items = document.querySelectorAll(".bios-menu-item");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === biosMenuIndex);
    const cursor = item.querySelector(".bios-cursor");
    if (cursor) cursor.innerHTML = index === biosMenuIndex ? "→ " : "&nbsp;&nbsp;&nbsp;";
  });
}
