import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  ArrowLeftRight, 
  ArrowRight, 
  Clipboard, 
  ClipboardCheck, 
  Layout
} from 'lucide-react';
import { SupportedLanguage, MAPPINGS, convertText } from './services/mappings';
import LanguageSelector from './components/LanguageSelector';
import { RESEARCH_ARTICLES } from './ArchiveLibrary';

type View = 'converter' | 'knowledge' | 'about' | 'privacy' | 'terms' | 'support' | 'how-it-works' | 'faq';

const VIEW_MAP: Record<string, View> = {
  'utility': 'converter',
  'archive': 'knowledge',
  'manifesto': 'about',
  'protocol': 'how-it-works',
  'privacy': 'privacy',
  'terms': 'terms',
  'contact': 'support',
  'faq': 'faq'
};

const PATH_MAP: Record<View, string> = {
  'converter': 'utility',
  'knowledge': 'archive',
  'about': 'manifesto',
  'how-it-works': 'protocol',
  'privacy': 'privacy',
  'terms': 'terms',
  'support': 'contact',
  'faq': 'faq'
};

// --- PREMIUM UI COMPONENTS ---
const ContentSection: React.FC<{ title: string; badge: string; children: React.ReactNode; id?: string; magazine?: boolean }> = ({ title, badge, children, id, magazine }) => (
  <article id={id} className={`glass-panel rounded-[2rem] p-10 md:p-16 mb-12 transition-all w-full group overflow-hidden relative border border-white/5`}>
    <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-teal-500/[0.02] blur-[100px] pointer-events-none"></div>
    <span className="text-teal-400 font-mono text-[9px] tracking-[0.4em] uppercase mb-4 block opacity-60 group-hover:opacity-100 transition-opacity">{badge}</span>
    <h2 className={`text-3xl md:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tighter ${magazine ? 'font-magazine italic' : ''}`}>{title}</h2>
    <div className="prose prose-invert prose-teal max-w-none text-slate-400/90 space-y-8 text-lg md:text-xl leading-[1.6] font-light">
      {children}
    </div>
  </article>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/:lang/:view" element={<MainApp />} />
      <Route path="/:lang" element={<NavigateToDefaultView />} />
      <Route path="/" element={<Navigate to="/en/utility" replace />} />
    </Routes>
  );
};

