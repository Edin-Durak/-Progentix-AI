// Scroll-triggered step animations for Meet Sage section
document.addEventListener("DOMContentLoaded", function () {
  const sageSteps = document.querySelectorAll(".sage-step");
  const stepsContainer = document.querySelector(".sage-steps-container");
  const stepsWrapper = document.querySelector(".sage-steps-wrapper");

  if (!sageSteps.length || !stepsContainer || !stepsWrapper) return;

  let currentStep = 0;
  const totalSteps = sageSteps.length;
  const stepHeight = 400;
  const containerHeight = 4000; // Increased from 2900 to 4000 for longer scroll duration

  // Set initial state - first step visible, others hidden
  sageSteps.forEach((step, index) => {
    step.style.opacity = index === 0 ? "1" : "0";
    step.style.position = "absolute";
    step.style.top = "0";
    step.style.left = "0";
    step.style.width = "100%";
    step.style.height = "100%";
  });

  // Function to update step visibility based on scroll position
  function updateStepVisibility() {
    // Only apply scroll animations on desktop (>992px)
    if (window.innerWidth <= 992) return;

    const scrollTop = window.pageYOffset;
    const containerTop = stepsContainer.offsetTop;
    const relativeScroll = scrollTop - containerTop;

    // Calculate which step should be visible
    const stepIndex = Math.floor(relativeScroll / stepHeight);
    const clampedStepIndex = Math.max(0, Math.min(stepIndex, totalSteps - 1));

    if (clampedStepIndex !== currentStep) {
      currentStep = clampedStepIndex;

      sageSteps.forEach((step, index) => {
        if (index === clampedStepIndex) {
          step.style.opacity = "1";
        } else {
          step.style.opacity = "0";
        }
      });
    }
  }

  // Function to reset steps for mobile view
  function resetStepsForMobile() {
    if (window.innerWidth <= 992) {
      sageSteps.forEach((step, index) => {
        step.style.opacity = "1";
        step.style.position = "relative";
        step.style.top = "auto";
        step.style.left = "auto";
        step.style.width = "auto";
        step.style.height = "auto";
      });
    } else {
      // Restore desktop behavior
      sageSteps.forEach((step, index) => {
        step.style.opacity = index === 0 ? "1" : "0";
        step.style.position = "absolute";
        step.style.top = "0";
        step.style.left = "0";
        step.style.width = "100%";
        step.style.height = "100%";
      });
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", updateStepVisibility);

  // Initial call
  updateStepVisibility();
  resetStepsForMobile();

  // Add smooth transitions
  sageSteps.forEach((step) => {
    step.style.transition = "opacity 0.6s ease-in-out";
  });

  // Handle window resize for steps
  window.addEventListener("resize", function () {
    resetStepsForMobile();
    updateStepVisibility();
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
      hamburgerMenu.style.display = "block";
      closeMenu.style.display = "none";
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

    if (!isMobile || nav.classList.contains("active")) {
      // If resizing to desktop and menu is open, close it
      nav.classList.remove("active");
      hamburgerMenu.style.display = "none"; // Hide hamburger on desktop
      closeMenu.style.display = "none";
      document.body.style.overflow = "";
    } else if (isMobile || !nav.classList.contains("active")) {
      // If resizing to mobile and menu is closed, show hamburger
      hamburgerMenu.style.display = "block";
      closeMenu.style.display = "none";
    }
  });
});
