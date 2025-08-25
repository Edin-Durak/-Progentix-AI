// Smooth fade-in animations for revealing elements
document.addEventListener("DOMContentLoaded", function () {
  // Elements to animate for request demo page
  const animateElements = [
    // Hero section
    ...document.querySelectorAll(".hero h1, .hero p"),
    // Video sections
    ...document.querySelectorAll(
      ".video-section p, .video-section h2, .video-section .btn"
    ),
    // Calendar section
    ...document.querySelectorAll(
      ".calendar-section h2, .calendar-section p, .calendar-container"
    ),
    // Questions section
    ...document.querySelectorAll(
      ".questions-section h2, .questions-section p, .questions-cta"
    ),
  ];

  // Set initial state - all elements start hidden
  animateElements.forEach((element) => {
    if (element) {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition =
        "opacity 0.8s ease-out, transform 0.8s ease-out";
    }
  });

  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe all elements
  animateElements.forEach((element) => {
    if (element) {
      observer.observe(element);
    }
  });

  // Simple reveal animation for hero and first video section on load
  const heroAndFirstVideoElements = [
    ...document.querySelectorAll(".hero h1, .hero p"),
    ...document.querySelectorAll(".video-section .video-background-container"),
  ];

  // Animate hero and first video elements on load
  heroAndFirstVideoElements.forEach((element, index) => {
    if (element) {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 300 + index * 200); // Staggered animation
    }
  });
});

// Lazy loading for Vimeo video
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("play-video-btn");
  const videoPlaceholder = document.getElementById("video-placeholder");
  const videoIframeContainer = document.getElementById(
    "video-iframe-container"
  );
  const vimeoIframe = document.getElementById("vimeo-iframe");

  if (!playButton || !videoPlaceholder || !videoIframeContainer || !vimeoIframe)
    return;

  let vimeoLoaded = false;
  let vimeoScriptLoaded = false;

  function loadVimeoVideo() {
    if (vimeoLoaded) return;

    // Load Vimeo script only when needed
    if (!vimeoScriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      document.head.appendChild(script);
      vimeoScriptLoaded = true;
    }

    // Load the iframe
    const dataSrc = vimeoIframe.getAttribute("data-src");
    if (dataSrc) {
      vimeoIframe.setAttribute("src", dataSrc);
    }

    // Show iframe and hide placeholder
    videoPlaceholder.style.display = "none";
    videoIframeContainer.style.display = "block";

    vimeoLoaded = true;
  }

  // Load video on play button click
  playButton.addEventListener("click", loadVimeoVideo);

  // Load video on Enter key press
  playButton.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      loadVimeoVideo();
    }
  });

  // Load video when it comes into view (optional - for better UX)
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !vimeoLoaded) {
          // Only load if user hasn't clicked play button yet
          // This prevents automatic loading but keeps the option open
        }
      });
    },
    { threshold: 0.5 }
  );

  videoObserver.observe(videoPlaceholder);
});

// Button hover animations
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-secondary");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.opacity = "0.9";
      this.style.transition = "transform 0.3s ease-out";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.transition = "transform 0.3s ease-out";
    });
  });
});

// Dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const dropdown = this.closest(".dropdown");
      const isActive = dropdown.classList.contains("active");

      // Close all other dropdowns
      document.querySelectorAll(".dropdown").forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
          otherDropdown
            .querySelector(".dropdown-toggle")
            .setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current dropdown
      dropdown.classList.toggle("active");
      this.setAttribute("aria-expanded", !isActive);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
        dropdown
          .querySelector(".dropdown-toggle")
          .setAttribute("aria-expanded", "false");
      });
    }
  });

  // Close dropdowns when pressing Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
        dropdown
          .querySelector(".dropdown-toggle")
          .setAttribute("aria-expanded", "false");
      });
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

      // Close all dropdowns when mobile menu is closed
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
        dropdown
          .querySelector(".dropdown-toggle")
          .setAttribute("aria-expanded", "false");
      });

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

// Cookie consent functionality
document.addEventListener("DOMContentLoaded", function () {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookies = document.getElementById("accept-cookies");
  const declineCookies = document.getElementById("decline-cookies");

  if (!cookieConsent || !acceptCookies || !declineCookies) return;

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (!cookieChoice) {
    // Show cookie banner after a short delay
    setTimeout(() => {
      cookieConsent.classList.add("show");
    }, 1000);
  }

  // Handle accept cookies
  acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "accepted");
    cookieConsent.classList.remove("show");
    cookieConsent.setAttribute("aria-hidden", "true");
  });

  // Handle decline cookies
  declineCookies.addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "declined");
    cookieConsent.classList.remove("show");
    cookieConsent.setAttribute("aria-hidden", "true");
  });
});

// Lazy load LeadConnector script only when calendar comes into view
document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.querySelector(".calendar-container");
  let leadConnectorScriptLoaded = false;

  if (!calendarContainer) return;

  const calendarObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !leadConnectorScriptLoaded) {
          // Load LeadConnector script only when calendar is visible
          const script = document.createElement("script");
          script.src = "https://link.msgsndr.com/js/form_embed.js";
          script.async = true;
          document.head.appendChild(script);
          leadConnectorScriptLoaded = true;
          calendarObserver.unobserve(entry.target); // Stop observing once loaded
        }
      });
    },
    { threshold: 0.1 }
  );

  calendarObserver.observe(calendarContainer);
});
