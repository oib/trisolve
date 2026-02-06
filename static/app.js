const username = "guest";
let currentScore = parseInt(localStorage.getItem("trisolve_score"), 10) || 0;

window.onload = () => {
  // Show the page after CSS is loaded
  document.body.style.visibility = 'visible';
  loadHighscore();
  getChallenge();
  updateScoreDisplay();
  // Small delay to ensure focus works after page is visible
  setTimeout(focusAnswerField, 100);
}

function focusAnswerField() {
  document.getElementById("answer").focus();
}

function nextRound() {
  setTimeout(() => {
    getChallenge();
    focusAnswerField();
  }, 3000);
}

function loadHighscore() {
  const stored = localStorage.getItem("trisolve_highscore");
  if (stored === null) {
    localStorage.setItem("trisolve_highscore", "0");
  }
}

function getHighscore() {
  return parseInt(localStorage.getItem("trisolve_highscore"), 10) || 0;
}

function maybeUpdateHighscore() {
  const high = getHighscore();
  if (currentScore > high) {
    localStorage.setItem("trisolve_highscore", String(currentScore));
  }
  localStorage.setItem("trisolve_score", String(currentScore));
}

function updateScoreDisplay() {
  document.getElementById("score").textContent =
    `📊 Score: ${currentScore} | 🏆 Highscore: ${getHighscore()}`;
}

async function getChallenge() {
  try {
    const r = await fetch(`/api/challenge?username=${username}`);
    const d = await r.json();
    document.getElementById("task").textContent = `🎯 ${d.task1} and ${d.task2}`;
    document.getElementById("feedback").textContent = "";
    document.getElementById("answer").value = "";
    focusAnswerField();
  } catch (e) {
    console.error("Failed to load challenge:", e);
  }
}

async function submitAnswer() {
  const a = document.getElementById("answer").value;
  if (!a.trim()) {
    alert("Enter an answer");
    return;
  }
  const parsed = Number(a);
  if (isNaN(parsed)) {
    alert("Please enter a valid number");
    return;
  }
  const f = new FormData();
  f.append("username", username);
  f.append("answer", parsed);
  try {
    const r = await fetch("/api/submit", { method: "POST", body: f });
    const text = await r.text();

    let d;
    try {
      d = JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON:", text);
      document.getElementById("feedback").textContent = "⚠️ Unexpected server response.";
      return;
    }

    if (d.result === "correct") {
      currentScore += 1;
      maybeUpdateHighscore();
      document.getElementById("feedback").textContent = "✅ Correct!";
      updateScoreDisplay();
      nextRound();
    } else if (d.result === "wrong") {
      document.getElementById("feedback").textContent = `❌ Wrong. Was ${d.correct}`;
      updateScoreDisplay();
      nextRound();
    } else {
      document.getElementById("feedback").textContent = `⚠️ ${d.message}`;
    }
  } catch (e) {
    console.error("Submission failed:", e);
    document.getElementById("feedback").textContent = "⚠️ Submission error.";
  }
}

