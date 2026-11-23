import { DEPARTMENTS, VOCAB_BANK } from "../data/vocabData.js";
import { getCurrentUser, isFirebaseConfigured } from "../firebase.js";
import { appState, resetProgress } from "../state.js";
import { escapeHtml, formatTime, showToast } from "../utils.js";

function getRank(xp) {
  if (xp >= 400) return { title: "Attending 主治等級", icon: "🏆" };
  if (xp >= 220) return { title: "Resident 住院醫師", icon: "🩺" };
  if (xp >= 100) return { title: "Clerk 見習醫學生", icon: "📘" };
  return { title: "Pre-Med 醫學新手", icon: "🌱" };
}

export function handleResetProgress() {
  if (!window.confirm("確定要清除所有已掌握單字與測驗統計嗎？")) return;
  resetProgress();
  showToast("已重置學習進度", "info");
  renderProfileModule();
}

export function renderProfileModule() {
  const container = document.getElementById("panel-profile");
  if (!container) return;

  const user = getCurrentUser();
  const totalVocab = VOCAB_BANK.length;
  const masteredCount = appState.masteredIds.length;
  const masteryPct = totalVocab ? Math.round((masteredCount / totalVocab) * 100) : 0;
  const accuracy = appState.quizTotal
    ? Math.round((appState.quizCorrect / appState.quizTotal) * 100)
    : 0;
  const rank = getRank(appState.xp);

  const deptBars = DEPARTMENTS.filter((d) => d.id !== "all")
    .map((d) => {
      const deptItems = VOCAB_BANK.filter((v) => v.dept === d.id);
      const deptMastered = deptItems.filter((v) =>
        appState.masteredIds.includes(v.id)
      ).length;
      const pct = deptItems.length
        ? Math.round((deptMastered / deptItems.length) * 100)
        : 0;
      return `
        <div class="dept-progress-row">
          <div class="dept-progress-label">
            <span>${d.icon} ${escapeHtml(d.name)}</span>
            <span>${deptMastered} / ${deptItems.length} (${pct}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2>個人學習檔案與雲端同步</h2>
        <p class="section-sub">追蹤各科單字掌握率、測驗表現與 Firebase Firestore 雲端備份狀態</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="card stat-card">
        <div class="stat-label">目前學習稱號</div>
        <div class="stat-value">${rank.icon} ${escapeHtml(rank.title)}</div>
        <div class="stat-sub">累計經驗值 ${appState.xp} XP</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">單字掌握進度</div>
        <div class="stat-value">${masteredCount} / ${totalVocab}</div>
        <div class="stat-sub">總完成率 ${masteryPct}%</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">互動測驗正確率</div>
        <div class="stat-value">${accuracy}%</div>
        <div class="stat-sub">答對 ${appState.quizCorrect} / ${appState.quizTotal} 題</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">雲端同步狀態</div>
        <div class="stat-value">${
          user
            ? "☁️ 已連線"
            : isFirebaseConfigured
            ? "💻 本機模式"
            : "⚙️ 待設定 Firebase"
        }</div>
        <div class="stat-sub">最近同步：${escapeHtml(formatTime(appState.lastSyncedAt))}</div>
      </div>
    </div>

    <div class="card" style="margin-top:1.25rem;">
      <h3 style="margin-bottom:1rem;">各專科掌握度分佈</h3>
      <div class="dept-progress-list">${deptBars}</div>
    </div>

    <div class="card sync-card" style="margin-top:1.25rem;">
      <div>
        <h3>帳號與資料管理</h3>
        <p class="vocab-def">
          ${
            user
              ? `目前以 <strong>${escapeHtml(user.displayName || user.email)}</strong> 登入，進度自動寫入 Firestore <code>users/${escapeHtml(user.uid)}</code>。`
              : isFirebaseConfigured
              ? "目前為本機瀏覽器儲存模式；點擊右上角「雲端登入」即可啟用跨裝置同步。"
              : "尚未填入 Firebase 專案金鑰，目前進度安全儲存於本機 localStorage。填入 <code>public/js/firebase.js</code> 的 <code>firebaseConfig</code> 後即可啟用 Google 雲端登入。"
          }
        </p>
      </div>
      <div class="sync-actions">
        ${
          user
            ? `<button class="btn btn-secondary" onclick="signOutFirebase()">登出帳號</button>`
            : `<button class="btn btn-primary" onclick="signInWithGoogle()">☁️ Google 雲端登入</button>`
        }
        <button class="btn btn-danger-outline" onclick="handleResetProgress()">重置學習進度</button>
      </div>
    </div>
  `;
}
