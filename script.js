let unlocked = false;
let currentSection = "start";
const historyStack = [];

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
  currentSection = id;
  setActiveNav(id);
}

function navigateTo(id) {
  if (id === "projects" && !unlocked) {
    alert("LOCKED. PRESS START.");
    return;
  }
  openSection(id);
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
  navigateTo("profile");
}

function openProjects() {
  navigateTo("projects");
}

window.startGame = startGame;
window.openSection = openSection;
window.openProjects = openProjects;
window.navigateTo = navigateTo;
window.goBack = goBack;

setActiveNav("start");
