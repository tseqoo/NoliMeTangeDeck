const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");
const progressText = document.getElementById("progressText");

// Mode toggle elements
const spinModeBtn = document.getElementById("spinModeBtn");
const guessModeBtn = document.getElementById("guessModeBtn");
const spinModeSection = document.getElementById("spinModeSection");
const guessModeSection = document.getElementById("guessModeSection");

// Game mode elements
const startGameBtn = document.getElementById("startGameBtn");
const skipBtn = document.getElementById("skipBtn");
const revealBtn = document.getElementById("revealBtn");
const guessInput = document.getElementById("guessInput");
const submitGuessBtn = document.getElementById("submitGuessBtn");
const gameCardImage = document.getElementById("gameCardImage");
const blurOverlay = document.getElementById("blurOverlay");
const blurName = document.getElementById("blurName");
const blurImage = document.getElementById("blurImage");
const gameResult = document.getElementById("gameResult");
const hintBox = document.getElementById("hintBox");
const timerFill = document.getElementById("timerFill");
const timerText = document.getElementById("timerText");
const scoreValue = document.getElementById("scoreValue");
const streakValue = document.getElementById("streakValue");
const roundValue = document.getElementById("roundValue");

if (gameCardImage) {
  gameCardImage.setAttribute("draggable", "false");
  gameCardImage.addEventListener("dragstart", (event) => event.preventDefault());
  gameCardImage.addEventListener("contextmenu", (event) => event.preventDefault());
}

