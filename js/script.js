// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // 1. Smooth scroll navbar
  // ==============================
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ==============================
  // 2. Navbar mengecil saat scroll
  // ==============================
  const navbar = document.querySelector(".navbar");

  const handleNavbar = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };

  handleNavbar();
  window.addEventListener("scroll", handleNavbar);

  // ==============================
  // 3. Highlight menu aktif saat scroll
  // ==============================
  const sections = document.querySelectorAll("section[id]");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(
          `.nav-links a[href="#${id}"]`
        );

        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // ==============================
  // 4. Reveal animation untuk elemen
  // ==============================
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ==============================
  // 5. Form kontak: validasi sederhana
  // ==============================
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector("textarea");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      const errors = [];

      if (!name) errors.push("Nama wajib diisi");
      if (!email) {
        errors.push("Email wajib diisi");
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("Format email tidak valid");
      }
      if (!message) errors.push("Pesan belum diisi");

      let notice = contactForm.querySelector(".form-notice");
      if (!notice) {
        notice = document.createElement("div");
        notice.className = "form-notice";
        contactForm.prepend(notice);
      }

      if (errors.length) {
        notice.dataset.status = "error";
        notice.textContent = errors.join(" • ");
      } else {
        notice.dataset.status = "success";
        notice.textContent =
          "Terima kasih! Pesan kamu sudah tercatat (simulasi, belum terkirim ke server).";
        contactForm.reset();
      }
    });
  }
});
