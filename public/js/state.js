import { saveCloudProgress } from "./firebase.js";

const STORAGE_KEY = "medterm_pro_state_v1";

export const appState = {
  activeTab: "vocab",
  morphemeSub: "analyzer",
  clinicalSub: "abbr",
  practiceSub: "builder",
  selectedDept: "all",
  vocabSearch: "",
  onlyUnmastered: false,
  abbrCategory: "all",
  abbrSearch: "",
  activeScenarioId: "rp-er",
  masteredIds: [],
  xp: 0,
  quizCorrect: 0,
  quizTotal: 0,
  completedChallenges: [],
  recentSearches: [],
  lastSyncedAt: null
};

const listeners = new Set();

export function subscribeState(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach((fn) => fn(appState));
}

export function loadLocalState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.masteredIds)) appState.masteredIds = saved.masteredIds;
    if (typeof saved.xp === "number") appState.xp = saved.xp;
    if (typeof saved.quizCorrect === "number") appState.quizCorrect = saved.quizCorrect;
    if (typeof saved.quizTotal === "number") appState.quizTotal = saved.quizTotal;
    if (Array.isArray(saved.completedChallenges)) appState.completedChallenges = saved.completedChallenges;
    if (Array.isArray(saved.recentSearches)) appState.recentSearches = saved.recentSearches;
    if (saved.lastSyncedAt) appState.lastSyncedAt = saved.lastSyncedAt;
  } catch (err) {
    console.warn("[State] 讀取本機紀錄失敗:", err);
  }
}

function getPersistablePayload() {
  return {
    masteredIds: appState.masteredIds,
    xp: appState.xp,
    quizCorrect: appState.quizCorrect,
    quizTotal: appState.quizTotal,
    completedChallenges: appState.completedChallenges,
    recentSearches: appState.recentSearches
  };
}

export async function saveState() {
  const payload = getPersistablePayload();
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...payload, lastSyncedAt: appState.lastSyncedAt })
    );
  } catch (err) {
    console.warn("[State] 寫入 localStorage 失敗:", err);
  }

  const synced = await saveCloudProgress(payload);
  if (synced) {
    appState.lastSyncedAt = new Date().toISOString();
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...payload, lastSyncedAt: appState.lastSyncedAt })
      );
    } catch {
      // ignore
    }
  }
  notify();
}

/**
 * 合併雲端與本機進度（取聯集與較高值，避免資料遺失）
 */
export function mergeCloudData(cloud) {
  if (!cloud || typeof cloud !== "object") return;
  if (Array.isArray(cloud.masteredIds)) {
    appState.masteredIds = Array.from(
      new Set([...appState.masteredIds, ...cloud.masteredIds])
    );
  }
  if (Array.isArray(cloud.completedChallenges)) {
    appState.completedChallenges = Array.from(
      new Set([...appState.completedChallenges, ...cloud.completedChallenges])
    );
  }
  if (typeof cloud.xp === "number") {
    appState.xp = Math.max(appState.xp, cloud.xp);
  }
  if (typeof cloud.quizCorrect === "number") {
    appState.quizCorrect = Math.max(appState.quizCorrect, cloud.quizCorrect);
  }
  if (typeof cloud.quizTotal === "number") {
    appState.quizTotal = Math.max(appState.quizTotal, cloud.quizTotal);
  }
  if (Array.isArray(cloud.recentSearches)) {
    appState.recentSearches = Array.from(
      new Set([...appState.recentSearches, ...cloud.recentSearches])
    ).slice(0, 12);
  }
  appState.lastSyncedAt = cloud.updatedAt || new Date().toISOString();
  saveState();
}

export function toggleMastered(vocabId) {
  const idx = appState.masteredIds.indexOf(vocabId);
  let mastered = false;
  if (idx === -1) {
    appState.masteredIds.push(vocabId);
    appState.xp += 15;
    mastered = true;
  } else {
    appState.masteredIds.splice(idx, 1);
    appState.xp = Math.max(0, appState.xp - 15);
  }
  saveState();
  return mastered;
}

export function recordQuizResult(isCorrect, challengeId = null) {
  appState.quizTotal += 1;
  if (isCorrect) {
    appState.quizCorrect += 1;
    appState.xp += 20;
    if (challengeId && !appState.completedChallenges.includes(challengeId)) {
      appState.completedChallenges.push(challengeId);
    }
  }
  saveState();
}

export function addSearchHistory(term) {
  const clean = term.trim();
  if (!clean) return;
  appState.recentSearches = [
    clean,
    ...appState.recentSearches.filter((t) => t.toLowerCase() !== clean.toLowerCase())
  ].slice(0, 10);
  saveState();
}

export function resetProgress() {
  appState.masteredIds = [];
  appState.xp = 0;
  appState.quizCorrect = 0;
  appState.quizTotal = 0;
  appState.completedChallenges = [];
  appState.recentSearches = [];
  saveState();
}
