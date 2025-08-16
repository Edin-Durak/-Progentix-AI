// Smooth fade-in animations for revealing elements
document.addEventListener("DOMContentLoaded", function () {
  // Hero section elements (animate on load)
  const heroElements = document.querySelectorAll(
    ".hero h1, .hero p, .hero-content"
  );

  // Scroll-triggered elements (animate when scrolled into view)
  const scrollElements = [
    ...document.querySelectorAll(".video-section .video-background-container"),
    ...document.querySelectorAll(
      ".questions-section h2, .questions-section p, .questions-cta"
    ),
  ];

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

  // Observe only scroll-triggered elements
  scrollElements.forEach((element) => {
    if (element) {
      observer.observe(element);
    }
  });

  // Animate hero elements on load (not scroll-triggered)
  heroElements.forEach((element, index) => {
    if (element) {
      // Faster animations on mobile
      const isMobile = window.innerWidth <= 768;
      const baseDelay = isMobile ? 100 : 300;
      const staggerDelay = isMobile ? 100 : 200;

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, baseDelay + index * staggerDelay);
    }
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
  });

  // Handle decline cookies
  declineCookies.addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "declined");
    cookieConsent.classList.remove("show");
    cookieConsent.setAttribute("aria-hidden", "true");
  });
});

// Check if user came from try for free form and handle iframe loading
document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.querySelector(
    'iframe[id="1Apvjp0z8wGl5dN5FJRJ_1753768402838"]'
  );

  if (!iframe) return;

  // Check if user accepted cookies
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (cookieChoice === "accepted") {
    // User accepted cookies, iframe should load normally
    console.log("Cookies accepted, iframe will load normally");
  } else if (cookieChoice === "declined") {
    // User declined cookies, show message or handle accordingly
    console.log("Cookies declined, iframe may not function properly");

    // Optionally show a message to the user
    const bookingWidget = document.querySelector(".hero-booking-widget");
    if (bookingWidget) {
      const message = document.createElement("div");
      message.style.cssText = `
        color: white;
        text-align: center;
        padding: 2rem;
        font-size: 1.1rem;
        line-height: 1.5;
      `;
      message.innerHTML = `
        <p>To book your call, please accept cookies in the banner above.</p>
        <p>This allows the booking widget to function properly.</p>
      `;
      bookingWidget.appendChild(message);
    }
  } else {
    // No choice made yet, wait for user decision
    console.log("No cookie choice made yet");
  }
});

// Hover animations for interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Button hover animations
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.transition = "transform 0.3s ease-out";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.transition = "transform 0.3s ease-out";
    });
  });
});
