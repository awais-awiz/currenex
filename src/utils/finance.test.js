import { convertAmount, calculateInverseRate, formatCurrencyDisplay } from "./finance";

describe("Financial Precision Engine (finance.js)", () => {
  test("performs exact currency conversion without floating point drift", () => {
    // In raw JS: 0.1 * 0.2 = 0.020000000000000004
    const result = convertAmount("0.1", "0.2");
    expect(result).toBe("0.0200");
  });

  test("calculates standard monetary rates accurately", () => {
    const result = convertAmount("1000", "278.50");
    expect(result).toBe("278500.00");
  });

  test("handles minor fractional units correctly", () => {
    const result = convertAmount("100", "0.00362");
    expect(result).toBe("0.3620");
  });

  test("handles zero, negative, or invalid inputs gracefully", () => {
    expect(convertAmount("", "1.5")).toBe("");
    expect(convertAmount("100", "0")).toBe("");
    expect(convertAmount("100", "-1")).toBe("");
    expect(convertAmount("abc", "1.5")).toBe("");
  });

  test("calculates inverse unit rates with 4 decimal places", () => {
    expect(calculateInverseRate("2")).toBe("0.5000");
    expect(calculateInverseRate("0")).toBe("0.0000");
    expect(calculateInverseRate("1.25")).toBe("0.8000");
  });

  test("formats currency values according to standard locale", () => {
    expect(formatCurrencyDisplay("1000000")).toBe("1,000,000.00");
    expect(formatCurrencyDisplay("")).toBe("0.00");
  });
});