// 51 characters from Noli Me Tangere - organized by category
const characters = [
  // A. Main / Central Characters (16)
  {
    name: "Juan Crisóstomo Ibarra y Magsalin", category: "Main Character", answers: [
      "Crisóstomo Ibarra",
      "Juan Crisóstomo Ibarra",
      "Juan Crisóstomo Ibarra y Magsalin",
    ]
  },
  { name: "María Clara", category: "Main Character" },
  { name: "Elías", category: "Main Character" },
  {
    name: "Kapitan Tiago", category: "Main Character", answers: [
      "Kapitán Tiago",
      "Captain Tiago",
      "Santiago de los Santos"
    ]
  },
  {
    name: "Padre Dámaso", category: "Main Character", answers: [
      "Padre Dámaso",
      "Father Dámaso",
      "Fray Damaso"
    ]
  },
  {
    name: "Padre Salvi", category: "Main Character", answers: [
      "Padre Salvi",
      "Father Salvi",
      "Fray Salvi"
    ]
  },
  { name: "Don Rafael Ibarra", category: "Main Character" },
  { name: "Pilosopo Tasyo", category: "Main Character" },
  {
    name: "Doña Victorina", category: "Main Character", answers: [
      "Doña Victorina",
      "Doña Victorina de los Reyes de Espadaña",
    ]
  },
  {
    name: "Don Tiburcio", category: "Main Character", answers: [
      "Don Tiburcio",
      "Don Tiburcio de Espadaña",
      "Tiburcio",
    ]
  },
  { name: "Sisa", category: "Main Character" },
  { name: "Basilio", category: "Main Character" },
  { name: "Crispin", category: "Main Character" },
  {
    name: "Doña Consolación", category: "Main Character", answers: [
      "Doña Consolación",
      "Donya Consolacion",
    ]
  },
  {
    name: "Ensign (Alférez)", category: "Main Character", answers: [
      "Ensign",
      "Ensign (Alférez)",
      "The Ensign",
      "The Alférez",
      "Alférez",
    ]
  },
  { name: "Father Sibyla", category: "Main Character" },

  // B. Clergy / Church Workers (2)
  {
    name: "The Chief Sexton", category: "Clergy / Church Workers", answers: [
      "The Chief Sexton",
      "Chief Sexton",
      "Sexton",
    ]
  },
  {
    name: "The Gravedigger", category: "Clergy / Church Workers", answers: [
      "The Gravedigger",
      "Gravedigger",
    ]
  },

  // C. Government / Authority Figures (8)
  {
    name: "Lt. Guevara", category: "Government / Authority Figures", answers: [
      "Lt. Guevara",
      "Lieutenant Guevara",
      "Guevara",
    ]
  },
  {
    name: "The Mayor", category: "Government / Authority Figures",
    answers: [
      "The Mayor",
      "Mayor",
    ]
  },
  {
    name: "Captain General", category: "Government / Authority Figures",
    answers: [
      "Captain General",
      "Kapitan Heneral",
    ]
  },
  {
    name: "Don Filipo", category: "Government / Authority Figures", answers: [
      "Don Filipo",
      "Filipo",
    ]
  },
  {
    name: "Captain Basilio", category: "Government / Authority Figures", answers: [
      "Captain Basilio",
      "Basilio",
    ]
  },
  {
    name: "Captain Tinong", category: "Government / Authority Figures", answers: [
      "Captain Tinong",
      "Kapitan Tinong",
      "Tinong",
    ]
  },
  {
    name: "Captain Valentin", category: "Government / Authority Figures", answers: [
      "Captain Valentin",
      "Kapitan Valentin",
      "Valentin",
    ]
  },
  {
    name: "Captain Maria", category: "Government / Authority Figures", answers: [
      "Captain Maria",
      "Kapitan Maria",
      "Maria",
    ]
  },

  // D. Upper-Class / Educated Citizens (9)
  {
    name: "Doña Pia Alba", category: "Upper-Class / Educated Citizens", answers: [
      "Doña Pia Alba",
      "Donya Pia Alba",
      "Pia Alba",
    ]
  },
  {
    name: "Aunt Isabel", category: "Upper-Class / Educated Citizens", answers: [
      "Aunt Isabel",
      "Tía Isabel",
      "Isabel",
    ]
  },
  { name: "Linares", category: "Upper-Class / Educated Citizens" },
  {
    name: "Don Pedro Eibarramendia", category: "Upper-Class / Educated Citizens", answers: [
      "Don Pedro Eibarramendia",
      "Pedro Eibarramendia",
    ]
  },
  {
    name: "Don Saturnino", category: "Upper-Class / Educated Citizens", answers: [
      "Don Saturnino",
      "Saturnino",
    ]
  },
  {
    name: "Don Primitivo", category: "Upper-Class / Educated Citizens", answers: [
      "Don Primitivo",
      "Primitivo",
    ]
  },
  {
    name: "The Schoolmaster", category: "Upper-Class / Educated Citizens", answers: [
      "The Schoolmaster",
      "Schoolmaster",
    ]
  },
  {
    name: "The Yellowish Individual", category: "Upper-Class / Educated Citizens", answers: [
      "The Yellowish Individual",
      "Yellowish Individual",
    ]
  },
  { name: "Tinchang", category: "Upper-Class / Educated Citizens" },

  // E. Commoners / Poor or Working-Class (9)
  { name: "Lucas", category: "Commoners / Poor or Working-Class" },
  { name: "Tarsilo Alasigan", category: "Commoners / Poor or Working-Class" },
  { name: "Bruno Alasigan", category: "Commoners / Poor or Working-Class" },
  {
    name: "Captain Pablo", category: "Commoners / Poor or Working-Class", answers: [
      "Captain Pablo",
      "Kapitan Pablo",
      "Pablo",
    ]
  },
  { name: "Nol Juan", category: "Commoners / Poor or Working-Class" },
  { name: "Balat", category: "Commoners / Poor or Working-Class" },
  { name: "Carlicos", category: "Commoners / Poor or Working-Class" },
  { name: "Andong", category: "Commoners / Poor or Working-Class" },
  { name: "Hermana Rufa", category: "Commoners / Poor or Working-Class" },

  // F. María Clara's Friends (5)
  { name: "Iday", category: "María Clara's Friends" },
  { name: "Sinang", category: "María Clara's Friends" },
  { name: "Andeng", category: "María Clara's Friends" },
  { name: "Victoria", category: "María Clara's Friends" },
  { name: "Neneng", category: "María Clara's Friends" },

  // G. Other Supporting / Minor Townsfolk (2)
  { name: "Albino", category: "Other Supporting / Minor Townsfolk" },
  { name: "Leon", category: "Other Supporting / Minor Townsfolk" }
];

