/* ═════════════════════════════════════════ */
/* ANALYTICS.EXE - Internal System Logs */
/* ═════════════════════════════════════════ */

/**
 * PortfolioAnalytics Gateway (Virtual)
 * Reverted to internal system logging only. 
 * No external tracking enabled.
 */
const PortfolioAnalytics = {
  // Always returns false as we are not using an external provider
  isReady() {
    return false;
  },

  /**
   * Log custom events to the system console
   * @param {string} eventName - Category of action
   * @param {object} eventData - Optional metadata
   */
  trackEvent(eventName, eventData = {}) {
    // Only log to system console for retro feel
    console.log(`[SYS_LOG] Event: ${eventName.toUpperCase()}`, eventData);
  }
};

// Expose to window for global access from other modules
window.trackEvent = (name, data) => PortfolioAnalytics.trackEvent(name, data);

// Local logs for basic interaction awareness
document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-track]");
  if (target) {
    const eventName = target.getAttribute("data-track");
    const label = target.getAttribute("data-label") || target.innerText || "unlabeled";
    window.trackEvent(eventName, { label });
  }
});
