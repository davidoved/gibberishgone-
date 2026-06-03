# GibberishGone Browser Extension v1.1

**Universal Input Recovery & Layout Fixer**

A premium browser extension that instantly restores text typed in the wrong keyboard layout — on any website, in any input field, with zero data transmission.

## Features

### Core Conversion
- **80+ Keyboard Layouts** — Hebrew, Russian, Arabic, Greek, Korean, Japanese, and 70+ more
- **100% Client-Side** — Your text never leaves your device
- **Zero Network** — Works fully offline
- **Real-Time Conversion** — Instant results as you type
- **Swap Layouts** — Reverse source/target with one click
- **RTL Support** — Auto right-to-left for Hebrew and Arabic

### Advanced Features
- **Context Menu** — Right-click any selected text to fix it instantly
- **Auto-Detect Layout** — Automatically guesses the wrong layout used
- **Fix on Any Website** — Works in Gmail, Facebook, WhatsApp Web, Google Docs, any input field
- **Undo Support** — Undo any fix with one click
- **Settings Page** — Set default layouts and preferences
- **Keyboard Shortcuts** — `Alt+Shift+G` (open), `Alt+Shift+F` (fix selection), double-tap `Ctrl` (fix input)

## How to Use

### Method 1: Popup (for clipboard text)
1. Click the GibberishGone icon (or press `Alt+Shift+G`)
2. Paste text into the Input field
3. Select source and target layouts
4. Copy the converted result

### Method 2: Right-Click (fastest)
1. Select text typed in wrong layout on any page
2. Right-click → GibberishGone → "Fix Selected Text"
3. Text is instantly replaced and copied to clipboard

### Method 3: Fix Input Field
1. Click inside any text input (Gmail, Facebook, etc.)
2. Double-tap `Ctrl` (or right-click → "Fix Text in This Input")
3. Text is instantly corrected

### Method 4: Keyboard Shortcut
1. Select text anywhere on the page
2. Press `Alt+Shift+F`
3. Text is auto-detected and fixed

## Supported Languages

| Language | Layout | Language | Layout |
|---|---|---|---|
| Hebrew | SI-1452 | Korean | Korean |
| Russian | ЙЦУКЕН | Japanese | Japanese |
| Arabic | 101 | Thai | Thai |
| English | QWERTY | Vietnamese | Vietnamese |
| Greek | Greek | Maltese | Maltese |
| French | AZERTY | Amharic | Amharic |
| German | QWERTZ | Hindi | Hindi |
| Polish | Polish | Bengali | Bengali |
| Czech | Czech | Lithuanian | Lithuanian |
| Hungarian | Hungarian | Turkish | Turkish |

## Installation

### Chrome / Edge / Brave
1. Download `extension.zip` and extract it
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the extracted `extension/` folder

### Firefox
1. Open Firefox → `about:debugging`
2. Click **This Firefox** → **Load Temporary Add-on...**
3. Select `manifest.json` from the `extension/` folder

### After Installation
- Click the **puzzle icon** in toolbar → **pin** GibberishGone
- Right-click the icon → **Options** to set your default layouts

## Files in Extension

```
extension/
├── manifest.json        # Extension manifest v3
├── popup.html           # Main popup UI
├── popup.css            # Popup styles (dark theme)
├── popup.js             # Popup conversion logic
├── background.js        # Service worker (context menus, shortcuts)
├── content.js           # Injected into every webpage
├── content.css          # Toast notifications on pages
├── options.html         # Settings page
├── options.js           # Settings logic
└── icons/
    ├── icon16.png       # Toolbar icon
    ├── icon32.png
    ├── icon48.png
    └── icon128.png      # Store icon
```

## Privacy Guarantee

- **No network requests** — Everything is local
- **No data collection** — We never see your text
- **No analytics** — No tracking of any kind
- **Open conversion** — The same deterministic logic as the website

## Website

Visit [gibberishgone.com](https://gibberishgone.com) for the full web version with guides, blog, and technical deep-dives.

## Version History

- **v1.1** — Content script, context menus, auto-detect, settings page, keyboard shortcuts
- **v1.0** — Initial release with popup conversion
