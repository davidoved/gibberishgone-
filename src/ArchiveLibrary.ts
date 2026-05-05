export interface ResearchArticle {
  id: string;
  title: string;
  category: string;
  content: string[];
  readTime?: string;
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: "what-is-layout-mismatch",
    title: "What Is a Keyboard Layout Mismatch and Why Does It Happen?",
    category: "Getting Started",
    readTime: "4 min read",
    content: [
      "If you have ever sat down to type an email in Hebrew and ended up with a string of Latin letters, you have experienced a keyboard layout mismatch. It is one of the most common frustrations for multilingual computer users, yet the cause is surprisingly simple.",
      "Your keyboard is essentially a grid of physical switches. When you press the key in the top-left corner, the computer receives a signal called a scan code. The operating system then looks at a table — the keyboard layout — to decide which character to display. That same physical key might produce the letter 'q' in English, the letter '/' in Hebrew, or the letter 'й' in Russian. The hardware never changes; only the software mapping does.",
      "Problems arise when the active layout does not match the language you intend to type. This happens easily on shared computers, after software updates, or when switching between applications. On Windows, the shortcut Alt + Shift changes layouts in a fraction of a second, often without you noticing. On macOS, the automatic layout switching based on the document language can trip you up when you reply to a message in a different language than the one you received.",
      "The result is text that looks like gibberish but is not random. Every character you see corresponds exactly to the key you pressed — just interpreted through the wrong mapping table. Because the relationship is perfectly predictable, the error can be reversed mathematically. You do not need to retype the entire paragraph; you simply need to reinterpret the scan codes through the correct layout.",
      "Understanding this distinction is important because it shapes how you fix the problem. Retyping is slow and error-prone. Spell-checkers cannot help because every word is technically valid in the wrong alphabet. Copying the text into a translation tool will produce nonsense because the text is not in a real language. The only reliable solution is a layout converter that knows the exact mapping tables for both the source and target languages."
    ]
  },
  {
    id: "hebrew-english-guide",
    title: "A Practical Guide to Hebrew-English Keyboard Switches",
    category: "How-To",
    readTime: "5 min read",
    content: [
      "For millions of people in Israel and Jewish communities worldwide, switching between Hebrew and English is a daily routine. Students write assignments in Hebrew but search the web in English. Developers write code in English but comment it in Hebrew. Customer support agents alternate languages mid-conversation. This constant switching makes layout errors almost inevitable.",
      "The standard Hebrew keyboard layout in Israel follows the SI-1452 standard. It maps Hebrew letters onto the same physical grid as the English QWERTY layout. The letter 'ש' sits where 'a' is in English. The letter 'נ' sits where 'b' is. This systematic overlap means that when you type Hebrew words while the computer is still set to English, you get a recognizable pattern of Latin characters. Conversely, typing English while the layout is Hebrew produces a string of Hebrew letters and punctuation marks.",
      "One common pitfall is punctuation. The period, comma, and slash keys move to different positions between the two layouts. A sentence that looks almost correct might have misplaced punctuation that reveals the mismatch. Numbers are another subtle trap. In many Hebrew layouts, the top row produces Hebrew letters unless you hold Shift. If you forget to press Shift, your password or phone number suddenly contains letters instead of digits.",
      "To minimize errors, most operating systems allow you to define a per-application keyboard policy. On Windows 10 and 11, go to Settings > Time & Language > Language > Advanced keyboard settings, and enable 'Let me use a different input method for each app window.' On macOS, System Settings > Keyboard > Input Sources offers similar behavior. These settings mean that your browser can stay in English while your word processor stays in Hebrew, reducing the chance of accidental switches.",
      "When an error does occur, the fastest recovery is a layout converter. Paste the scrambled text, select Hebrew as the intended language and English as the active (wrong) language, and the tool will restore the original text instantly. Because the conversion is based on fixed mapping tables, it works for any content — names, addresses, technical terms, and even passwords — without guessing or altering meaning."
    ]
  },
  {
    id: "why-local-only",
    title: "Why GibberishGone Processes Everything in Your Browser",
    category: "Privacy & Security",
    readTime: "3 min read",
    content: [
      "When you paste text into an online tool, where does it go? Most users never ask this question, but the answer matters more than you might think. Many popular text converters send your input to a remote server, process it there, and send it back. In that brief journey, your data may pass through server logs, caching layers, and third-party analytics systems.",
      "GibberishGone was built on a different principle: your text never leaves your device. The entire conversion engine runs inside your web browser using standard JavaScript. When you paste scrambled text, it goes into a temporary memory area that exists only on your computer. The conversion happens instantly because there is no network delay. When you close the tab, the data disappears.",
      "This matters because the text you are fixing is often more sensitive than it appears. A scrambled email might contain legal advice, medical details, or business strategy. A garbled chat message might include personal names, addresses, or passwords. Even if the text looks like gibberish to a human, a server receiving it could store, analyze, or accidentally leak it.",
      "Local processing also means the tool works offline. Once the page has loaded, you can disconnect from the internet and continue converting text. This is useful on flights, in secure facilities with restricted network access, or in regions with unreliable connectivity. The tool does not depend on any external service to function.",
      "Technically, the difference is between client-side and server-side processing. Client-side means the code runs on your device. Server-side means the code runs on a computer owned by the service provider. GibberishGone is entirely client-side. We do not have a database of user text, we do not run analytics on what you convert, and we cannot retrieve anything you have typed even if we wanted to. The only data transmission is the initial page load, which contains the application code itself — not your content."
    ]
  },
  {
    id: "supported-layouts",
    title: "Keyboard Layouts Supported by GibberishGone",
    category: "Reference",
    readTime: "6 min read",
    content: [
      "GibberishGone supports a wide range of keyboard layouts used around the world. Each layout is implemented as a precise character mapping table that reflects the official national or industry standard. Below is an overview of the major layout families and what to expect when converting between them.",
      "English QWERTY is the default layout for most computers sold in the United States, United Kingdom, Canada, Australia, and many other countries. It is also the base grid onto which most other Latin-script layouts are built. When converting from QWERTY to another layout, the tool assumes the physical keys you pressed correspond to the standard US QWERTY positions.",
      "Hebrew (SI-1452) is the standard Israeli layout. It places Hebrew letters on the same physical key positions as English QWERTY, which makes conversion straightforward but also makes accidental switches common. The Hebrew layout includes special characters for biblical text (such as geresh and gershayim) on the Shift layer of certain keys.",
      "Russian JCUKEN (ЙЦУКЕН) is the standard Cyrillic layout in Russia and many post-Soviet states. Unlike Hebrew, JCUKEN reorganizes letters to optimize for Russian letter frequency, so the mapping to QWERTY is not one-to-one by position. Our converter handles this correctly by using the official JCUKEN mapping table.",
      "Arabic layouts vary by region. The standard Arabic (101) layout is used across the Middle East and North Africa. Because Arabic is a right-to-left script with contextual letter forms, the converter preserves the underlying character sequence even though the visual rendering may shift depending on your application.",
      "European layouts such as AZERTY (France), QWERTZ (Germany), and Dvorak (United States, alternative) have distinct character placements. When converting from AZERTY to Hebrew, for example, the tool first interprets the physical key positions through the AZERTY table, then re-encodes them through the Hebrew table. This two-step process ensures accuracy even for less common layout combinations.",
      "If you are unsure which layout was active when you made the error, start with the most likely one based on your computer's default settings. In most cases, the first attempt will be correct. If the result still looks wrong, try the next most common layout for your region. Because conversion is instant and free, you can experiment safely without any risk."
    ]
  },
  {
    id: "typing-tips-multilingual",
    title: "Tips for Typing Accurately Across Multiple Languages",
    category: "Productivity",
    readTime: "4 min read",
    content: [
      "Switching between keyboard layouts is a skill that improves with practice and the right setup. Here are practical tips that multilingual typists use to reduce errors and increase speed.",
      "First, make your current layout visible. Both Windows and macOS can display a small language indicator in the menu bar or taskbar. Keeping this icon in your peripheral vision creates a habit of glancing at it before you start typing. On Windows, enable this via Settings > Personalization > Taskbar > Turn system icons on or off. On macOS, go to System Settings > Keyboard > Input Sources and check 'Show Input menu in menu bar.'",
      "Second, learn the physical landmarks of each layout. Every keyboard has anchor points — the raised dots on the 'f' and 'j' keys in English, or their equivalents in other layouts. When you rest your fingers on these anchors, you can feel which layout is active without looking at the screen. Some multilingual typists place small stickers on these anchor keys in different colors for each language.",
      "Third, use keyboard shortcuts deliberately rather than accidentally. The default shortcut to switch layouts on Windows is Left Alt + Shift. On macOS, it is Command + Space. Because these shortcuts are near other common commands, they are easy to press by mistake. Consider changing the shortcut to a less common combination, such as Ctrl + Shift + 1 for English and Ctrl + Shift + 2 for Hebrew. This requires an intentional three-key press that is unlikely to happen accidentally.",
      "Fourth, configure your applications to remember their language. Modern operating systems can associate a specific layout with each application window. If you set your email client to Hebrew and your code editor to English, the system will switch automatically when you alt-tab between them. This removes one major source of human error — forgetting to switch manually.",
      "Finally, keep a layout converter bookmarked for the inevitable mistakes. Even with perfect setup, errors happen when you are tired, in a hurry, or using an unfamiliar computer. Knowing that you can recover the text in seconds removes the stress of retyping and lets you focus on your actual work."
    ]
  }
];
