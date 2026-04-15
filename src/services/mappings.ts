import { KeyboardMap, SupportedLanguage } from '../types';
export type { SupportedLanguage } from '../types';

const REVERSE_MAPS: Record<string, Record<string, string>> = {};

const getQwertyFromLang = (char: string, lang: SupportedLanguage): string => {
  if (lang === 'en') return char;
  const mapping = MAPPINGS[lang];
  if (!mapping) return char;

  if (!REVERSE_MAPS[lang]) {
    const map = mapping.map || {};
    const reverse: Record<string, string> = {};
    Object.entries(map).forEach(([k, v]) => { reverse[v] = k; });
    REVERSE_MAPS[lang] = reverse;
  }
  
  const langReverseMap = REVERSE_MAPS[lang];
  return (langReverseMap && langReverseMap[char]) || char;
};

const getLangFromQwerty = (char: string, lang: SupportedLanguage): string => {
  if (lang === 'en') return char;
  const mapping = MAPPINGS[lang];
  if (!mapping) return char;
  const map = mapping.map;
  return map ? (map[char] || char) : char;
};

// --- COMPREHENSIVE MAPPING DEFINITIONS ---
const RU_MAP = { 'q':'й', 'w':'ц', 'e':'у', 'r':'к', 't':'е', 'y':'н', 'u':'г', 'i':'ш', 'o':'щ', 'p':'з', '[':'х', ']':'ъ', 'a':'ф', 's':'ы', 'd':'в', 'f':'а', 'g':'п', 'h':'р', 'j':'о', 'k':'л', 'l':'д', ';':'ж', '\'':'э', 'z':'я', 'x':'ч', 'c':'с', 'v':'м', 'b':'и', 'n':'т', 'm':'ь', ',':'б', '.':'ю', '/':'.', 'Q':'Й', 'W':'Ц', 'E':'У', 'R':'К', 'T':'Е', 'Y':'Н', 'U':'Г', 'I':'Ш', 'O':'Щ', 'P':'З', '{':'Х', '}':'Ъ', 'A':'Ф', 'S':'Ы', 'D':'В', 'F':'А', 'G':'П', 'H':'Р', 'J':'О', 'K':'Л', 'L':'Д', ':':'Ж', '"':'Э', 'Z':'Я', 'X':'Ч', 'C':'С', 'V':'М', 'B':'И', 'N':'Т', 'M':'Ь', '<':'Б', '>':'Ю', '?':',' };
const HE_MAP = { 'q':'/', 'w':'\'', 'e':'ק', 'r':'ר', 't':'א', 'y':'ט', 'u':'ו', 'i':'ן', 'o':'ם', 'p':'פ', '[':']', ']':'[', 'a':'ש', 's':'ד', 'd':'ג', 'f':'כ', 'g':'ע', 'h':'י', 'j':'ח', 'k':'ל', 'l':'ך', ';':'ף', '\'':',', 'z':'ז', 'x':'ס', 'c':'ב', 'v':'ה', 'b':'נ', 'n':'מ', 'm':'צ', ',':'ת', '.':'ץ', '/':'.', 'Q':'/', 'W':'\'', 'E':'ק', 'R':'ר', 'T':'א', 'Y':'ט', 'U':'ו', 'I':'ן', 'O':'ם', 'P':'פ', '{':'}', '}':'{', 'A':'ש', 'S':'ד', 'D':'ג', 'F':'כ', 'G':'ע', 'H':'י', 'J':'ח', 'K':'ל', 'L':'ך', ':':'ף', '"':',', 'Z':'ז', 'X':'ס', 'C':'ב', 'V':'ה', 'B':'נ', 'N':'מ', 'M':'צ', '<':'ת', '>':'ץ', '?':'.' };
const AR_MAP = { 'q':'ض', 'w':'ص', 'e':'ث', 'r':'ق', 't':'ف', 'y':'غ', 'u':'ع', 'i':'ه', 'o':'خ', 'p':'ح', '[':'ج', ']':'د', 'a':'ش', 's':'س', 'd':'ي', 'f':'ب', 'g':'ل', 'h':'ا', 'j':'ت', 'k':'ن', 'l':'م', ';':'ك', '\'':'ط', 'z':'ئ', 'x':'ء', 'c':'ؤ', 'v':'ر', 'b':'لا', 'n':'ى', 'm':'ة', ',':'و', '.':'ز', '/':'.','Q':'.','W':'.','E':'.','R':'.','T':'.','Y':'.','U':'.','I':'.','O':'.','P':'.','A':'.','S':'.','D':'.','F':'.','G':'.','H':'.','J':'.','K':'.','L':'.','Z':'.','X':'.','C':'.','V':'.','B':'.','N':'.'};
const GR_MAP = { 'q':';', 'w':'ς', 'e':'ε', 'r':'ρ', 't':'τ', 'y':'υ', 'u':'θ', 'i':'ι', 'o':'ο', 'p':'π', '[':'[', ']':']', 'a':'α', 's':'σ', 'd':'δ', 'f':'φ', 'g':'γ', 'h':'η', 'j':'ξ', 'k':'κ', 'l':'λ', ';':'´', '\'':'\'', 'z':'ζ', 'x':'χ', 'c':'ψ', 'v':'ω', 'b':'β', 'n':'ν', 'm':'μ', ',':',', '.':'.', '/': '/', 'Q':':', 'W':'΅', 'E':'Ε', 'R':'Ρ', 'T':'Τ', 'Y':'Υ', 'U':'Θ', 'I':'Ι', 'O':'Ο', 'P':'Π', '{':'{', '}':'}', 'A':'Α', 'S':'Σ', 'D':'Δ', 'F':'Φ', 'G':'Γ', 'H':'Η', 'J':'Ξ', 'K':'Κ', 'L':'Λ', ':':'¨', '"':'"', 'Z':'Ζ', 'X':'Χ', 'C':'Ψ', 'V':'Ω', 'B':'Β', 'N':'Ν', 'M':'Μ', '<':'<', '>':'>', '?':'?' };
const FR_MAP = { 'q':'a', 'w':'z', 'e':'e', 'r':'r', 't':'t', 'y':'y', 'u':'u', 'i':'i', 'o':'o', 'p':'p', '[':'^', ']':'$', 'a':'q', 's':'s', 'd':'d', 'f':'f', 'g':'g', 'h':'h', 'j':'j', 'k':'k', 'l':'l', ';':'m', '\'':'ù', 'z':'w', 'x':'x', 'c':'c', 'v':'v', 'b':'b', 'n':'n', 'm':',', ',':';', '.':':', '/':'!', 'Q':'A', 'W':'Z', 'E':'E', 'R':'R', 'T':'T', 'Y':'Y', 'U':'U', 'I':'I', 'O':'O', 'P':'P', '{':'¨', '}':'£', 'A':'Q', 'S':'S', 'D':'D', 'F':'F', 'G':'G', 'H':'H', 'J':'J', 'K':'K', 'L':'L', ':':'M', '"':'%', 'Z':'W', 'X':'X', 'C':'C', 'V':'V', 'B':'B', 'N':'N', 'M':'?', '<':'.', '>':'/', '?':'§' };
const DE_MAP = { 'y':'z', 'z':'y', '[':'ü', ']':'+', ';':'ö', '\'':'ä' };
const PL_MAP = { 'q':'q', 'w':'w', 'e':'ę', 'o':'ó', 'a':'ą', 's':'ś', 'l':'ł', 'z':'ż', 'x':'ź', 'c':'ć', 'n':'ń' };
const CS_MAP = { 'y':'z', 'z':'y', '[':'ú', ']':')', ';':'ů', '\'':'§' };
const HU_MAP = { 'y':'z', 'z':'y', '[':'ő', ']':'ú', ';':'é', '\'':'á', '0':'ö' };
const TR_MAP = { '[':'ğ', ']':'ü', ';':'ş', '\'':'i', 'i':'ı', ',':'ö', '.':'ç' };
const KO_MAP = { 'q':'ㅂ', 'w':'ㅈ', 'e':'ㄷ', 'r':'ㄱ', 't':'ㅅ', 'y':'ㅛ', 'u':'ㅕ', 'i':'ㅑ', 'o':'ㅐ', 'p':'ㅔ', 'a':'ㅁ', 's':'ㄴ', 'd':'ㅇ', 'f':'ㄹ', 'g':'ㅎ', 'h':'ㅗ', 'j':'ㅓ', 'k':'ㅏ', 'l':'ㅣ', 'z':'ㅋ', 'x':'ㅌ', 'c':'ㅊ', 'v':'ㅍ', 'b':'ㅠ', 'n':'ㅜ', 'm':'ㅡ' };
const JA_MAP = { 'q':'た', 'w':'て', 'e':'い', 'r':'す', 't':'か', 'y':'ん', 'u':'な', 'i':'に', 'o':'ら', 'p':'せ', 'a':'ち', 's':'と', 'd':'し', 'f':'は', 'g':'き', 'h':'く', 'j':'ま', 'k':'の', 'l':'り', 'z':'つ', 'x':'さ', 'c':'そ', 'v':'ひ', 'b':'こ', 'n':'み', 'm':'も' };
const TH_MAP = { 'q':'ๆ', 'w':'ไ', 'e':'ำ', 'r':'พ', 't':'ะ', 'y':'ั', 'u':'ี', 'i':'ร', 'o':'น', 'p':'ย', 'a':'ฟ', 's':'ห', 'd':'ก', 'f':'ด', 'g':'เ', 'h':'้', 'j':'่', 'k':'า', 'l':'ส', 'z':'ผ', 'x':'ป', 'c':'แ', 'v':'อ', 'b':'ิ', 'n':'ื', 'm':'ท' };
const VI_MAP = { '1':'ă', '2':'â', '3':'ê', '4':'ô', '5':'̀', '6':'̉', '7':'̃', '8':'́', '9':'̣', '0':'đ', '[':'ư', ']':'ơ' };
const MT_MAP = { '[':'ċ', ']':'ġ', ';':'ħ', '\'':'ż' };
const AM_MAP = { 'q':'ቆ', 'w':'ዎ', 'e':'ኤ', 'r':'ሮ', 't':'ቶ', 'y':'ዮ', 'u':'ኡ', 'i':'ኢ', 'o':'ኦ', 'p':'ፖ', 'a':'አ', 's':'ስ', 'd':'ድ', 'f':'ፍ', 'g':'ግ', 'h':'ህ', 'j':'ጅ', 'k':'ክ', 'l':'ል', 'z':'ዝ', 'x':'ች', 'c':'ጭ', 'v':'ቭ', 'b':'ብ', 'n':'ን', 'm':'ም' };
const HI_MAP = { 'q':'ौ', 'w':'ै', 'e':'ा', 'r':'ी', 't':'ू', 'y':'ब', 'u':'ह', 'i':'ग', 'o':'द', 'p':'ज', 'a':'ೋ', 's':'े', 'd':'्', 'f':'ि', 'g':'ུ', 'h':'प', 'j':'र', 'k':'क', 'l':'ת', 'z':'ॅ', 'x':'ं', 'c':'ม', 'v':'न', 'b':'व', 'm':'स' };
const BN_MAP = { 'q':'ো', 'w':'ৈ', 'e':'া', 'r':'ী', 't':'ূ', 'y':'ব', 'u':'হ', 'i':'গ', 'o':'দ', 'p':'জ', 'a':'ೋ', 's':'ে', 'd':'্', 'f':'ि', 'g':'ུ', 'h':'প', 'j':'র', 'k':'क', 'l':'ত', 'z':'্য', 'x':'ং', 'c':'ม', 'v':'ন', 'b':'ব', 'm':'स' };

