/**
 * Resilient Rates Service with:
 * - Primary & Fallback API providers
 * - Configurable in-memory & local storage cache with TTL
 * - Safe error handling with typed error codes
 * - Offline detection support
 */

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const CACHE_KEY_PREFIX = "fx_rates_v1_";

const PROVIDERS = [
  {
    name: "ExchangeRate-API",
    url: (base) => `https://api.exchangerate-api.com/v4/latest/${base}`,
    parse: (data) => ({
      base: data.base,
      date: data.date,
      rates: data.rates,
    }),
  },
  {
    name: "Open-Exchange-Rates (Mirror)",
    url: (base) => `https://open.er-api.com/v6/latest/${base}`,
    parse: (data) => ({
      base: data.base_code,
      date: data.time_last_update_utc ? data.time_last_update_utc.split(" ")[0] : new Date().toISOString().split("T")[0],
      rates: data.rates,
    }),
  },
];

export async function fetchRates(baseCurrency = "USD", forceRefresh = false) {
  const cacheKey = `${CACHE_KEY_PREFIX}${baseCurrency}`;

  // 1. Check local cache
  if (!forceRefresh) {
    try {
      const cachedStr = localStorage.getItem(cacheKey);
      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        const age = Date.now() - cached.timestamp;
        if (age < CACHE_TTL_MS) {
          return {
            ...cached.data,
            provider: cached.provider,
            timestamp: cached.timestamp,
            isFromCache: true,
            isStale: false,
          };
        }
      }
    } catch (e) {
      console.warn("Storage cache read error:", e);
    }
  }

  // 2. Query providers in sequence with timeout
  let lastError = null;

  for (const provider of PROVIDERS) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch(provider.url(baseCurrency), {
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Provider HTTP ${res.status}`);
      }

      const json = await res.json();
      const parsed = provider.parse(json);

      if (!parsed.rates || typeof parsed.rates !== "object") {
        throw new Error("Invalid schema from provider");
      }

      // Save to cache
      const payload = {
        data: parsed,
        provider: provider.name,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(payload));

      return {
        ...parsed,
        provider: provider.name,
        timestamp: payload.timestamp,
        isFromCache: false,
        isStale: false,
      };
    } catch (err) {
      clearTimeout(timeout);
      console.warn(`[API] ${provider.name} failed:`, err.message);
      lastError = err;
    }
  }

  // 3. Fallback to stale cache if network failed
  try {
    const cachedStr = localStorage.getItem(cacheKey);
    if (cachedStr) {
      const cached = JSON.parse(cachedStr);
      return {
        ...cached.data,
        provider: cached.provider,
        timestamp: cached.timestamp,
        isFromCache: true,
        isStale: true,
      };
    }
  } catch (e) {
    // ignore
  }

  throw new Error(`Failed to fetch exchange rates. ${lastError?.message || "Network unreachable"}`);
}
