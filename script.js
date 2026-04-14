let unlocked = false;

function openSection(id) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  target.classList.add("active");
}

function startGame() {
  unlocked = true;
  openSection("profile");
}

function openProjects() {
  if (!unlocked) {
    alert("LOCKED. PRESS START.");
    return;
  }
  openSection("projects");
}

window.startGame = startGame;
window.openSection = openSection;
window.openProjects = openProjects;
