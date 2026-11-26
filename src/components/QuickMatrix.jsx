import React from "react";
import { formatCurrencyDisplay } from "../utils/finance";

const COMMON_DENOMINATIONS = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

export default function QuickMatrix({ fromCurrency, toCurrency, rate }) {
  if (!rate || rate <= 0) return null;

  return (
    <div className="quick-matrix-card">
      <div className="matrix-header">
        <span className="card-heading">Conversion Tables</span>
        <span className="matrix-sub">Indicative interbank exchange</span>
      </div>

      <div className="matrix-grid">
        {/* FROM -> TO Column */}
        <div className="matrix-column">
          <div className="matrix-col-title">Convert {fromCurrency} to {toCurrency}</div>
          <table className="matrix-table">
            <thead>
              <tr>
                <th>{fromCurrency}</th>
                <th>{toCurrency}</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_DENOMINATIONS.slice(0, 5).map((amount) => (
                <tr key={amount}>
                  <td className="matrix-amt">{formatCurrencyDisplay(amount, fromCurrency)}</td>
                  <td className="matrix-res">
                    {formatCurrencyDisplay((amount * rate).toFixed(2), toCurrency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TO -> FROM Column */}
        <div className="matrix-column">
          <div className="matrix-col-title">Convert {toCurrency} to {fromCurrency}</div>
          <table className="matrix-table">
            <thead>
              <tr>
                <th>{toCurrency}</th>
                <th>{fromCurrency}</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_DENOMINATIONS.slice(0, 5).map((amount) => (
                <tr key={amount}>
                  <td className="matrix-amt">{formatCurrencyDisplay(amount, toCurrency)}</td>
                  <td className="matrix-res">
                    {formatCurrencyDisplay((amount / rate).toFixed(2), fromCurrency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
