import {
  initFirebaseAuth,
  loginWithGoogle,
  logoutFirebase
} from "./firebase.js";
import {
  appState,
  loadLocalState,
  mergeCloudData,
  subscribeState
} from "./state.js";
import {
  renderVocabModule,
  selectDept,
  handleVocabSearch,
  toggleOnlyUnmastered,
  handleToggleMastered,
  pronounceText
} from "./modules/vocab.js";
import {
  renderMorphemeModule,
  switchMorphemeSub,
  analyzeTermInput,
  pickSampleTerm
} from "./modules/morpheme.js";
import {
  renderClinicalModule,
  switchClinicalSub,
  selectAbbrCategory,
  handleAbbrSearch,
  selectRoleplayScenario
} from "./modules/clinical.js";
import {
  renderPracticeModule,
  switchPracticeSub,
  toggleBuilderPiece,
  clearBuilderPieces,
  checkBuilderAnswer,
  nextBuilderChallenge,
  answerConfusable,
  nextConfusable
} from "./modules/practice.js";
import {
  renderDictionaryModule,
  handleDictInput,
  submitDictSearch
} from "./modules/dictionary.js";
import {
  renderProfileModule,
  handleResetProgress
} from "./modules/profile.js";
import { escapeHtml } from "./utils.js";

const TABS = ["vocab", "morpheme", "clinical", "practice", "dictionary", "profile"];

function renderActiveTab() {
  TABS.forEach((tab) => {
    const panel = document.getElementById(`panel-${tab}`);
    const navBtn = document.querySelector(`.nav-btn[data-tab="${tab}"]`);
    const isActive = appState.activeTab === tab;
    if (panel) panel.classList.toggle("active", isActive);
    if (navBtn) navBtn.classList.toggle("active", isActive);
  });

  switch (appState.activeTab) {
    case "vocab":
      renderVocabModule();
      break;
    case "morpheme":
      renderMorphemeModule();
      break;
    case "clinical":
      renderClinicalModule();
      break;
    case "practice":
      renderPracticeModule();
      break;
    case "dictionary":
      renderDictionaryModule();
      break;
    case "profile":
      renderProfileModule();
      break;
  }
}

export function switchTab(tab) {
  if (!TABS.includes(tab)) return;
  appState.activeTab = tab;
  renderActiveTab();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateHeaderStats() {
  const xpEl = document.getElementById("header-xp");
  if (xpEl) xpEl.textContent = `${appState.xp} XP`;
}

function updateAuthUI(user) {
  const authContainer = document.getElementById("auth-area");
  if (!authContainer) return;

  if (user) {
    const name = escapeHtml(user.displayName || user.email || "已登入");
    const avatar = user.photoURL
      ? `<img src="${escapeHtml(user.photoURL)}" alt="${name}" class="user-avatar" />`
      : `<span class="user-avatar-fallback">${name.charAt(0).toUpperCase()}</span>`;

    authContainer.innerHTML = `
      <div class="user-pill">
        ${avatar}
        <span class="user-name">${name}</span>
        <button class="btn btn-sm btn-secondary" onclick="signOutFirebase()">登出</button>
      </div>
    `;
  } else {
    authContainer.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="signInWithGoogle()">☁️ 雲端登入</button>
    `;
  }

  if (appState.activeTab === "profile") {
    renderProfileModule();
  }
}

// 將 HTML onclick / oninput 需要的函式掛載到全域 window
Object.assign(window, {
  switchTab,
  selectDept,
  handleVocabSearch,
  toggleOnlyUnmastered,
  handleToggleMastered,
  pronounceText,
  switchMorphemeSub,
  analyzeTermInput,
  pickSampleTerm,
  switchClinicalSub,
  selectAbbrCategory,
  handleAbbrSearch,
  selectRoleplayScenario,
  switchPracticeSub,
  toggleBuilderPiece,
  clearBuilderPieces,
  checkBuilderAnswer,
  nextBuilderChallenge,
  answerConfusable,
  nextConfusable,
  handleDictInput,
  submitDictSearch,
  handleResetProgress,
  signInWithGoogle: loginWithGoogle,
  signOutFirebase: logoutFirebase
});

// 啟動應用程式與 Firebase 監聽
window.addEventListener("DOMContentLoaded", () => {
  loadLocalState();
  updateHeaderStats();
  subscribeState(() => {
    updateHeaderStats();
    if (appState.activeTab === "profile") {
      renderProfileModule();
    }
  });

  initFirebaseAuth({
    onUserChanged: (user) => updateAuthUI(user),
    onCloudDataLoaded: (data) => {
      mergeCloudData(data);
      renderActiveTab();
    }
  });

  renderActiveTab();
});
