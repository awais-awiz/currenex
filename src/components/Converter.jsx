import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeftRight, Copy, Check, RefreshCw, Zap, ShieldCheck } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import { getExchangeRates } from "../services/currencyService";
import { currencyData } from "../data/currencyData";

export default function Converter({
  onAddHistory,
  onCurrencyPairChange,
  activePair,
}) {
  const [fromCurrency, setFromCurrency] = useState(activePair?.from || "USD");
  const [toCurrency, setToCurrency] = useState(activePair?.to || "EUR");

  // Sync state if activePair changes from parent/tour
  useEffect(() => {
    if (activePair?.from && activePair.from !== fromCurrency) {
      setFromCurrency(activePair.from);
    }
    if (activePair?.to && activePair.to !== toCurrency) {
      setToCurrency(activePair.to);
    }
  }, [activePair?.from, activePair?.to]);
  const [fromAmount, setFromAmount] = useState("100");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [apiMeta, setApiMeta] = useState({ provider: "", isCached: false, isStale: false, date: "" });
  const [feeRate, setFeeRate] = useState(0); // 0%, 1.5%, 3% simulated fee

  // Fetch exchange rate
  const fetchRate = useCallback(async (force = false) => {
    setIsLoading(true);
    try {
      const data = await getExchangeRates(fromCurrency, force);
      const rate = data.rates[toCurrency];
      setExchangeRate(rate);
      setApiMeta({
        provider: data.provider,
        isCached: data.isCached,
        isStale: data.isStale,
        date: data.date,
      });

      // Recalculate 'to' amount
      setFromAmount((currentFrom) => {
        if (currentFrom !== "" && !isNaN(Number(currentFrom))) {
          const rawTarget = Number(currentFrom) * rate;
          const adjustedTarget = rawTarget * (1 - feeRate / 100);
          setToAmount(adjustedTarget.toFixed(adjustedTarget < 1 ? 4 : 2));
        }
        return currentFrom;
      });
    } catch (err) {
      console.error("Failed to fetch rates:", err);
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency, feeRate]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  useEffect(() => {
    if (onCurrencyPairChange) {
      onCurrencyPairChange(fromCurrency, toCurrency);
    }
  }, [fromCurrency, toCurrency, onCurrencyPairChange]);

  // Handle Two-way input conversions
  const handleFromChange = (e) => {
    const val = e.target.value;
    setFromAmount(val);
    if (val === "" || isNaN(Number(val))) {
      setToAmount("");
      return;
    }
    if (exchangeRate) {
      const rawTarget = Number(val) * exchangeRate;
      const adjustedTarget = rawTarget * (1 - feeRate / 100);
      setToAmount(adjustedTarget.toFixed(adjustedTarget < 1 ? 4 : 2));
    }
  };

  const handleToChange = (e) => {
    const val = e.target.value;
    setToAmount(val);
    if (val === "" || isNaN(Number(val))) {
      setFromAmount("");
      return;
    }
    if (exchangeRate) {
      const reverseRate = 1 / exchangeRate;
      const adjustedVal = Number(val) / (1 - feeRate / 100);
      const fromVal = adjustedVal * reverseRate;
      setFromAmount(fromVal.toFixed(fromVal < 1 ? 4 : 2));
    }
  };

  // Swap currencies with animation
  const handleSwap = () => {
    const nextFrom = toCurrency;
    const nextTo = fromCurrency;
    setFromCurrency(nextFrom);
    setToCurrency(nextTo);
    // Invert the rate immediately to avoid rate flicker before network response
    if (exchangeRate && exchangeRate > 0) {
      const invertedRate = 1 / exchangeRate;
      setExchangeRate(invertedRate);
      if (fromAmount !== "" && !isNaN(Number(fromAmount))) {
        const rawTarget = Number(fromAmount) * invertedRate;
        const adjustedTarget = rawTarget * (1 - feeRate / 100);
        setToAmount(adjustedTarget.toFixed(adjustedTarget < 1 ? 4 : 2));
      }
    }
  };

  // Copy converted text to clipboard
  const handleCopy = () => {
    const fromSymbol = currencyData[fromCurrency]?.symbol || fromCurrency;
    const toSymbol = currencyData[toCurrency]?.symbol || toCurrency;
    const text = `${fromSymbol}${fromAmount} ${fromCurrency} = ${toSymbol}${toAmount} ${toCurrency} (Rate: 1 ${fromCurrency} = ${exchangeRate} ${toCurrency})`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    if (onAddHistory) {
      onAddHistory({
        from: fromCurrency,
        to: toCurrency,
        fromAmount,
        toAmount,
        rate: exchangeRate,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }
  };

  const unitRateInverse = exchangeRate ? (1 / exchangeRate).toFixed(4) : "—";

  return (
    <div className="converter-card">
      <div className="card-header-row">
        <div>
          <h2 className="card-title">Live Currency Exchange</h2>
          <p className="card-subtitle">Real-time financial rates with zero rounding errors</p>
        </div>
        <button
          className={`refresh-btn ${isLoading ? "spinning" : ""}`}
          onClick={() => fetchRate(true)}
          title="Force refresh live rates"
        >
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Provider Status Pill */}
      <div className="status-badge-row">
        <span className="badge-pill source-badge">
          <ShieldCheck size={13} />
          {apiMeta.provider ? `Source: ${apiMeta.provider}` : "Loading source..."}
        </span>
        {apiMeta.isCached && (
          <span className="badge-pill cached-badge">
            <Zap size={13} />
            {apiMeta.isStale ? "Offline Cache Active" : "Fast In-Memory Cache"}
          </span>
        )}
      </div>

      {/* Converter Form */}
      <div className="converter-grid">
        {/* From Side */}
        <div className="converter-column">
          <CurrencySelector
            value={fromCurrency}
            onChange={setFromCurrency}
            label="You Send"
          />
          <div className="input-wrapper">
            <span className="currency-symbol-tag">
              {currencyData[fromCurrency]?.symbol || "$"}
            </span>
            <input
              type="number"
              value={fromAmount}
              onChange={handleFromChange}
              placeholder="0.00"
              min="0"
              step="any"
              className="amount-input"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="swap-center-container">
          <button
            type="button"
            className="swap-circle-btn"
            onClick={handleSwap}
            title="Swap Currencies"
            aria-label="Swap Currencies"
          >
            <ArrowLeftRight size={20} />
          </button>
        </div>

        {/* To Side */}
        <div className="converter-column">
          <CurrencySelector
            value={toCurrency}
            onChange={setToCurrency}
            label="Recipient Gets"
          />
          <div className="input-wrapper">
            <span className="currency-symbol-tag">
              {currencyData[toCurrency]?.symbol || "€"}
            </span>
            <input
              type="number"
              value={toAmount}
              onChange={handleToChange}
              placeholder="0.00"
              min="0"
              step="any"
              className="amount-input"
            />
          </div>
        </div>
      </div>

      {/* Conversion Banner & Unit Rate */}
      <div className="conversion-summary-banner">
        <div className="summary-left">
          <div className="summary-rate-display">
            {fromAmount || 0} {fromCurrency} ={" "}
            <span className="highlight-amount">
              {toAmount || 0} {toCurrency}
            </span>
          </div>
          <div className="unit-rates-row">
            <span>
              1 {fromCurrency} = <strong>{exchangeRate || "..."} {toCurrency}</strong>
            </span>
            <span className="dot-separator">•</span>
            <span>
              1 {toCurrency} = <strong>{unitRateInverse} {fromCurrency}</strong>
            </span>
          </div>
        </div>

        <button
          className={`copy-btn ${isCopied ? "copied" : ""}`}
          onClick={handleCopy}
          title="Copy breakdown to clipboard"
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
          <span>{isCopied ? "Copied!" : "Copy Result"}</span>
        </button>
      </div>

      {/* FX Fee / Spread Simulator */}
      <div className="fee-simulator-row">
        <span className="fee-label">Bank / Gateway FX Margin:</span>
        <div className="fee-chips">
          {[
            { label: "Mid-Market (0%)", val: 0 },
            { label: "Wise (0.4%)", val: 0.4 },
            { label: "Standard Card (1.5%)", val: 1.5 },
            { label: "Bank (3.0%)", val: 3.0 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              className={`fee-chip ${feeRate === item.val ? "active" : ""}`}
              onClick={() => setFeeRate(item.val)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
