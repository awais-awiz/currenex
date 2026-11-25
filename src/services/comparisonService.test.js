import { calculateComparison, PROVIDER_PROFILES } from "./comparisonService";

describe("Cross-Border Comparison Engine (comparisonService.js)", () => {
  test("returns empty array for invalid send amounts", () => {
    expect(calculateComparison({ sendAmount: "", midMarketRate: 1.2 })).toEqual([]);
    expect(calculateComparison({ sendAmount: "-10", midMarketRate: 1.2 })).toEqual([]);
    expect(calculateComparison({ sendAmount: "0", midMarketRate: 1.2 })).toEqual([]);
  });

  test("calculates recipient payouts and marks the highest payout as winner", () => {
    const results = calculateComparison({
      sendAmount: "1000",
      midMarketRate: "278.50",
      fromCurrency: "USD",
      toCurrency: "PKR",
    });

    expect(results.length).toBe(PROVIDER_PROFILES.length);

    // Results must be sorted descending by payout
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].recipientGetsRaw).toBeGreaterThanOrEqual(results[i + 1].recipientGetsRaw);
    }

    // Winner is index 0
    expect(results[0].isWinner).toBe(true);
    expect(Number(results[0].savingsVsBest)).toBe(0);

    // Non-winners must show positive loss vs best
    expect(Number(results[results.length - 1].savingsVsBest)).toBeGreaterThan(0);
  });

  test("accurately penalizes providers with high hidden FX markups", () => {
    const results = calculateComparison({
      sendAmount: "5000",
      midMarketRate: "0.92",
      fromCurrency: "USD",
      toCurrency: "EUR",
    });

    const bank = results.find((r) => r.id === "bank");
    const wise = results.find((r) => r.id === "wise");

    // Traditional bank with 3.4% markup must deliver significantly less EUR than 0% markup
    expect(wise.recipientGetsRaw).toBeGreaterThan(bank.recipientGetsRaw);
    expect(Number(bank.totalLostSourceCurrency)).toBeGreaterThan(Number(wise.totalLostSourceCurrency));
  });
});
