import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { showToast } from "./utils.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3JPZtSGTT6GAG7GsiB2v6RNxWkighYYI",
  authDomain: "medterm-pro.firebaseapp.com",
  projectId: "medterm-pro",
  storageBucket: "medterm-pro.firebasestorage.app",
  messagingSenderId: "780313785610",
  appId: "1:780313785610:web:9193bc1bf01ee5e46236f3",
  measurementId: "G-DZ4FQZ4SV6"
};

export const isFirebaseConfigured =
  firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("YOUR_");

let app = null;
let analytics = null;
let auth = null;
let db = null;
let currentUser = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("[Firebase] Analytics 初始化略過:", err);
  }
  auth = getAuth(app);
  db = getFirestore(app);
}

export function getCurrentUser() {
  return currentUser;
}

/**
 * 初始化 Firebase 驗證監聽器，並於登入後讀取雲端學習進度
 */
export function initFirebaseAuth({ onUserChanged, onCloudDataLoaded } = {}) {
  if (!isFirebaseConfigured || !auth) {
    if (onUserChanged) onUserChanged(null, false);
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    if (onUserChanged) onUserChanged(user, true);

    if (user && db) {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && onCloudDataLoaded) {
          onCloudDataLoaded(snap.data());
        }
      } catch (err) {
        console.error("[Firebase] 讀取雲端資料失敗:", err);
        showToast("雲端進度讀取失敗，請檢查 Firestore 規則", "warning");
      }
    }
  });
}

/**
 * Google 帳號登入
 */
export async function loginWithGoogle() {
  if (!isFirebaseConfigured || !auth) {
    showToast("尚未填入 Firebase 設定，請先更新 public/js/firebase.js", "warning");
    return null;
  }
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    showToast(`歡迎回來，${result.user.displayName || "同學"}！`, "success");
    return result.user;
  } catch (err) {
    console.error("[Firebase] Google 登入失敗:", err);
    showToast(`登入失敗：${err.code || err.message}`, "error");
    return null;
  }
}

/**
 * 登出帳號
 */
export async function logoutFirebase() {
  if (!auth) return;
  try {
    await signOut(auth);
    showToast("已登出雲端帳號，切換回本機模式", "info");
  } catch (err) {
    console.error("[Firebase] 登出失敗:", err);
  }
}

/**
 * 將學習進度寫入 Firestore users/{uid}
 */
export async function saveCloudProgress(payload) {
  if (!isFirebaseConfigured || !db || !currentUser) return false;
  try {
    const ref = doc(db, "users", currentUser.uid);
    await setDoc(
      ref,
      {
        ...payload,
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    console.error("[Firebase] 寫入雲端失敗:", err);
    showToast("雲端同步失敗，已先儲存於本機", "warning");
    return false;
  }
}
