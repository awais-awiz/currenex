import React from "react";
import { Zap, Shield, RefreshCw } from "lucide-react";

export default function MarketHighlights({ baseCurrency = "USD", rateCount = 45 }) {
  return (
    <div className="market-stats-strip">
      <div className="stat-card">
        <div className="stat-icon-box">
          <Zap size={16} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Sub-Second Execution</span>
          <span className="stat-value">Arbitrary Precision (20dp)</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box">
          <RefreshCw size={16} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Corridors Tracked</span>
          <span className="stat-value">{rateCount}+ Global Currencies</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box">
          <Shield size={16} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Interbank Transparent</span>
          <span className="stat-value">Hidden FX Margins Exposed</span>
        </div>
      </div>
    </div>
  );
}
