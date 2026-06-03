/**
 * GibberishGone Content Script
 * Injected into all web pages to enable inline text fixing
 */

// ==========================================
// MAPPING TABLES (same as popup.js)
// ==========================================

const MAPPINGS = {
  ru: { map: {
    'q':'й','w':'ц','e':'у','r':'к','t':'е','y':'н','u':'г','i':'ш','o':'щ','p':'з','[':'х',']':'ъ',
    'a':'ф','s':'ы','d':'в','f':'а','g':'п','h':'р','j':'о','k':'л','l':'д',';':'ж','\'':'э',
    'z':'я','x':'ч','c':'с','v':'м','b':'и','n':'т','m':'ь',',':'б','.':'ю','/':'.',
    'Q':'Й','W':'Ц','E':'У','R':'К','T':'Е','Y':'Н','U':'Г','I':'Ш','O':'Щ','P':'З','{':'Х','}':'Ъ',
    'A':'Ф','S':'Ы','D':'В','F':'А','G':'П','H':'Р','J':'О','K':'Л','L':'Д',':':'Ж','"':'Э',
    'Z':'Я','X':'Ч','C':'С','V':'М','B':'И','N':'Т','M':'Ь','<':'Б','>':'Ю','?':','
  }},
  he: { map: {
    'q':'/','w':'\'','e':'ק','r':'ר','t':'א','y':'ט','u':'ו','i':'ן','o':'ם','p':'פ','[':']',']':'[',
    'a':'ש','s':'ד','d':'ג','f':'כ','g':'ע','h':'י','j':'ח','k':'ל','l':'ך',';':'ף','\'':',',
    'z':'ז','x':'ס','c':'ב','v':'ה','b':'נ','n':'מ','m':'צ',',':'ת','.':'ץ','/':'.',
    'Q':'/','W':'\'','E':'ק','R':'ר','T':'א','Y':'ט','U':'ו','I':'ן','O':'ם','P':'פ','{':'}','}':'{',
    'A':'ש','S':'ד','D':'ג','F':'כ','G':'ע','H':'י','J':'ח','K':'ל','L':'ך',':':'ף','"':',',
    'Z':'ז','X':'ס','C':'ב','V':'ה','B':'נ','N':'מ','M':'צ','<':'ת','>':'ץ','?':'.'
  }},
  ar: { map: {
    'q':'ض','w':'ص','e':'ث','r':'ق','t':'ف','y':'غ','u':'ع','i':'ه','o':'خ','p':'ح','[':'ج',']':'د',
    'a':'ش','s':'س','d':'ي','f':'ب','g':'ل','h':'ا','j':'ت','k':'ن','l':'م',';':'ك','\'':'ط',
    'z':'ئ','x':'ء','c':'ؤ','v':'ر','b':'لا','n':'ى','m':'ة',',':'و','.':'ز','/':'ذ'
  }},
  gr: { map: {
    'q':';','w':'ς','e':'ε','r':'ρ','t':'τ','y':'υ','u':'θ','i':'ι','o':'ο','p':'π',
    'a':'α','s':'σ','d':'δ','f':'φ','g':'γ','h':'η','j':'ξ','k':'κ','l':'λ',';':'´','\'':'\'',
    'z':'ζ','x':'χ','c':'ψ','v':'ω','b':'β','n':'ν','m':'μ',',':',','.':'.','/':'/'
  }},
  fr: { map: {
    'q':'a','w':'z','e':'e','r':'r','t':'t','y':'y','u':'u','i':'i','o':'o','p':'p','[':'^',']':'$',
    'a':'q','s':'s','d':'d','f':'f','g':'g','h':'h','j':'j','k':'k','l':'l',';':'m','\'':'ù',
    'z':'w','x':'x','c':'c','v':'v','b':'b','n':'n','m':',',',':';','.':':','/':'!'
  }},
  de: { map: { 'y':'z','z':'y','[':'ü',']':'+',';':'ö','\'':'ä','-':'ß' }},
  pl: { map: { 'e':'ę','o':'ó','a':'ą','s':'ś','l':'ł','z':'ż','x':'ź','c':'ć','n':'ń' }},
  cs: { map: { 'y':'z','z':'y','[':'ú',']':')',';':'ů','\'':'§' }},
  hu: { map: { 'y':'z','z':'y','[':'ő',']':'ú',';':'é','\'':'á','0':'ö' }},
  tr: { map: { '[':'ğ',']':'ü',';':'ş','\'':'i','i':'ı',',':'ö','.':'ç' }},
  ko: { map: {
    'q':'ㅂ','w':'ㅈ','e':'ㄷ','r':'ㄱ','t':'ㅅ','y':'ㅛ','u':'ㅕ','i':'ㅑ','o':'ㅐ','p':'ㅔ',
    'a':'ㅁ','s':'ㄴ','d':'ㅇ','f':'ㄹ','g':'ㅎ','h':'ㅗ','j':'ㅓ','k':'ㅏ','l':'ㅣ',
    'z':'ㅋ','x':'ㅌ','c':'ㅊ','v':'ㅍ','b':'ㅠ','n':'ㅜ','m':'ㅡ'
  }},
  ja: { map: {
    'q':'た','w':'て','e':'い','r':'す','t':'か','y':'ん','u':'な','i':'に','o':'ら','p':'せ',
    'a':'ち','s':'と','d':'し','f':'は','g':'き','h':'く','j':'ま','k':'の','l':'り',
    'z':'つ','x':'さ','c':'そ','v':'ひ','b':'こ','n':'み','m':'も'
  }},
  th: { map: {
    'q':'ๆ','w':'ไ','e':'ำ','r':'พ','t':'ะ','y':'ั','u':'ี','i':'ร','o':'น','p':'ย',
    'a':'ฟ','s':'ห','d':'ก','f':'ด','g':'เ','h':'้','j':'่','k':'า','l':'ส',
    'z':'ผ','x':'ป','c':'แ','v':'อ','b':'ิ','n':'ื','m':'ท'
  }},
  vi: { map: { '1':'ă','2':'â','3':'ê','4':'ô','5':'̀','6':'̉','7':'̃','8':'́','9':'̣','0':'đ','[':'ư',']':'ơ' }},
  mt: { map: { '[':'ċ',']':'ġ',';':'ħ','\'':'ż' }},
  am: { map: {
    'q':'ቆ','w':'ዎ','e':'ኤ','r':'ሮ','t':'ቶ','y':'ዮ','u':'ኡ','i':'ኢ','o':'ኦ','p':'ፖ',
    'a':'አ','s':'ስ','d':'ድ','f':'ፍ','g':'ግ','h':'ህ','j':'ጅ','k':'ክ','l':'ል',
    'z':'ዝ','x':'ች','c':'ጭ','v':'ቭ','b':'ብ','n':'ን','m':'ም'
  }},
  hi: { map: {
    'q':'ौ','w':'ै','e':'ा','r':'ी','t':'ू','y':'ब','u':'ह','i':'ग','o':'द','p':'ज',
    'a':'ो','s':'े','d':'्','f':'ि','g':'ु','h':'प','j':'र','k':'क','l':'त',
    'z':'ॅ','x':'ं','c':'म','v':'न','b':'व','m':'स'
  }},
  bn: { map: {
    'q':'ো','w':'ৈ','e':'ा','r':'ी','t':'ূ','y':'ব','u':'ह','i':'গ','o':'द','p':'ज',
    'a':'ো','s':'ে','d':'्','f':'ि','g':'ु','h':'প','j':'র','k':'क','l':'त',
    'z':'্য','x':'ং','c':'ম','v':'ন','b':'ব','m':'स'
  }},
  lt: { map: { '1':'ą','2':'č','3':'ę','4':'ė','5':'į','6':'š','7':'ų','8':'ū','-':'ž' }},
  en: { map: {} }
};

