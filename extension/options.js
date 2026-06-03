/**
 * GibberishGone Options/Settings Page
 */

const defaultSource = document.getElementById('defaultSource');
const defaultTarget = document.getElementById('defaultTarget');
const autoCopy = document.getElementById('autoCopy');
const showToast = document.getElementById('showToast');
const saveBtn = document.getElementById('saveBtn');

// Load saved settings
chrome.storage.local.get(['defaultSource', 'defaultTarget', 'autoCopy', 'showToast'], (data) => {
  if (data.defaultSource) defaultSource.value = data.defaultSource;
  if (data.defaultTarget) defaultTarget.value = data.defaultTarget;
  if (data.autoCopy !== undefined) autoCopy.checked = data.autoCopy;
  if (data.showToast !== undefined) showToast.checked = data.showToast;
});

// Save settings
saveBtn.addEventListener('click', () => {
  const settings = {
    defaultSource: defaultSource.value,
    defaultTarget: defaultTarget.value,
    autoCopy: autoCopy.checked,
    showToast: showToast.checked
  };

  chrome.storage.local.set(settings, () => {
    saveBtn.textContent = 'Settings Saved!';
    saveBtn.classList.add('saved');
    setTimeout(() => {
      saveBtn.textContent = 'Save Settings';
      saveBtn.classList.remove('saved');
    }, 2000);
  });
});
