// ============================================================
// Palette AI v2 — Consolidated module (Layout B: Text-First)
// ============================================================
// Replaces v7.0-v7.9.1 (10 patches) with a single clean module.
//
// FEATURES CONSOLIDATED:
// - v7.0 Theme toggle spacing (14px)
// - v7.0 Share wrap with context (Nano Banana first)
// - v7.1 Share: no asterisks, no dividers
// - v7.2 Section headers (categories, display types, text input)
// - v7.3 Camera icon 🎬 (inherited from base HTML)
// - v7.4/v7.5 Section headers positioning
// - v7.6 Help button ? + Guide modal (5 slides, bilingual)
// - v7.7 Display header spacing + centered format-row
// - v7.8 Desktop flex column layout
// - v7.9 Typo fix ("מאייד" → "בעזרת")
// - v7.9 Moran signature on slide 5
// - v7.9.1 Signature M cutoff hotfix (direction:ltr, viewBox 280x100)
//
// LAYOUT B CHANGES (new in v2):
// - Text/input area moves to TOP (order: 1)
// - Categories move to BOTTOM (order: 5)
// - Guide slide 3 reordered: 1.Type idea → 2.Pick style → 3.Generate
// ============================================================

(function() {
  if (window.__paeV2Installed) { return; }
  window.__paeV2Installed = true;
  var _log = function(m) { try { console.log('[pae-v2]', m); } catch(e){} };

  // ============================================================
  // GUIDE CONTENT
  // ============================================================
  var GUIDE_SLIDES = {
    he: [
      { emoji: '\ud83c\udfa8', title: '\u05d1\u05e8\u05d5\u05db\u05d9\u05dd \u05d4\u05d1\u05d0\u05d9\u05dd \u05dc-Palette!', subtitle: '\u05d4\u05de\u05e7\u05d5\u05dd \u05e9\u05d1\u05d5 \u05e8\u05e2\u05d9\u05d5\u05e0\u05d5\u05ea \u05d4\u05d5\u05e4\u05db\u05d9\u05dd \u05dc\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05d1\u05e2\u05d6\u05e8\u05ea AI', body: '\u05d9\u05e6\u05e8\u05ea\u05d9 \u05d0\u05ea \u05d4\u05db\u05dc\u05d9 \u05d4\u05d6\u05d4 \u05db\u05d3\u05d9 \u05e9\u05db\u05dc \u05d0\u05d7\u05d3 \u05d9\u05d5\u05db\u05dc \u05dc\u05db\u05ea\u05d5\u05d1 \u05d4\u05d5\u05e8\u05d0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05dc-AI \u05d1\u05e2\u05d1\u05e8\u05d9\u05ea \u05e4\u05e9\u05d5\u05d8\u05d4. \u05d1\u05dc\u05d9 \u05de\u05d5\u05e0\u05d7\u05d9\u05dd \u05de\u05e1\u05d5\u05d1\u05db\u05d9\u05dd. \u05e4\u05e9\u05d5\u05d8, \u05de\u05d4\u05d9\u05e8, \u05d5\u05e7\u05e6\u05ea \u05db\u05d9\u05e3 \ud83d\ude09' },
      { emoji: '\u2728', title: '\u05e2\u05d1\u05e8\u05d9\u05ea \u05e4\u05e9\u05d5\u05d8\u05d4 \u2192 \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea', subtitle: '\u05de\u05d4 \u05d4\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d4 \u05e2\u05d5\u05e9\u05d4 \u05d1\u05e4\u05d5\u05e2\u05dc?', body: '\u05de\u05d7\u05d5\u05dc\u05dc\u05d9 \u05d4\u05ea\u05de\u05d5\u05e0\u05d5\u05ea (Midjourney, Nano Banana) \u05d3\u05d5\u05e8\u05e9\u05d9\u05dd \u05e4\u05e8\u05d5\u05de\u05e4\u05d8\u05d9\u05dd \u05de\u05d3\u05d5\u05d9\u05e7\u05d9\u05dd \u05d1\u05d0\u05e0\u05d2\u05dc\u05d9\u05ea \u05e2\u05dd \u05de\u05d5\u05e0\u05d7\u05d9\u05dd \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d9\u05dd. \u05d4\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d4 \u05de\u05db\u05d9\u05e8\u05d4 \u05d0\u05ea \u05d4\u05de\u05d9\u05dc\u05d9\u05dd \u05d5\u05d4\u05d8\u05e8\u05d9\u05e7\u05d9\u05dd \u05e9\u05d1\u05d0\u05de\u05ea \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u2014 \u05d5\u05de\u05ea\u05e8\u05d2\u05de\u05ea \u05d0\u05ea \u05d4\u05e8\u05e2\u05d9\u05d5\u05df \u05e9\u05dc\u05da \u05dc\u05e4\u05e8\u05d5\u05de\u05e4\u05d8 \u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05d1\u05d0\u05e0\u05d2\u05dc\u05d9\u05ea.' },
      { emoji: '\ud83d\udcdd', title: '3 \u05e6\u05e2\u05d3\u05d9\u05dd \u05e4\u05e9\u05d5\u05d8\u05d9\u05dd', subtitle: '\u05d6\u05d4 \u05d1\u05d0\u05de\u05ea \u05d4\u05db\u05dc', isSteps: true },
      { emoji: '\ud83e\uddea', title: '\u05db\u05de\u05d4 \u05d3\u05d1\u05e8\u05d9\u05dd \u05e9\u05db\u05d3\u05d0\u05d9 \u05dc\u05d4\u05db\u05d9\u05e8', subtitle: '\u05e9\u05d5\u05d5\u05d4 \u05dc\u05d3\u05e2\u05ea \u05e9\u05d9\u05e9', isFeatures: true },
      { emoji: '\ud83d\ude80', title: '\u05d9\u05d0\u05dc\u05dc\u05d4, \u05d1\u05d5\u05d0 \u05e0\u05ea\u05d7\u05d9\u05dc!', subtitle: '', body: '\u05dc\u05d0 \u05e6\u05e8\u05d9\u05da \u05dc\u05d4\u05d9\u05e8\u05e9\u05dd. \u05d4\u05db\u05dc \u05d7\u05d9\u05e0\u05dd. \u05d2\u05dd \u05d1\u05e2\u05d1\u05e8\u05d9\u05ea.<br><br>\u05e8\u05d5\u05e6\u05d4 \u05dc\u05e8\u05d0\u05d5\u05ea \u05d0\u05ea \u05d4\u05de\u05d3\u05e8\u05d9\u05da \u05e9\u05d5\u05d1? \u05d9\u05e9 \u05db\u05e4\u05ea\u05d5\u05e8 <b>?</b> \u05d1\u05e8\u05d0\u05e9 \u05d4\u05e2\u05de\u05d5\u05d3 \u05e9\u05d9\u05d7\u05d6\u05d9\u05e8 \u05d0\u05d5\u05ea\u05da \u05dc\u05db\u05d0\u05df \u05d1\u05db\u05dc \u05e8\u05d2\u05e2.' }
    ],
    en: [
      { emoji: '\ud83c\udfa8', title: 'Welcome to Palette!', subtitle: 'Where ideas become stunning AI images', body: 'I built this so anyone can write pro-level AI prompts in plain words. No jargon. Just fun and fast \ud83d\ude09' },
      { emoji: '\u2728', title: 'Simple words \u2192 pro results', subtitle: 'What does the app actually do?', body: 'AI image generators (Midjourney, Nano Banana) need precise prompts in English with professional terms. The app knows the keywords and tricks that really work \u2014 and it translates your idea into a professional English prompt.' },
      { emoji: '\ud83d\udcdd', title: '3 simple steps', subtitle: "That's really all", isSteps: true },
      { emoji: '\ud83e\uddea', title: 'A few cool things to know', subtitle: 'Worth knowing these exist', isFeatures: true },
      { emoji: '\ud83d\ude80', title: "Alright, let's go!", subtitle: '', body: 'No registration. Free. Hebrew too.<br><br>Want to see this guide again? Click the <b>?</b> button at the top anytime.' }
    ]
  };

  // LAYOUT B: Steps reordered — write idea FIRST, then pick category
  var GUIDE_STEPS = {
    he: [
      { num: '1\ufe0f\u20e3', title: '\u05db\u05ea\u05d1\u05d5 \u05e8\u05e2\u05d9\u05d5\u05df', desc: '\u05dc\u05de\u05e9\u05dc: "\u05d7\u05ea\u05d5\u05dc \u05e7\u05d8\u05df \u05e9\u05d5\u05ea\u05d4 \u05e7\u05e4\u05d4"' },
      { num: '2\ufe0f\u20e3', title: '\u05d1\u05d7\u05e8\u05d5 \u05e1\u05d2\u05e0\u05d5\u05df', desc: '\u05e6\u05d9\u05d5\u05e8? \u05de\u05e6\u05d9\u05d0\u05d5\u05ea\u05d9? \u05d0\u05e0\u05d9\u05de\u05e6\u05d9\u05d4?' },
      { num: '3\ufe0f\u20e3', title: '\u05dc\u05d7\u05e6\u05d5 "\u05e6\u05d5\u05e8"', desc: '\u05d5\u05d4\u05e2\u05ea\u05d9\u05e7\u05d5 \u05d0\u05ea \u05d4\u05ea\u05d5\u05e6\u05d0\u05d4' }
    ],
    en: [
      { num: '1\ufe0f\u20e3', title: 'Type an idea', desc: 'e.g., "a small cat drinking coffee"' },
      { num: '2\ufe0f\u20e3', title: 'Pick a style', desc: 'Drawing? Realistic? Animation?' },
      { num: '3\ufe0f\u20e3', title: 'Hit "Generate"', desc: 'And copy the result' }
    ]
  };

  var GUIDE_FEATURES = {
    he: [
      { emoji: '\u2728', title: '\u05de\u05e6\u05d1 \u05d9\u05dc\u05d3\u05d9\u05dd', desc: '\u05dc\u05d9\u05e6\u05d9\u05e8\u05ea \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05d1\u05d8\u05d5\u05d7\u05d5\u05ea' },
      { emoji: '\ud83c\udfb2', title: '\u05d4\u05e4\u05ea\u05d9\u05e2\u05d5 \u05d0\u05d5\u05ea\u05d9', desc: '\u05dc\u05e8\u05e2\u05d9\u05d5\u05e0\u05d5\u05ea \u05e1\u05e4\u05d5\u05e0\u05d8\u05e0\u05d9\u05d9\u05dd' },
      { emoji: '\ud83d\udcda', title: '\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d4', desc: '\u05db\u05dc \u05d4\u05e4\u05e8\u05d5\u05de\u05e4\u05d8\u05d9\u05dd \u05d4\u05e7\u05d5\u05d3\u05de\u05d9\u05dd' },
      { emoji: '\ud83d\udce4', title: '\u05e9\u05d9\u05ea\u05d5\u05e3 \u05d7\u05db\u05dd', desc: '\u05e9\u05dc\u05d9\u05d7\u05ea \u05d4\u05e4\u05e8\u05d5\u05de\u05e4\u05d8 \u05dc\u05d7\u05d1\u05e8\u05d9\u05dd \u05d9\u05d7\u05d3 \u05e2\u05dd \u05d4\u05e1\u05d1\u05e8 \u05e2\u05dc \u05d4\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d4 \u05d5\u05e7\u05d9\u05e9\u05d5\u05e8' }
    ],
    en: [
      { emoji: '\u2728', title: 'Kids mode', desc: 'Safe images for children' },
      { emoji: '\ud83c\udfb2', title: 'Surprise me', desc: 'For spontaneous ideas' },
      { emoji: '\ud83d\udcda', title: 'History', desc: 'All your past prompts' },
      { emoji: '\ud83d\udce4', title: 'Smart share', desc: 'Share your prompt with friends, including app info and link' }
    ]
  };

  var GUIDE_T = {
    skip:    { he: '\u05d3\u05dc\u05d2', en: 'Skip' },
    back:    { he: '\u05d7\u05d6\u05d5\u05e8', en: 'Back' },
    next:    { he: '\u05d4\u05d1\u05d0 \u2190', en: 'Next \u2192' },
    start:   { he: '\u05d9\u05d0\u05dc\u05dc\u05d4, \u05d1\u05d5\u05d0 \u05e0\u05d9\u05db\u05e0\u05e1! \u2728', en: "Let's go! \u2728" },
    of:      { he: '\u05de\u05ea\u05d5\u05da', en: 'of' },
    close:   { he: '\u05e1\u05d2\u05d5\u05e8', en: 'Close' },
    tooltip: { he: '\u05de\u05d3\u05e8\u05d9\u05da', en: 'Guide' }
  };

  function getLang() { return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'he'; }

  // ============================================================
  // CSS STYLES (all v7 patches + Layout B)
  // ============================================================
  function injectAllStyles() {
    if (document.getElementById('__pae_v2_styles')) return;
    var st = document.createElement('style');
    st.id = '__pae_v2_styles';
    var css = '';

    // v7.0: Theme toggle spacing
    css += '#themeToggleBtn { margin-inline-start: 14px !important; position: relative; }';

    // v7.2: Section headers
    css += '.pae-section-header { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted, rgba(255,255,255,0.55)); padding: 6px 0; margin: 8px 0 4px; border-bottom: 1px solid rgba(255,255,255,0.08); max-width: 100%; overflow: hidden; }';
    css += '.pae-section-header .pae-section-emoji { font-size: 15px; }';

    // v7.4 + v7.8 + LAYOUT B: Desktop flex column with right-col TOP, left-col BOTTOM
    css += '@media (min-width: 768px) {';
    css += '  .app { display: flex !important; flex-direction: column !important; max-width: 900px !important; margin: 0 auto !important; }';
    css += '  .app > .left-col, .app > .right-col { position: static !important; height: auto !important; max-height: none !important; width: 100% !important; max-width: 100% !important; overflow: visible !important; }';
    css += '  .app > .right-col { order: 1 !important; }';
    css += '  .app > #paeHdrDisplay { order: 2 !important; }';
    css += '  .app > .format-row { order: 3 !important; }';
    css += '  .app > .random-divider { order: 4 !important; }';
    css += '  .app > .left-col { order: 5 !important; }';
    css += '}';

    // Mobile LAYOUT B: same order
    css += '@media (max-width: 767px) {';
    css += '  .app { display: flex !important; flex-direction: column !important; }';
    css += '  .app > .right-col { order: 1 !important; }';
    css += '  .app > #paeHdrDisplay { order: 2 !important; }';
    css += '  .app > .format-row { order: 3 !important; }';
    css += '  .app > .random-divider { order: 4 !important; }';
    css += '  .app > .left-col { order: 5 !important; }';
    css += '}';

    // v7.7: Display header spacing + centered format-row
    css += '.app > #paeHdrDisplay { margin-top: 20px !important; margin-bottom: 6px !important; }';
    css += '.app > .format-row { justify-content: center !important; display: flex !important; flex-wrap: wrap !important; gap: 8px !important; margin-bottom: 16px !important; }';

    // v7.6: Help button (yellow ?)
    css += '#paeHelpBtn { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #FFD93D; border: 1.5px solid rgba(0,0,0,0.15); color: #1a1a2e; font-size: 16px; font-weight: 700; font-family: inherit; cursor: pointer; margin-inline-start: 15px; vertical-align: middle; box-shadow: 0 2px 8px rgba(255,217,61,0.45); transition: transform 0.15s, box-shadow 0.15s; padding: 0; line-height: 1; flex-shrink: 0; }';
    css += '#paeHelpBtn:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(255,217,61,0.6); }';
    css += '#paeHelpBtn:active { transform: scale(0.95); }';
    css += 'body.light-mode #paeHelpBtn, [data-theme="light"] #paeHelpBtn { background: #F9C015; border: 1.5px solid rgba(0,0,0,0.4); color: #000; box-shadow: 0 2px 8px rgba(0,0,0,0.25); }';

    // v7.6: Guide modal
    css += '.pae-guide-overlay { position: fixed; inset: 0; z-index: 99997; background: rgba(0,0,0,0.88); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 16px; animation: paeGuideFadeIn 0.3s ease-out; }';
    css += '.pae-guide-box { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; border-radius: 24px; padding: 28px 24px 22px; max-width: 460px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 30px 80px rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.1); position: relative; animation: paeGuideSlideUp 0.4s cubic-bezier(0.16,1,0.3,1); }';
    css += '.pae-guide-top { display: flex; align-items: center; justify-content: flex-end; margin-bottom: 16px; }';
    css += '.pae-guide-close { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 14px; font-family: inherit; }';
    css += '.pae-guide-close:hover { color: #fff; border-color: rgba(255,255,255,0.3); }';
    css += '.pae-guide-content { text-align: center; min-height: 260px; display: flex; flex-direction: column; justify-content: center; }';
    css += '.pae-guide-emoji { font-size: 52px; line-height: 1; margin-bottom: 14px; }';
    css += '.pae-guide-title { font-size: 21px; font-weight: 700; margin: 0 0 6px; line-height: 1.3; color: #fff; }';
    css += '.pae-guide-subtitle { font-size: 13px; color: #00e5cc; margin: 0 0 14px; font-weight: 500; }';
    css += '.pae-guide-body { font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,0.85); }';
    css += '.pae-guide-dots { display: flex; gap: 6px; justify-content: center; margin: 24px 0 16px; }';
    css += '.pae-guide-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.25); transition: all 0.3s; }';
    css += '.pae-guide-dot.active { background: #00e5cc; width: 28px; border-radius: 4px; }';
    css += '.pae-guide-btn-row { display: flex; gap: 10px; align-items: center; justify-content: space-between; }';
    css += '.pae-guide-btn-primary { background: linear-gradient(135deg,#007aff,#00a3ff); color: #fff; border: none; padding: 13px 24px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; min-height: 46px; font-family: inherit; }';
    css += '.pae-guide-btn-secondary { background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 13px 20px; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer; min-height: 46px; font-family: inherit; }';
    css += '.pae-guide-btn-text { background: transparent; border: none; color: rgba(255,255,255,0.5); padding: 8px 16px; font-size: 13px; cursor: pointer; font-family: inherit; }';
    css += '.pae-guide-step-list, .pae-guide-feat-list { display: flex; flex-direction: column; gap: 12px; text-align: start; margin: 14px 0; }';
    css += '.pae-guide-step-list > div { display: flex; gap: 12px; align-items: flex-start; }';
    css += '.pae-guide-step-list .num { font-size: 22px; flex-shrink: 0; }';
    css += '.pae-guide-step-list .title { font-weight: 600; margin-bottom: 2px; font-size: 15px; }';
    css += '.pae-guide-step-list .desc { opacity: 0.7; font-size: 13px; }';
    css += '.pae-guide-feat-list > div { padding: 10px 14px; background: rgba(0,122,255,0.1); border-radius: 10px; border-inline-start: 3px solid #007aff; font-size: 13.5px; }';
    css += '@keyframes paeGuideFadeIn { from { opacity: 0; } to { opacity: 1; } }';
    css += '@keyframes paeGuideSlideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }';

    // v7.9 + v7.9.1: Moran signature (fixed with direction:ltr + viewBox 280x100)
    css += '.pae-sig-container { border-top: 1px solid rgba(255,255,255,0.08); margin-top: 8px; padding-top: 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; }';
    css += '.pae-sig-label { font-size: 11px; color: rgba(255,255,255,0.45); letter-spacing: 1px; text-transform: uppercase; }';
    css += '.pae-sig-svg { width: 160px; height: auto; max-width: 100%; direction: ltr; }';
    css += '.pae-sig-letter { fill: none; stroke: #d4af37; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 5px rgba(212,175,55,0.8)) drop-shadow(0 0 10px rgba(212,175,55,0.5)); }';
    css += '.pae-sig-svg.pae-sig-animate #paeSigM { stroke-dasharray: 400; animation: paeSigDrawM 1s ease-in-out forwards; }';
    css += '.pae-sig-svg.pae-sig-animate #paeSigO { stroke-dasharray: 300; animation: paeSigDrawO 0.8s ease-in-out 1.1s forwards; }';
    css += '.pae-sig-svg.pae-sig-animate #paeSigR { stroke-dasharray: 250; animation: paeSigDrawR 0.7s ease-in-out 2s forwards; }';
    css += '.pae-sig-svg.pae-sig-animate #paeSigA { stroke-dasharray: 300; animation: paeSigDrawA 0.8s ease-in-out 2.8s forwards; }';
    css += '.pae-sig-svg.pae-sig-animate #paeSigN { stroke-dasharray: 300; animation: paeSigDrawN 0.8s ease-in-out 3.7s forwards; }';
    css += '.pae-sig-svg:not(.pae-sig-animate) .pae-sig-letter { stroke-dashoffset: 400; }';
    css += '@keyframes paeSigDrawM { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }';
    css += '@keyframes paeSigDrawO { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }';
    css += '@keyframes paeSigDrawR { from { stroke-dashoffset: 250; } to { stroke-dashoffset: 0; } }';
    css += '@keyframes paeSigDrawA { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }';
    css += '@keyframes paeSigDrawN { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }';

    // v2 NEW: Result box + action row moved to BOTTOM (below categories)
    css += '@media (min-width: 768px) {';
    css += '  .app > .result-box { order: 6 !important; width: 100% !important; max-width: 100% !important; margin-top: 12px !important; }';
    css += '  .app > .action-row { order: 7 !important; width: 100% !important; max-width: 100% !important; }';
    css += '}';
    css += '@media (max-width: 767px) {';
    css += '  .app > .result-box { order: 6 !important; width: 100% !important; margin-top: 12px !important; }';
    css += '  .app > .action-row { order: 7 !important; width: 100% !important; }';
    css += '}';

    // v2 NEW: PayBox tip button — fixed at bottom of viewport (originally intended as pb-float)
    css += '.pb-float { position: fixed !important; inset-inline-start: 16px !important; bottom: 16px !important; inset-inline-end: auto !important; top: auto !important; z-index: 999 !important; }';
    // Give the body padding so the fixed button never overlaps content
    css += 'body { padding-bottom: 80px !important; }';

    st.textContent = css;
    document.head.appendChild(st);
    _log('styles injected');
  }

  // ============================================================
  // SECTION HEADERS (v7.2)
  // ============================================================
  var HEADER_CFG = {
    'paeHdrStyles':    { before: '#catGrid',       emoji: '\ud83c\udfa8', he: '\u05e7\u05d8\u05d2\u05d5\u05e8\u05d9\u05d5\u05ea', en: 'Categories' },
    'paeHdrDisplay':   { before: '.format-row',    emoji: '\ud83c\udfac', he: '\u05e1\u05d5\u05d2\u05d9 \u05ea\u05e6\u05d5\u05d2\u05d4', en: 'Display types' },
    'paeHdrTextInput': { after: '.tb-toolbar',     emoji: '\u270d\ufe0f', he: '\u05d4\u05db\u05e0\u05e1/\u05d9 \u05d0\u05ea \u05d4\u05d8\u05e7\u05e1\u05d8 \u05e9\u05dc\u05e9\u05dd \u05d4\u05ea\u05de\u05d5\u05e0\u05d4 \u05db\u05d0\u05df', en: 'Enter the text for your image here' }
  };

  function buildHeader(id, cfg) {
    var hdr = document.createElement('div');
    hdr.id = id;
    hdr.className = 'pae-section-header';
    var emojiSpan = document.createElement('span');
    emojiSpan.className = 'pae-section-emoji';
    emojiSpan.textContent = cfg.emoji;
    var textSpan = document.createElement('span');
    textSpan.className = 'pae-section-text';
    textSpan.textContent = getLang() === 'en' ? cfg.en : cfg.he;
    textSpan.dataset.he = cfg.he;
    textSpan.dataset.en = cfg.en;
    hdr.appendChild(emojiSpan);
    hdr.appendChild(textSpan);
    return hdr;
  }

  // ============================================================
  // LAYOUT B v2: Move result-box + action-row to BOTTOM of .app
  // ============================================================
  function moveResultToBottom() {
    var app = document.querySelector('.app');
    var rightCol = document.querySelector('.right-col');
    if (!app || !rightCol) return false;
    var resultBox = rightCol.querySelector('.result-box');
    var actionRow = rightCol.querySelector('.action-row');
    // Move them out to .app (direct children), at the end
    if (resultBox && resultBox.parentElement !== app) {
      app.appendChild(resultBox);
      _log('moved .result-box to .app (order:6)');
    }
    if (actionRow && actionRow.parentElement !== app) {
      app.appendChild(actionRow);
      _log('moved .action-row to .app (order:7)');
    }
    return !!(resultBox && actionRow);
  }

  function injectSectionHeaders() {
    Object.keys(HEADER_CFG).forEach(function(id) {
      if (document.getElementById(id)) return;
      var cfg = HEADER_CFG[id];
      var hdr = buildHeader(id, cfg);
      if (cfg.before) {
        var a = document.querySelector(cfg.before);
        if (a && a.parentNode) a.parentNode.insertBefore(hdr, a);
      } else if (cfg.after) {
        var a = document.querySelector(cfg.after);
        if (a && a.parentNode) {
          if (a.nextSibling) a.parentNode.insertBefore(hdr, a.nextSibling);
          else a.parentNode.appendChild(hdr);
        }
      }
    });
  }

  function updateHeaderLanguage() {
    document.querySelectorAll('.pae-section-text').forEach(function(el) {
      var lang = getLang();
      el.textContent = lang === 'en' ? (el.dataset.en || el.textContent) : (el.dataset.he || el.textContent);
    });
  }

  // ============================================================
  // HELP BUTTON + GUIDE MODAL (v7.6 + v7.9 + v7.9.1)
  // ============================================================
  var guideSlide = 0;

  function openGuide() {
    if (document.getElementById('paeGuideOverlay')) return;
    guideSlide = 0;
    renderGuide();
  }
  window.__paeOpenGuide = openGuide;

  function closeGuide() {
    var ov = document.getElementById('paeGuideOverlay');
    if (!ov) return;
    ov.style.opacity = '0';
    setTimeout(function() { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 200);
  }
  window.__paeCloseGuide = closeGuide;
  window.__paeGoSlide = function(idx) { guideSlide = idx; renderGuide(); };

  function buildSignatureHTML() {
    return '<div class="pae-sig-container">' +
      '<div class="pae-sig-label">Created by</div>' +
      '<svg class="pae-sig-svg" viewBox="0 0 280 100" style="direction:ltr">' +
        '<text id="paeSigM" class="pae-sig-letter" x="10" y="70" font-family="Georgia, serif" font-size="70" font-weight="700">M</text>' +
        '<text id="paeSigO" class="pae-sig-letter" x="70" y="70" font-family="Georgia, serif" font-size="70" font-weight="700">o</text>' +
        '<text id="paeSigR" class="pae-sig-letter" x="115" y="70" font-family="Georgia, serif" font-size="70" font-weight="700">r</text>' +
        '<text id="paeSigA" class="pae-sig-letter" x="148" y="70" font-family="Georgia, serif" font-size="70" font-weight="700">a</text>' +
        '<text id="paeSigN" class="pae-sig-letter" x="192" y="70" font-family="Georgia, serif" font-size="70" font-weight="700">n</text>' +
      '</svg>' +
    '</div>';
  }

  function renderGuide() {
    var lang = getLang();
    var slides = GUIDE_SLIDES[lang];
    var slide = slides[guideSlide];
    var total = slides.length;
    var bodyHTML = '';
    if (slide.isSteps) {
      bodyHTML = '<div class="pae-guide-step-list">' + GUIDE_STEPS[lang].map(function(s) {
        return '<div><span class="num">' + s.num + '</span><div><div class="title">' + s.title + '</div><div class="desc">' + s.desc + '</div></div></div>';
      }).join('') + '</div>';
    } else if (slide.isFeatures) {
      bodyHTML = '<div class="pae-guide-feat-list">' + GUIDE_FEATURES[lang].map(function(f) {
        return '<div>' + f.emoji + ' <b>' + f.title + '</b> \u2014 ' + f.desc + '</div>';
      }).join('') + '</div>';
    } else {
      bodyHTML = slide.body;
    }
    // Signature on last slide
    if (guideSlide === total - 1) {
      bodyHTML += buildSignatureHTML();
    }
    var leftBtnHTML = guideSlide === 0
      ? '<button class="pae-guide-btn-text" onclick="__paeCloseGuide()">' + GUIDE_T.skip[lang] + '</button>'
      : '<button class="pae-guide-btn-secondary" onclick="__paeGoSlide(' + (guideSlide - 1) + ')">' + GUIDE_T.back[lang] + '</button>';
    var rightBtnHTML = guideSlide === total - 1
      ? '<button class="pae-guide-btn-primary" onclick="__paeCloseGuide()">' + GUIDE_T.start[lang] + '</button>'
      : '<button class="pae-guide-btn-primary" onclick="__paeGoSlide(' + (guideSlide + 1) + ')">' + GUIDE_T.next[lang] + '</button>';
    var ov = document.getElementById('paeGuideOverlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'paeGuideOverlay';
      ov.className = 'pae-guide-overlay';
      ov.style.direction = lang === 'en' ? 'ltr' : 'rtl';
      ov.addEventListener('click', function(e) { if (e.target === ov) closeGuide(); });
      document.body.appendChild(ov);
    } else {
      ov.style.direction = lang === 'en' ? 'ltr' : 'rtl';
    }
    var dotsHTML = '';
    for (var i = 0; i < total; i++) {
      dotsHTML += '<div class="pae-guide-dot' + (i === guideSlide ? ' active' : '') + '"></div>';
    }
    var subtitleHTML = slide.subtitle ? '<p class="pae-guide-subtitle">' + slide.subtitle + '</p>' : '';
    ov.innerHTML = '<div class="pae-guide-box">' +
      '<div class="pae-guide-top"><button class="pae-guide-close" onclick="__paeCloseGuide()" aria-label="' + GUIDE_T.close[lang] + '">\u2715</button></div>' +
      '<div class="pae-guide-content">' +
        '<div class="pae-guide-emoji">' + slide.emoji + '</div>' +
        '<h2 class="pae-guide-title">' + slide.title + '</h2>' +
        subtitleHTML +
        '<div class="pae-guide-body">' + bodyHTML + '</div>' +
      '</div>' +
      '<div class="pae-guide-dots">' + dotsHTML + '</div>' +
      '<div class="pae-guide-btn-row">' + leftBtnHTML + rightBtnHTML + '</div>' +
    '</div>';
    // Trigger signature animation on last slide
    if (guideSlide === total - 1) {
      setTimeout(function() {
        var svg = ov.querySelector('.pae-sig-svg');
        if (svg) svg.classList.add('pae-sig-animate');
      }, 50);
    }
  }

  function addHelpButton() {
    if (document.getElementById('paeHelpBtn')) return true;
    var headerTitle = document.querySelector('.header-title');
    if (!headerTitle) return false;
    var btn = document.createElement('button');
    btn.id = 'paeHelpBtn';
    btn.type = 'button';
    btn.textContent = '?';
    var lang = getLang();
    var tip = lang === 'en' ? 'Guide' : GUIDE_T.tooltip.he;
    btn.setAttribute('aria-label', tip);
    btn.setAttribute('title', tip);
    btn.onclick = openGuide;
    if (headerTitle.nextSibling) headerTitle.parentNode.insertBefore(btn, headerTitle.nextSibling);
    else headerTitle.parentNode.appendChild(btn);
    return true;
  }

  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('paeGuideOverlay')) return;
    var lang = getLang();
    var total = GUIDE_SLIDES[lang].length;
    if (e.key === 'Escape') closeGuide();
    else if (e.key === 'ArrowLeft') {
      if (lang === 'he' && guideSlide < total - 1) window.__paeGoSlide(guideSlide + 1);
      else if (lang === 'en' && guideSlide > 0) window.__paeGoSlide(guideSlide - 1);
    } else if (e.key === 'ArrowRight') {
      if (lang === 'he' && guideSlide > 0) window.__paeGoSlide(guideSlide - 1);
      else if (lang === 'en' && guideSlide < total - 1) window.__paeGoSlide(guideSlide + 1);
    }
  });

  // ============================================================
  // SHARE WRAP (v7.0 + v7.1)
  // ============================================================
  function wrapShare() {
    if (typeof window.sharePrompt !== 'function' || window.__paeShareWrapped) return false;
    var original = window.sharePrompt;
    window.sharePrompt = function() {
      var finalEl = document.getElementById('finalPrompt');
      var prompt = (finalEl && finalEl.textContent) || '';
      if (!prompt.trim()) return original.apply(this, arguments);
      var lang = getLang();
      var url = 'https://t1ptip.github.io/palette-ai-v2';
      var text;
      if (lang === 'he') {
        text = '\ud83c\udfa8 \u05d9\u05e6\u05e8\u05ea\u05d9 \u05e4\u05e8\u05d5\u05de\u05e4\u05d8 \u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05dc-AI \u05d1-Palette AI!\n\n' + prompt + '\n\n\ud83d\udcf1 \u05d0\u05d9\u05e4\u05d4 \u05dc\u05d4\u05d3\u05d1\u05d9\u05e7 \u05d0\u05ea \u05d4\u05e4\u05e8\u05d5\u05de\u05e4\u05d8?\nNano Banana (Gemini 2.5 Flash Image) \u2014 \u05d4\u05db\u05d9 \u05d7\u05d6\u05e7 \u05dc\u05e2\u05e8\u05d9\u05db\u05ea \u05ea\u05de\u05d5\u05e0\u05d5\u05ea\nMidjourney, Stable Diffusion, DALL-E, ChatGPT\n\n\u2728 \u05d1\u05e0\u05d4 \u05e4\u05e8\u05d5\u05de\u05e4\u05d8 \u05de\u05e9\u05dc\u05da \u05d1\u05e2\u05d1\u05e8\u05d9\u05ea \u05e4\u05e9\u05d5\u05d8\u05d4: ' + url;
      } else {
        text = '\ud83c\udfa8 I made a professional AI prompt with Palette AI!\n\n' + prompt + '\n\n\ud83d\udcf1 Where to paste this prompt?\nNano Banana (Gemini 2.5 Flash Image) \u2014 great for image creation\nMidjourney, Stable Diffusion, DALL-E, ChatGPT\n\n\u2728 Create your own prompt in plain words: ' + url;
      }
      if (navigator.share) {
        return navigator.share({ text: text, url: url }).catch(function(err) { _log('share failed: ' + err.message); });
      }
      return original.apply(this, arguments);
    };
    window.__paeShareWrapped = true;
    return true;
  }

  // ============================================================
  // LANG CHANGE OBSERVER
  // ============================================================
  function observeLang() {
    new MutationObserver(function(muts) {
      muts.forEach(function(m) {
        if (m.type === 'attributes' && m.attributeName === 'lang') {
          setTimeout(updateHeaderLanguage, 50);
          setTimeout(function() {
            var btn = document.getElementById('paeHelpBtn');
            if (btn) {
              var tip = getLang() === 'en' ? 'Guide' : GUIDE_T.tooltip.he;
              btn.setAttribute('aria-label', tip);
              btn.setAttribute('title', tip);
            }
          }, 50);
        }
      });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  // ============================================================
  // BOOT
  // ============================================================
  var attempts = 0;
  function boot() {
    attempts++;
    injectAllStyles();
    injectSectionHeaders();
    moveResultToBottom();
    addHelpButton();
    wrapShare();
    if (attempts < 10) setTimeout(boot, 400);
    else observeLang();
    if (attempts === 1) _log('v2 booted (attempt 1)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
