// ============================================================
// pae-video-module.js — Palette AI Video Mode (v1.0)
// Adds video prompt generation alongside the existing image mode.
// Uses MyMemory API (free, no key) for Hebrew→English translation.
// Pattern follows pae-v2-module.js (IIFE, install guard, polling boot).
// ============================================================

(function() {
  if (window.__paeVideoInstalled) return;
  window.__paeVideoInstalled = true;
  function _log(m) { try { console.log('[pae-video]', m); } catch(e){} }

  // ============================================================
  // DATA — Video pills (he label / en value used in prompt / kids flag)
  // ============================================================
  var VIDEO_DATA = {
    camera: { he:'תנועת מצלמה', en:'Camera', emoji:'🎬', pills:[
      {he:'זום פנימה איטי', en:'slow zoom in', kids:true},
      {he:'זום החוצה', en:'slow zoom out', kids:true},
      {he:'דולי שמאל', en:'dolly left tracking', kids:true},
      {he:'דולי ימין', en:'dolly right tracking', kids:true},
      {he:'מבט ציפור', en:'birds eye view from above', kids:true},
      {he:'POV', en:'first person POV shot', kids:false},
      {he:'אורבית', en:'orbit camera around subject', kids:true},
      {he:'מצלמת יד', en:'handheld shaky camera', kids:false},
      {he:'מנוף אווירי', en:'aerial crane shot', kids:true},
      {he:'דחיפה דרמטית', en:'dramatic push in', kids:false}
    ]},
    motion: { he:'סגנון תנועה', en:'Motion', emoji:'🎭', pills:[
      {he:'קולנועי איטי', en:'cinematic slow movement', kids:true},
      {he:'הילוך איטי', en:'slow motion', kids:true},
      {he:'טיים-לאפס', en:'timelapse', kids:true},
      {he:'הייפר-לאפס', en:'hyperlapse', kids:false},
      {he:'לופ חלק', en:'seamless loop', kids:true},
      {he:'תנועה זורמת', en:'fluid flowing motion', kids:true}
    ]},
    lighting: { he:'תאורה', en:'Lighting', emoji:'💡', pills:[
      {he:'שקיעה זהובה', en:'golden hour sunset', kids:true},
      {he:'אור יום', en:'bright daylight', kids:true},
      {he:'דמדומים', en:'twilight blue hour', kids:true},
      {he:'לילה', en:'night scene', kids:false},
      {he:'ניאון', en:'neon lights', kids:false},
      {he:'אור ירח', en:'soft moonlight', kids:true}
    ]}
  };

  Object.assign(VIDEO_DATA, {
    filmStyle: { he:'סגנון סרטים', en:'Film Style', emoji:'🎞️', pills:[
      {he:'IMAX אפי', en:'IMAX epic cinematic', kids:true},
      {he:'בלייד ראנר', en:'blade runner cyberpunk style', kids:false},
      {he:'קובריק', en:'kubrick symmetrical composition', kids:false},
      {he:'גיבלי חלומי', en:'studio ghibli dreamy aesthetic', kids:true},
      {he:'פיקסאר 3D', en:'pixar 3d animation style', kids:true}
    ]},
    genre: { he:'ז׳אנר', en:'Genre', emoji:'🎟️', pills:[
      {he:'הרפתקה', en:'adventure', kids:true},
      {he:'מדע בדיוני', en:'science fiction', kids:false},
      {he:'סייברפאנק', en:'cyberpunk', kids:false},
      {he:'נואר', en:'film noir', kids:false},
      {he:'פנטזיה', en:'fantasy', kids:true},
      {he:'דוקומנטרי', en:'documentary style', kids:true}
    ]},
    environment: { he:'סביבה', en:'Environment', emoji:'🌆', pills:[
      {he:'יער קסום', en:'enchanted forest', kids:true},
      {he:'עיר עתידנית', en:'futuristic city', kids:false},
      {he:'חוף ים', en:'tropical beach', kids:true},
      {he:'הרים מושלגים', en:'snowy mountains', kids:true},
      {he:'מדבר', en:'desert dunes', kids:true},
      {he:'תחנת חלל', en:'space station interior', kids:true}
    ]},
    weather: { he:'מזג אוויר', en:'Weather', emoji:'🌊', pills:[
      {he:'גשם ניאון', en:'neon rain', kids:false},
      {he:'ערפל בוקר', en:'morning mist', kids:true},
      {he:'שלג ראשון', en:'first snow falling', kids:true},
      {he:'סערת ברק', en:'thunderstorm with lightning', kids:false},
      {he:'גלי ים', en:'crashing ocean waves', kids:true}
    ]},
    effects: { he:'אפקטים', en:'Effects', emoji:'✨', pills:[
      {he:'עשן ואדים', en:'smoke and steam', kids:true},
      {he:'אורות חלקיקים', en:'particle lights floating', kids:true},
      {he:'הולוגרמה', en:'holographic display', kids:false},
      {he:'גליץ', en:'glitch effect', kids:false},
      {he:'פריזמה', en:'prism light refraction', kids:true}
    ]}
  });

  // Subject pools — 30 entries each. Picked randomly in randomizeVideo().
  var KIDS_SUBJECTS = [
    'דרקון חמוד מעופף מעל ממלכת ממתקים',
    'שועל קטן רץ ביער שלג מנצנץ',
    'אסטרונאוט קטן קופץ על הירח',
    'יוניקורן רץ באחו פרחים צבעוניים',
    'דובון פנדה משחק בשלג ראשון',
    'דג זהב שוחה במים זוהרים',
    'ברווזון קטן שוחה באגם בשקיעה',
    'תינוק פיל מתיז מים על עצמו',
    'חתלתול שובב מנסה לתפוס פרפר',
    'רובוט חמוד אופה עוגיות במטבח',
    'עכבר קטן לובש כובע ענק',
    'ארנב לבן עם אוזניים גדולות אוכל גזרים',
    'גור כלבים רץ אחרי הגלים על חוף החול',
    'תוכי צבעוני מדבר עם חבריו על ענף עץ',
    'צב קטן חוצה שדה פטריות ירוקות',
    'סנאי שמן אוסף בלוטים על ענף גבוה',
    'דובי טדי קם לחיים בחדר משחקים',
    'ילדה רוכבת על דולפין במים שקופים',
    'רכבת קטנה חוצה גן פרחים צבעוני',
    'גמד עם זקן לבן עובד במכרה אבני חן',
    'כלבלב קטן מסתתר מתחת לערימת עלים',
    'דג זהוב מתחבא בין אלמוגים זוהרים',
    'ילדה רוקדת בגשם תחת מטרייה ורודה',
    'פעוט מטפס על מגדל קוביות צבעוני',
    'ירח מחייך על שמי לילה כוכביים',
    'ענן בצורת לב שט בשמיים ורודים',
    'ספינת שודדים זעירה שטה בקערת מרק',
    'גמד אופה עוגה בתוך פרי דובדבן ענק',
    'פיה קטנה רוקדת עם פרפרים זוהרים',
    'רובוט קטן מנסה לחבק קרן שמש'
  ];

  var ADULT_SUBJECTS = [
    'אישה צעירה הולכת ברחוב גשום בלילה',
    'מכונית ספורט נוסעת בכביש הרים בשקיעה',
    'גבר עומד על גג גורד שחקים בעיר ניאון',
    'יד מוזגת קפה לכוס שקופה בהילוך איטי',
    'גלגל ענק במזח בלילה מואר',
    'בלרינה רוקדת על במה ריקה תחת זרקור',
    'איש בחליפה רץ בעיר בלילה גשום',
    'סוס פראי דוהר במישור בזריחה',
    'דובי קוטב הולך על קרחון',
    'נר נדלק בחדר חשוך ויוצר צללים',
    'רכבת לילה עוברת דרך מנהרה מוארת',
    'גלים מתנפצים על סלעים בסערת ים',
    'מטוס נוסק מעל עננים בשקיעה',
    'רקדן ברייקדאנס מסתובב באוויר',
    'נגן צ׳לו מתאמן בחדר עם אור חלון',
    'שף חותך ירקות במטבח מקצועי',
    'אופנוען חוצה גשר תלוי בערפל',
    'צייר מסיים תמונה במכחול עבה',
    'יד מסובבת מנגנון שעון עתיק',
    'ילדה משחררת בלון לשמיים בפארק',
    'גיטריסט פורט גיטרה חשמלית בבמת ניאון',
    'רקדנית פלמנקו בחצר ספרדית',
    'פסל אבן חורט יצירה במצדה',
    'שני אוהבים רוקדים על חוף בשקיעה',
    'צוללן צף בין שונית אלמוגים צבעונית',
    'צלם עם מצלמה ארוכה בסוואנה אפריקאית',
    'ברמן מנגב כוס בירה בפאב לונדוני',
    'איש מבוגר משחק שח בפארק',
    'אופה אישה לחם בתנור עץ במאפיה',
    'רקטה משוגרת מבסיס שיגור בלילה'
  ];

  var ADULT_PRESETS = [
    {camera:'slow zoom in', motion:'cinematic slow movement', lighting:'golden hour sunset', filmStyle:'IMAX epic cinematic'},
    {camera:'birds eye view from above', motion:'fluid flowing motion', lighting:'bright daylight', genre:'documentary style'},
    {camera:'orbit camera around subject', motion:'cinematic slow movement', lighting:'twilight blue hour', filmStyle:'IMAX epic cinematic'},
    {camera:'dolly left tracking', motion:'slow motion', lighting:'soft moonlight', filmStyle:'studio ghibli dreamy aesthetic'},
    {camera:'aerial crane shot', motion:'fluid flowing motion', lighting:'golden hour sunset', environment:'tropical beach'},
    {camera:'dramatic push in', motion:'slow motion', lighting:'neon lights', filmStyle:'blade runner cyberpunk style'},
    {camera:'first person POV shot', motion:'fluid flowing motion', lighting:'bright daylight', environment:'enchanted forest'}
  ];

  var KIDS_PRESETS = [
    {camera:'slow zoom in', motion:'cinematic slow movement', lighting:'golden hour sunset', filmStyle:'studio ghibli dreamy aesthetic'},
    {camera:'orbit camera around subject', motion:'fluid flowing motion', lighting:'bright daylight', filmStyle:'pixar 3d animation style'},
    {camera:'birds eye view from above', motion:'seamless loop', lighting:'soft moonlight', environment:'enchanted forest'},
    {camera:'aerial crane shot', motion:'cinematic slow movement', lighting:'golden hour sunset'},
    {camera:'dolly left tracking', motion:'slow motion', lighting:'twilight blue hour', filmStyle:'studio ghibli dreamy aesthetic'}
  ];

  var PLATFORMS = {
    kling:  { url:'https://app.klingai.com/global/text-to-video/new', label:'Kling',  emoji:'🎬' },
    pika:   { url:'https://pika.art/',                                 label:'Pika',   emoji:'🌀' },
    runway: { url:'https://app.runwayml.com/',                         label:'Runway', emoji:'🚀' }
  };

  var DURATIONS = ['3','5','10'];

  // ============================================================
  // VIDEO GUIDE SLIDES (he/en, 8 slides — S15 added Multi-Shot + Engine Adapter slides)
  // ============================================================
  var VID_GUIDE = {
    he: [
      { emoji:'🎬', title:'מצב וידאו — חדש!', subtitle:'יוצרים פרומפטים מקצועיים לוידאו AI', body:'מצב הוידאו של Palette AI עוזר לך לבנות פרומפטים איכותיים ל-Kling, Pika, Runway, Veo, Luma ו-Hailuo — בעברית פשוטה, עם תרגום אוטומטי לאנגלית.' },
      { emoji:'✍️', title:'שלב 1: תאר/י את הסצנה', subtitle:'בעברית פשוטה — נתרגם אוטומטית', body:'כתוב/י איזו סצנה את/ה רוצה. למשל: "חתול שחור רץ על גג בלילה". הטקסט יתורגם אוטומטית לאנגלית מקצועית כשתבנה/י את הפרומפט.' },
      { emoji:'🎬', title:'שלב 2: בחר/י תנועת מצלמה', subtitle:'הלב של כל סרטון AI', body:'תנועת מצלמה היא הדבר הכי חשוב בפרומפט וידאו. בחר/י zoom איטי, dolly, orbit, או מבט ציפור — כל אחד יוצר תחושה אחרת.' },
      { emoji:'🎭', title:'שלב 3: שלב/י סגנון', subtitle:'תאורה + ז׳אנר + אפקטים', body:'הוסף/י תאורה (שקיעה, לילה, ניאון), סגנון סרטים (IMAX, גיבלי, פיקסאר), וז׳אנר. כל הקטגוריות תמיד גלויות — אין צורך לחפש.' },
      { emoji:'🎁', title:'לא יודע/ת? הפתעה!', subtitle:'קומבינציות מוכנות מראש', body:'לחיצה על "🎁 הפתעה!" בוחרת קומבינציה מקצועית של תנועה + תאורה + סגנון, יחד עם נושא רנדומלי. תוצאות איכותיות בלחיצה אחת.' },
      { emoji:'🎞️', title:'Multi-Shot Mode', subtitle:'פרומפט יחיד הופך לרצף 3 shots', body:'<b>טוגל מעל כפתור ההעתקה.</b> כשהוא דלוק, הפרומפט הופך אוטומטית לרצף 3-shot בעת העתקה: opening / climax / closing. ה-<code>--dur</code> נחלק שווה לכל shot.', isMultiShot:true },
      { emoji:'🌐', title:'6 פלטפורמות, פורמט אוטומטי', subtitle:'בורר engine מעל הפרומפט', body:'בחר/י פלטפורמה מהבורר שמעל הפרומפט. בעת העתקה, הפורמט מותאם אוטומטית: Pika מקבל --fps, Veo מקבל "5-second video:" prefix, Hailuo מקבל [Duration: Ns]. הפרומפט בתצוגה נשאר נקי.', isPlatforms:true },
      { emoji:'🚀', title:'יאללה, מצלמים!', subtitle:'בחר/י engine, העתק/י, הדבק/י', body:'בחר/י את ה-engine שתרצה/י, ולחץ/י Copy. הפורמט המתאים נשלח ל-clipboard. הדבק/י באתר של ה-platform (Ctrl+V או ⌘V) — וה-AI יוצר את הסרטון!' }
    ],
    en: [
      { emoji:'🎬', title:'Video Mode — New!', subtitle:'Create pro AI video prompts', body:'Palette AI Video Mode helps you build professional prompts for Kling, Pika, Runway, Veo, Luma, and Hailuo — in plain Hebrew or English, with auto-translation.' },
      { emoji:'✍️', title:'Step 1: Describe the scene', subtitle:'Hebrew or English — auto-translated', body:'Type any scene you want. E.g., "black cat running on a rooftop at night". Hebrew gets auto-translated to professional English when you build the prompt.' },
      { emoji:'🎬', title:'Step 2: Pick camera movement', subtitle:'The heart of any AI video', body:'Camera movement is the most important part. Pick slow zoom, dolly, orbit, or birds eye view — each creates a different feeling.' },
      { emoji:'🎭', title:'Step 3: Layer the style', subtitle:'Lighting + Genre + Effects', body:'Add lighting (sunset, night, neon), film style (IMAX, Ghibli, Pixar), and genre. All categories always visible — no searching needed.' },
      { emoji:'🎁', title:'Not sure? Surprise!', subtitle:'Pre-built combinations', body:'Click "🎁 Surprise!" to pick a professional preset of motion + lighting + style with a random subject. Quality results in one click.' },
      { emoji:'🎞️', title:'Multi-Shot Mode', subtitle:'Single prompt becomes a 3-shot sequence', body:'<b>Toggle above the copy button.</b> When on, the prompt automatically becomes a 3-shot sequence on copy: opening / climax / closing. The <code>--dur</code> splits evenly across shots.', isMultiShot:true },
      { emoji:'🌐', title:'6 platforms, auto-format', subtitle:'Engine picker above the prompt', body:'Pick a platform from the picker above the prompt. On copy, the format auto-adapts: Pika gets --fps, Veo gets "5-second video:" prefix, Hailuo gets [Duration: Ns]. The displayed prompt stays clean.', isPlatforms:true },
      { emoji:'🚀', title:"Let's roll!", subtitle:'Pick engine, copy, paste', body:'Pick the engine you want, then press Copy. The right format goes to your clipboard. Paste in the platform site (Ctrl+V or ⌘V) — and the AI creates your video!' }
    ]
  };

  var T = {
    modeImg: { he:'🖼️ תמונה', en:'🖼️ Image' },
    modeVid: { he:'🎬 וידאו', en:'🎬 Video' },
    placeholder: { he:'תאר/י את הסצנה (עברית או אנגלית)…', en:'Describe the scene (Hebrew or English)…' },
    duration: { he:'⏱ אורך', en:'⏱ Duration' },
    sec: { he:'שניות', en:'sec' },
    promptReady: { he:'פרומפט מוכן להעתקה', en:'Prompt ready to copy' },
    promptEmpty: { he:'✨ הפרומפט יופיע כאן — לחץ/י על 📋 העתק/י פרומפט ופתח/י את מנוע ה-AI שלך.', en:'✨ The prompt will appear here — click 📋 Copy and open your AI engine.' },
    chars: { he:'תווים', en:'chars' },
    translating: { he:'מתרגם…', en:'Translating…' },
    copied: { he:'✅ הועתק! הדבק/י ב-', en:'✅ Copied! Paste in ' },
    pasteHint: { he:' — Ctrl+V / ⌘V', en:' — Ctrl+V / ⌘V' },
    surprise: { he:'🎁 הפתעה!', en:'🎁 Surprise!' },
    kids: { he:'מצב ילדים', en:'Kids mode' },
    adults: { he:'מצב מבוגרים', en:'Adults mode' },
    share: { he:'📤 שתף/י', en:'📤 Share' },
    clear: { he:'נקה/י', en:'Clear' },
    copyPrompt: { he:'📋 העתק/י פרומפט', en:'📋 Copy prompt' },
    payboxTitle: { he:'אהבתם? פנקו אותי בבירה', en:'Liked it? Treat me to a beer' },
    paybox: { he:'תשלום מאובטח · PayBox', en:'Secure · PayBox' },
    guideBtn: { he:'🎬 מדריך וידאו', en:'🎬 Video Guide' },
    skip: { he:'דלג', en:'Skip' },
    next: { he:'הבא ←', en:'Next →' },
    back: { he:'→ חזור', en:'← Back' },
    start: { he:'יאללה, נתחיל! ✨', en:"Let's go! ✨" },
    secLabel: { he:'שניות', en:'seconds' }
  };

  // ============================================================
  // STATE
  // ============================================================
  var state = {
    mode: 'img',
    selectedPills: {},
    duration: '5',
    kidsMode: false,
    lastVideoPrompt: '',
    translationCache: {},
    guideSlide: 0
  };

  function getLang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'he';
  }
  function isHebrew(text) {
    return /[\u05D0-\u05EA]/.test(text || '');
  }
  function tr(key) {
    var l = getLang();
    return (T[key] && T[key][l]) || (T[key] && T[key].he) || key;
  }
  function toast(msg, type) {
    var el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.className = 'show' + (type ? ' toast-' + type : '');
    clearTimeout(window.__vidToastT);
    window.__vidToastT = setTimeout(function() { el.classList.remove('show'); }, 3500);
  }

  // ============================================================
  // CSS
  // ============================================================
  function injectStyles() {
    if (document.getElementById('__pae_video_styles')) return;
    var st = document.createElement('style');
    st.id = '__pae_video_styles';
    st.textContent = [
      '.mode-tabs{display:flex;gap:0;background:var(--surface);border-bottom:1px solid var(--border);position:sticky;top:54px;z-index:99;backdrop-filter:blur(8px)}',
      '.mode-tab{flex:1;padding:10px 8px;text-align:center;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;border:none;background:transparent;border-bottom:2px solid transparent;font-family:inherit;transition:all .15s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;min-height:44px}',
      '.mode-tab.active{color:#fff;border-bottom-color:var(--accent)}',
      '.mode-tab:active{opacity:.7}',
      '.vid-page{display:none;padding:14px;flex-direction:column;gap:12px}',
      '.vid-page.active{display:flex}',
      'body.vid-mode .app{display:none !important}',
      'body.vid-mode .format-row,body.vid-mode .random-divider{display:none !important}',
      '.vid-page .pae-section-header{font-size:13px;font-weight:600;color:var(--muted);display:flex;align-items:center;gap:5px;margin-bottom:6px}',
      '.vid-page #vidInput{width:100%;min-height:80px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r);color:var(--text);padding:12px 14px;font-family:inherit;font-size:16px;line-height:1.6;outline:none;resize:none;-webkit-appearance:none}',
      '.vid-page #vidInput:focus{border-color:var(--a4)}',
      '.vid-page #vidInput::placeholder{color:var(--muted)}',
      '.vid-pill-section{display:flex;flex-direction:column;gap:6px}',
      '.vid-pills{display:grid;grid-template-columns:repeat(auto-fill,minmax(82px,1fr));gap:6px}',
      '.vid-pill.tag-hidden{display:none !important}',
      '.vid-result-box{background:var(--surface);border:1px solid var(--a2);border-radius:var(--r);overflow:hidden}',
      '.vid-result-top{display:flex;align-items:center;justify-content:space-between;padding:9px 13px;border-bottom:1px solid var(--border);background:var(--a1)}',
      '.vid-result-label{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.7px}',
      '.vid-result-count{font-size:11px;color:var(--muted)}',
      '#vidFinalPrompt{padding:12px 14px;font-family:"JetBrains Mono",monospace;font-size:12px;line-height:1.7;color:var(--teal);min-height:60px;white-space:pre-wrap;word-break:break-word}',
      '#vidFinalPrompt.empty{color:var(--muted);font-family:inherit;font-size:13px}',
      '.vid-platform-row{display:flex;gap:7px}',
      '.vid-plat-btn{flex:1;background:var(--surface2);border:1px solid rgba(0,229,150,.25);color:#00e596;border-radius:var(--r-sm);padding:11px 8px;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px;min-height:44px;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:all .15s;white-space:nowrap}',
      '.vid-plat-btn:active{opacity:.85;transform:scale(.97)}',
      '.vid-plat-btn:hover{background:rgba(0,229,150,.08);border-color:rgba(0,229,150,.45)}',
      '.vid-action-row{display:flex;gap:7px}',
      '.vid-pb-btn{display:flex;align-items:center;gap:10px;padding:11px 14px;background:#1a0f00;border:1px solid rgba(255,165,0,.2);border-radius:var(--r);cursor:pointer;color:#FFB800;text-decoration:none;width:100%;text-align:right;font-family:inherit;min-height:44px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}',
      '.vid-pb-btn:active{opacity:.85}',
      '.vid-pb-ico{width:34px;height:34px;background:rgba(255,165,0,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}',
      '.vid-pb-text{flex:1;text-align:right}',
      '.vid-pb-t{font-size:13px;font-weight:700;color:#FFB800}',
      '.vid-pb-s{font-size:11px;color:#a07840;margin-top:1px}',
      '.vid-kids-area{display:flex;align-items:center;gap:6px;padding:6px 0}',
      '.vid-split-wrap{display:flex;align-items:stretch;border-radius:14px;overflow:hidden;border:1.5px solid var(--a3);background:var(--surface2);width:100%}',
      '.vid-kids-btn,.vid-adults-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:8px 10px;border:none;cursor:pointer;font-family:inherit;flex:1;min-height:54px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}',
      '.vid-kids-btn{background:rgba(255,210,60,.08);border-left:1.5px solid rgba(255,200,60,.12);color:rgba(255,220,100,.4)}',
      '.vid-kids-btn.on{background:rgba(255,210,60,.26);border-left-color:rgba(255,200,60,.45);color:#ffe566}',
      '.vid-rnd-btn{flex:1;background:transparent;border:none;color:var(--text);font-family:inherit;font-size:13px;font-weight:500;padding:8px 14px;cursor:pointer;min-height:54px;touch-action:manipulation;-webkit-tap-highlight-color:transparent;white-space:nowrap}',
      '.vid-rnd-btn:active{opacity:.7}',
      '.vid-adults-btn{background:rgba(0,122,255,.1);border-right:1.5px solid rgba(0,122,255,.15);color:rgba(100,180,255,.5)}',
      '.vid-adults-btn.on{background:rgba(0,122,255,.24);border-right-color:rgba(0,122,255,.45);color:var(--accent)}',
      '.vid-icon{font-size:20px}',
      '.vid-lbl{font-size:9px;font-weight:700;white-space:nowrap}',
      '.vid-dur-row{display:flex;gap:6px}',
      '.vid-dur-btn{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r-sm);color:var(--muted);font-family:inherit;font-size:13px;font-weight:600;padding:8px;cursor:pointer;min-height:44px;touch-action:manipulation}',
      '.vid-dur-btn.on{background:var(--a3);border-color:var(--accent);color:#fff}',
      '.vid-guide-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:10000;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px)}',
      '.vid-guide-overlay.show{display:flex;animation:fadeIn .2s ease}',
      '@keyframes fadeIn{from{opacity:0}to{opacity:1}}',
      '.vid-guide-box{background:var(--surface);border:1px solid var(--border);border-radius:18px;max-width:420px;width:100%;max-height:85vh;overflow-y:auto;display:flex;flex-direction:column}',
      '.vid-guide-top{display:flex;justify-content:flex-end;padding:10px 12px;border-bottom:1px solid var(--border)}',
      '.vid-guide-close{background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:inherit}',
      '.vid-guide-close:hover{background:var(--surface2);color:#fff}',
      '.vid-guide-content{padding:24px 20px;text-align:center;flex:1}',
      '.vid-guide-emoji{font-size:48px;margin-bottom:12px}',
      '.vid-guide-title{font-size:18px;font-weight:700;color:#fff;margin-bottom:4px}',
      '.vid-guide-subtitle{font-size:13px;color:var(--teal);margin-bottom:14px;font-weight:500}',
      '.vid-guide-body{font-size:13px;color:var(--text);line-height:1.7}',
      '.vid-guide-dots{display:flex;justify-content:center;gap:5px;margin-bottom:14px}',
      '.vid-guide-dot{width:7px;height:7px;border-radius:50%;background:var(--border);transition:all .2s}',
      '.vid-guide-dot.on{background:var(--teal);width:22px;border-radius:4px}',
      '.vid-guide-nav{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-top:1px solid var(--border);gap:10px}',
      '.vid-guide-skip{background:none;border:none;color:var(--muted);font-size:13px;cursor:pointer;padding:6px;font-family:inherit;min-height:44px}',
      '.vid-guide-next{background:var(--accent);border:none;color:#fff;border-radius:9px;padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;min-height:44px}',
      '.vid-guide-next:active{opacity:.85}',
      '#paeVidGuideBtn{background:rgba(0,229,150,.12);border:1px solid rgba(0,229,150,.3);color:#00e596;border-radius:8px;font-size:12px;font-weight:600;padding:5px 11px;cursor:pointer;font-family:inherit;margin-left:auto;margin-right:8px;min-height:36px}',
      '#paeVidGuideBtn:hover{background:rgba(0,229,150,.18)}',
      // S15: Multi-Shot demo box + Platforms grid in vid guide
      '.vid-guide-ms-demo{background:rgba(0,0,0,.3);border-radius:8px;padding:10px 12px;margin:10px 0 0;font-family:var(--font-mono,Consolas,monospace);font-size:11px;line-height:1.5;text-align:start;color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.05);direction:ltr}',
      '.vid-guide-ms-demo .label{color:#00e5cc;font-weight:600}',
      '.vid-guide-ms-demo .arrow{display:block;text-align:center;color:#00e596;margin:6px 0;font-size:10px;font-weight:600}',
      '.vid-guide-platforms{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px;direction:ltr}',
      '.vid-guide-plat{padding:10px 4px;background:rgba(0,229,150,.08);border:1px solid rgba(0,229,150,.2);border-radius:8px;text-align:center;font-size:11px;color:#00e596;font-weight:600}',
      '.vid-guide-plat .pemo{font-size:18px;display:block;margin-bottom:2px}',
      // === LIGHT THEME OVERRIDES (S0 - Theme Audit & Fix, 2026-05-06) ===
      '[data-theme="light"] .mode-tab.active{color:var(--text)}',
      '[data-theme="light"] .vid-plat-btn{color:#008855;border-color:rgba(0,170,100,.3)}',
      '[data-theme="light"] .vid-plat-btn:hover{background:rgba(0,170,100,.08);border-color:rgba(0,170,100,.5)}',
      '[data-theme="light"] .vid-pb-btn{background:#fffaf0;border-color:rgba(200,130,0,.3);color:#cc7700}',
      '[data-theme="light"] .vid-pb-ico{background:rgba(255,140,0,.12)}',
      '[data-theme="light"] .vid-pb-t{color:#cc7700}',
      '[data-theme="light"] .vid-pb-s{color:#806040}',
      '[data-theme="light"] .vid-kids-btn{background:rgba(255,180,30,.1);color:rgba(180,140,0,.55);border-left-color:rgba(200,160,30,.2)}',
      '[data-theme="light"] .vid-kids-btn.on{background:rgba(255,180,30,.3);border-left-color:rgba(200,160,30,.55);color:#aa7700}',
      '[data-theme="light"] .vid-adults-btn{color:rgba(0,80,180,.5)}',
      '[data-theme="light"] .vid-dur-btn.on{color:#fff}',
      '[data-theme="light"] .vid-guide-close:hover{color:var(--text)}',
      '[data-theme="light"] .vid-guide-title{color:var(--text)}',
      '[data-theme="light"] #paeVidGuideBtn{color:#008855;background:rgba(0,170,100,.1);border-color:rgba(0,170,100,.3)}',
      '[data-theme="light"] #paeVidGuideBtn:hover{background:rgba(0,170,100,.15)}',
      // S15: Light theme overrides for guide demo box + platforms
      '[data-theme="light"] .vid-guide-ms-demo{background:rgba(0,0,0,.05);color:var(--text);border-color:var(--border)}',
      '[data-theme="light"] .vid-guide-ms-demo .label{color:#008855}',
      '[data-theme="light"] .vid-guide-plat{background:rgba(0,170,100,.08);color:#008855;border-color:rgba(0,170,100,.3)}'
    ].join('\n');
    document.head.appendChild(st);
  }

  // ============================================================
  // HTML INJECTION
  // ============================================================
  function injectModeTabs() {
    if (document.querySelector('.mode-tabs')) return;
    var header = document.querySelector('.header');
    if (!header) return;
    var tabs = document.createElement('div');
    tabs.className = 'mode-tabs';
    tabs.innerHTML =
      '<button class="mode-tab active" data-mode="img" id="modeTabImg">' + tr('modeImg') + '</button>' +
      '<button class="mode-tab" data-mode="vid" id="modeTabVid">' + tr('modeVid') + '</button>';
    header.parentNode.insertBefore(tabs, header.nextSibling);
    tabs.querySelector('#modeTabImg').addEventListener('click', function() { setMode('img'); });
    tabs.querySelector('#modeTabVid').addEventListener('click', function() { setMode('vid'); });
  }

  function injectVideoPage() {
    if (document.getElementById('vidPage')) return;
    var page = document.createElement('div');
    page.id = 'vidPage';
    page.className = 'vid-page';
    var html = [];
    html.push('<div class="pae-section-header"><span aria-hidden="true">✍️</span><span id="vidInputLbl">תאר/י את הסצנה שלך לוידאו</span></div>');
    html.push('<textarea id="vidInput" rows="3" placeholder="' + tr('placeholder') + '" maxlength="2000" aria-label="' + tr('placeholder') + '"></textarea>');
    // S20 (2026-05-08): result-box moved to bottom (was here, after textarea) for visual parity with IMG. See after platform-row.
    Object.keys(VIDEO_DATA).forEach(function(key) {
      var sec = VIDEO_DATA[key];
      html.push('<div class="vid-pill-section" data-section="' + key + '">');
      html.push('  <div class="pae-section-header"><span aria-hidden="true">' + sec.emoji + '</span><span class="vid-sec-lbl" data-key="' + key + '">' + sec.he + '</span></div>');
      html.push('  <div class="vid-pills">');
      sec.pills.forEach(function(p, i) {
        html.push('<button type="button" class="cat-pill vid-pill" data-section="' + key + '" data-val="' + p.en + '" data-kids="' + (p.kids ? '1' : '0') + '">' +
                  '<span class="cat-name">' + p.he + '</span></button>');
      });
      html.push('  </div>');
      html.push('</div>');
    });
    html.push('<div class="vid-pill-section">');
    html.push('  <div class="pae-section-header"><span aria-hidden="true">⏱</span><span id="vidDurLbl">' + tr('duration') + '</span></div>');
    html.push('  <div class="vid-dur-row">');
    DURATIONS.forEach(function(d) {
      html.push('<button type="button" class="vid-dur-btn' + (d === '5' ? ' on' : '') + '" data-dur="' + d + '">' + d + 's</button>');
    });
    html.push('  </div>');
    html.push('</div>');
    html.push('<div class="vid-kids-area">');
    html.push('  <div class="vid-split-wrap">');
    html.push('    <button type="button" class="vid-kids-btn" id="vidKidsBtn"><span class="vid-icon">✨</span><span class="vid-lbl" id="vidKidsLbl">' + tr('kids') + '</span></button>');
    html.push('    <button type="button" class="vid-rnd-btn" id="vidRndBtn">' + tr('surprise') + '</button>');
    html.push('    <button type="button" class="vid-adults-btn on" id="vidAdultsBtn"><span class="vid-icon">🎨</span><span class="vid-lbl" id="vidAdultsLbl">' + tr('adults') + '</span></button>');
    html.push('  </div>');
    html.push('</div>');
    html.push('<div class="vid-platform-row">');
    Object.keys(PLATFORMS).forEach(function(name) {
      var p = PLATFORMS[name];
      html.push('<button type="button" class="vid-plat-btn" data-platform="' + name + '">' + p.emoji + ' ' + p.label + ' ↗</button>');
    });
    html.push('</div>');
    // S20 (2026-05-08): result-box positioned at bottom for IMG 1:1 parity. Uses IMG classes (.result-box, .result-top, .result-label-wrap, .result-dot) so visual matches exactly. histPanel intentionally omitted (VID uses separate paeVidHistory localStorage).
    html.push('<div class="result-box">');
    html.push('  <div class="result-top">');
    html.push('    <div class="result-label-wrap">');
    html.push('      <div class="result-dot"></div>');
    html.push('      <span id="vidPromptLbl">' + tr('promptReady') + '</span>');
    html.push('    </div>');
    html.push('    <span id="vidCharCount">0 ' + tr('chars') + '</span>');
    html.push('  </div>');
    html.push('  <div id="vidFinalPrompt" class="empty">' + tr('promptEmpty') + '</div>');
    html.push('</div>');
    // S20: single action-row (copy + share + clear) replaces previous .action-row + .vid-action-row split. IMG 1:1 parity.
    html.push('<div class="action-row">');
    html.push('  <button type="button" class="btn-copy" id="vidCopyBtn">📋 <span id="vidCopyLbl">' + tr('copyPrompt') + '</span></button>');
    html.push('  <button type="button" class="btn-share" id="vidShareBtn"><span id="vidShareLbl">' + tr('share') + '</span></button>');
    html.push('  <button type="button" class="btn-clear" id="vidClearBtn"><span id="vidClearLbl">' + tr('clear') + '</span></button>');
    html.push('</div>');
    html.push('<button type="button" class="vid-pb-btn" id="vidPbBtn">');
    html.push('  <div class="vid-pb-ico">🍺</div>');
    html.push('  <div class="vid-pb-text"><div class="vid-pb-t" id="vidPbT">' + tr('payboxTitle') + '</div><div class="vid-pb-s" id="vidPbS">' + tr('paybox') + '</div></div>');
    html.push('</button>');
    page.innerHTML = html.join('\n');
    var app = document.querySelector('.app');
    if (app && app.parentNode) app.parentNode.insertBefore(page, app.nextSibling);
    else document.body.appendChild(page);
    bindVideoPageEvents();
  }

  function bindVideoPageEvents() {
    var input = document.getElementById('vidInput');
    if (input) {
      input.addEventListener('input', debounce(function() { rebuildPrompt(); }, 350));
    }
    document.querySelectorAll('.vid-pill').forEach(function(btn) {
      btn.addEventListener('click', function() { toggleVideoPill(btn); });
    });
    document.querySelectorAll('.vid-dur-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { setDuration(btn.getAttribute('data-dur')); });
    });
    var kBtn = document.getElementById('vidKidsBtn');
    if (kBtn) kBtn.addEventListener('click', function() { setVideoKidsMode(true); });
    var aBtn = document.getElementById('vidAdultsBtn');
    if (aBtn) aBtn.addEventListener('click', function() { setVideoKidsMode(false); });
    var rBtn = document.getElementById('vidRndBtn');
    if (rBtn) rBtn.addEventListener('click', function() { randomizeVideo(); });
    var cBtn = document.getElementById('vidCopyBtn');
    if (cBtn) cBtn.addEventListener('click', function() { copyVideoPrompt(); });
    var sBtn = document.getElementById('vidShareBtn');
    if (sBtn) sBtn.addEventListener('click', function() { shareVideo(); });
    var clBtn = document.getElementById('vidClearBtn');
    if (clBtn) clBtn.addEventListener('click', function() { clearVideo(); });
    var pBtn = document.getElementById('vidPbBtn');
    if (pBtn) pBtn.addEventListener('click', function() { openPayBox(); });
    document.querySelectorAll('.vid-plat-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { openPlatform(btn.getAttribute('data-platform')); });
    });
  }

  function debounce(fn, ms) {
    var t;
    return function() {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function() { fn.apply(ctx, args); }, ms);
    };
  }

  // ============================================================
  // CORE LOGIC
  // ============================================================
  async function translateHebrew(text) {
    if (!text || !text.trim()) return '';
    if (!isHebrew(text)) return text;
    if (state.translationCache[text]) return state.translationCache[text];
    try {
      var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=he|en';
      var res = await fetch(url);
      var data = await res.json();
      if (data && data.responseStatus === 200 && data.responseData) {
        var translated = data.responseData.translatedText || text;
        state.translationCache[text] = translated;
        return translated;
      }
    } catch (e) { _log('translate err: ' + e.message); }
    return text;
  }

  function setMode(m) {
    state.mode = m;
    document.body.classList.toggle('vid-mode', m === 'vid');
    document.querySelectorAll('.mode-tab').forEach(function(t) {
      t.classList.toggle('active', t.getAttribute('data-mode') === m);
    });
    var vp = document.getElementById('vidPage');
    if (vp) vp.classList.toggle('active', m === 'vid');
    try { localStorage.setItem('paeMode', m); } catch (e) {}
  }

  function toggleVideoPill(btn) {
    var sec = btn.getAttribute('data-section');
    var val = btn.getAttribute('data-val');
    if (state.selectedPills[sec] === val) {
      delete state.selectedPills[sec];
      btn.classList.remove('active');
    } else {
      var prev = document.querySelector('.vid-pill[data-section="' + sec + '"].active');
      if (prev) prev.classList.remove('active');
      state.selectedPills[sec] = val;
      btn.classList.add('active');
    }
    rebuildPrompt();
  }

  function setDuration(d) {
    state.duration = d;
    document.querySelectorAll('.vid-dur-btn').forEach(function(b) {
      b.classList.toggle('on', b.getAttribute('data-dur') === d);
    });
    rebuildPrompt();
  }

  async function rebuildPrompt() {
    var input = document.getElementById('vidInput');
    var raw = (input && input.value || '').trim();
    var fp = document.getElementById('vidFinalPrompt');
    var cc = document.getElementById('vidCharCount');
    var pillCount = Object.keys(state.selectedPills).length;
    if (!raw && pillCount === 0) {
      if (fp) { fp.textContent = tr('promptEmpty'); fp.classList.add('empty'); }
      if (cc) cc.textContent = '0 ' + tr('chars');
      state.lastVideoPrompt = '';
      return;
    }
    if (fp && raw && isHebrew(raw) && !state.translationCache[raw]) {
      fp.textContent = tr('translating');
      fp.classList.add('empty');
    }
    var subject = await translateHebrew(raw);
    var parts = [];
    if (subject) parts.push(subject);
    ['camera','motion','lighting','filmStyle','genre','environment','weather','effects'].forEach(function(k) {
      if (state.selectedPills[k]) parts.push(state.selectedPills[k]);
    });
    var prompt = parts.join(', ');
    if (state.duration) prompt += ' --dur ' + state.duration;
    state.lastVideoPrompt = prompt;
    if (fp) {
      fp.textContent = prompt;
      fp.classList.toggle('empty', !prompt);
    }
    if (cc) cc.textContent = prompt.length + ' ' + tr('chars');
  }

  function setVideoKidsMode(isKids) {
    state.kidsMode = isKids;
    var kBtn = document.getElementById('vidKidsBtn');
    var aBtn = document.getElementById('vidAdultsBtn');
    if (kBtn) kBtn.classList.toggle('on', isKids);
    if (aBtn) aBtn.classList.toggle('on', !isKids);
    document.querySelectorAll('.vid-pill').forEach(function(p) {
      var pillKids = p.getAttribute('data-kids') === '1';
      var hide = isKids && !pillKids;
      p.classList.toggle('tag-hidden', hide);
      if (hide && p.classList.contains('active')) {
        var sec = p.getAttribute('data-section');
        delete state.selectedPills[sec];
        p.classList.remove('active');
      }
    });
    document.querySelectorAll('.vid-dur-btn').forEach(function(b) {
      var d = b.getAttribute('data-dur');
      var hide = isKids && d === '10';
      b.classList.toggle('tag-hidden', hide);
      if (hide && b.classList.contains('on')) {
        setDuration('5');
      }
    });
    rebuildPrompt();
  }

  // S16: Anti-repeat tracker — avoid picking the same subject twice in a row
  var _lastSubjectIdx = -1;

  async function randomizeVideo() {
    var subjects = state.kidsMode ? KIDS_SUBJECTS : ADULT_SUBJECTS;
    var presets = state.kidsMode ? KIDS_PRESETS : ADULT_PRESETS;
    // Pick a subject that's not the last one shown
    var idx;
    do { idx = Math.floor(Math.random() * subjects.length); }
    while (idx === _lastSubjectIdx && subjects.length > 1);
    _lastSubjectIdx = idx;
    var subject = subjects[idx];
    var preset = presets[Math.floor(Math.random() * presets.length)];
    var input = document.getElementById('vidInput');
    if (input) input.value = subject;
    document.querySelectorAll('.vid-pill.active').forEach(function(p) { p.classList.remove('active'); });
    state.selectedPills = {};
    Object.keys(preset).forEach(function(sec) {
      var val = preset[sec];
      state.selectedPills[sec] = val;
      var btn = document.querySelector('.vid-pill[data-section="' + sec + '"][data-val="' + val + '"]');
      if (btn && !btn.classList.contains('tag-hidden')) btn.classList.add('active');
    });
    var rBtn = document.getElementById('vidRndBtn');
    if (rBtn) { rBtn.style.transform = 'scale(.85)'; setTimeout(function() { rBtn.style.transform = ''; }, 150); }
    await rebuildPrompt();
  }

  // ============================================================
  // ACTIONS — copy/share/clear/openPlatform/payBox/saveHistory
  // ============================================================
  async function ensurePromptReady() {
    if (!state.lastVideoPrompt) await rebuildPrompt();
    return state.lastVideoPrompt;
  }

  function copyToClipboard(text) {
    if (!text) return false;
    try { navigator.clipboard.writeText(text).catch(function(){}); }
    catch(e) {}
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch(e){}
      document.body.removeChild(ta);
    } catch(e) {}
    return true;
  }

  async function copyVideoPrompt() {
    var prompt = await ensurePromptReady();
    if (!prompt) { toast(tr('promptEmpty'), 'err'); return; }
    copyToClipboard(prompt);
    var btn = document.getElementById('vidCopyBtn');
    if (btn) {
      btn.classList.add('copied');
      setTimeout(function() { btn.classList.remove('copied'); }, 1200);
    }
    toast(getLang() === 'en' ? '✅ Copied!' : '✅ הועתק!');
    saveVideoHistory(prompt);
  }

  async function openPlatform(name) {
    var p = PLATFORMS[name];
    if (!p) return;
    var prompt = await ensurePromptReady();
    if (!prompt) { toast(tr('promptEmpty'), 'err'); return; }
    copyToClipboard(prompt);
    saveVideoHistory(prompt);
    toast(tr('copied') + p.label + tr('pasteHint'), 'deep');
    setTimeout(function() {
      try { window.open(p.url, '_blank', 'noopener'); }
      catch(e) { window.location.href = p.url; }
    }, 150);
  }

  async function shareVideo() {
    var prompt = await ensurePromptReady();
    if (!prompt) { toast(tr('promptEmpty'), 'err'); return; }
    var lang = getLang();
    var url = 'https://t1ptip.github.io/palette-ai-v2';
    var text = lang === 'he'
      ? '🎬 יצרתי פרומפט וידאו AI ב-Palette AI!\n\n' + prompt + '\n\n📱 איפה להדביק? Kling / Pika / Runway\n\n✨ בנה פרומפט וידאו בעברית: ' + url
      : '🎬 I made an AI video prompt with Palette AI!\n\n' + prompt + '\n\n📱 Where to paste? Kling / Pika / Runway\n\n✨ Build video prompts in plain words: ' + url;
    if (navigator.share) {
      try { await navigator.share({ text: text, url: url }); return; }
      catch(e) { _log('share dismissed'); }
    }
    copyToClipboard(text);
    toast(getLang() === 'en' ? '✅ Copied to clipboard' : '✅ הועתק ללוח');
  }

  function showVideoClearModal() {
    var lang = getLang();
    var T_CLR = {
      he: { title: 'מה לנקות?', all: 'הכל', text: 'טקסט בלבד', tags: 'תגיות בלבד', prompt: 'נקה/י פרומפט', cancel: 'ביטול' },
      en: { title: 'What to clear?', all: 'Everything', text: 'Text only', tags: 'Tags only', prompt: 'Clear Prompt', cancel: 'Cancel' }
    };
    var t = T_CLR[lang];
    var existing = document.getElementById('vidClearModal');
    if (existing) existing.remove();
    var modal = document.createElement('div');
    modal.id = 'vidClearModal';
    modal.className = 'cm-overlay';
    modal.innerHTML = '<div class="cm-box clr-box" dir="' + (lang === 'he' ? 'rtl' : 'ltr') + '">' +
      '<div class="cm-title">' + t.title + '</div><div class="clr-btns">' +
      '<button class="clr-btn clr-all" id="vidClrAll">' + t.all + '</button>' +
      '<button class="clr-btn" id="vidClrText">' + t.text + '</button>' +
      '<button class="clr-btn" id="vidClrTags">' + t.tags + '</button>' +
      '<button class="clr-btn" id="vidClrPrompt">' + t.prompt + '</button>' +
      '<button class="clr-btn clr-cancel" id="vidClrCancel">' + t.cancel + '</button>' +
      '</div></div>';
    document.body.appendChild(modal);

    function _resetPromptDisplay() {
      state.lastVideoPrompt = '';
      var fp = document.getElementById('vidFinalPrompt');
      var cc = document.getElementById('vidCharCount');
      if (fp) { fp.textContent = tr('promptEmpty'); fp.classList.add('empty'); }
      if (cc) cc.textContent = '0 ' + tr('chars');
    }

    document.getElementById('vidClrAll').onclick = function() {
      modal.remove();
      var input = document.getElementById('vidInput');
      if (input) input.value = '';
      state.selectedPills = {};
      document.querySelectorAll('.vid-pill.active').forEach(function(p) { p.classList.remove('active'); });
      setDuration('5');
      _resetPromptDisplay();
      toast(lang === 'en' ? 'Cleared' : 'נוקה');
    };
    document.getElementById('vidClrText').onclick = function() {
      modal.remove();
      var input = document.getElementById('vidInput');
      if (input) input.value = '';
      if (Object.keys(state.selectedPills).length > 0) rebuildPrompt();
      else _resetPromptDisplay();
    };
    document.getElementById('vidClrTags').onclick = function() {
      modal.remove();
      state.selectedPills = {};
      document.querySelectorAll('.vid-pill.active').forEach(function(p) { p.classList.remove('active'); });
      setDuration('5');
      var input = document.getElementById('vidInput');
      var raw = (input && input.value || '').trim();
      if (raw) rebuildPrompt();
      else _resetPromptDisplay();
    };
    document.getElementById('vidClrPrompt').onclick = function() {
      modal.remove();
      _resetPromptDisplay();
    };
    document.getElementById('vidClrCancel').onclick = function() { modal.remove(); };
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
  }

  function clearVideo() {
    showVideoClearModal();
  }

  function openPayBox() {
    var url = (typeof window.PAYBOX_URL === 'string' && window.PAYBOX_URL) || 'https://links.payboxapp.com/hbbbRHMn91b';
    try { window.open(url, '_blank', 'noopener'); }
    catch(e) { window.location.href = url; }
  }

  function saveVideoHistory(prompt) {
    if (!prompt) return;
    try {
      var key = 'paeVidHistory';
      var arr = [];
      try { arr = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) {}
      arr.unshift({ prompt: prompt, ts: Date.now() });
      if (arr.length > 50) arr = arr.slice(0, 50);
      localStorage.setItem(key, JSON.stringify(arr));
    } catch(e) { _log('saveHistory err: ' + e.message); }
  }

  // ============================================================
  // VIDEO GUIDE OVERLAY
  // ============================================================
  function injectVideoGuideButton() {
    var top = document.querySelector('.pae-guide-top');
    if (!top || document.getElementById('paeVidGuideBtn')) return false;
    var btn = document.createElement('button');
    btn.id = 'paeVidGuideBtn';
    btn.type = 'button';
    btn.textContent = tr('guideBtn');
    btn.onclick = function(e) {
      e.stopPropagation();
      if (typeof window.__paeCloseGuide === 'function') window.__paeCloseGuide();
      setTimeout(openVideoGuide, 100);
    };
    top.insertBefore(btn, top.firstChild);
    return true;
  }

  // BUG-PAE-012 fix (2026-05-07): Force `?` button to always open IMG guide first.
  // Some legacy/deployed code hijacks paeHelpBtn click in vid-mode to open vid guide directly.
  // Override with capture-phase listener that intercepts vid-mode clicks and routes to img guide.
  // The vid guide button (#paeVidGuideBtn) inside img guide top is the intended path to vid guide.
  function patchHelpBtnForVidMode() {
    var helpBtn = document.getElementById('paeHelpBtn');
    if (!helpBtn || helpBtn.__paeVidNormalized) return false;
    helpBtn.__paeVidNormalized = true;
    helpBtn.addEventListener('click', function(e) {
      // Always route to img guide first (which contains the vid guide button)
      if (typeof window.__paeOpenGuide === 'function') {
        e.stopImmediatePropagation();
        e.preventDefault();
        // Close any vid guide that might have been opened by legacy code
        var vidOv = document.getElementById('paeVidGuideOverlay');
        if (vidOv) vidOv.classList.remove('show');
        window.__paeOpenGuide();
        return false;
      }
    }, true); // capture phase to intercept legacy onclick
    return true;
  }

  function openVideoGuide() {
    var overlay = document.getElementById('paeVidGuideOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'paeVidGuideOverlay';
      overlay.className = 'vid-guide-overlay';
      overlay.innerHTML = [
        '<div class="vid-guide-box" role="dialog" aria-modal="true">',
        '  <div class="vid-guide-top"><button class="vid-guide-close" aria-label="Close">✕</button></div>',
        '  <div class="vid-guide-content" id="vidGuideContent"></div>',
        '  <div class="vid-guide-dots" id="vidGuideDots"></div>',
        '  <div class="vid-guide-nav">',
        '    <button class="vid-guide-skip" id="vidGuideSkip"></button>',
        '    <button class="vid-guide-next" id="vidGuideNext"></button>',
        '  </div>',
        '</div>'
      ].join('');
      document.body.appendChild(overlay);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeVideoGuide();
      });
      overlay.querySelector('.vid-guide-close').addEventListener('click', closeVideoGuide);
      overlay.querySelector('#vidGuideSkip').addEventListener('click', closeVideoGuide);
      overlay.querySelector('#vidGuideNext').addEventListener('click', function() {
        var lang = getLang();
        var total = VID_GUIDE[lang].length;
        if (state.guideSlide >= total - 1) {
          closeVideoGuide();
          setMode('vid');
        } else {
          renderVideoGuideSlide(state.guideSlide + 1);
        }
      });
    }
    state.guideSlide = 0;
    renderVideoGuideSlide(0);
    overlay.classList.add('show');
  }

  function renderVideoGuideSlide(idx) {
    state.guideSlide = idx;
    var lang = getLang();
    var slides = VID_GUIDE[lang];
    var s = slides[idx];
    if (!s) return;
    var content = document.getElementById('vidGuideContent');
    if (content) {
      var bodyHtml = s.body || '';
      if (s.isMultiShot) bodyHtml += buildVidGuideMSDemo();
      if (s.isPlatforms) bodyHtml += buildVidGuidePlatforms();
      content.innerHTML =
        '<div class="vid-guide-emoji">' + s.emoji + '</div>' +
        '<div class="vid-guide-title">' + s.title + '</div>' +
        (s.subtitle ? '<div class="vid-guide-subtitle">' + s.subtitle + '</div>' : '') +
        '<div class="vid-guide-body">' + bodyHtml + '</div>';
    }
    var dots = document.getElementById('vidGuideDots');
    if (dots) {
      dots.innerHTML = slides.map(function(_, i) {
        return '<div class="vid-guide-dot' + (i === idx ? ' on' : '') + '"></div>';
      }).join('');
    }
    var skip = document.getElementById('vidGuideSkip');
    if (skip) skip.textContent = tr('skip');
    var next = document.getElementById('vidGuideNext');
    if (next) next.textContent = idx === slides.length - 1 ? tr('start') : tr('next');
  }

  // S15: Helpers for new guide slides (Multi-Shot demo + Platforms grid)
  function buildVidGuideMSDemo() {
    return '<div class="vid-guide-ms-demo">' +
      '<div><span class="label">Input:</span> polar bears walking on a glacier --dur 9</div>' +
      '<div class="arrow">▼ Multi-Shot ON ▼</div>' +
      '<div><span class="label">Output:</span></div>' +
      '<div>Shot 1 (opening, 3s): wide establishing shot…</div>' +
      '<div>Shot 2 (climax, 3s): close-up tracking…</div>' +
      '<div>Shot 3 (closing, 3s): pullback wide shot…</div>' +
      '</div>';
  }

  function buildVidGuidePlatforms() {
    var plats = [
      { e:'🎬', n:'Kling' }, { e:'🌀', n:'Pika' }, { e:'🚀', n:'Runway' },
      { e:'🟢', n:'Veo' }, { e:'🌙', n:'Luma' }, { e:'⚡', n:'Hailuo' }
    ];
    var html = '<div class="vid-guide-platforms">';
    plats.forEach(function(p) {
      html += '<div class="vid-guide-plat"><span class="pemo">' + p.e + '</span>' + p.n + '</div>';
    });
    html += '</div>';
    return html;
  }

  function closeVideoGuide() {
    var overlay = document.getElementById('paeVidGuideOverlay');
    if (overlay) overlay.classList.remove('show');
  }

  // ============================================================
  // LANG / LABELS UPDATE
  // ============================================================
  function updateLabels() {
    var lang = getLang();
    var imgT = document.getElementById('modeTabImg'); if (imgT) imgT.textContent = tr('modeImg');
    var vidT = document.getElementById('modeTabVid'); if (vidT) vidT.textContent = tr('modeVid');
    var inp = document.getElementById('vidInput'); if (inp) inp.placeholder = tr('placeholder');
    var pl = document.getElementById('vidPromptLbl'); if (pl) pl.textContent = tr('promptReady');
    var dl = document.getElementById('vidDurLbl'); if (dl) dl.textContent = tr('duration');
    var kl = document.getElementById('vidKidsLbl'); if (kl) kl.textContent = tr('kids');
    var al = document.getElementById('vidAdultsLbl'); if (al) al.textContent = tr('adults');
    var rb = document.getElementById('vidRndBtn'); if (rb) rb.textContent = tr('surprise');
    var cl = document.getElementById('vidCopyLbl'); if (cl) cl.textContent = tr('copyPrompt');
    var sl = document.getElementById('vidShareLbl'); if (sl) sl.textContent = tr('share');
    var clrL = document.getElementById('vidClearLbl'); if (clrL) clrL.textContent = tr('clear');
    var pbT = document.getElementById('vidPbT'); if (pbT) pbT.textContent = tr('payboxTitle');
    var pbS = document.getElementById('vidPbS'); if (pbS) pbS.textContent = tr('paybox');
    var inpLbl = document.getElementById('vidInputLbl');
    if (inpLbl) inpLbl.textContent = (lang === 'en' ? 'Describe your video scene' : 'תאר/י את הסצנה שלך לוידאו');
    document.querySelectorAll('.vid-sec-lbl').forEach(function(el) {
      var key = el.getAttribute('data-key');
      var sec = VIDEO_DATA[key];
      if (sec) el.textContent = sec[lang] || sec.he;
    });
    document.querySelectorAll('.vid-pill').forEach(function(p) {
      var sec = p.getAttribute('data-section');
      var val = p.getAttribute('data-val');
      var data = VIDEO_DATA[sec];
      if (!data) return;
      var pill = data.pills.find(function(x) { return x.en === val; });
      if (!pill) return;
      var nameEl = p.querySelector('.cat-name');
      if (nameEl) nameEl.textContent = lang === 'en' ? pill.en : pill.he;
    });
    var fp = document.getElementById('vidFinalPrompt');
    var cc = document.getElementById('vidCharCount');
    if (fp && fp.classList.contains('empty') && !state.lastVideoPrompt) {
      fp.textContent = tr('promptEmpty');
    }
    if (cc) cc.textContent = (state.lastVideoPrompt.length || 0) + ' ' + tr('chars');
    var vgBtn = document.getElementById('paeVidGuideBtn');
    if (vgBtn) vgBtn.textContent = tr('guideBtn');
    if (document.getElementById('paeVidGuideOverlay') && document.getElementById('paeVidGuideOverlay').classList.contains('show')) {
      renderVideoGuideSlide(state.guideSlide);
    }
  }

  function observeLang() {
    new MutationObserver(function(muts) {
      muts.forEach(function(m) {
        if (m.type === 'attributes' && m.attributeName === 'lang') {
          setTimeout(updateLabels, 60);
        }
      });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  // ============================================================
  // EXPOSE GLOBALS
  // ============================================================
  window.setMode = setMode;
  window.toggleVideoPill = toggleVideoPill;
  window.setVideoKidsMode = setVideoKidsMode;
  window.randomizeVideo = randomizeVideo;
  window.copyVideoPrompt = copyVideoPrompt;
  window.shareVideo = shareVideo;
  window.clearVideo = clearVideo;
  window.openPlatform = openPlatform;
  window.openVideoGuide = openVideoGuide;

  // ============================================================
  // BOOT
  // ============================================================
  var bootAttempts = 0;
  // BUG-PAE-018 fix (2026-05-07): vid guide button never injected because boot loop
  // ends before user opens guide. Wrap __paeOpenGuide and __paeGoSlide to ensure
  // injectVideoGuideButton() runs after every guide render (renderGuide overwrites
  // .pae-guide-top so vid btn is destroyed on each slide change too).
  function ensureVidBtnHook() {
    if (window.__paeVidBtnHookSetup) return false;
    if (typeof window.__paeOpenGuide !== 'function') return false;
    window.__paeVidBtnHookSetup = true;

    var origOpen = window.__paeOpenGuide;
    window.__paeOpenGuide = function() {
      var r = origOpen.apply(this, arguments);
      setTimeout(injectVideoGuideButton, 50);
      return r;
    };

    if (typeof window.__paeGoSlide === 'function') {
      var origGo = window.__paeGoSlide;
      window.__paeGoSlide = function() {
        var r = origGo.apply(this, arguments);
        setTimeout(injectVideoGuideButton, 50);
        return r;
      };
    }
    return true;
  }

  function boot() {
    bootAttempts++;
    try {
      injectStyles();
      injectModeTabs();
      injectVideoPage();
      injectVideoGuideButton();
      patchHelpBtnForVidMode(); // BUG-PAE-012 fix
      ensureVidBtnHook(); // BUG-PAE-018 fix
      var saved = null;
      try { saved = localStorage.getItem('paeMode'); } catch(e) {}
      if (saved === 'vid' && bootAttempts === 1) setMode('vid');
    } catch (e) { _log('boot err: ' + e.message); }
    if (bootAttempts < 12) setTimeout(boot, 400);
    else observeLang();
    if (bootAttempts === 1) _log('booted (attempt 1)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
