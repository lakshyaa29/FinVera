/**
 * Robust LocalStorage Persistence Engine for FinVera
 * Handles SSR safety, JSON parsing errors, and clean schema defaults.
 */

const STORAGE_KEYS = {
  PROFILE: 'finvera_user_profile',
  PROGRESS: 'finvera_user_progress',
  PORTFOLIO: 'finvera_simulated_portfolio',
  HEALTH: 'finvera_health_scores',
} as const;

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    let item = window.localStorage.getItem(key);
    if (!item && key.startsWith('finvera_')) {
      const legacyKey = key.replace('finvera_', 'moneywise_');
      item = window.localStorage.getItem(legacyKey);
    }
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`[FinVera Storage] Failed to load key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[FinVera Storage] Failed to save key "${key}":`, error);
  }
}

export function clearAllStorage(): void {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach((k) => {
    window.localStorage.removeItem(k);
  });
}

export { STORAGE_KEYS };
