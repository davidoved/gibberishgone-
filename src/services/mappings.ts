import { KeyboardMap, SupportedLanguage } from '../types';
export type { SupportedLanguage } from '../types';

// Fill missing QWERTY keys with identity so overlay layouts work as targets
function expandMap(baseMap: Record<string, string>): Record<string, string> {
  const result = { ...baseMap };
  const qwertyKeys = 'qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./-=`1234567890';
  for (const key of qwertyKeys) {
    if (!result[key]) result[key] = key;
  }
  for (let c = 65; c <= 90; c++) {
    const key = String.fromCodePoint(c);
    if (!result[key]) result[key] = key;
  }
  return result;
}

const REVERSE_MAPS: Record<string, Record<string, string>> = {};

const getQwertyFromLang = (char: string, lang: SupportedLanguage): string => {
  if (lang === 'en') return char;
  const mapping = MAPPINGS[lang];
  if (!mapping) return char;

  if (!REVERSE_MAPS[lang]) {
    const map = mapping.map || {};
    const reverse: Record<string, string> = {};
    Object.entries(map).forEach(([k, v]) => {
      if (!reverse[v] || k === k.toLowerCase()) {
        reverse[v] = k;
      }
    });
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
const DE_MAP = expandMap({ 'y':'z', 'z':'y', '[':'ü', ']':'+', ';':'ö', '\'':'ä', '-':'ß' });
const PL_MAP = expandMap({ 'q':'q', 'w':'w', 'e':'ę', 'o':'ó', 'a':'ą', 's':'ś', 'l':'ł', 'z':'ż', 'x':'ź', 'c':'ć', 'n':'ń' });
const CS_MAP = expandMap({ 'y':'z', 'z':'y', '[':'ú', ']':')', ';':'ů', '\'':'§' });
const HU_MAP = expandMap({ 'y':'z', 'z':'y', '[':'ő', ']':'ú', ';':'é', '\'':'á', '0':'ö' });
const TR_MAP = expandMap({ '[':'ğ', ']':'ü', ';':'ş', '\'':'i', 'i':'ı', ',':'ö', '.':'ç' });
const KO_MAP = expandMap({ 'q':'ㅂ', 'w':'ㅈ', 'e':'ㄷ', 'r':'ㄱ', 't':'ㅅ', 'y':'ㅛ', 'u':'ㅕ', 'i':'ㅑ', 'o':'ㅐ', 'p':'ㅔ', 'a':'ㅁ', 's':'ㄴ', 'd':'ㅇ', 'f':'ㄹ', 'g':'ㅎ', 'h':'ㅗ', 'j':'ㅓ', 'k':'ㅏ', 'l':'ㅣ', 'z':'ㅋ', 'x':'ㅌ', 'c':'ㅊ', 'v':'ㅍ', 'b':'ㅠ', 'n':'ㅜ', 'm':'ㅡ' });
const JA_MAP = expandMap({ 'q':'た', 'w':'て', 'e':'い', 'r':'す', 't':'か', 'y':'ん', 'u':'な', 'i':'に', 'o':'ら', 'p':'せ', 'a':'ち', 's':'と', 'd':'し', 'f':'は', 'g':'き', 'h':'く', 'j':'ま', 'k':'の', 'l':'り', 'z':'つ', 'x':'さ', 'c':'そ', 'v':'ひ', 'b':'こ', 'n':'み', 'm':'も' });
const TH_MAP = expandMap({ 'q':'ๆ', 'w':'ไ', 'e':'ำ', 'r':'พ', 't':'ะ', 'y':'ั', 'u':'ี', 'i':'ร', 'o':'น', 'p':'ย', 'a':'ฟ', 's':'ห', 'd':'ก', 'f':'ด', 'g':'เ', 'h':'้', 'j':'่', 'k':'า', 'l':'ส', 'z':'ผ', 'x':'ป', 'c':'แ', 'v':'อ', 'b':'ิ', 'n':'ื', 'm':'ท' });
const VI_MAP = expandMap({ '1':'ă', '2':'â', '3':'ê', '4':'ô', '5':'̀', '6':'̉', '7':'̃', '8':'́', '9':'̣', '0':'đ', '[':'ư', ']':'ơ' });
const MT_MAP = expandMap({ '[':'ċ', ']':'ġ', ';':'ħ', '\'':'ż' });
const AM_MAP = expandMap({ 'q':'ቆ', 'w':'ዎ', 'e':'ኤ', 'r':'ሮ', 't':'ቶ', 'y':'ዮ', 'u':'ኡ', 'i':'ኢ', 'o':'ኦ', 'p':'ፖ', 'a':'አ', 's':'ስ', 'd':'ድ', 'f':'ፍ', 'g':'ግ', 'h':'ህ', 'j':'ጅ', 'k':'ክ', 'l':'ል', 'z':'ዝ', 'x':'ች', 'c':'ጭ', 'v':'ቭ', 'b':'ብ', 'n':'ን', 'm':'ም' });
const HI_MAP = { 'q':'ौ', 'w':'ै', 'e':'ा', 'r':'ी', 't':'ू', 'y':'ब', 'u':'ह', 'i':'ग', 'o':'द', 'p':'ज', 'a':'ೋ', 's':'े', 'd':'्', 'f':'ि', 'g':'ུ', 'h':'प', 'j':'र', 'k':'क', 'l':'ת', 'z':'ॅ', 'x':'ं', 'c':'ม', 'v':'न', 'b':'व', 'm':'स' };
const BN_MAP = { 'q':'ো', 'w':'ৈ', 'e':'া', 'r':'ী', 't':'ূ', 'y':'ব', 'u':'হ', 'i':'গ', 'o':'দ', 'p':'জ', 'a':'ೋ', 's':'ে', 'd':'্', 'f':'ि', 'g':'ུ', 'h':'প', 'j':'র', 'k':'क', 'l':'ত', 'z':'্য', 'x':'ং', 'c':'ม', 'v':'ন', 'b':'ব', 'm':'स' };

const LT_MAP = expandMap({ '1':'ą', '2':'č', '3':'ę', '4':'ė', '5':'į', '6':'š', '7':'ų', '8':'ū', '-':'ž' });
const LV_MAP = expandMap({ '\'':'ā', ';':'ē', '[':'ī', ']':'ū', 'q':'q', 'w':'w' });
const HR_MAP = expandMap({ '[':'š', ']':'đ', ';':'č', '\'':'ć', 'y':'z', 'z':'y' });
const ET_MAP = expandMap({ '[':'ü', ']':'õ', ';':'ö', '\'':'ä' });

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
  'es': { name: 'Spanish', flag: '🇪🇸', map: expandMap({ ';':'ñ', '\'':'´' }) },
  'it': { name: 'Italian', flag: '🇮🇹', map: expandMap({ '[':'è', ';':'ò', '\'':'à' }) },
  'pt': { name: 'Portuguese', flag: '🇵🇹', map: expandMap({ ';':'ç', '\'':'~' }) },
  'tr': { name: 'Turkish', flag: '🇹🇷', map: TR_MAP },
  'pl': { name: 'Polish', flag: '🇵🇱', map: PL_MAP },
  'cs': { name: 'Czech', flag: '🇨🇿', map: CS_MAP },
  'hu': { name: 'Hungarian', flag: '🇭🇺', map: HU_MAP },
  'ro': { name: 'Romanian', flag: '🇷🇴', map: expandMap({ '[':'ă', ']':'î', ';':'ș', '\'':'ț' }) },
  'bg': { name: 'Bulgarian', flag: '🇧🇬', map: RU_MAP },
  'ko': { name: 'Korean', flag: '🇰🇷', map: KO_MAP },
  'ja': { name: 'Japanese', flag: '🇯🇵', map: JA_MAP },
  'zh': { name: 'Chinese (Zhuyin)', flag: '🇹🇼', map: expandMap({ 'q':'ㄆ', 'w':'ㄊ', 'e':'ㄍ' }) },
  'th': { name: 'Thai', flag: '🇹🇭', map: TH_MAP },
  'vi': { name: 'Vietnamese', flag: '🇻🇳', map: VI_MAP },
  'hi': { name: 'Hindi', flag: '🇮🇳', map: expandMap({ 'q':'\u094C','w':'\u0948','e':'\u093E','r':'\u0940','t':'\u0942','y':'\u092C','u':'\u0939','i':'\u0917','o':'\u0926','p':'\u091C','[':'\u095C',']':'\u095D','\\':'\u093C','a':'\u094B','s':'\u0947','d':'\u094D','f':'\u093F','g':'\u0941','h':'\u092A','j':'\u0930','k':'\u0915','l':'\u0924',';':'\u091A','\'':'\u091F','z':'\u0945','x':'\u0902','c':'\u092E','v':'\u0928','b':'\u0935','n':'\u0932','m':'\u0938',',':'\u0937','.':'\u0964','/':'\u092F' }) },
  'bn': { name: 'Bengali', flag: '🇧🇩', map: expandMap({ 'q':'\u09CB','w':'\u09C8','e':'\u09BE','r':'\u09C0','t':'\u09C2','y':'\u09AC','u':'\u09B9','i':'\u0997','o':'\u09A6','p':'\u099C','[':'\u09DC',']':'\u09DD','\\':'\u09BC','a':'\u09CB','s':'\u09C7','d':'\u09CD','f':'\u09BF','g':'\u09C1','h':'\u09AA','j':'\u09B0','k':'\u0995','l':'\u09A4',';':'\u099A','\'':'\u099F','z':'\u09CD\u09AF','x':'\u0982','c':'\u09AE','v':'\u09A8','b':'\u09AC','n':'\u09B2','m':'\u09B8',',':'\u09B7','.':'\u0964','/':'\u09AF' }) },
  'pa': { name: 'Punjabi', flag: '🇮🇳', map: expandMap({ 'q':'\u0A4C','w':'\u0A48','e':'\u0A3E','r':'\u0A40','t':'\u0A42','y':'\u0A2C','u':'\u0A39','i':'\u0A17','o':'\u0A26','p':'\u0A1C','[':'\u0A21\u0A3C',']':'\u0A22\u0A3C','\\':'\u0A3C','a':'\u0A4B','s':'\u0A47','d':'\u0A4D','f':'\u0A3F','g':'\u0A41','h':'\u0A2A','j':'\u0A30','k':'\u0A15','l':'\u0A24',';':'\u0A1A','\'':'\u0A1F','z':'\u0A71','x':'\u0A02','c':'\u0A2E','v':'\u0A28','b':'\u0A35','n':'\u0A32','m':'\u0A38',',':'\u0A37','.':'\u0964','/':'\u0A2F' }) },
  'gu': { name: 'Gujarati', flag: '🇮🇳', map: expandMap({ 'q':'\u0ACC','w':'\u0AC8','e':'\u0ABE','r':'\u0AC0','t':'\u0AC2','y':'\u0AAC','u':'\u0AB9','i':'\u0A97','o':'\u0AA6','p':'\u0A9C','[':'\u0AA1\u0ABC',']':'\u0AA2\u0ABC','\\':'\u0ABC','a':'\u0ACB','s':'\u0AC7','d':'\u0ACD','f':'\u0ABF','g':'\u0AC1','h':'\u0AAA','j':'\u0AB0','k':'\u0A95','l':'\u0AA4',';':'\u0A9A','\'':'\u0A9F','z':'\u0AE5','x':'\u0A82','c':'\u0AAE','v':'\u0AB8','b':'\u0AB5','n':'\u0AB2','m':'\u0AB8',',':'\u0AB7','.':'\u0AA4','/':'\u0AAF' }) },
  'ta': { name: 'Tamil', flag: '🇮🇳', map: expandMap({ 'q':'\u0BC8','w':'\u0BC7','e':'\u0BBE','r':'\u0BC0','t':'\u0BC2','y':'\u0BAA','u':'\u0B95','i':'\u0B9F','o':'\u0B9A','p':'\u0BA4','[':'\u0BB9',']':'\u0B83','\\':'\u0BCD','a':'\u0BCB','s':'\u0BC6','d':'\u0BCD','f':'\u0BBF','g':'\u0BC1','h':'\u0BB9','j':'\u0BB0','k':'\u0B95','l':'\u0BA4',';':'\u0B9A','\'':'\u0B9F','z':'\u0BC6','x':'\u0B82','c':'\u0BAE','v':'\u0BA8','b':'\u0BB5','n':'\u0BB2','m':'\u0BB8',',':'\u0BB7','.':'\u0BA4','/':'\u0BAF' }) },
  'te': { name: 'Telugu', flag: '🇮🇳', map: expandMap({ 'q':'\u0C48','w':'\u0C47','e':'\u0C3E','r':'\u0C40','t':'\u0C42','y':'\u0C2C','u':'\u0C39','i':'\u0C17','o':'\u0C26','p':'\u0C1C','[':'\u0C21',']':'\u0C22','\\':'\u0C3C','a':'\u0C4B','s':'\u0C46','d':'\u0C4D','f':'\u0C3F','g':'\u0C41','h':'\u0C2A','j':'\u0C30','k':'\u0C15','l':'\u0C24',';':'\u0C1A','\'':'\u0C1F','z':'\u0C46','x':'\u0C02','c':'\u0C2E','v':'\u0C28','b':'\u0C35','n':'\u0C32','m':'\u0C38',',':'\u0C37','.':'\u0C24','/':'\u0C2F' }) },
  'kn': { name: 'Kannada', flag: '🇮🇳', map: expandMap({ 'q':'\u0CCC','w':'\u0CC8','e':'\u0CBE','r':'\u0CC0','t':'\u0CC2','y':'\u0CAC','u':'\u0CB9','i':'\u0C97','o':'\u0CA6','p':'\u0C9C','[':'\u0CA1',']':'\u0CA2','\\':'\u0CBC','a':'\u0CCB','s':'\u0CC6','d':'\u0CCD','f':'\u0CBF','g':'\u0CC1','h':'\u0CAA','j':'\u0CB0','k':'\u0C95','l':'\u0CA4',';':'\u0C9A','\'':'\u0C9F','z':'\u0CC6','x':'\u0C82','c':'\u0CAE','v':'\u0CA8','b':'\u0CB5','n':'\u0CB2','m':'\u0CB8',',':'\u0CB7','.':'\u0CA4','/':'\u0CAF' }) },
  'ml': { name: 'Malayalam', flag: '🇮🇳', map: expandMap({ 'q':'\u0D48','w':'\u0D47','e':'\u0D3E','r':'\u0D40','t':'\u0D42','y':'\u0D2C','u':'\u0D39','i':'\u0D17','o':'\u0D26','p':'\u0D1C','[':'\u0D21',']':'\u0D22','\\':'\u0D3C','a':'\u0D4B','s':'\u0D46','d':'\u0D4D','f':'\u0D3F','g':'\u0D41','h':'\u0D2A','j':'\u0D30','k':'\u0D15','l':'\u0D24',';':'\u0D1A','\'':'\u0D1F','z':'\u0D46','x':'\u0D02','c':'\u0D2E','v':'\u0D28','b':'\u0D35','n':'\u0D32','m':'\u0D38',',':'\u0D37','.':'\u0D24','/':'\u0D2F' }) },
  'si': { name: 'Sinhala', flag: '🇱🇰', map: expandMap({ 'q':'\u0D9A','w':'\u0D85','e':'\u0D90','r':'\u0D8B','t':'\u0D89','y':'\u0DAF','u':'\u0DA2','i':'\u0DA9','o':'\u0DA7','p':'\u0DB4','[':'\u0DB6',']':'\u0DB8','\\':'\u0DCA','a':'\u0D9C','s':'\u0D9B','d':'\u0DDA','f':'\u0DDB','g':'\u0DE8','h':'\u0DC0','j':'\u0DAD','k':'\u0DA4','l':'\u0DA3',';':'\u0D9F','\'':'\u0DA6','z':'\u0DBA','x':'\u0DBD','c':'\u0DAB','v':'\u0D9E','b':'\u0DB1','n':'\u0DB3','m':'\u0DB9',',':'\u0DC5','.':'\u0D9D','/':'\u0DC6' }) },
  'am': { name: 'Amharic', flag: '🇪🇹', map: AM_MAP },
  'ti': { name: 'Tigrinya', flag: '🇪🇷', map: AM_MAP },
  'mt': { name: 'Maltese', flag: '🇲🇹', map: MT_MAP },
  'is': { name: 'Icelandic', flag: '🇮🇸', map: expandMap({ '[':'ð', ';':'æ', '\'':'´', '/': 'þ' }) },
  'fi': { name: 'Finnish', flag: '🇫🇮', map: expandMap({ '[':'å', ';':'ö', '\'':'ä' }) },
  'sv': { name: 'Swedish', flag: '🇸🇪', map: expandMap({ '[':'å', ';':'ö', '\'':'ä' }) },
  'da': { name: 'Danish', flag: '🇩🇰', map: expandMap({ '[':'å', ';':'æ', '\'':'ø' }) },
  'no': { name: 'Norwegian', flag: '🇳🇴', map: expandMap({ '[':'å', ';':'ø', '\'':'æ' }) },
  'ka': { name: 'Georgian', flag: '🇬🇪', map: expandMap({ 'a':'ა', 's':'ს', 'd':'დ' }) },
  'hy': { name: 'Armenian', flag: '🇦🇲', map: expandMap({ 'a':'ա', 's':'ს', 'd':'დ' }) },
  'mn': { name: 'Mongolian', flag: '🇲🇳', map: RU_MAP },
  'kk': { name: 'Kazakh', flag: '🇰🇿', map: RU_MAP },
  'uz': { name: 'Uzbek', flag: '🇺🇿', map: RU_MAP },
  'az': { name: 'Azerbaijani', flag: '🇦🇿', map: expandMap({ ';':'ö', '\'':'ə' }) },
  'tk': { name: 'Turkmen', flag: '🇹🇲', map: TR_MAP },
  'ky': { name: 'Kyrgyz', flag: '🇰🇬', map: RU_MAP },
  'tg': { name: 'Tajik', flag: '🇹🇯', map: RU_MAP },
  'ps': { name: 'Pashto', flag: '🇦🇫', map: AR_MAP },
  'sd': { name: 'Sindhi', flag: '🇵🇰', map: AR_MAP },
  'ne': { name: 'Nepali', flag: '🇳🇵', map: expandMap({ 'q':'\u094C','w':'\u0948','e':'\u093E','r':'\u0940','t':'\u0942','y':'\u092C','u':'\u0939','i':'\u0917','o':'\u0926','p':'\u091C','[':'\u095C',']':'\u095D','\\':'\u093C','a':'\u094B','s':'\u0947','d':'\u094D','f':'\u093F','g':'\u0941','h':'\u092A','j':'\u0930','k':'\u0915','l':'\u0924',';':'\u091A','\'':'\u091F','z':'\u0945','x':'\u0902','c':'\u092E','v':'\u0928','b':'\u0935','n':'\u0932','m':'\u0938',',':'\u0937','.':'\u0964','/':'\u092F' }) },
  'mr': { name: 'Marathi', flag: '🇮🇳', map: expandMap({ 'q':'\u094C','w':'\u0948','e':'\u093E','r':'\u0940','t':'\u0942','y':'\u092C','u':'\u0939','i':'\u0917','o':'\u0926','p':'\u091C','[':'\u095C',']':'\u095D','\\':'\u093C','a':'\u094B','s':'\u0947','d':'\u094D','f':'\u093F','g':'\u0941','h':'\u092A','j':'\u0930','k':'\u0915','l':'\u0924',';':'\u091A','\'':'\u091F','z':'\u0945','x':'\u0902','c':'\u092E','v':'\u0928','b':'\u0935','n':'\u0932','m':'\u0938',',':'\u0937','.':'\u0964','/':'\u092F' }) },
  'lt': { name: 'Lithuanian', flag: '🇱🇹', map: LT_MAP },
  'lv': { name: 'Latvian', flag: '🇱🇻', map: LV_MAP },
  'sr': { name: 'Serbian', flag: '🇷🇸', map: RU_MAP },
  'hr': { name: 'Croatian', flag: '🇭🇷', map: HR_MAP },
  'sk': { name: 'Slovak', flag: '🇸🇰', map: CS_MAP },
  'sl': { name: 'Slovenian', flag: '🇸🇮', map: HR_MAP },
  'et': { name: 'Estonian', flag: '🇪🇪', map: ET_MAP },
  'mk': { name: 'Macedonian', flag: '🇲🇰', map: RU_MAP },
  'sq': { name: 'Albanian', flag: '🇦🇱', map: expandMap({ 'y':'z', 'z':'y', '[':'ç', ']':'ë' }) },
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