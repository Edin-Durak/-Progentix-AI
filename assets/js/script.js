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

  // Add scroll event listener
  window.addEventListener("scroll", updateStepVisibility);

  // Initial call
  updateStepVisibility();

  // Add smooth transitions
  sageSteps.forEach((step) => {
    step.style.transition = "opacity 0.6s ease-in-out";
  });
});