const NavigateToDefaultView: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang || 'en'}/utility`} replace />;
};

const MainApp: React.FC = () => {
  const { lang, view } = useParams<{ lang: string; view: string }>();
  const navigate = useNavigate();

  const [inputText, setInputText] = useState('');
  const [sourceLang, setSourceLang] = useState<SupportedLanguage>((lang as SupportedLanguage) || 'en');
  const [targetLang, setTargetLang] = useState<SupportedLanguage>('he');
  const [outputText, setOutputText] = useState('');
  
  const currentView = useMemo(() => (view && VIEW_MAP[view]) || 'converter', [view]);
  const [isCopied, setIsCopied] = useState(false);

  // Sync sourceLang with URL lang slug
  useEffect(() => {
    if (lang && MAPPINGS[lang as SupportedLanguage]) {
      setSourceLang(lang as SupportedLanguage);
    }
  }, [lang]);
  useEffect(() => {
    let title = "GibberishGone | Universal Input Recovery";
    let metaDesc = "Universal Input Recovery and Layout Fixer. Restore text typed in the wrong layout instantly with deterministic precision.";
    
    switch(currentView) {
      case 'converter':
        title = "GibberishGone | Fix Text Typed in Wrong Keyboard Layout";
        metaDesc = "Free online tool to fix text typed in the wrong keyboard layout. Convert between QWERTY, Hebrew, Cyrillic, Arabic and more. 100% private — no data sent to servers.";
        break;
      case 'knowledge':
        title = "Guides & Articles | Keyboard Layout Tips and Tutorials";
        metaDesc = "Practical guides about keyboard layouts, multilingual typing, and how to recover text typed in the wrong language.";
        break;
      case 'about':
        title = "About | GibberishGone Keyboard Layout Fixer";
        metaDesc = "Learn how GibberishGone works, why we built it, and how we keep your data private with client-side processing.";
        break;
      case 'how-it-works':
        title = "How It Works | Keyboard Layout Conversion Explained";
        metaDesc = "A simple explanation of how keyboard layout conversion works and why our tool keeps your text private.";
        break;
      case 'privacy':
        title = "Privacy Policy | GibberishGone";
        metaDesc = "GibberishGone does not collect, store, or transmit your text. All conversion happens inside your browser.";
        break;
      case 'terms':
        title = "Terms of Service | GibberishGone";
        metaDesc = "Terms of service for using the GibberishGone keyboard layout recovery tool.";
        break;
      case 'support':
        title = "Contact Us | GibberishGone Support";
        metaDesc = "Contact the GibberishGone team for bug reports, feature requests, or questions about supported keyboard layouts.";
        break;
      case 'faq':
        title = "FAQ | Frequently Asked Questions | GibberishGone";
        metaDesc = "Find answers to common questions about using GibberishGone, supported keyboard layouts, privacy, and offline use.";
        break;
    }
    
    document.title = title;
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) metaTag.setAttribute('content', metaDesc);
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const result = convertText(inputText, sourceLang, targetLang);
    setOutputText(result);
  }, [inputText, sourceLang, targetLang]);

  const handleCopy = async () => {
    if (!outputText) return;
    try { 
      await navigator.clipboard.writeText(outputText); 
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) { 
      console.error(err); 
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  const swapLanguages = () => {
    const s = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(s);
    if (outputText && !inputText) setInputText(outputText);
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setSourceLang(newLang);
    navigate(`/${newLang}/${view || 'utility'}`);
  };

const articles = useMemo(() => RESEARCH_ARTICLES, []);


  const renderView = () => {
    switch(currentView) {
      case 'converter': return (
        <div className="w-full max-w-[1600px] animate-reveal px-8 mx-auto">
          <header className="text-center mb-16 pt-16 md:pt-32">
            <h1 className="text-5xl md:text-[8rem] font-black mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30 tracking-[-0.05em] leading-[0.85] flex flex-col items-center">
              Universal Input <br/> Recovery <span className="text-teal-400">&</span> Layout Fixer
            </h1>
            <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-[1.4] tracking-tight">
              Instantly restore text typed in the wrong keyboard layout. <br className="hidden md:block"/> 
              A secure, local-first solution for a multilingual world.
            </p>
          </header>

          <div className="space-y-10 mb-40">
            <div className="flex flex-col md:flex-row items-stretch gap-6 h-auto md:h-20">
              <div className="flex-1 min-w-0"><LanguageSelector selected={sourceLang} onChange={handleLanguageChange} label="Source Layout" /></div>
              <button onClick={swapLanguages} aria-label="Swap Layouts" className="self-center p-6 rounded-full glass-panel border border-white/10 text-teal-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(45,212,191,0.2)]">
                <ArrowLeftRight className="w-8 h-8" />
              </button>
              <div className="flex-1 min-w-0"><LanguageSelector selected={targetLang} onChange={setTargetLang} label="Intended Script" /></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 flex flex-col h-[450px] md:h-[650px] relative overflow-hidden group">
                <label htmlFor="input-textarea" className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400/50 mb-8">Input Matrix</label>
                <textarea 
                  id="input-textarea"
                  value={inputText} 
                  onChange={(e) => setInputText(e.target.value)} 
                  placeholder="Type in wrong layout to fix" 
                  className="flex-1 bg-transparent resize-none border-none outline-none text-white text-4xl md:text-6xl font-mono placeholder-slate-900 focus:ring-0 leading-tight scrollbar-hide" 
                  spellCheck={false} 
                  autoFocus
                />
                <div className="flex justify-between items-center pt-8 mt-6 border-t border-white/5">
                  <div className="flex items-center gap-8">
                    <span className="text-[10px] text-slate-600 font-mono tracking-[0.3em] uppercase">Buffer live</span>
                    <Link to={`/${sourceLang}/protocol`} className="text-[10px] uppercase tracking-[0.3em] text-slate-500 hover:text-cyan-400 transition-all duration-300 hover:[text-shadow:0_0_8px_rgba(34,211,238,0.4)]">VIEW PROTOCOL SPEC</Link>
                  </div>
                  <button onClick={handleClear} className="text-[10px] font-black text-slate-500 hover:text-teal-400 transition-colors uppercase tracking-[0.4em]">Clear Input</button>
                </div>
              </div>

              <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 flex flex-col h-[450px] md:h-[650px] relative overflow-hidden group border-teal-500/10">
                <div className="absolute inset-0 bg-teal-500/[0.02] pointer-events-none"></div>
                <label htmlFor="output-display" className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-8 flex items-center gap-4">
                  Restored Sequence
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_12px_rgba(45,212,191,0.5)]"></span>
                </label>
                <div id="output-display" className="flex-1 overflow-y-auto text-4xl md:text-6xl font-mono text-teal-100 whitespace-pre-wrap leading-tight scrollbar-hide">
                  {outputText || <span className="text-slate-900 italic font-sans text-2xl font-light">Analyzing stream...</span>}
                </div>
                <div className="relative mt-10">
                   <button 
                    onClick={handleCopy} 
                    disabled={!outputText} 
                    className="w-full py-6 rounded-2xl bg-teal-500 text-slate-950 font-black text-sm uppercase tracking-[0.5em] transition-all disabled:opacity-5 disabled:grayscale hover:scale-[1.01] active:scale-95 shadow-[0_0_40px_-5px_rgba(45,212,191,0.5)] flex items-center justify-center gap-4"
                  >
                    {isCopied ? <ClipboardCheck className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
                    {isCopied ? 'Restoration Copied!' : 'Copy Restoration'}
                  </button>
                  {isCopied && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 text-teal-400 text-xs font-bold rounded-full animate-bounce shadow-xl border border-teal-500/20">
                      Copied to Clipboard
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* EXAMPLES & HOW IT WORKS */}
          <section className="max-w-7xl mx-auto py-20 px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">How It Works in Practice</h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                Select the layout you accidentally typed in, choose the layout you intended, and paste your text. The tool converts it instantly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-10 rounded-3xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Hebrew Typed in English Layout</h4>
                  <p className="text-slate-500 mb-4 font-light leading-relaxed text-sm">You meant to type Hebrew but your keyboard was set to English. The physical keys you pressed produced Latin characters.</p>
                  <div className="bg-slate-900/50 rounded-xl p-4 font-mono text-sm space-y-2">
                    <div className="text-slate-500">Input (English layout):</div>
                    <div className="text-white">akuo dksc</div>
                    <div className="text-teal-400 mt-2">Restored (Hebrew):</div>
                    <div className="text-teal-100" dir="rtl">שלום כיתה</div>
                  </div>
                </div>
                <Link to={`/${sourceLang}/archive`} className="text-teal-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 mt-6">
                  Hebrew Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="glass-card p-10 rounded-3xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Russian Typed in English Layout</h4>
                  <p className="text-slate-500 mb-4 font-light leading-relaxed text-sm">Your keyboard was on English QWERTY, but you intended to type Russian JCUKEN. The result looks like random Latin letters.</p>
                  <div className="bg-slate-900/50 rounded-xl p-4 font-mono text-sm space-y-2">
                    <div className="text-slate-500">Input (English layout):</div>
                    <div className="text-white">rjvgtyn</div>
                    <div className="text-teal-400 mt-2">Restored (Russian):</div>
                    <div className="text-teal-100">компьютер</div>
                  </div>
                </div>
                <Link to={`/${sourceLang}/archive`} className="text-teal-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 mt-6">
                  Layout Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="glass-card p-10 rounded-3xl flex flex-col justify-between border-teal-500/10">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Completely Private Processing</h4>
                  <p className="text-slate-500 mb-4 font-light leading-relaxed text-sm">Unlike online translation tools or AI rewriters, your text never leaves your browser. This makes it safe for passwords, emails, and confidential documents.</p>
                  <div className="bg-slate-900/50 rounded-xl p-4 font-mono text-sm space-y-2">
                    <div className="text-slate-500">Your text stays here:</div>
                    <div className="text-white">Browser memory only</div>
                    <div className="text-teal-400 mt-2">Never sent to:</div>
                    <div className="text-teal-100">Servers, AI APIs, logs</div>
                  </div>
                </div>
                <Link to={`/${sourceLang}/manifesto`} className="text-teal-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 mt-6">
                  Privacy Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link to={`/${sourceLang}/archive`} className="px-12 py-5 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 text-sm font-bold uppercase tracking-widest transition-all">Browse All Guides</Link>
            </div>
          </section>

          <section className="max-w-6xl mx-auto py-40 border-t border-white/5 space-y-40">
            <div className="text-center">
              <h2 className="text-6xl md:text-[7rem] font-black text-white mb-12 tracking-tighter">Fast. Private. Free.</h2>
              <p className="text-slate-400 text-2xl md:text-4xl leading-[1.6] max-w-4xl mx-auto font-light">
                A simple tool for a common problem. No signup, no cloud processing, no limits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-1.5 bg-teal-500 group-hover:w-32 transition-all duration-700"></div>
                <h3 className="text-5xl font-bold text-white tracking-tight">How It Works</h3>
                <p className="text-slate-400 text-2xl leading-relaxed font-light">
                  Every keyboard key sends a fixed signal to your computer. The operating system uses a lookup table called a keyboard layout to decide which character to show. When the wrong layout is active, the signals are correct but the lookup table is wrong. Our tool simply applies the correct lookup table to recover your original text. <Link to={`/${sourceLang}/protocol`} className="text-teal-400 border-b border-teal-500/20 hover:text-white transition-colors">Read the technical explanation</Link>
                </p>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-1.5 bg-teal-500 group-hover:w-32 transition-all duration-700"></div>
                <h3 className="text-5xl font-bold text-white tracking-tight">Your Data Stays Yours</h3>
                <p className="text-slate-400 text-2xl leading-relaxed font-light">
                  We do not collect, store, or transmit your text. The conversion happens entirely inside your browser using JavaScript. Once you close the tab, the text is gone. This makes GibberishGone safe for sensitive content like passwords, medical notes, or legal documents. <Link to={`/${sourceLang}/privacy`} className="text-teal-400 border-b border-teal-500/20 hover:text-white transition-colors">Read our privacy policy</Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      );
      case 'knowledge': return (
  <div className="w-full max-w-6xl animate-reveal px-8 pb-64 mx-auto">
    <header className="text-center mb-16 pt-32">
      <div className="mb-12">
         <Link to={`/${sourceLang}/utility`} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 transition-all">← Back to Restoration Tool</Link>
      </div>
      <h1 className="text-7xl md:text-[10rem] font-black text-white mb-12 font-magazine tracking-tighter italic leading-[0.85]">The Archive.</h1>
      <p className="text-teal-400 opacity-60 text-2xl md:text-3xl font-light italic leading-relaxed">Practical guides and references for multilingual typists.</p>
    </header>
    <div className="space-y-32">
      {articles.map((art) => (
        <article key={art.id} className="glass-panel rounded-[2rem] p-10 md:p-16 mb-12 transition-all w-full group overflow-hidden relative border border-white/5">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-teal-500/[0.02] blur-[100px] pointer-events-none"></div>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-slate-500 text-sm">
            <span className="text-teal-400 font-mono text-[9px] tracking-[0.4em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">{art.category}</span>
            {art.readTime && (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                {art.readTime}
              </span>
            )}
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-[1.1] tracking-tighter font-magazine italic">{art.title}</h2>

          <div className="prose prose-invert prose-teal max-w-none text-slate-400/90 space-y-6 text-lg md:text-xl leading-[1.6] font-light">
            {art.content.map((para, pIdx) => (
              <p key={`${art.id}-${pIdx}`}>{para}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
    <div className="mt-32 text-center">
       <Link to={`/${sourceLang}/utility`} className="px-12 py-5 bg-teal-500 text-slate-950 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-teal-500/20">Return to Input Recovery</Link>
    </div>
  </div>
);
      case 'about': return (
        <div className="w-full max-w-5xl animate-reveal px-8 mx-auto pt-32">
          <ContentSection badge="About" title="What Is GibberishGone?">
            <p>GibberishGone is a free online tool that fixes text typed in the wrong keyboard layout. If you accidentally typed a Hebrew email while your computer was set to English, or wrote English code while the layout was stuck on Russian, this tool converts the text back to what you originally intended — instantly and entirely in your browser.</p>
            <p>We built this tool because we experienced the problem ourselves. As multilingual developers and writers, we kept losing paragraphs of work to simple layout slips. Existing solutions were either cloud-based (sending our text to unknown servers) or too limited in the languages they supported. We wanted something fast, private, and accurate.</p>

            <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-teal-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-6">What We Focus On</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  Accurate, deterministic conversion based on official keyboard layout standards
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  Complete privacy — your text is never transmitted to our servers or any third party
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  Support for Hebrew, Arabic, Cyrillic, and many European and Asian layouts
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  Educational content that helps users understand and prevent layout errors
                </li>
              </ul>
            </div>

            <div className="mt-8 p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-teal-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-6">How the Tool Works</h3>
              <p className="text-slate-400 mb-4">The conversion engine uses standard keyboard layout mapping tables published by national standards bodies and operating system vendors. When you paste scrambled text, the tool looks up each character against the mapping table for the layout that was accidentally active, then outputs the corresponding character from the layout you intended. There is no artificial intelligence, no probabilistic guessing, and no server involved. The entire process happens in your browser using JavaScript.</p>
            </div>

            <div className="flex gap-6 pt-10">
              <Link to={`/${sourceLang}/protocol`} className="px-8 py-4 rounded-xl border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all font-black uppercase tracking-widest text-[11px]">Technical Details</Link>
              <Link to={`/${sourceLang}/archive`} className="px-8 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all font-black uppercase tracking-widest text-[11px]">Read Guides</Link>
            </div>
          </ContentSection>
        </div>
      );
      case 'how-it-works': return (
        <div className="w-full max-w-5xl animate-reveal px-8 mx-auto pt-32">
          <ContentSection badge="The Protocol" title="Deterministic Spec">
            <p>While AI models attempt to "predict" your text based on probability, GibberishGone utilizes <strong>Deterministic Scancode Mapping</strong>. By reversing the OS-level lookup tables, we reconstruct your original intent with bit-perfect accuracy.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-16 py-14 border-y border-white/5">
              <div className="space-y-8">
                <h3 className="text-teal-400 font-black uppercase tracking-[0.4em] text-[11px]">Deterministic (Elite)</h3>
                <ul className="text-lg space-y-4 text-slate-500">
                  <li className="flex items-center gap-4 text-white"><span className="w-2 h-2 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span> 100% Precise Recovery</li>
                  <li className="flex items-center gap-4 text-white"><span className="w-2 h-2 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span> Local RAM Process</li>
                  <li className="flex items-center gap-4 text-white"><span className="w-2 h-2 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span> Preserves Symbol Logic</li>
                </ul>
              </div>
              <div className="space-y-8 opacity-20 grayscale">
                <h3 className="text-slate-600 font-black uppercase tracking-[0.4em] text-[11px]">Probabilistic AI (Risky)</h3>
                <ul className="text-lg space-y-4 text-slate-600">
                  <li className="flex items-center gap-4"> Statistical Guessing</li>
                  <li className="flex items-center gap-4"> Cloud Latency / Leaks</li>
                  <li className="flex items-center gap-4"> Context Drift</li>
                </ul>
              </div>
            </div>

            <p className="font-light">Our engine maintains surgical precision for code, legal text, and medical terminology. By eliminating the cloud gap, we fulfill the highest security mandates for global enterprises.</p>
          </ContentSection>
        </div>
      );
      case 'privacy': return (
        <div className="w-full max-w-5xl animate-reveal px-8 mx-auto pt-32">
          <ContentSection badge="Legal" title="Privacy Policy">
            <p>GibberishGone is engineered as a <strong>Zero-Transmission Utility</strong>. We provide the following explicit declarations regarding your data privacy and digital sovereignty.</p>
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">1. Data Sovereignty and Zero-Transmission</h4>
            <p><strong>We do not collect, store, or share any user-inputted text. All data remains in your browser's volatile memory.</strong> All character mapping and deterministic restoration occur strictly within the client-side RAM of your local environment. Your input data never leaves your browser.</p>
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">2. Essential Cookies and Advertising</h4>
            <p>We use essential cookies solely for core application functionality and Google AdSense compliance. These cookies help us serve non-personalized advertisements to keep the tool free for all users without compromising the privacy of your actual input strings.</p>
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">3. Compliance Standards</h4>
            <p>Our architecture is built to meet the most stringent global privacy standards, including GDPR and CCPA, by effectively "anonymizing by design." Since no personal text data is transmitted to our infrastructure, the risk of interception or leak is effectively zero.</p>
          </ContentSection>
        </div>
      );
      case 'terms': return (
        <div className="w-full max-w-5xl animate-reveal px-8 mx-auto pt-32">
          <ContentSection badge="Legal" title="Terms of Service">
            <p>By accessing the GibberishGone utility, you agree to the following professional terms of use.</p>
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">1. Provision of Service</h4>
            <p>The GibberishGone utility is provided <strong>'as-is' for text restoration purposes</strong>. While we strive for 100% deterministic accuracy through our specialized mapping logic, we do not warrant that the results will be flawless for every possible hardware/software configuration.</p>
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">2. User Responsibility</h4>
            <p>As a local-first, zero-transmission tool, <strong>the user is solely responsible for the output generated by the tool</strong>. GibberishGone shall not be held liable for any damages, errors, or data inaccuracies arising from the subsequent use of restored text in professional or critical environments.</p>
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">3. Ethical Usage</h4>
            <p>Users agree to utilize this tool for legitimate input restoration and refrain from any activity intended to interfere with the application's local processing architecture or performance.</p>
          </ContentSection>
        </div>
      );
      case 'faq': return (
        <div className="w-full max-w-5xl animate-reveal px-8 mx-auto pt-32">
          <ContentSection badge="FAQ" title="Frequently Asked Questions">
            <div className="space-y-10">
              <div>
                <h4 className="text-white font-bold text-xl mb-3">Is GibberishGone really free?</h4>
                <p>Yes. The tool is free to use with no registration, no usage limits, and no premium tiers. We support development through non-intrusive advertising.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-3">Does my text get sent to your servers?</h4>
                <p>No. The conversion happens entirely inside your web browser. When you paste text, it enters your browser's temporary memory and is processed by JavaScript code that was downloaded when you first loaded the page. We cannot see, store, or analyze your text because it never reaches us.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-3">Which keyboard layouts are supported?</h4>
                <p>We support English QWERTY, Hebrew (SI-1452), Russian JCUKEN, Arabic (101), French AZERTY, German QWERTZ, Spanish, Italian, Portuguese, Turkish, Greek, and several others. If you need a layout that is not listed, contact us and we will add it.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-3">Can I use this tool offline?</h4>
                <p>Once the page has loaded, you can disconnect from the internet and continue using it. The tool does not require an active connection after the initial page load. However, you cannot load the page for the first time without internet access.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-3">Will the tool work on my phone?</h4>
                <p>Yes. The website is responsive and works on iOS Safari, Android Chrome, and most mobile browsers. Note that mobile virtual keyboards sometimes behave differently from physical keyboards, so results may vary for text originally typed on a phone.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-3">Can I convert in both directions?</h4>
                <p>Yes. You can set any supported layout as the source and any other as the target. Use the swap button in the middle of the screen to reverse the direction instantly.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-3">Why does the result still look wrong sometimes?</h4>
                <p>This usually means the source layout you selected was not the one that was active when the text was originally typed. Try the next most likely layout for your region. For example, if English did not work, try French AZERTY or German QWERTZ if you were using a European computer.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-3">Does the tool fix spelling mistakes?</h4>
                <p>No. This tool only fixes layout mismatches — when the right keys were pressed but the wrong language was active. It does not correct spelling, grammar, or typos. If you actually misspelled a word, it will remain misspelled after conversion.</p>
              </div>
            </div>
          </ContentSection>
        </div>
      );
      case 'support': return (
        <div className="w-full max-w-5xl animate-reveal px-8 mx-auto pt-32">
          <ContentSection badge="Support" title="Contact Us">
            <p>For bug reports, feature requests, or questions about supported keyboard layouts, please reach out by email.</p>
            <div className="mt-16 p-14 rounded-[2.5rem] bg-teal-500/5 border border-teal-500/20 text-center space-y-6">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-teal-400/60 block">Email</span>
              <a href="mailto:shoprdo63@gmail.com" className="text-3xl md:text-5xl font-black text-white hover:text-teal-400 transition-all">
                shoprdo63@gmail.com
              </a>
            </div>
            <p className="mt-16 text-slate-500 font-light leading-relaxed text-lg">We read every message and aim to respond within a few business days. For faster answers to common questions, please check the FAQ page first.</p>
            <div className="mt-8">
              <Link to={`/${sourceLang}/faq`} className="px-8 py-4 rounded-xl border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all font-black uppercase tracking-widest text-[11px]">Visit FAQ</Link>
            </div>
          </ContentSection>
        </div>
      );
      default: return <Navigate to={`/${sourceLang}/utility`} replace />;
    }
  };

  return (
    <div className="min-h-full w-full flex flex-col scroll-smooth">
      <header className="fixed top-0 inset-x-0 z-[100] border-b border-white/10 bg-[#020617]/80 backdrop-blur-xl">
        <nav className="max-w-[1600px] mx-auto px-10 md:px-16 h-32 flex items-center justify-between">
          <Link to={`/${sourceLang}/utility`} className="flex items-center gap-6 group transition-all" aria-label="GibberishGone Home">
            <div className="w-16 h-16 glass-panel border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-teal-400/50 transition-all duration-500 shadow-2xl group-hover:shadow-teal-500/20 group-hover:-rotate-2">
              <Layout className="w-8 h-8 text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.6)] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-3xl md:text-4xl font-black tracking-[-0.07em] text-white flex flex-col leading-none">
              <span className="group-hover:text-teal-400 transition-colors">GIBBERISH</span>
              <span className="text-[11px] tracking-[0.8em] text-teal-400/60 font-black group-hover:text-teal-400 transition-all border-t-4 border-teal-400/40 mt-1 pt-1">GONE.</span>
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-20">
            {[
                {id: 'converter', label: 'Utility', path: '/utility'}, 
                {id: 'knowledge', label: 'Archive', path: '/archive'}, 
                {id: 'about', label: 'Manifesto', path: '/manifesto'}, 
                {id: 'how-it-works', label: 'Protocol', path: '/protocol'}
            ].map((v) => (
              <Link 
                key={v.id}
                to={`/${sourceLang}${v.path}`}
                className={`text-sm font-black tracking-[0.4em] uppercase transition-all duration-300 py-3 relative group brightness-100 hover:brightness-125
                  ${currentView === v.id ? 'text-teal-400' : 'text-slate-500 hover:text-white hover:drop-shadow-[0_0_12px_rgba(45,212,191,0.4)] hover:[text-shadow:0_0_10px_rgba(0,255,255,0.5)]'}`}
              >
                {v.label}
                <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-teal-400 transition-transform duration-500 origin-left 
                  ${currentView === v.id ? 'scale-x-100 shadow-[0_0_15px_rgba(45,212,191,0.6)]' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-grow pt-48 pb-64 flex flex-col items-center">
        {renderView()}
      </main>

      <footer className="py-32 border-t border-white/5 bg-[#020617] text-slate-700 text-[11px]">
        <div className="max-w-[1600px] mx-auto px-10 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32 text-center md:text-left">
              <div className="col-span-1 md:col-span-1">
                 <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
                    <div className="w-10 h-10 glass-panel border border-teal-400/30 rounded-xl flex items-center justify-center">
                        <Layout className="w-5 h-5 text-teal-400" />
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter uppercase">GibberishGone.</span>
                 </div>
                 <p className="leading-relaxed opacity-50 max-w-sm font-light text-slate-500 text-base">The definitive utility for high-performance input restoration. Built for digital sovereignty.</p>
                 <div className="mt-8 p-4 bg-teal-500/5 border border-teal-500/10 rounded-xl text-xs text-teal-400 font-bold uppercase tracking-widest text-center md:text-left">
                   Privacy Note: Your text is processed locally in your browser and is never sent to our servers.
                 </div>
              </div>
              <div>
                <h3 className="text-white/40 font-black mb-10 uppercase tracking-[0.5em] text-[10px]">LEGAL</h3>
                <nav className="flex flex-col gap-8 font-black tracking-[0.2em] text-xs">
                  <Link to={`/${sourceLang}/privacy`} className="hover:text-teal-400 transition-colors uppercase">Privacy Policy</Link>
                  <Link to={`/${sourceLang}/terms`} className="hover:text-teal-400 transition-colors uppercase">Terms of Service</Link>
                </nav>
              </div>
              <div>
                <h3 className="text-white/40 font-black mb-10 uppercase tracking-[0.5em] text-[10px]">SUPPORT</h3>
                <nav className="flex flex-col gap-8 font-black tracking-[0.2em] text-xs">
                  <Link to={`/${sourceLang}/contact`} className="hover:text-teal-400 transition-colors uppercase">Contact Us</Link>
                  <Link to={`/${sourceLang}/faq`} className="hover:text-teal-400 transition-colors uppercase">FAQ</Link>
                </nav>
              </div>
              <div>
                <h3 className="text-white/40 font-black mb-10 uppercase tracking-[0.5em] text-[10px]">SYSTEM</h3>
                <nav className="flex flex-col gap-8 font-black tracking-[0.2em] text-xs">
                  <Link to={`/${sourceLang}/protocol`} className="hover:text-teal-400 transition-colors uppercase">Security Protocol</Link>
                  <Link to={`/${sourceLang}/utility`} className="hover:text-teal-400 transition-colors uppercase cursor-default opacity-20">System Status</Link>
                </nav>
              </div>
            </div>

            <div className="max-w-2xl mx-auto opacity-20 mb-20 italic text-center leading-loose text-xs text-slate-500">
                <p>GibberishGone is a high-performance utility for digital input management. We maintain local, zero-transmission processing and purge all buffers upon session termination.</p>
                <p className="font-mono text-[9px] not-italic uppercase tracking-[0.6em] mt-8 text-slate-800">Verified: pub-8446552009469150 // DIRECT // PRIVACY_ENFORCED</p>
            </div>
            <div className="border-t border-white/5 pt-16 text-center">
              <p className="font-black text-slate-900 tracking-[0.6em] text-base uppercase">&copy; 2026 GIBBERISHGONE // UNIVERSAL INPUT UTILITY</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
