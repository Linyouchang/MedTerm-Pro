import { VOCAB_BANK, MORPHEME_CHEATSHEET } from "../data/vocabData.js";
import { ABBR_BANK } from "../data/clinicalData.js";
import { appState, addSearchHistory } from "../state.js";
import { escapeHtml } from "../utils.js";

let dictQuery = "";

export function handleDictInput(value) {
  dictQuery = value;
  renderDictionaryModule();
}

export function submitDictSearch(term) {
  dictQuery = term;
  if (term.trim()) {
    addSearchHistory(term.trim());
  }
  renderDictionaryModule();
}

export function renderDictionaryModule() {
  const container = document.getElementById("panel-dictionary");
  if (!container) return;

  const q = dictQuery.trim().toLowerCase();

  const vocabHits = q
    ? VOCAB_BANK.filter((v) =>
        `${v.term} ${v.zh} ${v.definition}`.toLowerCase().includes(q)
      )
    : [];

  const abbrHits = q
    ? ABBR_BANK.filter((a) =>
        `${a.abbr} ${a.full} ${a.zh}`.toLowerCase().includes(q)
      )
    : [];

  const allMorphemes = [
    ...MORPHEME_CHEATSHEET.prefixes.map((m) => ({ ...m, kind: "字首 Prefix" })),
    ...MORPHEME_CHEATSHEET.roots.map((m) => ({ ...m, kind: "字根 Root" })),
    ...MORPHEME_CHEATSHEET.suffixes.map((m) => ({ ...m, kind: "字尾 Suffix" }))
  ];

  const morphemeHits = q
    ? allMorphemes.filter((m) =>
        `${m.token} ${m.meaning} ${m.example}`.toLowerCase().includes(q)
      )
    : [];

  const totalHits = vocabHits.length + abbrHits.length + morphemeHits.length;

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2>醫學英文字典快查</h2>
        <p class="section-sub">整合跨科單字、臨床縮寫與字首字根字尾，支援中英文雙向即時查詢</p>
      </div>
    </div>

    <div class="card dict-search-card">
      <div class="analyzer-input-row">
        <input
          type="search"
          class="search-input analyzer-input"
          placeholder="輸入英文術語、中文病名、縮寫或字根（例如：心臟、-itis、NPO）..."
          value="${escapeHtml(dictQuery)}"
          oninput="handleDictInput(this.value)"
          onkeydown="if(event.key==='Enter') submitDictSearch(this.value)"
        />
        <button class="btn btn-primary" onclick="submitDictSearch(document.querySelector('#panel-dictionary input').value)">查詢並記錄</button>
      </div>

      ${
        appState.recentSearches.length
          ? `
            <div class="sample-row">
              <span class="sample-label">最近查詢：</span>
              ${appState.recentSearches
                .map(
                  (t) =>
                    `<button class="chip chip-sm" onclick="submitDictSearch('${escapeHtml(t.replace(/'/g, "\\'"))}')">${escapeHtml(t)}</button>`
                )
                .join("")}
            </div>
          `
          : ""
      }
    </div>

    ${
      !q
        ? `<div class="empty-state">請在上方輸入關鍵字開始查詢，例如試試 <strong>cardia</strong>、<strong>STAT</strong> 或 <strong>發炎</strong>。</div>`
        : totalHits === 0
        ? `<div class="empty-state">查無「${escapeHtml(dictQuery)}」相關結果，建議改用字根關鍵字（如 hepat、nephr、-ectomy）。</div>`
        : `
          <div class="dict-results">
            ${
              vocabHits.length
                ? `
                  <h3 class="dict-group-title">醫學單字（${vocabHits.length}）</h3>
                  <div class="card-grid">
                    ${vocabHits
                      .map(
                        (v) => `
                          <article class="card">
                            <div class="vocab-card-header">
                              <div>
                                <h4 class="vocab-term">${escapeHtml(v.term)}</h4>
                                <div class="vocab-ipa">${escapeHtml(v.ipa)} · <strong class="vocab-zh">${escapeHtml(v.zh)}</strong></div>
                              </div>
                              <button class="icon-btn" onclick="pronounceText('${escapeHtml(v.term)}')">🔊</button>
                            </div>
                            <p class="vocab-def">${escapeHtml(v.definition)}</p>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                `
                : ""
            }

            ${
              abbrHits.length
                ? `
                  <h3 class="dict-group-title">臨床縮寫（${abbrHits.length}）</h3>
                  <div class="abbr-grid">
                    ${abbrHits
                      .map(
                        (a) => `
                          <article class="card abbr-card">
                            <div class="abbr-code">${escapeHtml(a.abbr)}</div>
                            <div class="abbr-full">${escapeHtml(a.full)}</div>
                            <div class="abbr-zh">${escapeHtml(a.zh)}</div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                `
                : ""
            }

            ${
              morphemeHits.length
                ? `
                  <h3 class="dict-group-title">字構解析（${morphemeHits.length}）</h3>
                  <div class="abbr-grid">
                    ${morphemeHits
                      .map(
                        (m) => `
                          <article class="card">
                            <span class="badge badge-level">${escapeHtml(m.kind)}</span>
                            <h4 class="vocab-term" style="margin-top:0.4rem;">${escapeHtml(m.token)}</h4>
                            <div class="cs-meaning">${escapeHtml(m.meaning)}</div>
                            <div class="cs-example">例：${escapeHtml(m.example)}</div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                `
                : ""
            }
          </div>
        `
    }
  `;
}
