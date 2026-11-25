import React from "react";
import { formatCurrencyDisplay } from "../utils/finance";

export default function TransferComparisonTable({
  comparisons = [],
  fromCurrency,
  toCurrency,
  sendAmount,
}) {
  if (!comparisons || comparisons.length === 0) {
    return null;
  }

  return (
    <div className="comparison-section">
      <div className="comparison-header">
        <span className="card-heading">Provider Rates</span>
      </div>

      <div className="providers-card-list">
        {comparisons.map((item) => {
          return (
            <div
              key={item.id}
              className={`provider-card ${item.isWinner ? "winner-card" : ""}`}
            >
              <div className="provider-card-main">
                {/* Provider */}
                <div className="col-identity">
                  <div className="provider-name-row">
                    <span
                      className="provider-avatar-circle"
                      style={{ backgroundColor: item.logoColor }}
                    >
                      {item.name.charAt(0)}
                    </span>
                    <div>
                      <h4 className="provider-name">{item.name}</h4>
                      <span className="provider-speed">{item.speed}</span>
                    </div>
                  </div>
                </div>

                {/* Fees & Rates */}
                <div className="col-fees">
                  <div className="fee-item">
                    <span className="fee-label">Fee</span>
                    <span className="fee-value">{item.upfrontFee} {fromCurrency}</span>
                  </div>
                  <div className="fee-item">
                    <span className="fee-label">Rate</span>
                    <span className="rate-value">{item.offeredRate}</span>
                  </div>
                </div>

                {/* Payout */}
                <div className="col-payout">
                  <span className="payout-label">Payout</span>
                  <div className="payout-amount-row">
                    <span className={`payout-number ${item.isWinner ? "winner-amount" : ""}`}>
                      {formatCurrencyDisplay(item.recipientGets, toCurrency)}
                    </span>
                    <span className="payout-currency">{toCurrency}</span>
                  </div>
                  {!item.isWinner && Number(item.savingsVsBest) > 0 && (
                    <span className="loss-difference">
                      -{formatCurrencyDisplay(item.savingsVsBest, toCurrency)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
