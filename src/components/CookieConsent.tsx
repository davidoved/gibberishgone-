import React, { useState, useEffect } from 'react';

const CONSENT_KEY = 'gg_cookie_consent';

export const CookieConsent: React.FC<{ cookieTitle: string; cookieDesc: string; acceptText: string; privacyLink?: string }> = ({ cookieTitle, cookieDesc, acceptText, privacyLink = '/en/privacy' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(CONSENT_KEY);
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-0 inset-x-0 z-[200] border-t border-white/10 bg-[#020617]/95 backdrop-blur-xl"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-400 leading-relaxed">
          <span className="text-white font-bold">{cookieTitle}</span>{' '}
          {cookieDesc}{' '}
          <a href={privacyLink} className="text-teal-400 hover:underline">Privacy Policy</a>.
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={accept}
            className="px-6 py-2.5 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-400 hover:bg-teal-500/30 transition-all font-black uppercase tracking-widest text-[10px]"
          >
            {acceptText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
