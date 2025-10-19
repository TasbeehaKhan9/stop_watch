// Select elements
const timeDisplay = document.querySelector(".head-1");
const startBtn = document.querySelector(".Start-button");
const lapBtn = document.querySelector(".lap-button");
const lapTable = document.getElementById("lap-table");
const lapList = document.getElementById("LapList");

// Variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;
let lastLapTime = 0;

// Format time
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
}

// Start Timer
function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
  }, 10);
  isRunning = true;
  startBtn.textContent = "Stop";
  startBtn.style.backgroundColor = "#ff4d4d"; 
  lapBtn.disabled = false;

lapBtn.textContent = "Lap";
lapBtn.style.backgroundColor = "#d3d3d3";

}

// Stop Timer
function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startBtn.textContent = "Resume";
  startBtn.style.backgroundColor = "#888"; // gray
  lapBtn.textContent = "Reset";
}

// Reset Timer
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = "00:00.00";
  lapCount = 0;
  lastLapTime = 0;
  lapList.innerHTML = "";
  lapTable.style.display = "none";
  startBtn.textContent = "Start";
  startBtn.style.backgroundColor = "#5464f1";
  lapBtn.textContent = "Lap";
  lapBtn.disabled = true;
}

// Lap Logic
function recordLap() {
  lapCount++;
  const currentTime = elapsedTime;
  const lapTime = currentTime - lastLapTime;
  lastLapTime = currentTime;

  if (lapTable.style.display === "none") {
    lapTable.style.display = "table";
  }

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${lapCount}</td>
    <td>${formatTime(lapTime)}</td>
    <td>${formatTime(currentTime)}</td>
  `;
  lapList.prepend(newRow);
}

// Button handlers
startBtn.addEventListener("click", () => {
  if (!isRunning && startBtn.textContent === "Start") startTimer();
  else if (isRunning && startBtn.textContent === "Stop") stopTimer();
  else if (!isRunning && startBtn.textContent === "Resume") startTimer();
});

lapBtn.addEventListener("click", () => {
  if (lapBtn.textContent === "Lap") recordLap();
  else if (lapBtn.textContent === "Reset") resetTimer();
});