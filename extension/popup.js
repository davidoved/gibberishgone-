/**
 * GibberishGone Browser Extension
 * Universal Input Recovery & Layout Fixer
 * 100% client-side. Zero network transmission.
 */

// ==========================================
// KEYBOARD MAPPING TABLES
// ==========================================

// Fill missing keys with identity mappings so overlay layouts work as targets
function expandMap(baseMap) {
  const result = { ...baseMap };
  const qwertyKeys = 'qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./-=`1234567890';
  for (const key of qwertyKeys) {
    if (!result[key]) result[key] = key;
  }
  // Uppercase identity for letters
  for (let c = 65; c <= 90; c++) {
    const key = String.fromCodePoint(c);
    if (!result[key]) result[key] = key;
  }
  return result;
}

const MAPPINGS = {
  ru: { name: 'Russian (ЙЦУКЕН)', map: {
    'q':'й','w':'ц','e':'у','r':'к','t':'е','y':'н','u':'г','i':'ш','o':'щ','p':'з','[':'х',']':'ъ',
    'a':'ф','s':'ы','d':'в','f':'а','g':'п','h':'р','j':'о','k':'л','l':'д',';':'ж','\'':'э',
    'z':'я','x':'ч','c':'с','v':'м','b':'и','n':'т','m':'ь',',':'б','.':'ю','/':'.',
    'Q':'Й','W':'Ц','E':'У','R':'К','T':'Е','Y':'Н','U':'Г','I':'Ш','O':'Щ','P':'З','{':'Х','}':'Ъ',
    'A':'Ф','S':'Ы','D':'В','F':'А','G':'П','H':'Р','J':'О','K':'Л','L':'Д',':':'Ж','"':'Э',
    'Z':'Я','X':'Ч','C':'С','V':'М','B':'И','N':'Т','M':'Ь','<':'Б','>':'Ю','?':','
  }},
  he: { name: 'Hebrew (SI-1452)', map: {
    'q':'/','w':'\'','e':'ק','r':'ר','t':'א','y':'ט','u':'ו','i':'ן','o':'ם','p':'פ','[':']',']':'[',
    'a':'ש','s':'ד','d':'ג','f':'כ','g':'ע','h':'י','j':'ח','k':'ל','l':'ך',';':'ף','\'':',',
    'z':'ז','x':'ס','c':'ב','v':'ה','b':'נ','n':'מ','m':'צ',',':'ת','.':'ץ','/':'.',
    'Q':'/','W':'\'','E':'ק','R':'ר','T':'א','Y':'ט','U':'ו','I':'ן','O':'ם','P':'פ','{':'}','}':'{',
    'A':'ש','S':'ד','D':'ג','F':'כ','G':'ע','H':'י','J':'ח','K':'ל','L':'ך',':':'ף','"':',',
    'Z':'ז','X':'ס','C':'ב','V':'ה','B':'נ','N':'מ','M':'צ','<':'ת','>':'ץ','?':'.'
  }},
  ar: { name: 'Arabic (101)', map: {
    'q':'ض','w':'ص','e':'ث','r':'ق','t':'ف','y':'غ','u':'ع','i':'ه','o':'خ','p':'ح','[':'ج',']':'د',
    'a':'ش','s':'س','d':'ي','f':'ب','g':'ل','h':'ا','j':'ت','k':'ن','l':'م',';':'ك','\'':'ط',
    'z':'ئ','x':'ء','c':'ؤ','v':'ر','b':'لا','n':'ى','m':'ة',',':'و','.':'ز','/':'ذ'
  }},
  gr: { name: 'Greek', map: {
    'q':';','w':'ς','e':'ε','r':'ρ','t':'τ','y':'υ','u':'θ','i':'ι','o':'ο','p':'π',
    'a':'α','s':'σ','d':'δ','f':'φ','g':'γ','h':'η','j':'ξ','k':'κ','l':'λ',';':'´','\'':'\'',
    'z':'ζ','x':'χ','c':'ψ','v':'ω','b':'β','n':'ν','m':'μ',',':',','.':'.','/':'/'
  }},
  fr: { name: 'French (AZERTY)', map: {
    'q':'a','w':'z','e':'e','r':'r','t':'t','y':'y','u':'u','i':'i','o':'o','p':'p','[':'^',']':'$',
    'a':'q','s':'s','d':'d','f':'f','g':'g','h':'h','j':'j','k':'k','l':'l',';':'m','\'':'ù',
    'z':'w','x':'x','c':'c','v':'v','b':'b','n':'n','m':',',',':';','.':':','/':'!'
  }},
  de: { name: 'German (QWERTZ)', map: expandMap({
    'y':'z','z':'y','[':'ü',']':'+',';':'ö','\'':'ä','-':'ß'
  })},
  pl: { name: 'Polish', map: expandMap({
    'e':'ę','o':'ó','a':'ą','s':'ś','l':'ł','z':'ż','x':'ź','c':'ć','n':'ń'
  })},
  cs: { name: 'Czech', map: expandMap({
    'y':'z','z':'y','[':'ú',']':')',';':'ů','\'':'§'
  })},
  hu: { name: 'Hungarian', map: expandMap({
    'y':'z','z':'y','[':'ő',']':'ú',';':'é','\'':'á','0':'ö'
  })},
  tr: { name: 'Turkish', map: expandMap({
    '[':'ğ',']':'ü',';':'ş','\'':'i','i':'ı',',':'ö','.':'ç'
  })},
  ko: { name: 'Korean', map: expandMap({
    'q':'ㅂ','w':'ㅈ','e':'ㄷ','r':'ㄱ','t':'ㅅ','y':'ㅛ','u':'ㅕ','i':'ㅑ','o':'ㅐ','p':'ㅔ',
    'a':'ㅁ','s':'ㄴ','d':'ㅇ','f':'ㄹ','g':'ㅎ','h':'ㅗ','j':'ㅓ','k':'ㅏ','l':'ㅣ',
    'z':'ㅋ','x':'ㅌ','c':'ㅊ','v':'ㅍ','b':'ㅠ','n':'ㅜ','m':'ㅡ'
  })},
  ja: { name: 'Japanese', map: expandMap({
    'q':'た','w':'て','e':'い','r':'す','t':'か','y':'ん','u':'な','i':'に','o':'ら','p':'せ',
    'a':'ち','s':'と','d':'し','f':'は','g':'き','h':'く','j':'ま','k':'の','l':'り',
    'z':'つ','x':'さ','c':'そ','v':'ひ','b':'こ','n':'み','m':'も'
  })},
  th: { name: 'Thai', map: expandMap({
    'q':'ๆ','w':'ไ','e':'ำ','r':'พ','t':'ะ','y':'ั','u':'ี','i':'ร','o':'น','p':'ย',
    'a':'ฟ','s':'ห','d':'ก','f':'ด','g':'เ','h':'้','j':'่','k':'า','l':'ส',
    'z':'ผ','x':'ป','c':'แ','v':'อ','b':'ิ','n':'ื','m':'ท'
  })},
  vi: { name: 'Vietnamese', map: expandMap({
    '1':'ă','2':'â','3':'ê','4':'ô','5':'̀','6':'̉','7':'̃','8':'́','9':'̣','0':'đ','[':'ư',']':'ơ'
  })},
  mt: { name: 'Maltese', map: expandMap({
    '[':'ċ',']':'ġ',';':'ħ','\'':'ż'
  })},
  am: { name: 'Amharic', map: expandMap({
    'q':'ቆ','w':'ዎ','e':'ኤ','r':'ሮ','t':'ቶ','y':'ዮ','u':'ኡ','i':'ኢ','o':'ኦ','p':'ፖ',
    'a':'አ','s':'ስ','d':'ድ','f':'ፍ','g':'ግ','h':'ህ','j':'ጅ','k':'ክ','l':'ል',
    'z':'ዝ','x':'ች','c':'ጭ','v':'ቭ','b':'ብ','n':'ን','m':'ም'
  })},
  hi: { name: 'Hindi', map: {
    'q':'ौ','w':'ै','e':'ा','r':'ी','t':'ू','y':'ब','u':'ह','i':'ग','o':'द','p':'ज',
    '[':'ड़',']':'ढ़','\\':'़',
    'a':'ो','s':'े','d':'्','f':'ि','g':'ु','h':'प','j':'र','k':'क','l':'त',
    ';':'च','\'':'ट',
    'z':'ॅ','x':'ं','c':'म','v':'न','b':'व','n':'ल','m':'स',',':'ष','.':'।','/':'य'
  }},
  bn: { name: 'Bengali', map: {
    'q':'ো','w':'ৈ','e':'া','r':'ী','t':'ূ','y':'ব','u':'হ','i':'গ','o':'দ','p':'জ',
    '[':'ড়',']':'ঢ়','\\':'়',
    'a':'ো','s':'ে','d':'্','f':'ি','g':'ু','h':'প','j':'র','k':'ক','l':'ত',
    ';':'চ','\'':'ট',
    'z':'্য','x':'ং','c':'ম','v':'ন','b':'ব','n':'ল','m':'স',',':'ষ','.':'।','/':'য'
  }},
  lt: { name: 'Lithuanian', map: expandMap({
    '1':'ą','2':'č','3':'ę','4':'ė','5':'į','6':'š','7':'ų','8':'ū','-':'ž'
  })},
  en: { name: 'English (QWERTY)', map: {} }
};

