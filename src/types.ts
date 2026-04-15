
export interface LayoutMapping {
  name: string;
  flag: string;
  map: Record<string, string>;
}

export type SupportedLanguage = 
  | 'en' | 'ru' | 'he' | 'ar' | 'gr' | 'uk' | 'fr' | 'de' | 'es' | 'tr'
  | 'it' | 'pt' | 'sv' | 'da' | 'no' | 'fi' | 'cs' | 'hu' | 'ro' | 'bg'
  | 'ko' | 'th' | 'fa' | 'hi' | 'be' | 'kk' | 'ka' | 'hy' | 'lt' | 'lv'
  | 'sr' | 'hr' | 'sk' | 'sl' | 'et' | 'is' | 'mk' | 'mn' | 'vi' | 'sq' | 'nl' | 'ur'
  | 'pl' | 'ja' | 'zh' | 'bn' | 'pa' | 'gu' | 'ta' | 'te' | 'kn' | 'ml' 
  | 'si' | 'km' | 'lo' | 'my' | 'am' | 'uz' | 'ky' | 'tg' | 'az' | 'id'
  | 'mt' | 'cy' | 'ga' | 'gd' | 'lb' | 'eo' | 'af' | 'sw' | 'yo' | 'ig' | 'ha' | 'zu'
  | 'xh' | 'ps' | 'sd' | 'ne' | 'mr' | 'bo' | 'dz' | 'ti' | 'so' | 'rw' | 'mg' | 'ms'
  | 'tl' | 'jv' | 'su' | 'gl' | 'eu' | 'ca' | 'oc' | 'br' | 'fy' | 'fo' | 'kl' | 'bs' 
  | 'kmr' | 'ku' | 'tk' | 'tt' | 'ba' | 'cv' | 'sah' | 'tyv';

export interface KeyboardMap {
  [key: string]: LayoutMapping;
}
