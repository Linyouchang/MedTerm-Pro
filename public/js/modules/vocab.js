import { DEPARTMENTS, VOCAB_BANK } from "../data/vocabData.js";
import { appState, toggleMastered } from "../state.js";
import { escapeHtml, speakTerm, showToast } from "../utils.js";

export function renderVocabModule() {
  const container = document.getElementById("panel-vocab");
  if (!container) return;

  const filtered = VOCAB_BANK.filter((item) => {
    if (appState.selectedDept !== "all" && item.dept !== appState.selectedDept) {
      return false;
    }
    if (appState.onlyUnmastered && appState.masteredIds.includes(item.id)) {
      return false;
    }
    if (appState.vocabSearch.trim()) {
      const q = appState.vocabSearch.trim().toLowerCase();
      const hay = `${item.term} ${item.zh} ${item.definition} ${item.morphemes
        .map((m) => `${m.part} ${m.meaning}`)
        .join(" ")}`.toLowerCase();
      return hay.includes(q);
    }
    return true;
  });

  const deptChips = DEPARTMENTS.map(
    (d) => `
      <button
        class="chip ${appState.selectedDept === d.id ? "active" : ""}"
        onclick="selectDept('${d.id}')"
      >
        <span>${d.icon}</span> ${escapeHtml(d.name)}
      </button>
    `
  ).join("");

  const cardsHtml =
    filtered.length === 0
      ? `<div class="empty-state">找不到符合條件的醫學單字，請嘗試調整科別或關鍵字。</div>`
      : filtered
          .map((item) => {
            const isMastered = appState.masteredIds.includes(item.id);
            const deptObj = DEPARTMENTS.find((d) => d.id === item.dept);
            const morphemeBadges = item.morphemes
              .map(
                (m) => `
                  <span class="morpheme-tag morpheme-${m.type}" title="${escapeHtml(m.meaning)}">
                    <strong>${escapeHtml(m.part)}</strong>
                    <small>${escapeHtml(m.meaning)}</small>
                  </span>
                `
              )
              .join("");

            return `
              <article class="card vocab-card ${isMastered ? "is-mastered" : ""}">
                <div class="vocab-card-header">
                  <div>
                    <div class="vocab-meta">
                      <span class="badge badge-dept">${deptObj ? deptObj.icon + " " + escapeHtml(deptObj.name) : ""}</span>
                      <span class="badge badge-level">${escapeHtml(item.level)}</span>
                    </div>
                    <h3 class="vocab-term">${escapeHtml(item.term)}</h3>
                    <div class="vocab-ipa">${escapeHtml(item.ipa)} · <strong class="vocab-zh">${escapeHtml(item.zh)}</strong></div>
                  </div>
                  <div class="vocab-actions">
                    <button
                      class="icon-btn"
                      title="聆聽發音"
                      onclick="pronounceText('${escapeHtml(item.term)}')"
                    >🔊</button>
                    <button
                      class="master-btn ${isMastered ? "mastered" : ""}"
                      onclick="handleToggleMastered('${item.id}')"
                    >
                      ${isMastered ? "✓ 已掌握" : "＋ 標記掌握"}
                    </button>
                  </div>
                </div>

                <div class="morpheme-row">${morphemeBadges}</div>
                <p class="vocab-def">${escapeHtml(item.definition)}</p>
                <div class="vocab-example">
                  <span class="example-label">臨床例句</span>
                  <span>${escapeHtml(item.example)}</span>
                  <button
                    class="inline-audio-btn"
                    title="朗讀例句"
                    onclick="pronounceText('${escapeHtml(item.example.replace(/'/g, "\\'"))}')"
                  >🔊</button>
                </div>
              </article>
            `;
          })
          .join("");

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2>分科醫學單字庫</h2>
        <p class="section-sub">共 ${VOCAB_BANK.length} 個核心臨床術語，已掌握 <strong>${appState.masteredIds.length}</strong> 個</p>
      </div>
      <div class="toolbar">
        <input
          type="search"
          class="search-input"
          placeholder="搜尋英文術語、中文或字根..."
          value="${escapeHtml(appState.vocabSearch)}"
          oninput="handleVocabSearch(this.value)"
        />
        <label class="toggle-label">
          <input
            type="checkbox"
            ${appState.onlyUnmastered ? "checked" : ""}
            onchange="toggleOnlyUnmastered(this.checked)"
          />
          只看未掌握
        </label>
      </div>
    </div>

    <div class="chip-bar">${deptChips}</div>
    <div class="card-grid">${cardsHtml}</div>
  `;
}

export function selectDept(deptId) {
  appState.selectedDept = deptId;
  renderVocabModule();
}

export function handleVocabSearch(value) {
  appState.vocabSearch = value;
  renderVocabModule();
}

export function toggleOnlyUnmastered(checked) {
  appState.onlyUnmastered = checked;
  renderVocabModule();
}

export function handleToggleMastered(vocabId) {
  const mastered = toggleMastered(vocabId);
  const item = VOCAB_BANK.find((v) => v.id === vocabId);
  if (item) {
    showToast(
      mastered ? `已標記「${item.term}」為已掌握 (+15 XP)` : `已取消「${item.term}」掌握標記`,
      mastered ? "success" : "info"
    );
  }
  renderVocabModule();
}

export function pronounceText(text) {
  speakTerm(text);
}