const REVERSE_MAPS = {};

function getReverseMap(lang) {
  if (!REVERSE_MAPS[lang]) {
    const map = MAPPINGS[lang]?.map || {};
    const rev = {};
    for (const [k, v] of Object.entries(map)) rev[v] = k;
    REVERSE_MAPS[lang] = rev;
  }
  return REVERSE_MAPS[lang];
}

function convertText(text, sourceLang, targetLang) {
  if (!text || sourceLang === targetLang) return text;
  const reverseMap = getReverseMap(sourceLang);
  const targetMap = MAPPINGS[targetLang]?.map || {};
  let result = '';
  for (const char of text) {
    const qwerty = reverseMap[char] || char;
    result += targetMap[qwerty] || qwerty;
  }
  return result;
}

function detectLayout(text) {
  if (!text || text.length < 2) return { source: 'he', target: 'en' };
  const sample = text.slice(0, 50);
  const hebrewChars = /[\u0590-\u05FF]/;
  const russianChars = /[\u0400-\u04FF]/;
  const arabicChars = /[\u0600-\u06FF]/;
  const greekChars = /[\u0370-\u03FF]/;

  if (hebrewChars.test(sample)) return { source: 'en', target: 'he' };
  if (russianChars.test(sample)) return { source: 'en', target: 'ru' };
  if (arabicChars.test(sample)) return { source: 'en', target: 'ar' };
  if (greekChars.test(sample)) return { source: 'en', target: 'gr' };

  const heRev = { 'a':'ש','b':'נ','c':'ב','d':'ג','e':'ק','f':'כ','g':'ע','h':'י','i':'ן','j':'ח','k':'ל','l':'ך','m':'צ','n':'מ','o':'ם','p':'פ','q':'/','r':'ר','s':'ד','t':'א','u':'ו','v':'ה','w':'\'','x':'ס','y':'ט','z':'ז',',':'ת','.':'ץ' };
  const ruRev = { 'a':'ф','b':'и','c':'с','d':'в','e':'у','f':'а','g':'п','h':'р','i':'ш','j':'о','k':'л','l':'д','m':'ь','n':'т','o':'щ','p':'з','q':'й','r':'к','s':'ы','t':'е','u':'г','v':'м','w':'ц','x':'ч','y':'н','z':'я' };

  let heScore = 0, ruScore = 0;
  for (const char of sample.toLowerCase()) {
    if (heRev[char]) heScore++;
    if (ruRev[char]) ruScore++;
  }

  if (ruScore > heScore && ruScore > 2) return { source: 'ru', target: 'en' };
  if (heScore > 2) return { source: 'he', target: 'en' };
  return { source: 'he', target: 'en' };
}