// Ensure every character exposes at least one acceptable answer
characters.forEach((character) => {
  if (!character.answers || character.answers.length === 0) {
    character.answers = [character.name];
  }
});

let remainingIndices = characters.map((_, i) => i);
let currentRotation = 0;

// Game state
let gameActive = false;
let currentCharacterIndex = -1;
let score = 0;
let streak = 0;
let round = 0;
let timerInterval = null;
let timeRemaining = 30;
let gameCharacterPool = [];

// Category colors
const categoryColors = {
  "Main Character": '#e74c3c',
  "Clergy / Church Workers": '#9b59b6',
  "Government / Authority Figures": '#3498db',
  "Upper-Class / Educated Citizens": '#f39c12',
  "Commoners / Poor or Working-Class": '#16a085',
  "María Clara's Friends": '#e91e63',
  "Other Supporting / Minor Townsfolk": '#95a5a6'
};

// Generate wheel segments using canvas drawing
function createWheel() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  const centerX = 200;
  const centerY = 200;
  const radius = 200;
  const segmentAngle = (Math.PI * 2) / 51;

  characters.forEach((character, index) => {
    const startAngle = index * segmentAngle - Math.PI / 2;
    const endAngle = startAngle + segmentAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    const baseColor = categoryColors[character.category];
    ctx.fillStyle = index % 2 === 0 ? baseColor : shadeColor(baseColor, -15);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 3;
    ctx.fillText((index + 1).toString(), radius * 0.75, 0);
    ctx.restore();
  });

  wheel.style.backgroundImage = `url(${canvas.toDataURL()})`;
  wheel.style.backgroundSize = 'cover';
}

function shadeColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

createWheel();

// Mode Toggle
spinModeBtn.addEventListener("click", () => {
  spinModeBtn.classList.add("active");
  guessModeBtn.classList.remove("active");
  spinModeSection.style.display = "block";
  guessModeSection.style.display = "none";
  stopGame();
});

guessModeBtn.addEventListener("click", () => {
  guessModeBtn.classList.add("active");
  spinModeBtn.classList.remove("active");
  guessModeSection.style.display = "block";
  spinModeSection.style.display = "none";
});