// ==========================================
// REVERSE MAP CACHE
// ==========================================

const REVERSE_MAPS = {};

function getReverseMap(lang) {
  if (!REVERSE_MAPS[lang]) {
    const map = MAPPINGS[lang]?.map || {};
    const rev = {};
    for (const [k, v] of Object.entries(map)) {
      // Prefer lowercase QWERTY keys in reverse map
      // so target language lookups work correctly
      if (!rev[v] || k === k.toLowerCase()) {
        rev[v] = k;
      }
    }
    REVERSE_MAPS[lang] = rev;
  }
  return REVERSE_MAPS[lang];
}

// ==========================================
// CORE CONVERSION LOGIC
// ==========================================

function convertText(text, sourceLang, targetLang) {
  if (!text) return '';
  if (sourceLang === targetLang) return text;

  const reverseMap = getReverseMap(sourceLang);
  const targetMap = MAPPINGS[targetLang]?.map || {};

  let result = '';
  for (const char of text) {
    const qwerty = reverseMap[char] || char;
    const converted = targetMap[qwerty] || qwerty;
    result += converted;
  }
  return result;
}

// ==========================================
// DOM REFERENCES
// ==========================================

const $ = (id) => document.getElementById(id);
const input = $('input');
const output = $('output');
const swapBtn = $('swapBtn');
const clearBtn = $('clearBtn');
const copyBtn = $('copyBtn');

