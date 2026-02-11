// Toggle Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    // Animasi simpel hamburger jadi X (Opsional)
    hamburger.classList.toggle("toggle");
  });
}

// Tutup menu saat link diklik (Biar gak nutupin layar)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

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

function changeSlide(direction, btn) {
  const slider = btn.closest(".slider");
  const slidesContainer = slider.querySelector(".slides");

  // KUNCI PERBAIKAN: Mencari elemen .slide ATAU .slide-item
  const slides = slidesContainer.querySelectorAll(".slide, .slide-item");
  const totalSlides = slides.length;

  if (totalSlides === 0) return;

  const isMultiple = slider.classList.contains("slider-multiple");
  let itemsInView = isMultiple ? (window.innerWidth <= 768 ? 2 : 4) : 1;

  // Cek apakah perlu digeser (misal foto cuma 1, ya jangan digeser)
  if (totalSlides <= itemsInView) return;

  let currentIdx = parseInt(slider.getAttribute("data-index") || "0");
  currentIdx += direction;

  // Logika Looping: Kembali ke awal atau lompat ke akhir
  if (currentIdx > totalSlides - itemsInView) {
    currentIdx = 0;
  } else if (currentIdx < 0) {
    currentIdx = totalSlides - itemsInView;
  }

  slider.setAttribute("data-index", currentIdx);

  // Hitung pergeseran
  const offset = -currentIdx * (100 / itemsInView);
  slidesContainer.style.transform = `translateX(${offset}%)`;

  // Pastikan tata letak tidak bergeser aneh saat di-klik
  slidesContainer.style.justifyContent = "flex-start";
}

// Fungsi untuk menjalankan slider otomatis
function initAutoSlide() {
  const allSliders = document.querySelectorAll(".slider:not(.slider-multiple)");

  allSliders.forEach((slider) => {
    setInterval(() => {
      const nextBtn = slider.querySelector(".next");
      if (nextBtn) nextBtn.click();
    }, 5000); // Ganti gambar setiap 5 detik
  });
}

// Jalankan saat halaman sudah selesai loading
window.addEventListener("load", initAutoSlide);