// ==========================================
// TOAST NOTIFICATION
// ==========================================

function showToast(message, duration = 2500) {
  let toast = document.getElementById('gg-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'gg-toast';
    toast.className = 'gg-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ==========================================
// FIX SELECTED TEXT
// ==========================================

function fixSelectedText(text, sourceLang, targetLang) {
  const converted = convertText(text, sourceLang, targetLang);

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();

    const span = document.createElement('span');
    span.textContent = converted;
    span.style.backgroundColor = 'rgba(45, 212, 191, 0.15)';
    span.style.borderRadius = '2px';
    span.style.transition = 'background-color 1.5s ease';

    range.insertNode(span);

    // Remove highlight after delay
    setTimeout(() => {
      span.style.backgroundColor = 'transparent';
      setTimeout(() => {
        if (span.parentNode) {
          const parent = span.parentNode;
          parent.replaceChild(document.createTextNode(span.textContent), span);
          parent.normalize();
        }
      }, 1500);
    }, 500);

    // Copy to clipboard
    navigator.clipboard.writeText(converted).catch(() => {});

    showToast(`Fixed! ${text.length} chars → ${converted.length} chars`);
  }
}

// ==========================================
// FIX INPUT FIELD
// ==========================================

function fixActiveInput(autoDetect = true) {
  const active = document.activeElement;
  if (!active) return;

  const isInput = active.tagName === 'INPUT' || active.tagName === 'TEXTAREA';
  const isContentEditable = active.isContentEditable;

  if (!isInput && !isContentEditable) {
    showToast('Please focus a text input first');
    return;
  }

  let text, setText;

  if (isInput) {
    text = active.value;
    setText = (val) => { active.value = val; };
  } else {
    text = active.innerText || active.textContent;
    setText = (val) => { active.innerText = val; };
  }

  if (!text || !text.trim()) {
    showToast('No text to fix');
    return;
  }

  const detected = autoDetect ? detectLayout(text) : { source: 'he', target: 'en' };
  const converted = convertText(text, detected.source, detected.target);

  // Save current value for undo
  active._gg_undo = text;

  setText(converted);

  // Trigger input event so page scripts know text changed
  active.dispatchEvent(new Event('input', { bubbles: true }));

  // Copy to clipboard
  navigator.clipboard.writeText(converted).catch(() => {});

  showToast(`Fixed: ${detected.source} → ${detected.target} (${converted.length} chars)`);

  // Show undo button
  showUndo(() => {
    setText(active._gg_undo);
    active.dispatchEvent(new Event('input', { bubbles: true }));
    showToast('Undo complete');
  });
}

// ==========================================
// UNDO NOTIFICATION
// ==========================================

function showUndo(onUndo) {
  let fixed = document.getElementById('gg-fixed-toast');
  if (fixed) fixed.remove();

  fixed = document.createElement('div');
  fixed.id = 'gg-fixed-toast';
  fixed.className = 'gg-toast-fixed';
  fixed.innerHTML = `
    <span>Text fixed!</span>
    <button id="gg-undo-btn">Undo</button>
    <button class="gg-close">&times;</button>
  `;

  document.body.appendChild(fixed);

  fixed.querySelector('#gg-undo-btn').addEventListener('click', () => {
    onUndo();
    fixed.remove();
  });

  fixed.querySelector('.gg-close').addEventListener('click', () => {
    fixed.remove();
  });

  setTimeout(() => {
    if (fixed.parentNode) fixed.remove();
  }, 8000);
}

// ==========================================
// MESSAGE LISTENER FROM BACKGROUND
// ==========================================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fix-selection') {
    fixSelectedText(request.text, request.sourceLang, request.targetLang);
    sendResponse({ success: true });
    return true;
  }

  if (request.action === 'fix-input-auto') {
    fixActiveInput(true);
    sendResponse({ success: true });
    return true;
  }

  if (request.action === 'ping') {
    sendResponse({ ready: true });
    return true;
  }
});

// ==========================================
// DOUBLE-TAP CTRL TO FIX INPUT (optional feature)
// ==========================================

let lastCtrlTime = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Control') {
    const now = Date.now();
    if (now - lastCtrlTime < 300) {
      // Double-tap Ctrl
      e.preventDefault();
      fixActiveInput(true);
    }
    lastCtrlTime = now;
  }
});

console.log('[GibberishGone] Content script loaded on', location.hostname);
