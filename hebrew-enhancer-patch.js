// ============================================================
// Hebrew Prompt Enhancer — Palette AI patch
// Add this BEFORE </script> at the end of the existing script block,
// OR save as hebrew-enhancer.js and add <script src="hebrew-enhancer.js"></script>
// right before </body>.
// Zero modifications to existing code. Pure additive.
// ============================================================
(function () {
  'use strict';

  const HEBREW_REGEX = /[\u0590-\u05FF]/;

  // Triggers that signal literal Hebrew text should appear IN the image
  const LITERAL_TRIGGERS = [
    'הכיתוב', 'כתוב', 'הטקסט', 'המילה', 'המילים',
    'עם המילים', 'עם הכיתוב', 'עם הטקסט',
    'שלט שכתוב', 'שלט שאומר', 'שלט של',
    'כיתוב שאומר', 'תפריט של', 'תפריט עם',
    'חתימה', 'השם'
  ];

  const HEBREW_LETTERS = {
    'א': 'alef', 'ב': 'bet', 'ג': 'gimel', 'ד': 'dalet', 'ה': 'he',
    'ו': 'vav', 'ז': 'zayin', 'ח': 'het', 'ט': 'tet', 'י': 'yod',
    'כ': 'kaf', 'ך': 'final-kaf', 'ל': 'lamed', 'מ': 'mem', 'ם': 'final-mem',
    'נ': 'nun', 'ן': 'final-nun', 'ס': 'samekh', 'ע': 'ayin',
    'פ': 'pe', 'ף': 'final-pe', 'צ': 'tsadi', 'ץ': 'final-tsadi',
    'ק': 'qof', 'ר': 'resh', 'ש': 'shin', 'ת': 'tav'
  };

  function extractLiteralHebrew(text) {
    const literals = new Set();
    // Quoted Hebrew: "..." / '...' / “...” / ״...״
    const quoted = text.match(/["'“”״׳][^"'“”״׳]{2,40}["'“”״׳]/g) || [];
    quoted.forEach(q => {
      const clean = q.replace(/["'“”״׳]/g, '').trim();
      if (HEBREW_REGEX.test(clean)) literals.add(clean);
    });
    // Trigger-phrase followed by Hebrew
    LITERAL_TRIGGERS.forEach(trigger => {
      const re = new RegExp(
        trigger + '\\s+([\u0590-\u05FF][\u0590-\u05FF \u0027\u0022]{1,40}?)(?=[\\s.,;:!?]|$|\\s+ב(?:מחיר|עברית|לבן|שחור))',
        'g'
      );
      let m;
      while ((m = re.exec(text)) !== null) {
        const phrase = m[1].trim().replace(/["'“”״׳]/g, '');
        if (phrase.length >= 2 && phrase.length <= 40) literals.add(phrase);
      }
    });
    return Array.from(literals);
  }

  function createLetterBreakdown(word) {
    return Array.from(word)
      .filter(c => c !== ' ')
      .map(c => HEBREW_LETTERS[c] || c)
      .join('-');
  }

  function cleanNegativeForHebrew(neg) {
    return neg
      .replace(/(^|,)\s*text\s*(?=,|$)/gi, '$1')
      .replace(/(^|,)\s*watermark\s*(?=,|$)/gi, '$1')
      .replace(/,\s*,/g, ',')
      .replace(/^\s*,\s*|\s*,\s*$/g, '')
      .trim();
  }

  function enhance(prompt, userInput) {
    const literals = extractLiteralHebrew(userInput || '');
    if (literals.length === 0) return prompt;

    const negMatch = prompt.match(/^([\s\S]*?)\s*--no\s+([\s\S]+)$/);
    let main = negMatch ? negMatch[1].trim() : prompt;
    let neg = negMatch ? negMatch[2].trim() : '';

    const block = ['Hebrew text rendering requirements'];
    literals.forEach((p, i) => {
      block.push(`Hebrew text ${i + 1}: "${p}" (letters: ${createLetterBreakdown(p)})`);
    });
    block.push(
      'use clean Hebrew typography (Heebo / Assistant / Rubik font style)',
      'right-to-left text direction, sharp Hebrew letterforms',
      'high legibility Hebrew text, no garbled or invented characters'
    );

    main = main + ', ' + block.join(', ');

    if (neg) {
      neg = cleanNegativeForHebrew(neg);
      if (neg) neg += ', garbled Hebrew, misspelled Hebrew, Hebrew gibberish';
      else     neg =  'garbled Hebrew, misspelled Hebrew, Hebrew gibberish';
      return main + ' --no ' + neg;
    }
    return main;
  }

  // Expose for debugging / manual calls
  window.HebrewPromptEnhancer = { enhance, extractLiteralHebrew, createLetterBreakdown };

  // ---- Installation: wrap generate() once it's available ----
  function install() {
    if (typeof window.generate !== 'function') {
      return setTimeout(install, 80);
    }
    if (window.__hpeInstalled) return;
    window.__hpeInstalled = true;

    const origGenerate = window.generate;
    let reentry = false;

    window.generate = function () {
      const result = origGenerate.apply(this, arguments);
      if (reentry) return result;

      const finalEl = document.getElementById('finalPrompt');
      const userEl  = document.getElementById('userInput');
      if (!finalEl || !userEl) return result;

      const current  = finalEl.textContent || '';
      const userText = userEl.value || '';

      // Skip placeholder / empty
      if (!current || current.includes('✨') || current.length < 5) return result;

      const improved = enhance(current, userText);
      if (improved !== current) {
        reentry = true;
        finalEl.textContent = improved;
        reentry = false;
      }
      return result;
    };

    console.log('✅ HebrewPromptEnhancer installed — generate() wrapped');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install);
  } else {
    install();
  }
})();
