import { MORPHEME_CHEATSHEET, VOCAB_BANK } from "../data/vocabData.js";
import { appState } from "../state.js";
import { escapeHtml, speakTerm } from "../utils.js";

let analyzerInput = "Electrocardiogram";

export function switchMorphemeSub(sub) {
  appState.morphemeSub = sub;
  renderMorphemeModule();
}

export function analyzeTermInput(value) {
  analyzerInput = value;
  renderMorphemeModule();
}

export function pickSampleTerm(term) {
  analyzerInput = term;
  renderMorphemeModule();
}

function analyzeWord(rawTerm) {
  const word = rawTerm.trim();
  if (!word) return null;

  const exact = VOCAB_BANK.find(
    (v) => v.term.toLowerCase() === word.toLowerCase()
  );
  if (exact) {
    return {
      source: "vocab",
      term: exact.term,
      zh: exact.zh,
      ipa: exact.ipa,
      definition: exact.definition,
      parts: exact.morphemes
    };
  }

  // Heuristic morpheme matching for arbitrary medical words
  const lower = word.toLowerCase();
  const matched = [];

  for (const p of MORPHEME_CHEATSHEET.prefixes) {
    const keys = p.token.split("/").map((k) => k.replace(/-/g, "").trim());
    const hit = keys.find((k) => k.length >= 2 && lower.startsWith(k));
    if (hit) {
      matched.push({ part: `${hit}-`, type: "prefix", meaning: p.meaning });
      break;
    }
  }

  for (const r of MORPHEME_CHEATSHEET.roots) {
    const keys = r.token
      .split(",")
      .map((k) => k.replace(/\/o/g, "").replace(/-/g, "").trim());
    const hit = keys.find((k) => k.length >= 3 && lower.includes(k));
    if (hit) {
      matched.push({ part: hit, type: "root", meaning: r.meaning });
    }
  }

  for (const s of MORPHEME_CHEATSHEET.suffixes) {
    const key = s.token.replace(/-/g, "").trim();
    if (key.length >= 2 && lower.endsWith(key)) {
      matched.push({ part: `-${key}`, type: "suffix", meaning: s.meaning });
      break;
    }
  }

  return {
    source: "heuristic",
    term: word,
    zh: matched.length ? "自動字構解析結果" : "尚未辨識出內建字根",
    ipa: "",
    definition: matched.length
      ? "以下為系統依字首、字根、字尾規則拆解出的可能語意："
      : "目前字根庫未匹配到此單字，請嘗試常見臨床術語（如 Pericarditis, Gastrectomy, Dysuria）。",
    parts: matched
  };
}

export function renderMorphemeModule() {
  const container = document.getElementById("panel-morpheme");
  if (!container) return;

  const subTabs = `
    <div class="subtab-bar">
      <button class="subtab ${appState.morphemeSub === "analyzer" ? "active" : ""}" onclick="switchMorphemeSub('analyzer')">
        🔬 字構即時拆解器
      </button>
      <button class="subtab ${appState.morphemeSub === "cheatsheet" ? "active" : ""}" onclick="switchMorphemeSub('cheatsheet')">
        📚 字首／字根／字尾速查表
      </button>
    </div>
  `;

  if (appState.morphemeSub === "cheatsheet") {
    const renderTable = (title, colorClass, rows) => `
      <div class="card">
        <h3 class="cheatsheet-title ${colorClass}">${title}</h3>
        <div class="cheatsheet-list">
          ${rows
            .map(
              (r) => `
                <div class="cheatsheet-row">
                  <span class="morpheme-pill ${colorClass}">${escapeHtml(r.token)}</span>
                  <div>
                    <div class="cs-meaning">${escapeHtml(r.meaning)}</div>
                    <div class="cs-example">例：${escapeHtml(r.example)}</div>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;

    container.innerHTML = `
      <div class="section-header">
        <div>
          <h2>醫學字構拆解中心</h2>
          <p class="section-sub">掌握高頻字首、字根與字尾，即可推敲超過 70% 臨床專業術語</p>
        </div>
      </div>
      ${subTabs}
      <div class="cheatsheet-grid">
        ${renderTable("字首 Prefixes（方向、程度、數量）", "morpheme-prefix", MORPHEME_CHEATSHEET.prefixes)}
        ${renderTable("字根 Roots（器官、組織、系統）", "morpheme-root", MORPHEME_CHEATSHEET.roots)}
        ${renderTable("字尾 Suffixes（病症、手術、檢查）", "morpheme-suffix", MORPHEME_CHEATSHEET.suffixes)}
      </div>
    `;
    return;
  }

  const analysis = analyzeWord(analyzerInput);
  const sampleTerms = ["Bradycardia", "Cholecystectomy", "Hyperglycemia", "Nephrolithiasis", "Pericarditis", "Gastrectomy"];

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2>醫學字構拆解中心</h2>
        <p class="section-sub">輸入任一醫學單字，即時拆解 Prefix（字首）＋ Root（字根）＋ Suffix（字尾）</p>
      </div>
    </div>
    ${subTabs}

    <div class="card analyzer-card">
      <div class="analyzer-input-row">
        <input
          type="text"
          class="search-input analyzer-input"
          placeholder="輸入醫學英文單字，例如：Cardiomegaly、Pericarditis..."
          value="${escapeHtml(analyzerInput)}"
          oninput="analyzeTermInput(this.value)"
        />
        <button class="btn btn-secondary" onclick="pronounceText('${escapeHtml(analyzerInput)}')">🔊 發音</button>
      </div>

      <div class="sample-row">
        <span class="sample-label">快速範例：</span>
        ${sampleTerms
          .map(
            (t) =>
              `<button class="chip chip-sm" onclick="pickSampleTerm('${t}')">${t}</button>`
          )
          .join("")}
      </div>

      ${
        analysis
          ? `
            <div class="analysis-result">
              <div class="analysis-head">
                <h3>${escapeHtml(analysis.term)}</h3>
                <span class="analysis-zh">${escapeHtml(analysis.zh)}</span>
                ${analysis.ipa ? `<span class="vocab-ipa">${escapeHtml(analysis.ipa)}</span>` : ""}
              </div>
              <p class="vocab-def">${escapeHtml(analysis.definition)}</p>
              <div class="analysis-blocks">
                ${
                  analysis.parts.length
                    ? analysis.parts
                        .map(
                          (p) => `
                            <div class="analysis-block morpheme-${p.type}">
                              <div class="block-type">${
                                p.type === "prefix" ? "字首 Prefix" : p.type === "root" ? "字根 Root" : "字尾 Suffix"
                              }</div>
                              <div class="block-part">${escapeHtml(p.part)}</div>
                              <div class="block-meaning">${escapeHtml(p.meaning)}</div>
                            </div>
                          `
                        )
                        .join('<div class="plus-sign">+</div>')
                    : `<div class="empty-inline">無匹配字構，建議切至「速查表」對照。</div>`
                }
              </div>
            </div>
          `
          : ""
      }
    </div>
  `;
}

export function speakMorphemeTerm(term) {
  speakTerm(term);
}