// SPIN MODE
spinBtn.addEventListener("click", () => {
  if (remainingIndices.length === 0) {
    result.textContent = "🎉 All characters have been revealed!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingIndices.length);
  const selectedIndex = remainingIndices[randomIndex];
  const selectedCharacter = characters[selectedIndex];

  const segmentAngle = 360 / 51;
  const targetAngle = selectedIndex * segmentAngle;
  const spins = 360 * 8;
  const finalRotation = spins + (360 - targetAngle) + (segmentAngle / 2);

  currentRotation += finalRotation;

  wheel.style.transform = `rotate(${currentRotation}deg)`;
  spinBtn.disabled = true;
  result.textContent = "🎯 Spinning...";

  setTimeout(() => {
    const imageSrc = `cards/card${selectedIndex + 1}.jpg`;

    result.innerHTML = `
      <p><strong>${selectedCharacter.name}</strong></p>
      <div class="category-badge">${selectedCharacter.category}</div>
      <img src="${imageSrc}" alt="${selectedCharacter.name}" onerror="this.src='cards/card${selectedIndex + 1}.png'">
    `;

    remainingIndices.splice(randomIndex, 1);
    progressText.textContent = `${remainingIndices.length} character${remainingIndices.length !== 1 ? 's' : ''} remaining`;

    showCardPopup(imageSrc, selectedCharacter);

    spinBtn.disabled = false;

    if (remainingIndices.length === 0) {
      result.innerHTML += "<p style='margin-top:15px;'>🎉 All characters revealed!</p>";
      spinBtn.disabled = true;
    }
  }, 5000);
});

function showCardPopup(imageSrc, character) {
  const popup = document.getElementById("cardPopup");
  const popupImage = document.getElementById("popupImage");
  const popupCharacterName = document.getElementById("popupCharacterName");
  const popupCategory = document.getElementById("popupCategory");

  popupImage.src = imageSrc;
  popupImage.onerror = () => {
    popupImage.src = imageSrc.replace('.jpg', '.png');
  };
  popupCharacterName.textContent = character.name;
  popupCategory.textContent = character.category;
  popup.style.display = "flex";

  startConfetti();

  popup.onclick = () => {
    popup.style.display = "none";
    stopConfetti();
  };
}

// GUESS MODE
startGameBtn.addEventListener("click", () => {
  startGame();
});

skipBtn.addEventListener("click", () => {
  nextRound(false);
});

revealBtn.addEventListener("click", () => {
  revealCharacter();
});

submitGuessBtn.addEventListener("click", () => {
  checkGuess();
});

guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !submitGuessBtn.disabled) {
    checkGuess();
  }
});

function startGame() {
  gameActive = true;
  score = 0;
  streak = 0;
  round = 0;
  gameCharacterPool = characters.map((_, i) => i);

  updateStats();

  startGameBtn.style.display = "none";
  skipBtn.style.display = "inline-block";
  revealBtn.style.display = "inline-block";

  gameResult.innerHTML = "🎮 Game Started! Guess the character!";
  hintBox.innerHTML = "";

  nextRound(false);
}

function stopGame() {
  gameActive = false;
  clearInterval(timerInterval);

  startGameBtn.style.display = "inline-block";
  skipBtn.style.display = "none";
  revealBtn.style.display = "none";

  gameResult.innerHTML = "";
  hintBox.innerHTML = "";
  gameCardImage.src = "";
  guessInput.value = "";
  guessInput.disabled = true;
  submitGuessBtn.disabled = true;
}

function nextRound(wasCorrect) {
  if (gameCharacterPool.length === 0) {
    endGame();
    return;
  }

  round++;
  updateStats();

  const randomIndex = Math.floor(Math.random() * gameCharacterPool.length);
  currentCharacterIndex = gameCharacterPool[randomIndex];
  gameCharacterPool.splice(randomIndex, 1);

  showBlurOverlays();

  const imageSrc = `cards/card${currentCharacterIndex + 1}.jpg`;
  gameCardImage.src = imageSrc;
  gameCardImage.onerror = () => {
    gameCardImage.src = `cards/card${currentCharacterIndex + 1}.png`;
  };

  guessInput.value = "";
  guessInput.disabled = false;
  submitGuessBtn.disabled = false;
  guessInput.focus();

  gameResult.innerHTML = wasCorrect
    ? `<span class="correct-answer">✅ Correct! Next character...</span>`
    : `Round ${round} - Make your guess!`;

  hintBox.innerHTML = `💡 Hint: This character is a <strong>${characters[currentCharacterIndex].category}</strong>`;

  startTimer();
}


function startTimer() {
  clearInterval(timerInterval);
  timeRemaining = 30;
  updateTimer();

  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimer();

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timeUp();
    }
  }, 1000);
}

function updateTimer() {
  timerText.textContent = `${timeRemaining}s`;
  const percentage = (timeRemaining / 30) * 100;
  timerFill.style.width = `${percentage}%`;

  if (timeRemaining <= 5) {
    timerFill.style.background = 'linear-gradient(90deg, #f44336, #e91e63)';
  } else if (timeRemaining <= 10) {
    timerFill.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
  } else {
    timerFill.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
  }
}

