// FAQ Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Cookie consent functionality
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookies = document.getElementById("accept-cookies");
  const declineCookies = document.getElementById("decline-cookies");

  // Check if cookies were already accepted
  if (localStorage.getItem("cookiesAccepted") === "true") {
    cookieConsent.style.display = "none";
  }

  // Accept cookies
  if (acceptCookies) {
    acceptCookies.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "true");
      cookieConsent.style.display = "none";
    });
  }

  // Decline cookies
  if (declineCookies) {
    declineCookies.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "false");
      cookieConsent.style.display = "none";
    });
  }

  // Mobile navigation functionality
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const closeMenu = document.querySelector(".close-menu");
  const nav = document.querySelector(".nav");
  const body = document.body;

  if (hamburgerMenu && closeMenu && nav) {
    hamburgerMenu.addEventListener("click", function () {
      nav.classList.add("nav-open");
      body.classList.add("overflow-hidden");
    });

    closeMenu.addEventListener("click", function () {
      nav.classList.remove("nav-open");
      body.classList.remove("overflow-hidden");
    });

    // Close nav when clicking on nav links
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("nav-open");
        body.classList.remove("overflow-hidden");
      });
    });
  }

  // Modal functionality
  const modalTriggers = document.querySelectorAll("[data-modal-trigger]");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.querySelector(".modal-close");

  if (modalTriggers.length > 0 && modalOverlay) {
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        modalOverlay.setAttribute("aria-hidden", "false");
        modalOverlay.style.display = "flex";
        body.classList.add("overflow-hidden");
      });
    });
  }

  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", function () {
      modalOverlay.setAttribute("aria-hidden", "true");
      modalOverlay.style.display = "none";
      body.classList.remove("overflow-hidden");
    });

    // Close modal when clicking overlay
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        modalOverlay.setAttribute("aria-hidden", "true");
        modalOverlay.style.display = "none";
        body.classList.remove("overflow-hidden");
      }
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // FAQ section highlighting
  const faqSections = document.querySelectorAll(".faq-text h2");
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -20% 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  faqSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Close modal with Escape key
    if (
      e.key === "Escape" &&
      modalOverlay &&
      modalOverlay.style.display === "flex"
    ) {
      modalOverlay.setAttribute("aria-hidden", "true");
      modalOverlay.style.display = "none";
      body.classList.remove("overflow-hidden");
    }

    // Close mobile nav with Escape key
    if (e.key === "Escape" && nav && nav.classList.contains("nav-open")) {
      nav.classList.remove("nav-open");
      body.classList.remove("overflow-hidden");
    }
  });

  // Load iframe form when cookies are accepted
  window.loadIframeForm = function () {
    const iframe = document.getElementById("inline-o1BMyrgvIR7zUg4daTCg");
    const placeholder = document.getElementById("iframe-placeholder");
    const loading = document.getElementById("modal-loading");
    const cookieMessage = document.getElementById("cookie-consent-message");

    if (iframe && placeholder && loading && cookieMessage) {
      cookieMessage.style.display = "none";
      loading.style.display = "block";

      // Set the src to load the iframe
      iframe.src = iframe.getAttribute("data-src");

      iframe.onload = function () {
        loading.style.display = "none";
        iframe.style.opacity = "1";
      };
    }
  };

  // Hide iframe placeholder
  window.hideIframePlaceholder = function () {
    const placeholder = document.getElementById("iframe-placeholder");
    if (placeholder) {
      placeholder.style.display = "none";
    }
  };
});
