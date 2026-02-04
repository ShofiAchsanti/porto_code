// 1. Toggle Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// 2. Klik di luar menu untuk menutup (khusus mobile)
document.addEventListener("click", (e) => {
  if (
    hamburger &&
    navLinks &&
    !hamburger.contains(e.target) &&
    !navLinks.contains(e.target)
  ) {
    navLinks.classList.remove("show");
  }
});

// 3. Fade in halaman
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// 4. Audio Intro (Cek elemen dulu biar gak error)
const introAudio = document.getElementById("introAudio");
if (introAudio) {
  introAudio.volume = 0.5;
  introAudio.muted = true;
  introAudio.play().catch((err) => console.log("Audio blocked:", err));

  document.addEventListener(
    "click",
    () => {
      introAudio.muted = false;
    },
    { once: true },
  );
}

// Fungsi untuk show tab
function showTab(tabId) {
  // Hide semua tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });
  // Remove active dari semua tab
  document.querySelectorAll(".tab-card").forEach((card) => {
    card.classList.remove("active");
  });
  // Show tab yang dipilih
  document.getElementById(tabId).classList.add("active");
  // Add active ke tab yang diklik
  event.target.classList.add("active");
}

// Slider Functionality
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;
  document.querySelector(".slides").style.transform =
    `translateX(-${currentSlide * 100}%)`;
}

function changeSlide(direction) {
  currentSlide += direction;
  showSlide(currentSlide);
}

// Auto-slide setiap 3 detik (opsional, hapus kalau gak mau)
setInterval(() => {
  changeSlide(1);
}, 3000);
