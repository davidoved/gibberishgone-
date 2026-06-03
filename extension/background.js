/**
 * GibberishGone Background Service Worker
 * Handles context menus, keyboard shortcuts, and cross-tab messaging
 */

// ==========================================
// CONTEXT MENU
// ==========================================

chrome.runtime.onInstalled.addListener(() => {
  // Main parent menu
  chrome.contextMenus.create({
    id: 'gibberishgone-root',
    title: 'GibberishGone',
    contexts: ['selection', 'editable'],
    documentUrlPatterns: ['<all_urls>']
  });

  // Auto-fix selected text
  chrome.contextMenus.create({
    id: 'fix-selection-auto',
    parentId: 'gibberishgone-root',
    title: 'Fix Selected Text (Auto-detect)',
    contexts: ['selection'],
    documentUrlPatterns: ['<all_urls>']
  });

  // Fix from specific layouts
  const layouts = [
    { id: 'fix-from-he', title: 'Fix from Hebrew layout', lang: 'he' },
    { id: 'fix-from-ru', title: 'Fix from Russian layout', lang: 'ru' },
    { id: 'fix-from-ar', title: 'Fix from Arabic layout', lang: 'ar' },
    { id: 'fix-from-gr', title: 'Fix from Greek layout', lang: 'gr' },
    { id: 'fix-from-en', title: 'Fix from English layout', lang: 'en' }
  ];

  layouts.forEach(l => {
    chrome.contextMenus.create({
      id: l.id,
      parentId: 'gibberishgone-root',
      title: l.title,
      contexts: ['selection'],
      documentUrlPatterns: ['<all_urls>']
    });
  });

  // Separator
  chrome.contextMenus.create({
    id: 'separator-1',
    parentId: 'gibberishgone-root',
    type: 'separator',
    contexts: ['selection', 'editable'],
    documentUrlPatterns: ['<all_urls>']
  });

  // Fix input field
  chrome.contextMenus.create({
    id: 'fix-input-auto',
    parentId: 'gibberishgone-root',
    title: 'Fix Text in This Input',
    contexts: ['editable'],
    documentUrlPatterns: ['<all_urls>']
  });

  // Open popup
  chrome.contextMenus.create({
    id: 'open-popup',
    parentId: 'gibberishgone-root',
    title: 'Open GibberishGone',
    contexts: ['selection', 'editable', 'page'],
    documentUrlPatterns: ['<all_urls>']
  });
});

// ==========================================
// CONTEXT MENU HANDLER
// ==========================================

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;

  const menuId = info.menuItemId;

  if (menuId === 'open-popup') {
    chrome.action.openPopup();
    return;
  }

  // Fix selected text with auto-detect
  if (menuId === 'fix-selection-auto' && info.selectionText) {
    const detected = detectLayout(info.selectionText);
    chrome.tabs.sendMessage(tab.id, {
      action: 'fix-selection',
      text: info.selectionText,
      sourceLang: detected.source,
      targetLang: detected.target
    });
    return;
  }

  // Fix selected text from specific layout
  const layoutMap = {
    'fix-from-he': { source: 'he', target: 'en' },
    'fix-from-ru': { source: 'ru', target: 'en' },
    'fix-from-ar': { source: 'ar', target: 'en' },
    'fix-from-gr': { source: 'gr', target: 'en' },
    'fix-from-en': { source: 'en', target: 'he' }
  };

  if (layoutMap[menuId] && info.selectionText) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'fix-selection',
      text: info.selectionText,
      sourceLang: layoutMap[menuId].source,
      targetLang: layoutMap[menuId].target
    });
    return;
  }

  // Fix input field
  if (menuId === 'fix-input-auto') {
    chrome.tabs.sendMessage(tab.id, {
      action: 'fix-input-auto'
    });
  }
});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

chrome.commands.onCommand.addListener(async (command, tab) => {
  if (command === 'fix-selection' && tab?.id) {
    try {
      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString()
      });

      if (result) {
        const detected = detectLayout(result);
        chrome.tabs.sendMessage(tab.id, {
          action: 'fix-selection',
          text: result,
          sourceLang: detected.source,
          targetLang: detected.target
        });
      }
    } catch {
      // No selection or restricted page
    }
  }
});

// ==========================================
// AUTO-DETECT LAYOUT
// ==========================================

function detectLayout(text) {
  if (!text || text.length < 2) return { source: 'he', target: 'en' };

  const sample = text.slice(0, 50);

  // Hebrew characters
  const hebrewChars = /[\u0590-\u05FF]/;
  // Russian characters
  const russianChars = /[\u0400-\u04FF]/;
  // Arabic characters
  const arabicChars = /[\u0600-\u06FF]/;
  // Greek characters
  const greekChars = /[\u0370-\u03FF]/;

  // Check if text is in a native script (user probably typed in wrong LATIN layout)
  if (hebrewChars.test(sample)) return { source: 'en', target: 'he' };
  if (russianChars.test(sample)) return { source: 'en', target: 'ru' };
  if (arabicChars.test(sample)) return { source: 'en', target: 'ar' };
  if (greekChars.test(sample)) return { source: 'en', target: 'gr' };

  // Text is Latin — figure out which layout it was typed in
  const heReverse = { 'a':'ש','b':'נ','c':'ב','d':'ג','e':'ק','f':'כ','g':'ע','h':'י','i':'ן','j':'ח','k':'ל','l':'ך','m':'צ','n':'מ','o':'ם','p':'פ','q':'/','r':'ר','s':'ד','t':'א','u':'ו','v':'ה','w':'\'','x':'ס','y':'ט','z':'ז',',':'ת','.':'ץ' };
  const ruReverse = { 'a':'ф','b':'и','c':'с','d':'в','e':'у','f':'а','g':'п','h':'р','i':'ш','j':'о','k':'л','l':'д','m':'ь','n':'т','o':'щ','p':'з','q':'й','r':'к','s':'ы','t':'е','u':'г','v':'м','w':'ц','x':'ч','y':'н','z':'я' };

  let heScore = 0, ruScore = 0;
  for (const char of sample.toLowerCase()) {
    if (heReverse[char]) heScore++;
    if (ruReverse[char]) ruScore++;
  }

  if (ruScore > heScore && ruScore > 2) return { source: 'ru', target: 'en' };
  if (heScore > 2) return { source: 'he', target: 'en' };

  return { source: 'he', target: 'en' };
}

// ==========================================
// MESSAGE HANDLING FROM CONTENT/POPUP
// ==========================================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'detect-layout') {
    sendResponse(detectLayout(request.text));
    return true;
  }

  if (request.action === 'get-settings') {
    chrome.storage.local.get(['defaultSource', 'defaultTarget', 'autoCopy']).then(data => {
      sendResponse(data);
    });
    return true;
  }

  if (request.action === 'save-settings') {
    chrome.storage.local.set(request.data).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});

console.log('[GibberishGone] Background service worker started.');