function timeUp() {
  gameResult.innerHTML = `<span class="wrong-answer">⏰ Time's up! The answer was: <strong>${characters[currentCharacterIndex].name}</strong></span>`;
  revealCharacter();
  streak = 0;
  updateStats();

  setTimeout(() => {
    nextRound(false);
  }, 3000);
}

function checkGuess() {
  const rawGuess = guessInput.value.trim();
  const normalizedGuess = normalizeString(rawGuess);
  const currentCharacter = characters[currentCharacterIndex];
  const normalizedAnswers = currentCharacter.answers.map(normalizeString);

  if (normalizedGuess === "") return;

  guessInput.disabled = true;
  submitGuessBtn.disabled = true;
  clearInterval(timerInterval);

  // Compare against predefined acceptable answers (case/diacritic insensitive)
  const isCorrect = normalizedAnswers.includes(normalizedGuess);

  if (isCorrect) {
    score += Math.max(10, timeRemaining * 2);
    streak++;
    updateStats();

    gameResult.innerHTML = `<span class="correct-answer">🎉 Correct! It's <strong>${currentCharacter.name}</strong>! (+${Math.max(10, timeRemaining * 2)} points)</span>`;
    revealCharacter();
    startConfetti();

    setTimeout(() => {
      stopConfetti();
      nextRound(true);
    }, 2500);
  } else {
    streak = 0;
    updateStats();
    gameResult.innerHTML = `<span class="wrong-answer">❌ Wrong! Try again...</span>`;
    guessInput.disabled = false;
    submitGuessBtn.disabled = false;
    guessInput.value = "";
    guessInput.focus();
    startTimer();
  }
}

function normalizeString(str) {
  return str.toLowerCase()
    .replace(/[áàâãä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôõö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]/g, '');
}

function revealCharacter() {
  // 🔹 Hide the blur overlays (revealing the name and image area)
  hideBlurOverlays();

  // 🔹 Stop timer and disable input
  clearInterval(timerInterval);
  guessInput.disabled = true;
  submitGuessBtn.disabled = true;
}

function showBlurOverlays() {
  if (blurName) {
    blurName.classList.remove("hidden");
  }

  if (blurImage) {
    blurImage.classList.remove("hidden");
  }

  if (gameCardImage) {
    gameCardImage.classList.remove("revealed");
  }
}

function hideBlurOverlays() {
  if (blurName) {
    blurName.classList.add("hidden");
  }

  if (blurImage) {
    blurImage.classList.add("hidden");
  }

  if (gameCardImage) {
    // Force reflow to restart animation if needed
    gameCardImage.classList.remove("revealed");
    void gameCardImage.offsetWidth;
    gameCardImage.classList.add("revealed");
  }
}


function updateStats() {
  scoreValue.textContent = score;
  streakValue.textContent = streak;
  roundValue.textContent = round;
}

function endGame() {
  gameActive = false;
  clearInterval(timerInterval);

  gameResult.innerHTML = `
    <div style="font-size: 28px; margin-bottom: 15px;">🎊 Game Over! 🎊</div>
    <div style="font-size: 20px;">Final Score: <strong>${score}</strong></div>
    <div style="font-size: 18px; margin-top: 10px;">Total Rounds: ${round}</div>
    <div style="font-size: 18px;">Best Streak: ${streak}</div>
  `;

  hintBox.innerHTML = "Click 'Start Game' to play again!";

  startGameBtn.style.display = "inline-block";
  skipBtn.style.display = "none";
  revealBtn.style.display = "none";
  guessInput.disabled = true;
  submitGuessBtn.disabled = true;

  if (score > 0) {
    startConfetti();
    setTimeout(stopConfetti, 3000);
  }
}

function startConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      spread: 80,
      startVelocity: 45,
      origin: { y: 0.6 },
      colors: ['#ffeb3b', '#fdd835', '#fbc02d']
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function stopConfetti() {
  confetti.reset();
}
