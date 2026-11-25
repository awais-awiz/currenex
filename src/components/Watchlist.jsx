import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { currencyData } from "../data/currencyData";
import { countryList } from "../countryList";
import { fetchRates } from "../services/ratesService";
import CurrencyFlag from "./CurrencyFlag";

const DEFAULT_WATCHLIST = ["EUR", "GBP", "PKR", "AED", "CAD", "JPY"];

export default function Watchlist({ baseCurrency = "USD", baseAmount = 1000 }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("cc_watchlist");
      return saved ? JSON.parse(saved) : DEFAULT_WATCHLIST;
    } catch {
      return DEFAULT_WATCHLIST;
    }
  });

  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("cc_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    let isMounted = true;
    async function loadRates() {
      setLoading(true);
      try {
        const data = await fetchRates(baseCurrency);
        if (isMounted) {
          setRates(data.rates || {});
        }
      } catch (e) {
        console.error("Watchlist rate fetch error", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadRates();
    return () => {
      isMounted = false;
    };
  }, [baseCurrency]);

  const handleRemove = (code) => {
    setWatchlist(watchlist.filter((c) => c !== code));
  };

  const handleAdd = (code) => {
    if (!watchlist.includes(code)) {
      setWatchlist([...watchlist, code]);
    }
    setShowAddMenu(false);
  };

  const availableCurrencies = Object.keys(currencyData).filter(
    (c) => !watchlist.includes(c) && c !== baseCurrency
  );

  return (
    <div className="watchlist-card">
      <div className="watchlist-header">
        <span className="card-heading">Watchlist ({baseAmount} {baseCurrency})</span>

        <div className="watchlist-actions">
          <button
            type="button"
            className="add-currency-btn"
            onClick={() => setShowAddMenu(!showAddMenu)}
          >
            <Plus size={14} />
            <span>Add</span>
          </button>

          {showAddMenu && (
            <div className="add-currency-dropdown">
              <div className="add-currency-list">
                {availableCurrencies.slice(0, 15).map((code) => {
                  const meta = currencyData[code];
                  return (
                    <button
                      key={code}
                      type="button"
                      className="add-currency-option"
                      onClick={() => handleAdd(code)}
                    >
                      <CurrencyFlag
                        countryCode={meta?.flag}
                        currencyCode={code}
                        className="option-flag"
                      />
                      <span><strong>{code}</strong> {meta?.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="watchlist-grid">
        {watchlist.map((code) => {
          const flagCode = currencyData[code]?.flag || countryList[code] || "US";
          const meta = currencyData[code] || {
            code,
            name: `${code} Currency`,
            flag: flagCode,
            symbol: code,
          };
          const rate = rates[code] || 0;
          const converted = (baseAmount * rate).toFixed(rate < 1 ? 4 : 2);

          return (
            <div key={code} className="watchlist-item-card">
              <div className="watchlist-item-top">
                <div className="watchlist-item-flag-row">
                  <CurrencyFlag
                    countryCode={flagCode}
                    currencyCode={code}
                    className="watchlist-flag"
                  />
                  <div>
                    <h4 className="watchlist-code">{code}</h4>
                    <span className="watchlist-name">{meta.name}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemove(code)}
                  title="Remove"
                  aria-label="Remove"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="watchlist-item-value">
                <span className="converted-number">
                  {loading ? "..." : `${meta.symbol || ""} ${converted}`}
                </span>
                <span className="rate-unit">
                  1 {baseCurrency} = {rate ? rate.toFixed(4) : "—"} {code}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
