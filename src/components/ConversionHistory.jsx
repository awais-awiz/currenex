import React from "react";
import { History as HistoryIcon, Trash2, ArrowRight } from "lucide-react";
import { currencyData } from "../data/currencyData";

export default function ConversionHistory({ history = [], onClearHistory }) {
  if (history.length === 0) {
    return (
      <div className="history-empty-card">
        <HistoryIcon size={32} className="history-empty-icon" />
        <h4 className="empty-title">No Conversion History Yet</h4>
        <p className="empty-desc">
          Conversions you copy or execute will appear here with instant audit timestamps.
        </p>
      </div>
    );
  }

  return (
    <div className="history-card">
      <div className="history-header">
        <div>
          <h3 className="card-title">Recent Conversion Audit</h3>
          <p className="card-subtitle">Audit trail of your most recent rate queries</p>
        </div>
        <button
          type="button"
          className="clear-history-btn"
          onClick={onClearHistory}
        >
          <Trash2 size={14} />
          <span>Clear Log</span>
        </button>
      </div>

      <div className="history-list">
        {history.map((item, index) => {
          const fromSymbol = currencyData[item.from]?.symbol || "";
          const toSymbol = currencyData[item.to]?.symbol || "";

          return (
            <div key={index} className="history-item">
              <div className="history-pair">
                <span className="history-from">
                  {fromSymbol}{item.fromAmount} {item.from}
                </span>
                <ArrowRight size={14} className="arrow-icon" />
                <span className="history-to">
                  {toSymbol}{item.toAmount} {item.to}
                </span>
              </div>
              <div className="history-meta">
                <span className="history-rate">Rate: {item.rate}</span>
                <span className="history-time">{item.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