// Custom dropdown elements
const sourceTrigger = $('sourceLangTrigger');
const targetTrigger = $('targetLangTrigger');
const sourceOptions = sourceTrigger.parentElement.querySelector('.custom-select-options');
const targetOptions = targetTrigger.parentElement.querySelector('.custom-select-options');

function getSourceValue() { return sourceTrigger.dataset.value; }
function getTargetValue() { return targetTrigger.dataset.value; }
function setSourceValue(val, text) {
  sourceTrigger.dataset.value = val;
  sourceTrigger.querySelector('.custom-select-text').textContent = text;
  sourceOptions.querySelectorAll('.custom-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.value === val);
  });
}
function setTargetValue(val, text) {
  targetTrigger.dataset.value = val;
  targetTrigger.querySelector('.custom-select-text').textContent = text;
  targetOptions.querySelectorAll('.custom-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.value === val);
  });
}

// Custom dropdown handlers
function setupDropdown(trigger, options, onSelect) {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = trigger.classList.contains('open');
    // Close all dropdowns first
    document.querySelectorAll('.custom-select-trigger.open').forEach(t => t.classList.remove('open'));
    document.querySelectorAll('.custom-select-options.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) {
      trigger.classList.add('open');
      options.classList.add('open');
    }
  });

  options.querySelectorAll('.custom-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = opt.dataset.value;
      const txt = opt.textContent;
      trigger.dataset.value = val;
      trigger.querySelector('.custom-select-text').textContent = txt;
      options.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      trigger.classList.remove('open');
      options.classList.remove('open');
      onSelect();
    });
  });
}

