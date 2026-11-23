import { ABBR_BANK, ABBR_CATEGORIES, ROLEPLAY_SCENARIOS } from "../data/clinicalData.js";
import { appState } from "../state.js";
import { escapeHtml } from "../utils.js";

export function switchClinicalSub(sub) {
  appState.clinicalSub = sub;
  renderClinicalModule();
}

export function selectAbbrCategory(catId) {
  appState.abbrCategory = catId;
  renderClinicalModule();
}

export function handleAbbrSearch(value) {
  appState.abbrSearch = value;
  renderClinicalModule();
}

export function selectRoleplayScenario(id) {
  appState.activeScenarioId = id;
  renderClinicalModule();
}

export function renderClinicalModule() {
  const container = document.getElementById("panel-clinical");
  if (!container) return;

  const subTabs = `
    <div class="subtab-bar">
      <button class="subtab ${appState.clinicalSub === "abbr" ? "active" : ""}" onclick="switchClinicalSub('abbr')">
        📋 臨床病歷縮寫速查
      </button>
      <button class="subtab ${appState.clinicalSub === "roleplay" ? "active" : ""}" onclick="switchClinicalSub('roleplay')">
        💬 醫病對話情境演練
      </button>
    </div>
  `;

  if (appState.clinicalSub === "roleplay") {
    const scenario =
      ROLEPLAY_SCENARIOS.find((s) => s.id === appState.activeScenarioId) ||
      ROLEPLAY_SCENARIOS[0];

    container.innerHTML = `
      <div class="section-header">
        <div>
          <h2>臨床情境實戰</h2>
          <p class="section-sub">模擬急診問診、術前衛教與出院指導，點擊喇叭可跟讀標準臨床句型</p>
        </div>
      </div>
      ${subTabs}

      <div class="chip-bar">
        ${ROLEPLAY_SCENARIOS.map(
          (s) => `
            <button class="chip ${s.id === scenario.id ? "active" : ""}" onclick="selectRoleplayScenario('${s.id}')">
              ${escapeHtml(s.title)}
            </button>
          `
        ).join("")}
      </div>

      <div class="card roleplay-card">
        <div class="vocab-meta">
          <span class="badge badge-dept">${escapeHtml(scenario.dept)}</span>
          <span class="badge badge-level">${escapeHtml(scenario.level)}</span>
        </div>
        <h3>${escapeHtml(scenario.title)}</h3>
        <p class="vocab-def">${escapeHtml(scenario.summary)}</p>

        <h4 class="sub-heading">核心必背句型</h4>
        <div class="phrase-list">
          ${scenario.keyPhrases
            .map(
              (p) => `
                <div class="phrase-item">
                  <div>
                    <div class="phrase-en">${escapeHtml(p.en)}</div>
                    <div class="phrase-zh">${escapeHtml(p.zh)}</div>
                  </div>
                  <button class="icon-btn" title="朗讀句型" onclick="pronounceText('${escapeHtml(p.en.replace(/'/g, "\\'"))}')">🔊</button>
                </div>
              `
            )
            .join("")}
        </div>

        <h4 class="sub-heading">完整情境對話</h4>
        <div class="dialogue-list">
          ${scenario.dialogue
            .map((line) => {
              const isPatient = line.speaker === "Patient";
              return `
                <div class="dialogue-bubble ${isPatient ? "patient" : "clinician"}">
                  <div class="bubble-head">
                    <strong>${escapeHtml(line.speaker)}</strong>
                    <button class="inline-audio-btn" onclick="pronounceText('${escapeHtml(line.en.replace(/'/g, "\\'"))}')">🔊</button>
                  </div>
                  <div class="bubble-en">${escapeHtml(line.en)}</div>
                  <div class="bubble-zh">${escapeHtml(line.zh)}</div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
    return;
  }

  const filteredAbbr = ABBR_BANK.filter((item) => {
    if (appState.abbrCategory !== "all" && item.cat !== appState.abbrCategory) {
      return false;
    }
    if (appState.abbrSearch.trim()) {
      const q = appState.abbrSearch.trim().toLowerCase();
      return `${item.abbr} ${item.full} ${item.zh} ${item.note}`.toLowerCase().includes(q);
    }
    return true;
  });

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2>臨床情境實戰</h2>
        <p class="section-sub">醫院病歷、醫囑與交班最常出現的高頻縮寫與臨床提醒</p>
      </div>
      <div class="toolbar">
        <input
          type="search"
          class="search-input"
          placeholder="搜尋縮寫（如 STAT、NPO、BID）..."
          value="${escapeHtml(appState.abbrSearch)}"
          oninput="handleAbbrSearch(this.value)"
        />
      </div>
    </div>
    ${subTabs}

    <div class="chip-bar">
      ${ABBR_CATEGORIES.map(
        (c) => `
          <button class="chip ${appState.abbrCategory === c.id ? "active" : ""}" onclick="selectAbbrCategory('${c.id}')">
            ${escapeHtml(c.name)}
          </button>
        `
      ).join("")}
    </div>

    <div class="abbr-grid">
      ${
        filteredAbbr.length === 0
          ? `<div class="empty-state">找不到符合的臨床縮寫。</div>`
          : filteredAbbr
              .map(
                (a) => `
                  <article class="card abbr-card">
                    <div class="abbr-head">
                      <span class="abbr-code">${escapeHtml(a.abbr)}</span>
                      <button class="icon-btn" title="朗讀全文" onclick="pronounceText('${escapeHtml(a.full.replace(/'/g, "\\'"))}')">🔊</button>
                    </div>
                    <div class="abbr-full">${escapeHtml(a.full)}</div>
                    <div class="abbr-zh">${escapeHtml(a.zh)}</div>
                    <p class="abbr-note">${escapeHtml(a.note)}</p>
                  </article>
                `
              )
              .join("")
      }
    </div>
  `;
}
