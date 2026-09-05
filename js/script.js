/* =========================================================
   Shashini Anjana — Portfolio JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initStickyNav();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initContactForm();
});

/* Footer year */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* Navbar background on scroll */
function initStickyNav() {
  const nav = document.getElementById("siteNav");
  if (!nav) return;
  const toggleScrolled = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  toggleScrolled();
  window.addEventListener("scroll", toggleScrolled, { passive: true });
}

/* Mobile hamburger menu */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Smooth scroll for in-page anchors (fallback for browsers/older support) */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* Fade-in-on-scroll for sections and cards */
function initScrollReveal() {
  const revealTargets = document.querySelectorAll(
    ".highlight-card, .skill-group, .timeline-item, .project-card, .cert-card, .section-title, .section-sub, .contact-form"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

/* -----------------------------------------------------------
   Contact form (frontend-only)
   -----------------------------------------------------------
   There is no backend connected yet. On submit, this validates
   the fields and shows a confirmation message locally.

   TO CONNECT A REAL BACKEND / EMAIL SERVICE:
   1. Pick a service (e.g. Formspree, EmailJS, Netlify Forms,
      or your own API endpoint).
   2. Replace the body of handleContactSubmit() below with a
      fetch() call (or the service's SDK call) that sends
      { name, email, subject, message } to that service.
   3. Keep the success/error UI feedback pattern already in place.
   ----------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleContactSubmit(form, status);
  });
}

function handleContactSubmit(form, status) {
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const subject = (data.get("subject") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  if (!name || !email || !subject || !message) {
    status.textContent = "Please fill in every field before sending.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = "Please enter a valid email address.";
    return;
  }

  // ---- Replace this block with a real API / email-service call ----
  console.log("Contact form submission (no backend connected yet):", {
    name,
    email,
    subject,
    message,
  });
  // -------------------------------------------------------------------

  status.textContent = `Thanks, ${name}! Your message is ready to send once a backend is connected.`;
  form.reset();
}
