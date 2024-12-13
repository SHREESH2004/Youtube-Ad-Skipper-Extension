const toggleSwitch = document.getElementById('toggle-skip');
const statusText = document.getElementById('status');

// Load the current state from storage
chrome.storage.local.get(['isEnabled'], (result) => {
  const isEnabled = result.isEnabled ?? false;
  toggleSwitch.checked = isEnabled;
  statusText.innerHTML = `Ad skipper is <strong>${isEnabled ? 'ON' : 'OFF'}</strong>`;
});

// Update the state when the toggle is switched
toggleSwitch.addEventListener('change', () => {
  const isEnabled = toggleSwitch.checked;
  chrome.storage.local.set({ isEnabled });
  statusText.innerHTML = `Ad skipper is <strong>${isEnabled ? 'ON' : 'OFF'}</strong>`;

  // Notify content script of the change
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { isEnabled });
  });
});