const LT_MAP = { '1':'ą', '2':'č', '3':'ę', '4':'ė', '5':'į', '6':'š', '7':'ų', '8':'ū', '9':'9', '0':'0', '-': 'ž' };
const LV_MAP = { '\'':'ā', ';':'ē', '[':'ī', ']':'ū', 'q':'q', 'w':'w' };
const HR_MAP = { '[':'š', ']':'đ', ';':'č', '\'':'ć', 'y':'z', 'z':'y' };
const ET_MAP = { '[':'ü', ']':'õ', ';':'ö', '\'':'ä' };

export const MAPPINGS: KeyboardMap = {
  'en': { name: 'English', flag: '🇺🇸', map: {} },
  'he': { name: 'Hebrew', flag: '🇮🇱', map: HE_MAP },
  'ru': { name: 'Russian', flag: '🇷🇺', map: RU_MAP },
  'uk': { name: 'Ukrainian', flag: '🇺🇦', map: RU_MAP },
  'be': { name: 'Belarusian', flag: '🇧🇾', map: RU_MAP },
  'ar': { name: 'Arabic', flag: '🇸🇦', map: AR_MAP },
  'fa': { name: 'Persian', flag: '🇮🇷', map: AR_MAP },
  'ur': { name: 'Urdu', flag: '🇵🇰', map: AR_MAP },
  'gr': { name: 'Greek', flag: '🇬🇷', map: GR_MAP },
  'fr': { name: 'French (AZERTY)', flag: '🇫🇷', map: FR_MAP },
  'de': { name: 'German', flag: '🇩🇪', map: DE_MAP },
  'es': { name: 'Spanish', flag: '🇪🇸', map: { ';':'ñ', '\'':'´' } },
  'it': { name: 'Italian', flag: '🇮🇹', map: { '[':'è', ';':'ò', '\'':'à' } },
  'pt': { name: 'Portuguese', flag: '🇵🇹', map: { ';':'ç', '\'':'~' } },
  'tr': { name: 'Turkish', flag: '🇹🇷', map: TR_MAP },
  'pl': { name: 'Polish', flag: '🇵🇱', map: PL_MAP },
  'cs': { name: 'Czech', flag: '🇨🇿', map: CS_MAP },
  'hu': { name: 'Hungarian', flag: '🇭🇺', map: HU_MAP },
  'ro': { name: 'Romanian', flag: '🇷🇴', map: { '[':'ă', ']':'î', ';':'ș', '\'':'ț' } },
  'bg': { name: 'Bulgarian', flag: '🇧🇬', map: RU_MAP },
  'ko': { name: 'Korean', flag: '🇰🇷', map: KO_MAP },
  'ja': { name: 'Japanese', flag: '🇯🇵', map: JA_MAP },
  'zh': { name: 'Chinese (Zhuyin)', flag: '🇹🇼', map: { 'q':'ㄆ', 'w':'ㄊ', 'e':'ㄍ' } },
  'th': { name: 'Thai', flag: '🇹🇭', map: TH_MAP },
  'vi': { name: 'Vietnamese', flag: '🇻🇳', map: VI_MAP },
  'hi': { name: 'Hindi', flag: '🇮🇳', map: HI_MAP },
  'bn': { name: 'Bengali', flag: '🇧🇩', map: BN_MAP },
  'pa': { name: 'Punjabi', flag: '🇮🇳', map: BN_MAP },
  'gu': { name: 'Gujarati', flag: '🇮🇳', map: BN_MAP },
  'ta': { name: 'Tamil', flag: '🇮🇳', map: BN_MAP },
  'te': { name: 'Telugu', flag: '🇮🇳', map: BN_MAP },
  'kn': { name: 'Kannada', flag: '🇮🇳', map: BN_MAP },
  'ml': { name: 'Malayalam', flag: '🇮🇳', map: BN_MAP },
  'si': { name: 'Sinhala', flag: '🇱🇰', map: BN_MAP },
  'am': { name: 'Amharic', flag: '🇪🇹', map: AM_MAP },
  'ti': { name: 'Tigrinya', flag: '🇪🇷', map: AM_MAP },
  'mt': { name: 'Maltese', flag: '🇲🇹', map: MT_MAP },
  'is': { name: 'Icelandic', flag: '🇮🇸', map: { '[':'ð', ';':'æ', '\'':'´', '/': 'þ' } },
  'fi': { name: 'Finnish', flag: '🇫🇮', map: { '[':'å', ';':'ö', '\'':'ä' } },
  'sv': { name: 'Swedish', flag: '🇸🇪', map: { '[':'å', ';':'ö', '\'':'ä' } },
  'da': { name: 'Danish', flag: '🇩🇰', map: { '[':'å', ';':'æ', '\'':'ø' } },
  'no': { name: 'Norwegian', flag: '🇳🇴', map: { '[':'å', ';':'ø', '\'':'æ' } },
  'ka': { name: 'Georgian', flag: '🇬🇪', map: { 'a':'ა', 's':'ს', 'd':'დ' } },
  'hy': { name: 'Armenian', flag: '🇦🇲', map: { 'a':'ա', 's':'ს', 'd':'დ' } },
  'mn': { name: 'Mongolian', flag: '🇲🇳', map: RU_MAP },
  'kk': { name: 'Kazakh', flag: '🇰🇿', map: RU_MAP },
  'uz': { name: 'Uzbek', flag: '🇺🇿', map: RU_MAP },
  'az': { name: 'Azerbaijani', flag: '🇦🇿', map: { ';':'ö', '\'':'ə' } },
  'tk': { name: 'Turkmen', flag: '🇹🇲', map: TR_MAP },
  'ky': { name: 'Kyrgyz', flag: '🇰🇬', map: RU_MAP },
  'tg': { name: 'Tajik', flag: '🇹🇯', map: RU_MAP },
  'ps': { name: 'Pashto', flag: '🇦🇫', map: AR_MAP },
  'sd': { name: 'Sindhi', flag: '🇵🇰', map: AR_MAP },
  'ne': { name: 'Nepali', flag: '🇳🇵', map: HI_MAP },
  'mr': { name: 'Marathi', flag: '🇮🇳', map: HI_MAP },
  'lt': { name: 'Lithuanian', flag: '🇱🇹', map: LT_MAP },
  'lv': { name: 'Latvian', flag: '🇱🇻', map: LV_MAP },
  'sr': { name: 'Serbian', flag: '🇷🇸', map: RU_MAP },
  'hr': { name: 'Croatian', flag: '🇭🇷', map: HR_MAP },
  'sk': { name: 'Slovak', flag: '🇸🇰', map: CS_MAP },
  'sl': { name: 'Slovenian', flag: '🇸🇮', map: HR_MAP },
  'et': { name: 'Estonian', flag: '🇪🇪', map: ET_MAP },
  'mk': { name: 'Macedonian', flag: '🇲🇰', map: RU_MAP },
  'sq': { name: 'Albanian', flag: '🇦🇱', map: { 'y':'z', 'z':'y', '[':'ç', ']':'ë' } },
  'nl': { name: 'Dutch', flag: '🇳🇱', map: {} },
  'km': { name: 'Khmer', flag: '🇰🇭', map: {} },
  'lo': { name: 'Lao', flag: '🇱🇦', map: {} },
  'my': { name: 'Burmese', flag: '🇲🇲', map: {} },
  'id': { name: 'Indonesian', flag: '🇮🇩', map: {} },
  'cy': { name: 'Welsh', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', map: {} },
  'ga': { name: 'Irish', flag: '🇮🇪', map: {} },
  'gd': { name: 'Scottish Gaelic', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', map: {} },
  'lb': { name: 'Luxembourgish', flag: '🇱🇺', map: DE_MAP },
  'eo': { name: 'Esperanto', flag: '🏁', map: {} },
  'af': { name: 'Afrikaans', flag: '🇿🇦', map: {} },
  'sw': { name: 'Swahili', flag: '🇰🇪', map: {} },
  'yo': { name: 'Yoruba', flag: '🇳🇬', map: {} },
  'ig': { name: 'Igbo', flag: '🇳🇬', map: {} },
  'ha': { name: 'Hausa', flag: '🇳🇬', map: {} },
  'zu': { name: 'Zulu', flag: '🇿🇦', map: {} },
  'xh': { name: 'Xhosa', flag: '🇿🇦', map: {} },
  'bo': { name: 'Tibetan', flag: '🇨🇳', map: {} },
  'dz': { name: 'Dzongkha', flag: '🇧🇹', map: {} },
  'so': { name: 'Somali', flag: '🇸🇴', map: {} },
  'rw': { name: 'Kinyarwanda', flag: '🇷🇼', map: {} },
  'mg': { name: 'Malagasy', flag: '🇲🇬', map: {} },
  'ms': { name: 'Malay', flag: '🇲🇾', map: {} },
  'tl': { name: 'Tagalog', flag: '🇵🇭', map: {} },
  'jv': { name: 'Javanese', flag: '🇮🇩', map: {} },
  'su': { name: 'Sundanese', flag: '🇮🇩', map: {} },
  'gl': { name: 'Galician', flag: '🇪🇸', map: {} },
  'eu': { name: 'Basque', flag: '🇪🇸', map: {} },
  'ca': { name: 'Catalan', flag: '🇪🇸', map: {} },
  'oc': { name: 'Occitan', flag: '🇫🇷', map: {} },
  'br': { name: 'Breton', flag: '🇫🇷', map: {} },
  'fy': { name: 'Frisian', flag: '🇳🇱', map: {} },
  'fo': { name: 'Faroese', flag: '🇫🇴', map: {} },
  'kl': { name: 'Greenlandic', flag: '🇬🇱', map: {} },
  'bs': { name: 'Bosnian', flag: '🇧🇦', map: HR_MAP },
  'kmr': { name: 'Kurmanji', flag: '🇹🇷', map: {} },
  'ku': { name: 'Kurdish', flag: '🇮🇶', map: {} },
  'tt': { name: 'Tatar', flag: '🇷🇺', map: RU_MAP },
  'ba': { name: 'Bashkir', flag: '🇷🇺', map: RU_MAP },
  'cv': { name: 'Chuvash', flag: '🇷🇺', map: RU_MAP },
  'sah': { name: 'Sakha', flag: '🇷🇺', map: RU_MAP },
  'tyv': { name: 'Tuvan', flag: '🇷🇺', map: RU_MAP },
};

export const convertText = (text: string, sourceLang: SupportedLanguage, targetLang: SupportedLanguage): string => {
  if (!text) return '';
  return text.split('').map(char => {
    const qwertyKey = getQwertyFromLang(char, sourceLang);
    return getLangFromQwerty(qwertyKey, targetLang);
  }).join('');
};