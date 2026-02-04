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

// Ganti fungsi slider lama dengan ini
function changeSlide(direction, btn) {
  // Cari slider terdekat dari tombol yang diklik
  const slider = btn.closest(".slider");
  const slidesContainer = slider.querySelector(".slides");
  // Hanya hitung slide yang ada di dalam slider ini saja
  const slides = slidesContainer.querySelectorAll(".slide, .slide-item");
  const totalSlides = slides.length;

  // Ambil index saat ini dari atribut data (atau mulai dari 0)
  let currentIdx = parseInt(slider.getAttribute("data-index") || "0");

  currentIdx += direction;

  // Logika Loop: balik ke awal atau ke paling akhir
  if (currentIdx >= totalSlides) {
    currentIdx = 0;
  } else if (currentIdx < 0) {
    currentIdx = totalSlides - 1;
  }

  // Simpan index baru ke atribut data slider tersebut
  slider.setAttribute("data-index", currentIdx);

  // Geser gambarnya
  const offset = -currentIdx * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;
}
