import Decimal from "decimal.js";

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

/**
 * Provider profiles simulating real-world fee structures and spreads
 * (Based on real remittance market models from Wise, Western Union, Remitly, Banks)
 */
export const PROVIDER_PROFILES = [
  {
    id: "wise",
    name: "Wise",
    logoColor: "#16a34a",
    fixedFeeUsd: 1.20,
    variablePercent: 0.0045, // 0.45%
    exchangeMarkupPercent: 0.0, // Guaranteed Mid-market (0% markup)
    speed: "Arrives in 15 mins",
    speedRating: "Fastest",
    tag: "Cheapest & Transparent",
    isBestRate: true,
  },
  {
    id: "remitly",
    name: "Remitly Express",
    logoColor: "#2563eb",
    fixedFeeUsd: 1.99,
    variablePercent: 0.007, // 0.70%
    exchangeMarkupPercent: 0.0085, // 0.85% hidden markup
    speed: "Arrives within 2 hours",
    speedRating: "Fast",
    tag: "Popular for Cash Pickup",
    isBestRate: false,
  },
  {
    id: "westernunion",
    name: "Western Union",
    logoColor: "#eab308",
    fixedFeeUsd: 4.50,
    variablePercent: 0.012, // 1.2%
    exchangeMarkupPercent: 0.021, // 2.1% hidden markup
    speed: "Arrives in 1-2 days",
    speedRating: "Standard",
    tag: "Global Cash Agent Network",
    isBestRate: false,
  },
  {
    id: "bank",
    name: "Traditional High-Street Bank",
    logoColor: "#475569",
    fixedFeeUsd: 15.00,
    variablePercent: 0.015, // 1.5%
    exchangeMarkupPercent: 0.034, // 3.4% high retail bank markup
    speed: "Arrives in 3-5 business days",
    speedRating: "Slowest",
    tag: "Highest Hidden Fees",
    isBestRate: false,
  },
];

/**
 * Calculate exact fee breakdown and payout for each provider
 */
export function calculateComparison({ sendAmount, midMarketRate, fromCurrency, toCurrency }) {
  if (!sendAmount || isNaN(Number(sendAmount)) || Number(sendAmount) <= 0 || !midMarketRate) {
    return [];
  }

  const dSendAmount = new Decimal(sendAmount);
  const dMidRate = new Decimal(midMarketRate);

  const results = PROVIDER_PROFILES.map((provider) => {
    // 1. Upfront Fee = Fixed Fee + (Amount * Variable%)
    const variableFee = dSendAmount.times(provider.variablePercent);
    const totalFee = new Decimal(provider.fixedFeeUsd).plus(variableFee);

    // 2. Amount after fee that actually gets converted
    const netConvertAmount = Decimal.max(0, dSendAmount.minus(totalFee));

    // 3. Offered Exchange Rate (Mid-market minus hidden markup)
    const markupFactor = new Decimal(1).minus(provider.exchangeMarkupPercent);
    const offeredRate = dMidRate.times(markupFactor);

    // 4. Final Recipient Payout
    const recipientGets = netConvertAmount.times(offeredRate);

    // 5. Hidden markup cost in destination currency
    const hiddenMarkupCost = netConvertAmount.times(dMidRate.minus(offeredRate));

    // 6. Total cost lost (fees + hidden markup) converted to source currency
    const totalLostSourceCurrency = totalFee.plus(hiddenMarkupCost.dividedBy(dMidRate));

    return {
      ...provider,
      upfrontFee: totalFee.toFixed(2),
      offeredRate: offeredRate.toFixed(4),
      midMarketRate: dMidRate.toFixed(4),
      recipientGets: recipientGets.toFixed(recipientGets.lessThan(10) ? 4 : 2),
      recipientGetsRaw: recipientGets.toNumber(),
      hiddenMarkupCost: hiddenMarkupCost.toFixed(2),
      totalLostSourceCurrency: totalLostSourceCurrency.toFixed(2),
    };
  });

  // Sort descending by highest payout (most money for the recipient)
  results.sort((a, b) => b.recipientGetsRaw - a.recipientGetsRaw);

  const bestPayout = results[0].recipientGetsRaw;

  // Annotate difference vs the best offer
  return results.map((item, idx) => {
    const diff = new Decimal(bestPayout).minus(item.recipientGetsRaw);
    return {
      ...item,
      isWinner: idx === 0,
      savingsVsBest: diff.toFixed(2),
    };
  });
}
