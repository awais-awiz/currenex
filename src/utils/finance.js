import Decimal from "decimal.js";

// Configure Decimal.js for financial standard: 20 significant digits, half-up rounding
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

/**
 * Perform exact financial conversion: amount * rate
 * Returns string representation formatted to target currency decimals
 */
export function convertAmount(amount, rate, decimals = 2) {
  if (amount === null || amount === undefined || amount === "" || isNaN(Number(amount))) {
    return "";
  }
  if (!rate || isNaN(Number(rate)) || Number(rate) <= 0) {
    return "";
  }

  try {
    const dAmount = new Decimal(amount);
    const dRate = new Decimal(rate);
    const result = dAmount.times(dRate);

    // Minor currencies or very small rates need more decimals
    const targetDecimals = result.lessThan(1) && !result.isZero() ? 4 : decimals;
    return result.toFixed(targetDecimals);
  } catch (err) {
    console.error("Decimal conversion error:", err);
    return "";
  }
}

/**
 * Calculate inverse unit rate: 1 / rate
 */
export function calculateInverseRate(rate) {
  if (!rate || isNaN(Number(rate)) || Number(rate) <= 0) {
    return "0.0000";
  }
  try {
    const one = new Decimal(1);
    const dRate = new Decimal(rate);
    return one.dividedBy(dRate).toFixed(4);
  } catch {
    return "0.0000";
  }
}

/**
 * Standard monetary formatting using Intl.NumberFormat
 */
export function formatCurrencyDisplay(amount, currencyCode = "USD") {
  if (amount === "" || amount === null || amount === undefined || isNaN(Number(amount))) {
    return "0.00";
  }
  try {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(Number(amount));
  } catch {
    return String(amount);
  }
}
