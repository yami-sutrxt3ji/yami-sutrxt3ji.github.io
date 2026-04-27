/* ═════════════════════════════════════════ */
/* INITIALIZATION & GLOBAL LISTENERS */
/* ═════════════════════════════════════════ */

// Expose functions to window for HTML event handlers
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
window.openKenkoApp = openKenkoApp;
window.closeKenkoApp = closeKenkoApp;
window.minimizeKenkoApp = minimizeKenkoApp;
window.nextKenkoSlide = nextKenkoSlide;
window.prevKenkoSlide = prevKenkoSlide;
window.toggleKenkoFullscreen = toggleKenkoFullscreen;
window.handleTerminalCommand = handleTerminalCommand;
window.toggleGraveyard = toggleGraveyard;

document.addEventListener('DOMContentLoaded', function() {
  // Initialize arcade
  updateArcadeHighScore();
  
  // Initialize avatar
  loadSavedAvatar();
  
  // Initialize HUD
  updateHUD();
  
  // Initialize Sound UI
  updateSoundToggle();

  // Resize canvas initially
  resizeCanvas();
  
  // Setup BIOS menu
  updateBiosMenuDisplay();

  // Avatar Easter Egg
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

  // XP on button clicks
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      if (bootComplete) {
        gainXP(1);
      }
    });
  });

  /* ═════════════════════════════════════════ */
  /* BOOT SKIP LOGIC - CHECK IF ALREADY BOOTED */
  /* ═════════════════════════════════════════ */
  
  // Global tap/click to skip during boot
  const bootOverlay = document.getElementById("boot-overlay");
  if (bootOverlay) {
    bootOverlay.addEventListener("click", () => {
      if (!bootComplete && bootInProgress) {
        console.log("Tap to skip triggered");
        skipBoot();
      }
    });
    bootOverlay.addEventListener("touchstart", () => {
      if (!bootComplete && bootInProgress) {
        console.log("Touch to skip triggered");
        skipBoot();
      }
    });
  }

  if (hasBootedBefore()) {
    console.log("Returning visitor: skipping boot.");
    skipBoot();
  } else {
    console.log("Boot sequence starting...");
    console.log("💡 Tip: Press ESC or Tap to skip boot");
    startBootSequence();
  }

  // Start background game loop
  gameLoop();
});

window.addEventListener("resize", resizeCanvas);

function skipBoot() {
  if (bootComplete) return;
  bootInProgress = true;
  bootSkipped = true;

  // Track Event
  if (window.trackEvent) window.trackEvent('boot_skip');
  
  const bootOverlay = document.getElementById("boot-overlay");
  if (bootOverlay) bootOverlay.classList.remove("active");
  
  const mainPortfolio = document.getElementById("main-portfolio");
  if (mainPortfolio) mainPortfolio.classList.add("active");
  
  markBootAsCompleted();
  
  setTimeout(() => {
    initMainUIAfterBoot();
  }, 300);
}

/* KEYBOARD LISTENERS */
document.addEventListener("keydown", (event) => {
  // ESC key for skip/sound
  if (event.key === "Escape") {
    event.preventDefault();
    if (!bootComplete && bootInProgress) {
      skipBoot();
    } else if (bootComplete) {
      const newSoundState = soundEnabled ? "false" : "true";
      localStorage.setItem("soundEnabled", newSoundState);
      console.log("🔊 Sound:", newSoundState === "false" ? "OFF" : "ON");
      location.reload();
    }
  }
  
  // BIOS Navigation
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
  } else if (!bootComplete && bootInProgress && event.key === "Enter") {
    // Also skip on Enter if boot is running
    skipBoot();
  }
});
