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
  startKenkoBootSequence();
  
  // Track Event
  if (window.trackEvent) window.trackEvent('kenko_open');

  // Add keyboard listener
  document.addEventListener("keydown", handleKenkoKeyboard);

  // Add swipe listeners for mobile
  addKenkoSwipeSupport();
}

// SWIPE SUPPORT
let kenkoTouchStartX = 0;
function addKenkoSwipeSupport() {
  const content = document.getElementById("kenkoContent");
  if (!content) return;

  content.addEventListener("touchstart", (e) => {
    kenkoTouchStartX = e.touches[0].clientX;
  }, { passive: true });

  content.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = kenkoTouchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) { // Threshold for swipe
      if (diff > 0) {
        nextKenkoSlide();
      } else {
        prevKenkoSlide();
      }
    }
  }, { passive: true });
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
function startKenkoBootSequence() {
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
          
          // Play boot sound
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
  
  if (slideImg) {
    slideImg.src = `assets/slides/kenko/${slideNum}.webp`;
    slideImg.onerror = () => {
      slideImg.src = `assets/slides/kenko/01.webp`;
    };
  }
  
  if (slideNumEl) slideNumEl.textContent = slideNum;
  
  // Disable buttons at edges
  if (prevBtn) prevBtn.disabled = kenkoCurrentSlide <= 1;
  if (nextBtn) nextBtn.disabled = kenkoCurrentSlide >= kenkoTotalSlides;
  
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
  const windowEl = document.querySelector("#kenkoWindow");
  if (!windowEl) return;
  
  if (!document.fullscreenElement) {
    windowEl.requestFullscreen().catch(() => {
      console.log("Fullscreen request denied");
    });
  } else {
    document.exitFullscreen();
  }
}

// UPDATE STATUS BAR
function updateKenkoStatus(message) {
  const statusEl = document.getElementById("kenkoStatusText");
  if (statusEl) statusEl.textContent = message;
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
  if (!titlebar || titlebar.querySelector("button").contains(e.target)) return;
  
  kenkoDragging = true;
  kenkoDragStartX = e.clientX;
  kenkoDragStartY = e.clientY;
  
  const windowEl = document.getElementById("kenkoWindow");
  const rect = windowEl.getBoundingClientRect();
  kenkoWindowX = rect.left;
  kenkoWindowY = rect.top;
}

function startKenkoDragTouch(e) {
  const titlebar = e.target.closest(".win98-titlebar");
  if (!titlebar || titlebar.querySelector("button").contains(e.target)) return;
  
  kenkoDragging = true;
  kenkoDragStartX = e.touches[0].clientX;
  kenkoDragStartY = e.touches[0].clientY;
  
  const windowEl = document.getElementById("kenkoWindow");
  const rect = windowEl.getBoundingClientRect();
  kenkoWindowX = rect.left;
  kenkoWindowY = rect.top;
}

function dragKenkoWindow(e) {
  if (!kenkoDragging) return;
  
  const windowEl = document.getElementById("kenkoWindow");
  const deltaX = e.clientX - kenkoDragStartX;
  const deltaY = e.clientY - kenkoDragStartY;
  
  windowEl.style.left = (kenkoWindowX + deltaX) + "px";
  windowEl.style.top = (kenkoWindowY + deltaY) + "px";
  windowEl.style.transform = "none";
}

function dragKenkoWindowTouch(e) {
  if (!kenkoDragging) return;
  
  const windowEl = document.getElementById("kenkoWindow");
  const deltaX = e.touches[0].clientX - kenkoDragStartX;
  const deltaY = e.touches[0].clientY - kenkoDragStartY;
  
  windowEl.style.left = (kenkoWindowX + deltaX) + "px";
  windowEl.style.top = (kenkoWindowY + deltaY) + "px";
  windowEl.style.transform = "none";
}

function stopKenkoDrag() {
  kenkoDragging = false;
}

// KEYBOARD CONTROLS
function handleKenkoKeyboard(e) {
  const app = document.getElementById("kenkoApp");
  if (app.classList.contains("hidden")) return;
  
  if (!kenkoBootComplete) return; 
  
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
