import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeftRight, Copy, Check, RefreshCw, AlertCircle } from "lucide-react";
import CurrencySelect from "./CurrencySelect";
import TransferComparisonTable from "./TransferComparisonTable";
import { fetchRates } from "../services/ratesService";
import { calculateComparison } from "../services/comparisonService";
import { convertAmount, calculateInverseRate, formatCurrencyDisplay } from "../utils/finance";

export default function CurrencyConverter({
  defaultFrom = "USD",
  defaultTo = "EUR",
  onConversionLogged,
}) {
  const [fromCurrency, setFromCurrency] = useState(defaultFrom);
  const [toCurrency, setToCurrency] = useState(defaultTo);
  const [amount, setAmount] = useState("1000");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    setFromCurrency(defaultFrom);
    setToCurrency(defaultTo);
  }, [defaultFrom, defaultTo]);

  const loadRates = useCallback(async (force = false, from = fromCurrency, to = toCurrency) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRates(from, force);
      const targetRate = data.rates[to];

      if (!targetRate) {
        throw new Error(`Rate unavailable for ${to}`);
      }

      setRate(targetRate);

      setAmount((currAmount) => {
        setConvertedAmount(convertAmount(currAmount, targetRate));
        const comp = calculateComparison({
          sendAmount: currAmount,
          midMarketRate: targetRate,
          fromCurrency: from,
          toCurrency: to,
        });
        setComparisons(comp);
        return currAmount;
      });
    } catch (err) {
      console.error("Rates fetch error:", err);
      setError(err.message || "Failed to load exchange rates");
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    if (val === "" || isNaN(Number(val))) {
      setConvertedAmount("");
      setComparisons([]);
      return;
    }
    if (rate) {
      setConvertedAmount(convertAmount(val, rate));
      const comp = calculateComparison({
        sendAmount: val,
        midMarketRate: rate,
        fromCurrency,
        toCurrency,
      });
      setComparisons(comp);
    }
  };

  const handleSwap = () => {
    const nextFrom = toCurrency;
    const nextTo = fromCurrency;
    setFromCurrency(nextFrom);
    setToCurrency(nextTo);
    if (rate && rate > 0) {
      const invRate = 1 / rate;
      setRate(invRate);
      setConvertedAmount(convertAmount(amount, invRate));
    }
  };

  const handleCopy = () => {
    if (!convertedAmount) return;
    const text = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency} (1 ${fromCurrency} = ${rate} ${toCurrency})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (onConversionLogged) {
      onConversionLogged({
        from: fromCurrency,
        to: toCurrency,
        amount,
        convertedAmount,
        rate,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }
  };

  const inverseRate = calculateInverseRate(rate);

  return (
    <div className="converter-stack">
      {/* Primary Calculator */}
      <div className="converter-card">
        <div className="converter-card-header">
          <span className="card-heading">Exchange Rates</span>
          <button
            type="button"
            className="refresh-rates-btn"
            onClick={() => loadRates(true)}
            disabled={loading}
            aria-label="Refresh"
          >
            <RefreshCw size={13} className={loading ? "spin" : ""} />
            <span>{loading ? "Updating" : "Refresh"}</span>
          </button>
        </div>

        {error && (
          <div className="error-alert" role="alert">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <div className="converter-body">
          {/* FROM PANEL */}
          <div className="converter-panel source-panel">
            <div className="panel-header-row">
              <span className="panel-badge">You send</span>
            </div>
            <div className="panel-controls-row">
              <div className="panel-amount-wrapper">
                <input
                  id="amount-input"
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="panel-amount-input"
                  aria-label="Send amount"
                />
              </div>
              <div className="panel-currency-wrapper">
                <CurrencySelect
                  id="from-currency"
                  value={fromCurrency}
                  onChange={setFromCurrency}
                />
              </div>
            </div>
          </div>

          {/* SWAP CONNECTOR */}
          <div className="swap-action-cell">
            <button
              type="button"
              className="swap-btn"
              onClick={handleSwap}
              aria-label="Swap"
              title="Swap Currencies"
            >
              <ArrowLeftRight size={17} />
            </button>
          </div>

          {/* TO PANEL */}
          <div className="converter-panel dest-panel">
            <div className="panel-header-row">
              <span className="panel-badge">Recipient gets</span>
            </div>
            <div className="panel-controls-row">
              <div className="panel-amount-wrapper">
                <input
                  id="converted-output"
                  type="text"
                  readOnly
                  value={convertedAmount ? formatCurrencyDisplay(convertedAmount, toCurrency) : "—"}
                  className="panel-amount-input readonly-panel-input"
                  aria-label="Recipient gets"
                />
              </div>
              <div className="panel-currency-wrapper">
                <CurrencySelect
                  id="to-currency"
                  value={toCurrency}
                  onChange={setToCurrency}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rate Summary */}
        <div className="conversion-footer">
          <div className="rates-meta-block">
            <div className="headline-conversion">
              <span>{formatCurrencyDisplay(amount, fromCurrency)} {fromCurrency} = </span>
              <strong className="output-highlight">
                {convertedAmount ? formatCurrencyDisplay(convertedAmount, toCurrency) : "0.00"} {toCurrency}
              </strong>
            </div>

            <div className="unit-rates-detail">
              <span>1 {fromCurrency} = <strong>{rate || "—"} {toCurrency}</strong></span>
              <span className="separator">•</span>
              <span>1 {toCurrency} = <strong>{inverseRate} {fromCurrency}</strong></span>
            </div>
          </div>

          <button
            type="button"
            className={`copy-result-btn ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            disabled={!convertedAmount}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Provider Breakdown */}
      <TransferComparisonTable
        comparisons={comparisons}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        sendAmount={amount}
      />
    </div>
  );
}
