import { BUILDER_CHALLENGES, CONFUSABLE_PAIRS } from "../data/challengeData.js";
import { appState, recordQuizResult } from "../state.js";
import { escapeHtml, showToast, speakTerm } from "../utils.js";

let builderIndex = 0;
let selectedPieces = [];
let builderFeedback = null;

let confusableIndex = 0;
let confusableSelected = null;

export function switchPracticeSub(sub) {
  appState.practiceSub = sub;
  renderPracticeModule();
}

export function toggleBuilderPiece(piece) {
  if (builderFeedback?.correct) return;
  const idx = selectedPieces.indexOf(piece);
  if (idx === -1) {
    selectedPieces.push(piece);
  } else {
    selectedPieces.splice(idx, 1);
  }
  builderFeedback = null;
  renderPracticeModule();
}

export function clearBuilderPieces() {
  selectedPieces = [];
  builderFeedback = null;
  renderPracticeModule();
}

export function checkBuilderAnswer() {
  const current = BUILDER_CHALLENGES[builderIndex];
  if (!current) return;
  const isCorrect =
    selectedPieces.length === current.answer.length &&
    selectedPieces.every((p, i) => p === current.answer[i]);

  recordQuizResult(isCorrect, current.id);
  builderFeedback = {
    correct: isCorrect,
    message: isCorrect
      ? `完全正確！${current.target}（+20 XP）`
      : `順序或字構有誤，提示：${current.hint}`
  };
  if (isCorrect) {
    speakTerm(current.target);
    showToast(`答對了！${current.target} (+20 XP)`, "success");
  } else {
    showToast("再試一次，注意字首、字根、字尾順序！", "warning");
  }
  renderPracticeModule();
}

export function nextBuilderChallenge() {
  builderIndex = (builderIndex + 1) % BUILDER_CHALLENGES.length;
  selectedPieces = [];
  builderFeedback = null;
  renderPracticeModule();
}

export function answerConfusable(optionIdx) {
  if (confusableSelected !== null) return;
  const item = CONFUSABLE_PAIRS[confusableIndex];
  confusableSelected = optionIdx;
  const isCorrect = optionIdx === item.correctIndex;
  recordQuizResult(isCorrect, item.id);
  showToast(
    isCorrect ? "判斷正確！(+20 XP)" : "答錯囉，請參考下方字根解析！",
    isCorrect ? "success" : "warning"
  );
  renderPracticeModule();
}

export function nextConfusable() {
  confusableIndex = (confusableIndex + 1) % CONFUSABLE_PAIRS.length;
  confusableSelected = null;
  renderPracticeModule();
}

export function renderPracticeModule() {
  const container = document.getElementById("panel-practice");
  if (!container) return;

  const subTabs = `
    <div class="subtab-bar">
      <button class="subtab ${appState.practiceSub === "builder" ? "active" : ""}" onclick="switchPracticeSub('builder')">
        🧩 字根拼字挑戰
      </button>
      <button class="subtab ${appState.practiceSub === "confusable" ? "active" : ""}" onclick="switchPracticeSub('confusable')">
        ⚡ 易混淆詞辨識
      </button>
    </div>
  `;

  if (appState.practiceSub === "confusable") {
    const item = CONFUSABLE_PAIRS[confusableIndex];
    const answered = confusableSelected !== null;

    container.innerHTML = `
      <div class="section-header">
        <div>
          <h2>互動測驗與挑戰</h2>
          <p class="section-sub">累計答對 ${appState.quizCorrect} / ${appState.quizTotal} 題 · 目前經驗值 ${appState.xp} XP</p>
        </div>
      </div>
      ${subTabs}

      <div class="card quiz-card">
        <div class="quiz-progress">第 ${confusableIndex + 1} / ${CONFUSABLE_PAIRS.length} 題 · 臨床易混淆詞辨識</div>
        <h3 class="quiz-question">${escapeHtml(item.question)}</h3>

        <div class="option-grid">
          ${item.options
            .map((opt, idx) => {
              let cls = "option-btn";
              if (answered) {
                if (idx === item.correctIndex) cls += " is-correct";
                else if (idx === confusableSelected) cls += " is-wrong";
              }
              return `
                <button class="${cls}" onclick="answerConfusable(${idx})" ${answered ? "disabled" : ""}>
                  <div class="option-term">${escapeHtml(opt.term)}</div>
                  ${answered ? `<div class="option-zh">${escapeHtml(opt.zh)}</div>` : ""}
                </button>
              `;
            })
            .join("")}
        </div>

        ${
          answered
            ? `
              <div class="feedback-box ${confusableSelected === item.correctIndex ? "success" : "warning"}">
                <strong>${confusableSelected === item.correctIndex ? "✓ 辨識正確！" : "✕ 容易混淆提醒"}</strong>
                <p>${escapeHtml(item.explanation)}</p>
              </div>
              <div class="quiz-footer">
                <button class="btn btn-primary" onclick="nextConfusable()">下一題 ➔</button>
              </div>
            `
            : ""
        }
      </div>
    `;
    return;
  }

  const current = BUILDER_CHALLENGES[builderIndex];
  const isDone = appState.completedChallenges.includes(current.id);

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2>互動測驗與挑戰</h2>
        <p class="section-sub">依序點擊字構積木拼出正確醫學術語 · 已完成 ${appState.completedChallenges.length} 項挑戰</p>
      </div>
    </div>
    ${subTabs}

    <div class="card quiz-card">
      <div class="quiz-progress">
        第 ${builderIndex + 1} / ${BUILDER_CHALLENGES.length} 題
        ${isDone ? '<span class="badge badge-success">已完成</span>' : ""}
      </div>
      <h3 class="quiz-question">${escapeHtml(current.prompt)}</h3>

      <div class="builder-slots">
        ${
          selectedPieces.length === 0
            ? `<span class="slot-placeholder">請依序點擊下方字首、字根、字尾積木...</span>`
            : selectedPieces
                .map(
                  (p) =>
                    `<button class="piece-chip selected" onclick="toggleBuilderPiece('${escapeHtml(p)}')">${escapeHtml(p)} ×</button>`
                )
                .join('<span class="plus-sign">+</span>')
        }
      </div>

      <div class="piece-pool">
        ${current.pieces
          .map((p) => {
            const used = selectedPieces.includes(p);
            return `
              <button
                class="piece-chip ${used ? "used" : ""}"
                onclick="toggleBuilderPiece('${escapeHtml(p)}')"
              >
                ${escapeHtml(p)}
              </button>
            `;
          })
          .join("")}
      </div>

      ${
        builderFeedback
          ? `
            <div class="feedback-box ${builderFeedback.correct ? "success" : "warning"}">
              ${escapeHtml(builderFeedback.message)}
            </div>
          `
          : ""
      }

      <div class="quiz-footer">
        <button class="btn btn-secondary" onclick="clearBuilderPieces()">清空重選</button>
        <button class="btn btn-primary" onclick="checkBuilderAnswer()" ${selectedPieces.length === 0 ? "disabled" : ""}>檢查答案</button>
        <button class="btn btn-outline" onclick="nextBuilderChallenge()">換下一題 ➔</button>
      </div>
    </div>
  `;
}
