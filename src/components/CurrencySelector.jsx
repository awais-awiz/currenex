import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { currencyData, getFlagUrl } from "../data/currencyData";
import { countryList } from "../countryList";

// Merge all country codes so no code from countryList is left out
const allCurrencies = Object.keys(countryList).map((code) => {
  const meta = currencyData[code] || {
    code,
    name: `${code} Currency`,
    country: code,
    flag: countryList[code],
    symbol: code,
  };
  return meta;
});

export default function CurrencySelector({
  value,
  onChange,
  label = "Select Currency",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const selectedCurrency = currencyData[value] || {
    code: value,
    name: `${value} Currency`,
    country: value,
    flag: countryList[value] || "US",
    symbol: value,
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filtered = allCurrencies.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="currency-selector-root" ref={dropdownRef}>
      <label className="selector-label">{label}</label>
      <button
        type="button"
        className="currency-trigger-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch("");
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="trigger-left">
          <img
            src={getFlagUrl(selectedCurrency.flag)}
            alt={selectedCurrency.code}
            className="currency-flag-img"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="trigger-text">
            <span className="trigger-code">{selectedCurrency.code}</span>
            <span className="trigger-name">{selectedCurrency.name}</span>
          </div>
        </div>
        <ChevronDown size={18} className={`chevron-icon ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="currency-popover" role="listbox">
          <div className="popover-search-box">
            <Search size={16} className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by code, country, or currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="popover-search-input"
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearch("")}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="currency-items-list">
            {filtered.length === 0 ? (
              <div className="no-results">No currencies found matching "{search}"</div>
            ) : (
              filtered.map((curr) => {
                const isSelected = curr.code === value;
                return (
                  <div
                    key={curr.code}
                    className={`currency-list-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      onChange(curr.code);
                      setIsOpen(false);
                    }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <img
                      src={getFlagUrl(curr.flag)}
                      alt={curr.code}
                      className="currency-flag-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="item-info">
                      <div className="item-title-row">
                        <span className="item-code">{curr.code}</span>
                        <span className="item-symbol">{curr.symbol}</span>
                      </div>
                      <span className="item-subtitle">
                        {curr.name} • {curr.country}
                      </span>
                    </div>
                    {isSelected && <Check size={16} className="check-icon" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
