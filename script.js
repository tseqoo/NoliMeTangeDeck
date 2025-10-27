const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");

// Numbers 1–10 (each represents a slice)
let remainingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

spinBtn.addEventListener("click", () => {
  if (remainingNumbers.length === 0) {
    result.textContent = "🎉 All cards have been drawn!";
    spinBtn.disabled = true;
    return;
  }

  // Pick a random number from the remaining ones
  const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
  const selectedNumber = remainingNumbers[randomIndex];

  // Each slice = 36 degrees (360 / 10)
  const slice = 36;
  const randomDegree = 360 * 5 + (selectedNumber - 1) * slice + slice / 2;

  // Spin animation
  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${randomDegree}deg)`;

  spinBtn.disabled = true;
  result.textContent = "Spinning... 🎯";

  // Wait for the spin animation to finish
  setTimeout(() => {
    const imageSrc = `cards/card${selectedNumber}.jpg`;

    // Show basic result text
    result.innerHTML = `
      <p>You drew Card ${selectedNumber}!</p>
      <img src="${imageSrc}" width="120" style="border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.3);">
    `;

    // Remove selected number
    remainingNumbers.splice(randomIndex, 1);

    // Show popup fullscreen card + confetti
    showCardPopup(imageSrc);

    spinBtn.disabled = false;

    if (remainingNumbers.length === 0) {
      result.innerHTML += "<p>🎉 All cards have been drawn!</p>";
      spinBtn.disabled = true;
    }
  }, 4000); // Match spin duration
});

// 🌟 POPUP + CONFETTI FUNCTIONS
function showCardPopup(imageSrc) {
  const popup = document.getElementById("cardPopup");
  const popupImage = document.getElementById("popupImage");

  popupImage.src = imageSrc;
  popup.style.display = "flex";

  // 🎊 Start confetti
  startConfetti();

  // Click anywhere to close popup
  popup.onclick = () => {
    popup.style.display = "none";
    stopConfetti();
  };
}

function startConfetti() {
  const duration = 3 * 1000; // 3 seconds
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      spread: 70,
      startVelocity: 40,
      origin: { y: 0.6 },
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function stopConfetti() {
  // Optional cleanup (canvas-confetti handles it automatically)
}