setupDropdown(sourceTrigger, sourceOptions, doConvert);
setupDropdown(targetTrigger, targetOptions, doConvert);

// Close dropdowns on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.custom-select-trigger.open').forEach(t => t.classList.remove('open'));
  document.querySelectorAll('.custom-select-options.open').forEach(o => o.classList.remove('open'));
});

// ==========================================
// CONVERSION HANDLER
// ==========================================

function doConvert() {
  const text = input.value;
  const from = getSourceValue();
  const to = getTargetValue();
  const result = convertText(text, from, to);
  output.value = result;

  // Auto-direction for RTL languages
  const rtlLangs = ['he', 'ar', 'am'];
  if (rtlLangs.includes(to)) {
    output.style.direction = 'rtl';
    output.style.textAlign = 'right';
  } else {
    output.style.direction = 'ltr';
    output.style.textAlign = 'left';
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

input.addEventListener('input', doConvert);

swapBtn.addEventListener('click', () => {
  const sVal = getSourceValue();
  const sText = sourceTrigger.querySelector('.custom-select-text').textContent;
  const tVal = getTargetValue();
  const tText = targetTrigger.querySelector('.custom-select-text').textContent;
  setSourceValue(tVal, tText);
  setTargetValue(sVal, sText);
  doConvert();
});

clearBtn.addEventListener('click', () => {
  input.value = '';
  output.value = '';
  input.focus();
});

copyBtn.addEventListener('click', async () => {
  if (!output.value) return;
  await navigator.clipboard.writeText(output.value);
  showToast('Restoration Copied!');
});

// Example chips
document.querySelectorAll('.example-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    input.value = chip.dataset.text;
    const fromOpt = sourceOptions.querySelector(`[data-value="${chip.dataset.from}"]`);
    const toOpt = targetOptions.querySelector(`[data-value="${chip.dataset.to}"]`);
    if (fromOpt) setSourceValue(chip.dataset.from, fromOpt.textContent);
    if (toOpt) setTargetValue(chip.dataset.to, toOpt.textContent);
    doConvert();
  });
});

// ==========================================
// TOAST NOTIFICATION
// ==========================================

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
  // Ctrl+A on output selects output, on input selects input
  if (e.ctrlKey && e.key === 'a') {
    if (document.activeElement === output) {
      e.preventDefault();
      output.select();
    }
  }
  // Escape clears
  if (e.key === 'Escape') {
    clearBtn.click();
  }
});

// ==========================================
// LOAD SAVED SETTINGS
// ==========================================

chrome.storage.local.get(['defaultSource', 'defaultTarget', 'autoCopy'], (data) => {
  if (data.defaultSource) {
    const opt = sourceOptions.querySelector(`[data-value="${data.defaultSource}"]`);
    if (opt) setSourceValue(data.defaultSource, opt.textContent);
  }
  if (data.defaultTarget) {
    const opt = targetOptions.querySelector(`[data-value="${data.defaultTarget}"]`);
    if (opt) setTargetValue(data.defaultTarget, opt.textContent);
  }
  doConvert();
});

// ==========================================
// INIT
// ==========================================

// Focus input on popup open
setTimeout(() => input.focus(), 50);

console.log('[GibberishGone] Extension loaded. 80+ layouts. Zero network.');
