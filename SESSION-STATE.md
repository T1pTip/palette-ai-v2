# SESSION-STATE — Palette AI v2

**Last updated**: 2026-05-13 (post-S23 sprint)
**Project root**: `C:\palette-ai-v2\`
**Repo**: https://github.com/T1pTip/palette-ai-v2 (branch `main`)
**Live**: https://t1ptip.github.io/palette-ai-v2/

---

## Deploy status

✅ **v3.6 LIVE since 2026-05-09T20:30:00Z**
🚧 **v3.7 ready in palette-ai-v2-fixes/ — pending manual QA + push**

---

## Pending deploy bundle (2026-05-13)

3 files ready in `/mnt/user-data/outputs/palette-ai-v2-fixes/`:

| File | Repo path | Status |
|---|---|---|
| `index.html` | `index.html` | Modified — 6 hardcoded fixes + S4 regex + S23 |
| `_force-refresh.html` | `_force-refresh.html` | Modified — dynamic version detection |
| `check.yml` | `.github/workflows/check.yml` | NEW — CI |

`SESSION-STATE.md` stays local only (`.claude/` excluded).

---

## S23 — Subject Expander (NEW, 2026-05-13) ★ FLAGSHIP FEATURE

**Goal**: Transform short Hebrew/English subjects into rich English descriptions in finalPrompt **behind the scenes** (userInput stays unchanged).

**Architecture**:
- 13 subject banks: cat / dog / woman / man / child / bird / horse / dragon / landscape / building / vehicle / fish / flower
- 4 SKIP gates protect power users:
  1. Pool source (window.__paeInputSource === 'pool')
  2. Kids mode active (#kidsBtn.mode-active)
  3. HPE literal Hebrew detected
  4. Strength score >= threshold (default 40)
- Belt+suspenders: window.* function wrap + click capture on .var-card / #kidsBtn

**Storage keys (new)**:
- `paeExpanderEnabled` (default true)
- `paeExpanderThreshold` (default 40)

**Decision tree** (verified via simulation):

| Input | Score | Action |
|---|:---:|---|
| `"חתול"` | 6% | EXPAND |
| `"חתול חמוד"` | 13% | EXPAND |
| `"חתול חמוד יושב על ספה"` | 35% | EXPAND |
| `"חתול ג'ינג'י עם עיניים ירוקות"` | 50% | SKIP (Hebrew rich) |
| `"cat on a velvet couch"` | 25% | EXPAND |
| `"photorealistic woman, dramatic chiaroscuro"` | 55% | SKIP (EN power) |
| `"חתול פוטוריאליסטי בתאורה דרמטית"` | 70% | SKIP (HE+style) |
| Pool sources (random/kids/variants) | any | SKIP (pool flag) |

**Sample expansions**:
- `"חתול"` → `"a fluffy silver tabby cat, sitting peacefully, bright green eyes"`
- `"דרקון"` → `"a mythical dragon, soaring through clouds, sharp claws"`
- `"נוף"` → `"rolling mountain range, at sunrise, atmospheric haze"`

**Public API** (diagnostic):
- `window.SubjectExpander.detect(text)`
- `window.SubjectExpander.expand(text)`
- `window.SubjectExpander.shouldExpand(text)`
- `window.SubjectExpander.getThreshold()`
- `window.SubjectExpander.isEnabled()`

**Settings UI**: Toggle "✨ הרחבת נושא אוטומטית" in settings modal

**S4 supporting changes** (2026-05-13):
- STYLE_KEYWORDS regex: +~50 Hebrew patterns
- LIGHTING_KEYWORDS / CAMERA_KEYWORDS / QUALITY_KEYWORDS: Hebrew extensions
- New `hebrew_bonus` component: 3 words=+5, 5=+10, 8+=+15

---

## IIFE inventory

14 install guards. Added: `__subjectExpanderInstalled`

---

## localStorage keys (14)

- 8 legacy `sbp_*`: hist, lang, theme, minimal, ob, install_dismissed, enhance_enabled, negative_prompt
- 8 new `pae*`: Engine, VidEngine, VidHistory, MultiShot, AppVersion, WhatsNewV62Dismissed, Mode, **ExpanderEnabled**, **ExpanderThreshold**

---

## Verification (2026-05-13)

- ✅ 17/17 inline scripts pass `node --check` (BUG-011 prevention)
- ✅ All 7 decision-tree test cases pass
- ✅ Regex patterns match expected Hebrew + English samples
- ✅ Subject Expander produces 3-of-3 quality outputs per subject bank

---

## QA Audit Results (2026-05-13)

**Audit type**: Full 3-Layer QA per protocols.md v5.0 + adversarial-qa.md v5.1
**Hypotheses tested**: 17 (formulated BEFORE testing to avoid confirmation bias)

### Findings

🔴 **CRITICAL — FIXED in-session**:
- **BUG-FOUND-001**: `getThreshold()` didn't clamp localStorage value to [0,100]. Corrupt values like `"999999"` or `"-50"` would disable or break the Expander gate. **Fixed**: added `Math.max(0, Math.min(100, v))`.

🟡 **IMPORTANT — Documented, not fixed**:
- **FINDING-002**: Hebrew regex false-positive on `"חתולים שלי הם פיקסל פרפקטים"` — the word `פיקסל` matches STYLE_KEYWORDS even when used non-stylistically. Rare in practice; acceptable trade-off for Hebrew style coverage.
- **FINDING-003**: finalPrompt inherits `dir="rtl"` from `<html>` — English text may render with reversed parens/commas. Pre-existing in v3.6 LIVE; not introduced by S23. Not changing (would be UX regression for existing users).

🟢 **DISCONFIRMED hypotheses (15/17, plus 2 partial)**:
- H1: Hebrew regex matches expected samples ✅
- H2: Hebrew regex doesn't cause significant false positives ✅ (1 edge case, acceptable)
- H3: No infinite loop via re-entry ✅ (early return guard + finally block)
- H4: Pool flag properly consumed ✅
- H5: Graceful degradation when calculateStrength missing ✅
- H6: Settings UI injects with retry logic ✅
- H7: HPE/Expander wrap order correct (Expander runs last) ✅
- H8: Click capture idempotent ✅
- H9: SUBJECT_BANKS covers common variations ✅
- H10: No MutationObserver loop ✅ (observers don't call generate)
- H11: _force-refresh.html graceful when version.json unreachable ✅
- H12: Cache delete errors logged, not silenced ✅
- H13: Hebrew RTL in _force-refresh.html ✅
- H14: YAML valid, workflow triggers correct ✅
- H15: Python heredoc in check.yml works on real index.html ✅
- H16: Acknowledged limitation (node --check syntax only, not runtime)
- H17: Markdown structurally sound ✅

### Bug Museum scan (Layer 3)
- ✅ BUG-001 (encoding): UTF-8 valid throughout
- ✅ BUG-002 (geresh): base forms match both with/without ׳
- ✅ BUG-003 (emoji): no emoji in regex
- ✅ BUG-004 (alternation): order acceptable
- ✅ BUG-010 (truncation): file size 338,751 bytes, intact
- ✅ BUG-011 (duplicate decl): IIFE scopes isolate
- ✅ BUG-PAE-014: header overflow fix preserved
- ✅ BUG-PAE-019: WebView fallback preserved
- 🟢 BUG-007: setTimeout polls (pre-existing); S23 itself capped at 10 attempts

### Final verification
- ✅ 17/17 inline scripts pass `node --check`
- ✅ Threshold clamp test: 8/8 cases handle correctly
- ✅ Decision tree simulation: 7/7 cases correct
