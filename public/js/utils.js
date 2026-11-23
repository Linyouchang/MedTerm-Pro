/**
 * 共用工具函式庫
 */

export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * 使用瀏覽器內建 Web Speech API 朗讀醫學英文發音
 */
export function speakTerm(text, rate = 0.9) {
  if (!("speechSynthesis" in window)) {
    showToast("此瀏覽器不支援語音朗讀功能", "warning");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

/**
 * 顯示底部 Toast 提示訊息
 */
let toastTimer = null;
export function showToast(message, type = "info") {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.className = `toast show toast-${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.className = "toast";
  }, 2800);
}

/**
 * 格式化時間戳記
 */
export function formatTime(isoString) {
  if (!isoString) return "尚未同步";
  try {
    const d = new Date(isoString);
    return d.toLocaleString("zh-TW", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "尚未同步";
  }
}
