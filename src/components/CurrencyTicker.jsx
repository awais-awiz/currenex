import React from "react";
import CurrencyFlag from "./CurrencyFlag";
import { countryList } from "../countryList";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const TICKER_PAIRS = [
  { from: "EUR", to: "USD", baseRate: 1.096, change: "+0.14%" },
  { from: "GBP", to: "USD", baseRate: 1.302, change: "-0.08%" },
  { from: "USD", to: "JPY", baseRate: 154.25, change: "+0.22%" },
  { from: "USD", to: "CAD", baseRate: 1.398, change: "-0.05%" },
  { from: "USD", to: "CHF", baseRate: 0.884, change: "+0.02%" },
  { from: "USD", to: "PKR", baseRate: 278.4, change: "0.00%" },
  { from: "AUD", to: "USD", baseRate: 0.652, change: "+0.18%" },
];

export default function CurrencyTicker({ onSelectPair }) {
  return (
    <div className="ticker-wrapper" aria-label="Major currency pairs ticker">
      <div className="ticker-label">
        <span className="ticker-pulse"></span>
        <span>BENCHMARK PAIRS</span>
      </div>
      <div className="ticker-scroll">
        <div className="ticker-track">
          {TICKER_PAIRS.map((item) => {
            const isPos = item.change.startsWith("+");
            const isNeg = item.change.startsWith("-");
            return (
              <button
                key={`${item.from}-${item.to}`}
                type="button"
                className="ticker-item"
                onClick={() => onSelectPair && onSelectPair(item.from, item.to)}
                title={`Quick convert ${item.from} to ${item.to}`}
              >
                <div className="ticker-flags">
                  <CurrencyFlag
                    countryCode={countryList[item.from]}
                    currencyCode={item.from}
                    className="ticker-flag"
                  />
                  <CurrencyFlag
                    countryCode={countryList[item.to]}
                    currencyCode={item.to}
                    className="ticker-flag"
                  />
                </div>
                <span className="ticker-pair-name">{item.from}/{item.to}</span>
                <span className="ticker-rate">{item.baseRate}</span>
                <span className={`ticker-change ${isPos ? "positive" : isNeg ? "negative" : "neutral"}`}>
                  {isPos ? <TrendingUp size={11} /> : isNeg ? <TrendingDown size={11} /> : <Minus size={11} />}
                  {item.change}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
