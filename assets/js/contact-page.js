// Cookie consent functionality for form page
document.addEventListener("DOMContentLoaded", function () {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookies = document.getElementById("accept-cookies");
  const declineCookies = document.getElementById("decline-cookies");

  if (!cookieConsent || !acceptCookies || !declineCookies) return;

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (!cookieChoice || cookieChoice === "declined") {
    // Show cookie banner after a short delay
    setTimeout(() => {
      cookieConsent.classList.add("show");
      cookieConsent.setAttribute("aria-hidden", "false");
    }, 1000);
  }

  // Handle accept cookies
  acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "accepted");
    cookieConsent.classList.remove("show");
    cookieConsent.setAttribute("aria-hidden", "true");

    // Load the form iframe after accepting cookies
    loadFormIframe();
  });

  // Handle decline cookies
  declineCookies.addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "declined");
    cookieConsent.classList.remove("show");
    cookieConsent.setAttribute("aria-hidden", "true");
  });
});

// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  const modalTriggers = document.querySelectorAll(
    '[data-modal-trigger="try-free"]'
  );

  if (!modalOverlay || !modalClose) return;

  // Open modal
  function openModal() {
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll

    // Trigger iframe loading
    setTimeout(() => {
      const iframe = document.querySelector("#inline-o1BMyrgvIR7zUg4daTCg");
      const iframePlaceholder = document.getElementById("iframe-placeholder");
      const cookieConsentMessage = document.getElementById(
        "cookie-consent-message"
      );
      const modalLoading = document.getElementById("modal-loading");
      let iframeLoaded = false;
      let thirdPartyScriptLoaded = false;

      if (!iframe || !iframePlaceholder) return;

      // Reset modal state first
      if (iframePlaceholder) {
        iframePlaceholder.classList.remove("hidden");
      }
      if (cookieConsentMessage) {
        cookieConsentMessage.style.display = "none";
      }
      if (modalLoading) {
        modalLoading.style.display = "none";
      }
      if (iframe) {
        iframe.style.opacity = "0";
      }

      // Check cookie consent
      const cookieChoice = localStorage.getItem("cookie-consent");
      if (cookieChoice === "accepted") {
        // Cookies accepted - show loading animation
        if (modalLoading) {
          modalLoading.style.display = "flex";
        }

        // Load iframe
        const dataSrc = iframe.getAttribute("data-src");
        if (dataSrc && !iframeLoaded) {
          iframe.setAttribute("src", dataSrc);
          iframeLoaded = true;
        }

        // Load third-party script only when needed
        if (!thirdPartyScriptLoaded) {
          const script = document.createElement("script");
          script.src = "https://link.msgsndr.com/js/form_embed.js";
          script.async = true;
          document.head.appendChild(script);
          thirdPartyScriptLoaded = true;
        }

        // Wait 2 seconds, then hide loading and show iframe
        setTimeout(() => {
          if (modalLoading) {
            modalLoading.style.display = "none";
          }
          if (iframePlaceholder) {
            iframePlaceholder.classList.add("hidden");
          }
          // Fade in the iframe
          iframe.style.opacity = "1";
        }, 2000);
      } else {
        // Cookies not accepted - show cookie consent message
        console.log("Cookies not accepted, showing consent message");
        if (cookieConsentMessage) {
          cookieConsentMessage.style.display = "block";
        }
      }
    }, 100);
  }

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scroll
  }

  // Event listeners for opening modal
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Event listener for closing modal
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});

// Mobile navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const closeMenu = document.querySelector(".close-menu");
  const nav = document.querySelector(".nav");

  if (!hamburgerMenu || !closeMenu || !nav) return;

  // Open mobile menu
  hamburgerMenu.addEventListener("click", function () {
    nav.classList.add("active");
    hamburgerMenu.style.display = "none";
    closeMenu.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scroll
  });

  // Close mobile menu
  closeMenu.addEventListener("click", function () {
    nav.classList.remove("active");
    hamburgerMenu.style.display = "block";
    closeMenu.style.display = "none";
    document.body.style.overflow = ""; // Restore scroll
  });

  // Close menu when clicking on navigation links
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("active");

      // Only show hamburger on mobile
      if (window.innerWidth <= 768) {
        hamburgerMenu.style.display = "block";
        closeMenu.style.display = "none";
      } else {
        hamburgerMenu.style.display = "none";
        closeMenu.style.display = "none";
      }

      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  nav.addEventListener("click", function (e) {
    if (e.target === nav) {
      nav.classList.remove("active");
      hamburgerMenu.style.display = "block";
      closeMenu.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    const isMobile = window.innerWidth <= 768;

    // Temporarily disable transitions during resize
    nav.style.transition = "none";

    if (!isMobile) {
      // Desktop behavior - always hide hamburger and close menu
      nav.classList.remove("active");
      hamburgerMenu.style.display = "none";
      closeMenu.style.display = "none";
      document.body.style.overflow = "";
    } else if (isMobile && !nav.classList.contains("active")) {
      // Mobile behavior - show hamburger only if menu is closed
      hamburgerMenu.style.display = "block";
      closeMenu.style.display = "none";
    }

    // Re-enable transitions after a short delay
    setTimeout(() => {
      nav.style.transition = "";
    }, 50);
  });
});

// Function to load the form iframe
function loadFormIframe() {
  const iframe = document.querySelector("#inline-Kfr2GGGO1qgskPpIePm9");
  const loadingElement = document.getElementById("contact-loading");

  if (!iframe) return;

  // Check if cookies are accepted
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (cookieChoice === "accepted") {
    // Set cookie consent for LeadConnector
    localStorage.setItem("leadconnector-cookies-accepted", "true");

    // Change text to loading message
    if (loadingElement) {
      const loadingText = loadingElement.querySelector("p");
      if (loadingText) {
        loadingText.textContent = "Loading contact form. Please wait...";
      }
    }

    // Load third-party script if not already loaded
    if (
      !document.querySelector(
        'script[src="https://link.msgsndr.com/js/form_embed.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.head.appendChild(script);
    }

    // Wait 2 seconds, then fade in the iframe and hide loading
    setTimeout(() => {
      if (loadingElement) {
        loadingElement.style.display = "none";
      }
      iframe.style.opacity = "1";
    }, 2000);
  }
}

// Auto-load form if cookies are already accepted
document.addEventListener("DOMContentLoaded", function () {
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (cookieChoice === "accepted") {
    loadFormIframe();
  } else if (cookieChoice === "declined") {
    // Show cookie consent message in loading placeholder for declined users
    loadFormIframe();
  }
});
