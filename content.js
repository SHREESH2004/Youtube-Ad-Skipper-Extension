let isEnabled = false;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.isEnabled !== undefined) {
    isEnabled = request.isEnabled;
  }
});

// Function to observe and skip ads
function observeAds() {
  if (!isEnabled) return;

  const adObserver = new MutationObserver(() => {
    const skipButton = document.querySelector('.ytp-ad-skip-button');
    if (skipButton) {
      skipButton.click();
      console.log("Ad skipped!");
    }
  });

  adObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Run observer on load
window.addEventListener('load', () => {
  observeAds();
});
