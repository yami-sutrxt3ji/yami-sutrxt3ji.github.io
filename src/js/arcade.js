/* ═════════════════════════════════════════ */
/* ARCADE.EXE - Win98 Modal Game Logic */
/* ═════════════════════════════════════════ */

let arcadeGameRunning = false;
let arcadeScore = 0;
let arcadeHighScore = Number(localStorage.getItem("arcadeHighScore") || 0);
let arcadeDragging = false;
let arcadeDragStartX = 0;
let arcadeDragStartY = 0;
let arcadeWindowX = 0;
let arcadeWindowY = 0;

const arcadeCanvas = document.getElementById("arcadeCanvas");
const arcadeCtx = arcadeCanvas ? arcadeCanvas.getContext("2d") : null;

// Arcade Pong Game State
const arcadePaddle = { y: 155, h: 90, w: 8, speed: 6 };
const arcadeBall = { x: 300, y: 200, dx: 3, dy: 3, r: 6, maxSpeed: 8 };

function openArcadeApp() {
  const app = document.getElementById("arcadeApp");
  const windowEl = document.getElementById("arcadeWindow");
  if (!app || !windowEl) return;

  app.classList.remove("hidden");
  app.classList.remove("minimized");
  
  // Center window
  windowEl.style.left = "50%";
  windowEl.style.top = "50%";
  windowEl.style.transform = "translate(-50%, -50%)";
  
  updateArcadeHighScore();
  updateArcadeScore();
}

function closeArcadeApp() {
  const app = document.getElementById("arcadeApp");
  if (app) app.classList.add("hidden");
  arcadeGameRunning = false;
}

function minimizeArcadeApp() {
  const app = document.getElementById("arcadeApp");
  if (app) app.classList.add("minimized");
}

function startArcadeGame() {
  if (!arcadeCanvas || arcadeGameRunning) return;
  arcadeGameRunning = true;
  arcadeScore = 0;

  // Track Event
  if (window.trackEvent) window.trackEvent('arcade_play', { mode: arcadeMode });

  arcadeBall.x = arcadeCanvas.width / 2;
  arcadeBall.y = arcadeCanvas.height / 2;
  arcadeBall.dx = (Math.random() > 0.5 ? 1 : -1) * 3;
  arcadeBall.dy = (Math.random() * 4 - 2);
  updateArcadeStatus("PLAYING");
  updateArcadeScore();
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
    playDiskSeek(); // Reuse sound
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
    if (Math.abs(arcadeBall.dx) < arcadeBall.maxSpeed) {
      arcadeBall.dx *= 1.05;
      arcadeBall.dy *= 1.05;
    }
    playBeep();
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

// DRAG FUNCTIONALITY (Similar to Kenko)
document.addEventListener("mousedown", startArcadeDrag);
document.addEventListener("mousemove", dragArcadeWindow);
document.addEventListener("mouseup", stopArcadeDrag);

function startArcadeDrag(e) {
  const titlebar = e.target.closest("#arcadeTitlebar");
  if (!titlebar || e.target.closest(".win98-buttons")) return;
  
  arcadeDragging = true;
  arcadeDragStartX = e.clientX;
  arcadeDragStartY = e.clientY;
  
  const windowEl = document.getElementById("arcadeWindow");
  const rect = windowEl.getBoundingClientRect();
  arcadeWindowX = rect.left;
  arcadeWindowY = rect.top;
}

function dragArcadeWindow(e) {
  if (arcadeDragging) {
    const windowEl = document.getElementById("arcadeWindow");
    const deltaX = e.clientX - arcadeDragStartX;
    const deltaY = e.clientY - arcadeDragStartY;
    
    windowEl.style.left = (arcadeWindowX + deltaX) + "px";
    windowEl.style.top = (arcadeWindowY + deltaY) + "px";
    windowEl.style.transform = "none";
  }

  // Paddle control
  if (arcadeGameRunning && arcadeCanvas) {
    const rect = arcadeCanvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    arcadePaddle.y = Math.max(0, Math.min(arcadeCanvas.height - arcadePaddle.h, mouseY - arcadePaddle.h / 2));
  }
}

function stopArcadeDrag() {
  arcadeDragging = false;
}

// Keyboard ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeArcadeApp();
  }
});

// Initialize arcade high score display
updateArcadeHighScore();
