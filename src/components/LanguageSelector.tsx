import React, { useRef, useState, useEffect } from 'react';
import { MAPPINGS, SupportedLanguage } from '../services/mappings';

interface LanguageSelectorProps {
  selected: SupportedLanguage;
  onChange: (lang: SupportedLanguage) => void;
  label?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentMap = MAPPINGS[selected];

  return (
    <div className="relative w-full z-20" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
            relative w-full group overflow-hidden rounded-xl border transition-all duration-500 h-14
            flex items-center justify-between px-4
            ${isOpen 
                ? 'bg-slate-800 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.1)]' 
                : 'glass-panel border-white/5 hover:border-teal-400/30'}
        `}
      >
        <div className="flex items-center gap-3">
            {/* Flag Container */}
            <div className="w-8 h-8 glass-panel rounded-lg flex items-center justify-center text-base shadow-inner border border-white/10 shrink-0">
                {currentMap.flag}
            </div>
            
            {/* Text Label */}
            <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[7px] uppercase tracking-[0.3em] text-teal-400 font-bold opacity-60 truncate w-full text-left">
                    {label || 'Language'}
                </span>
                <span className="font-bold text-sm text-white group-hover:text-teal-200 transition-colors truncate w-full text-left tracking-tight">
                    {currentMap.name}
                </span>
            </div>
        </div>

        {/* Chevron */}
        <div className={`
            w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ml-2
            ${isOpen ? 'bg-teal-500 text-slate-950 rotate-180' : 'bg-white/5 text-slate-500 group-hover:text-teal-400'}
        `}>
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 glass-panel border border-teal-500/20 rounded-xl shadow-2xl overflow-hidden animate-reveal z-50">
          <div className="max-h-[250px] overflow-y-auto scrollbar-hide p-1 space-y-0.5">
            {Object.entries(MAPPINGS).map(([code, { name, flag }]) => (
                <button
                    key={code}
                    onClick={() => {
                        onChange(code as SupportedLanguage);
                        setIsOpen(false);
                    }}
                    className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 group/item
                        ${selected === code 
                            ? 'bg-teal-500/10 border border-teal-500/10' 
                            : 'hover:bg-white/5 border border-transparent'}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-lg drop-shadow-sm">{flag}</span>
                        <span className={`text-xs font-medium tracking-tight ${selected === code ? 'text-teal-400' : 'text-slate-400 group-hover/item:text-white'}`}>
                            {name}
                        </span>
                    </div>
                    
                    {selected === code && (
                        <div className="w-3.5 h-3.5 rounded-full bg-teal-500/20 flex items-center justify-center">
                            <svg className="w-2 h-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;