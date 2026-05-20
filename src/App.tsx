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
import AdSense from './components/AdSense';
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
          <AdSense />
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
    <AdSense />
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
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">How Keyboard Layouts Work</h4>
            <p>Every keyboard key produces a fixed electrical signal called a "scan code" when pressed. This signal is the same regardless of what language you're typing. The operating system uses a lookup table (the keyboard layout) to translate each scan code into a character. When you press the physical key that produces scan code 30, the OS looks up 30 in the active layout table. If the layout is English QWERTY, it displays "a". If it's Hebrew SI-1452, it displays "ש". The hardware never changes—only the software mapping does.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">The Layout Mismatch Problem</h4>
            <p>A layout mismatch occurs when the active layout doesn't match the language you intend to type. You press the physical keys for "hello" but the layout is Hebrew, so you see "קסדף". The scan codes are correct, but the lookup table is wrong. The text isn't random—it's perfectly predictable because the relationship between scan codes and characters is fixed. This reversibility is what makes recovery possible.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">Deterministic vs. Probabilistic Recovery</h4>
            <p>Most online tools use AI or statistical models to "guess" what you meant. They look at character frequency, common words, and context clues. This approach is probabilistic—it might work often, but it can never be 100% certain. GibberishGone uses a different approach: deterministic mapping. We know exactly which character each scan code produces in each layout because these mappings are standardized by national and international bodies. By applying the reverse mapping, we recover your original text with mathematical certainty.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-16 py-14 border-y border-white/5">
              <div className="space-y-8">
                <h3 className="text-teal-400 font-black uppercase tracking-[0.4em] text-[11px]">Deterministic (Elite)</h3>
                <ul className="text-lg space-y-4 text-slate-500">
                  <li className="flex items-center gap-4 text-white"><span className="w-2 h-2 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span> 100% Precise Recovery</li>
                  <li className="flex items-center gap-4 text-white"><span className="w-2 h-2 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span> Local RAM Process</li>
                  <li className="flex items-center gap-4 text-white"><span className="w-2 h-2 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span> Preserves Symbol Logic</li>
                  <li className="flex items-center gap-4 text-white"><span className="w-2 h-2 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span> Works for Any Content Type</li>
                </ul>
              </div>
              <div className="space-y-8 opacity-20 grayscale">
                <h3 className="text-slate-600 font-black uppercase tracking-[0.4em] text-[11px]">Probabilistic AI (Risky)</h3>
                <ul className="text-lg space-y-4 text-slate-600">
                  <li className="flex items-center gap-4"> Statistical Guessing</li>
                  <li className="flex items-center gap-4"> Cloud Latency / Leaks</li>
                  <li className="flex items-center gap-4"> Context Drift</li>
                  <li className="flex items-center gap-4"> Fails on Technical Terms</li>
                </ul>
              </div>
            </div>

            <h4 className="text-white font-bold mt-10 mb-5 text-xl">The Conversion Process</h4>
            <p>When you paste text into GibberishGone, the conversion engine performs the following steps:</p>
            <ol className="space-y-3 text-slate-400 mt-4 list-decimal list-inside">
              <li className="ml-4">The engine reads each character in your input text</li>
              <li className="ml-4">It looks up the scan code that would produce that character in the source layout (the layout you accidentally used)</li>
              <li className="ml-4">It then looks up which character that scan code produces in the target layout (the layout you intended)</li>
              <li className="ml-4">The target character is added to the output</li>
              <li className="ml-4">This process repeats for every character in the input</li>
            </ol>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">Why This Matters for Sensitive Content</h4>
            <p>Deterministic mapping is crucial for sensitive content because it doesn't rely on context or meaning. A password, a medical code, a legal reference, or a technical identifier will be recovered correctly regardless of whether it appears in a dictionary or makes semantic sense. AI-based tools might "correct" these to something that looks like a real word, destroying their validity. GibberishGone preserves the exact sequence of characters you intended, character by character.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">Offline Capability</h4>
            <p>Because the conversion uses only fixed mapping tables and standard JavaScript, the tool works entirely offline once the page has loaded. This is not a feature—it's a consequence of our architecture. We don't need to call an API or access a database because all the necessary data (the mapping tables) is embedded in the application code that downloads to your browser. This also means the tool works in secure environments with restricted internet access.</p>

            <p className="font-light mt-8">Our engine maintains surgical precision for code, legal text, and medical terminology. By eliminating the cloud gap, we fulfill the highest security mandates for global enterprises.</p>
          </ContentSection>
        </div>
      );
      case 'privacy': return (
        <div className="w-full max-w-5xl animate-reveal px-8 mx-auto pt-32">
          <ContentSection badge="Legal" title="Privacy Policy">
            <p>GibberishGone is engineered as a <strong>Zero-Transmission Utility</strong>. We provide the following explicit declarations regarding your data privacy and digital sovereignty.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">1. Data Sovereignty and Zero-Transmission</h4>
            <p><strong>We do not collect, store, or share any user-inputted text. All data remains in your browser's volatile memory.</strong> All character mapping and deterministic restoration occur strictly within the client-side RAM of your local environment. Your input data never leaves your browser. When you close the tab or refresh the page, all text is immediately purged from memory. We maintain no server-side databases, logs, or caching systems that could capture your input.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">2. What We Collect</h4>
            <p>We collect minimal, non-personal technical data solely for improving service reliability and basic analytics. This includes: anonymous page view counts, browser type and version for compatibility optimization, approximate geographic region at country level for content localization, and session duration metrics. We do not collect IP addresses, device fingerprints, or any identifiers that could be used to track individual users across sessions.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">3. Essential Cookies and Advertising</h4>
            <p>We use essential cookies solely for core application functionality and Google AdSense compliance. These cookies help us serve non-personalized advertisements to keep the tool free for all users without compromising the privacy of your actual input strings. AdSense cookies are used solely for ad delivery and fraud prevention; they do not access your converted text or any personal information. You may disable cookies in your browser settings, though this may affect ad display.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">4. Third-Party Services</h4>
            <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet. However, AdSense does not have access to any text you input into GibberishGone, as that data never leaves your browser. We do not sell, trade, or rent your personal identification information to any third party for any purpose.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">5. Data Retention</h4>
            <p>Since we do not collect or store user-inputted text, there is no data to retain. Technical analytics data is retained in aggregate, anonymized form for up to 12 months for service improvement purposes. After this period, all analytics data is permanently deleted. We never retain data that could be used to reconstruct individual user sessions or identify specific users.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">6. Your Rights Under GDPR and CCPA</h4>
            <p>Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have the right to access, delete, or restrict processing of your personal data. Since GibberishGone does not collect personal data or user-inputted text, there is no personal data to access or delete. If you believe we have inadvertently collected personal information, please contact us using the information in our Support section, and we will promptly investigate and remediate any such collection.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">7. Security Measures</h4>
            <p>We implement industry-standard security measures to protect the limited data we do collect. Our website uses HTTPS encryption for all data transmission. Our servers are hosted in secure, access-controlled data centers. We regularly audit our systems for vulnerabilities and promptly apply security patches. However, the most significant security measure is our zero-transmission architecture—by never receiving your text, we eliminate the entire attack surface associated with data storage and transmission.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">8. Children's Privacy</h4>
            <p>GibberishGone is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">9. International Data Transfers</h4>
            <p>Since we do not collect or store personal data, there are no international data transfers. The application code is delivered to your browser from content delivery networks that may operate globally, but this code contains no user data. All processing occurs locally in your browser regardless of your geographic location.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">10. Changes to This Privacy Policy</h4>
            <p>We may update this privacy policy from time to time. We will notify users of any material changes by posting the new policy on this page and updating the "last updated" date. We encourage you to review this privacy policy periodically to stay informed about how we protect your information.</p>
            
            <p className="mt-10 text-slate-500 italic">Last updated: January 2026</p>
          </ContentSection>
        </div>
      );
      case 'terms': return (
        <div className="w-full max-w-5xl animate-reveal px-8 mx-auto pt-32">
          <ContentSection badge="Legal" title="Terms of Service">
            <p>By accessing the GibberishGone utility, you agree to the following professional terms of use. These terms govern your use of our text restoration service and outline the rights and responsibilities of both parties.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">1. Provision of Service</h4>
            <p>The GibberishGone utility is provided <strong>'as-is' for text restoration purposes</strong>. While we strive for 100% deterministic accuracy through our specialized mapping logic, we do not warrant that the results will be flawless for every possible hardware/software configuration. The service is provided free of charge and is supported through non-intrusive advertising. We reserve the right to modify, suspend, or discontinue the service at any time without prior notice, though we will strive to provide reasonable notice for significant changes.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">2. User Responsibility</h4>
            <p>As a local-first, zero-transmission tool, <strong>the user is solely responsible for the output generated by the tool</strong>. GibberishGone shall not be held liable for any damages, errors, or data inaccuracies arising from the subsequent use of restored text in professional or critical environments. Users are responsible for verifying the accuracy of converted text before using it in important contexts such as legal documents, medical records, financial transactions, or professional communications.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">3. Acceptable Use</h4>
            <p>Users agree to utilize this tool for legitimate input restoration purposes. Prohibited uses include: attempting to reverse-engineer our mapping algorithms for commercial purposes, using automated scripts to abuse the service, attempting to circumvent any technical measures we implement, or using the service for any illegal purpose. We reserve the right to block access to users who violate these terms.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">4. Intellectual Property</h4>
            <p>All content, features, and functionality of GibberishGone, including but not limited to text, graphics, website design, code, and mapping algorithms, are owned by GibberishGone and are protected by international copyright, trademark, and other intellectual property laws. Users may not copy, modify, distribute, or create derivative works of our service without explicit written permission.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">5. Limitation of Liability</h4>
            <p>To the maximum extent permitted by applicable law, GibberishGone shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service. In no event shall our total liability exceed the amount you paid, if any, for accessing the service. Since the service is provided free of charge, our liability is limited to the minimum required by law.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">6. Indemnification</h4>
            <p>You agree to indemnify and hold harmless GibberishGone, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the service or your violation of these terms. This includes any claims related to the content you process through our service, even though we do not store or transmit that content.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">7. Privacy and Data Protection</h4>
            <p>Your use of GibberishGone is also governed by our Privacy Policy, which describes how we handle data. By using our service, you consent to our data practices as described in the Privacy Policy. Since we operate on a zero-transmission model, we do not collect your input text, but we may collect minimal analytics data as described in our privacy policy.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">8. Third-Party Links and Services</h4>
            <p>Our service may contain links to third-party websites or services. We are not responsible for the content, policies, or practices of third-party sites. Your interactions with third-party websites are governed by their terms and conditions. We encourage you to review the privacy policies and terms of service of any third-party sites you visit.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">9. Modifications to Terms</h4>
            <p>We reserve the right to modify these terms at any time. We will notify users of material changes by posting the updated terms on this page and updating the "last modified" date. Your continued use of the service after such modifications constitutes your acceptance of the new terms. It is your responsibility to review these terms periodically.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">10. Governing Law and Jurisdiction</h4>
            <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which GibberishGone operates, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in that jurisdiction.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">11. Severability</h4>
            <p>If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining terms remain in full force and effect. The failure of either party to exercise any right provided in these terms shall not be deemed a waiver of that right.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">12. Contact Information</h4>
            <p>If you have any questions about these Terms of Service, please contact us using the information provided in our Support section. We are committed to addressing any concerns you may have about our service or these terms.</p>
            
            <p className="mt-10 text-slate-500 italic">Last updated: January 2026</p>
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
            <p>We're here to help you get the most out of GibberishGone. Whether you've found a bug, have a feature request, or need help with a specific keyboard layout, we want to hear from you.</p>
            
            <h4 className="text-white font-bold mt-10 mb-5 text-xl">What to Include in Your Message</h4>
            <p>To help us assist you faster, please include the following information when contacting us:</p>
            <ul className="space-y-3 text-slate-400 mt-4">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                A clear description of the issue or question
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                The keyboard layouts you were using (source and target)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                The text you tried to convert (if it's not sensitive)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                Your browser and operating system version
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                Screenshots if the issue is visual
              </li>
            </ul>

            <h4 className="text-white font-bold mt-10 mb-5 text-xl">Response Time</h4>
            <p>We typically respond to all messages within 1-2 business days. For urgent technical issues, please include "URGENT" in your subject line. Feature requests may take longer to evaluate as we prioritize them based on user demand and technical feasibility.</p>

            <h4 className="text-white font-bold mt-10 mb-5 text-xl">Before You Contact Us</h4>
            <p>Many common questions are already answered in our FAQ. Please check there first for immediate answers about privacy, offline use, supported layouts, and more. You might also find helpful information in our Archive section, which contains detailed guides for specific keyboard layouts and typing scenarios.</p>

            <div className="mt-16 p-14 rounded-[2.5rem] bg-teal-500/5 border border-teal-500/20 text-center space-y-6">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-teal-400/60 block">Email</span>
              <a href="mailto:shoprdo63@gmail.com" className="text-3xl md:text-5xl font-black text-white hover:text-teal-400 transition-all">
                shoprdo63@gmail.com
              </a>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to={`/${sourceLang}/faq`} className="px-8 py-4 rounded-xl border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all font-black uppercase tracking-widest text-[11px] text-center">Visit FAQ</Link>
              <Link to={`/${sourceLang}/archive`} className="px-8 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all font-black uppercase tracking-widest text-[11px] text-center">Browse Guides</Link>
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
