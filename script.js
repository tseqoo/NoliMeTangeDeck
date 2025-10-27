const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");
const progressText = document.getElementById("progressText");

// 51 characters from Noli Me Tangere - organized by category
const characters = [
  // A. Main / Central Characters (16)
  { name: "Juan Crisóstomo Ibarra y Magsalin", category: "Main Character" },
  { name: "María Clara", category: "Main Character" },
  { name: "Elías", category: "Main Character" },
  { name: "Captain Tiago", category: "Main Character" },
  { name: "Father Dámaso Verdolagas", category: "Main Character" },
  { name: "Father Salvi", category: "Main Character" },
  { name: "Don Rafael Ibarra", category: "Main Character" },
  { name: "Pilosopo Tasyo", category: "Main Character" },
  { name: "Doña Victorina de los Reyes de Espadaña", category: "Main Character" },
  { name: "Don Tiburcio de Espadaña", category: "Main Character" },
  { name: "Sisa", category: "Main Character" },
  { name: "Basilio", category: "Main Character" },
  { name: "Crispin", category: "Main Character" },
  { name: "Doña Consolación", category: "Main Character" },
  { name: "The Ensign (The Alférez)", category: "Main Character" },
  { name: "Father Sibyla", category: "Main Character" },
  
  // B. Clergy / Church Workers (2)
  { name: "The Chief Sexton", category: "Clergy / Church Workers" },
  { name: "The Gravedigger", category: "Clergy / Church Workers" },
  
  // C. Government / Authority Figures (8)
  { name: "Lt. Guevara", category: "Government / Authority Figures" },
  { name: "The Mayor", category: "Government / Authority Figures" },
  { name: "Captain General", category: "Government / Authority Figures" },
  { name: "Don Filipo", category: "Government / Authority Figures" },
  { name: "Captain Basilio", category: "Government / Authority Figures" },
  { name: "Captain Tinong", category: "Government / Authority Figures" },
  { name: "Captain Valentin", category: "Government / Authority Figures" },
  { name: "Captain Maria", category: "Government / Authority Figures" },
  
  // D. Upper-Class / Educated Citizens (9)
  { name: "Doña Pia Alba", category: "Upper-Class / Educated Citizens" },
  { name: "Aunt Isabel", category: "Upper-Class / Educated Citizens" },
  { name: "Linares", category: "Upper-Class / Educated Citizens" },
  { name: "Don Pedro Eibarramendia", category: "Upper-Class / Educated Citizens" },
  { name: "Don Saturnino", category: "Upper-Class / Educated Citizens" },
  { name: "Don Primitivo", category: "Upper-Class / Educated Citizens" },
  { name: "The Schoolmaster", category: "Upper-Class / Educated Citizens" },
  { name: "The Yellowish Individual", category: "Upper-Class / Educated Citizens" },
  { name: "Tinchang", category: "Upper-Class / Educated Citizens" },
  
  // E. Commoners / Poor or Working-Class (9)
  { name: "Lucas", category: "Commoners / Poor or Working-Class" },
  { name: "Tarsilo Alasigan", category: "Commoners / Poor or Working-Class" },
  { name: "Bruno Alasigan", category: "Commoners / Poor or Working-Class" },
  { name: "Captain Pablo", category: "Commoners / Poor or Working-Class" },
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

let remainingIndices = characters.map((_, i) => i);
let currentRotation = 0;

// Category colors - one color per category
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
  
  // Draw each segment
  characters.forEach((character, index) => {
    const startAngle = index * segmentAngle - Math.PI / 2;
    const endAngle = startAngle + segmentAngle;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    
    // Alternate between lighter and darker shades
    const baseColor = categoryColors[character.category];
    ctx.fillStyle = index % 2 === 0 ? baseColor : shadeColor(baseColor, -15);
    ctx.fill();
    
    // Draw segment border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw number
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
  
  // Set wheel background to the canvas
  wheel.style.backgroundImage = `url(${canvas.toDataURL()})`;
  wheel.style.backgroundSize = 'cover';
}

// Helper function to darken/lighten colors
function shadeColor(color, percent) {
  const num = parseInt(color.replace("#",""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
    (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
    .toString(16).slice(1);
}

createWheel();

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