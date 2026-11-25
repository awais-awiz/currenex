import React, { useState, useRef, useEffect, useId } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { currencyData } from "../data/currencyData";
import { countryList } from "../countryList";
import CurrencyFlag from "./CurrencyFlag";

// Complete list of supported currencies sorted alphabetically
const CURRENCIES = Object.keys(countryList).map((code) => {
  const meta = currencyData[code];
  return {
    code,
    name: meta?.name || `${code} Currency`,
    country: meta?.country || code,
    flag: countryList[code] || "US",
  };
}).sort((a, b) => a.code.localeCompare(b.code));

export default function CurrencySelect({
  value,
  onChange,
  label,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const generatedId = useId();
  const selectId = id || generatedId;

  const current = CURRENCIES.find((c) => c.code === value) || {
    code: value,
    name: value,
    country: value,
    flag: countryList[value] || "US",
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filtered = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="currency-select-field" ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className="field-label">
          {label}
        </label>
      )}

      <button
        id={selectId}
        type="button"
        className="select-trigger"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch("");
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="trigger-content">
          <CurrencyFlag
            countryCode={current.flag}
            currencyCode={current.code}
            className="flag-icon"
          />
          <div className="trigger-meta">
            <span className="currency-code">{current.code}</span>
            <span className="currency-name">{current.name}</span>
          </div>
        </div>
        <ChevronDown size={16} className={`arrow-icon ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="dropdown-panel" role="listbox">
          <div className="search-bar">
            <Search size={14} className="search-lens" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search currency or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="options-list">
            {filtered.length === 0 ? (
              <div className="no-match">No currencies matching "{search}"</div>
            ) : (
              filtered.map((item) => {
                const isSelected = item.code === value;
                return (
                  <div
                    key={item.code}
                    className={`option-row ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      onChange(item.code);
                      setIsOpen(false);
                    }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <CurrencyFlag
                      countryCode={item.flag}
                      currencyCode={item.code}
                      className="flag-icon"
                    />
                    <div className="option-text">
                      <span className="option-code">{item.code}</span>
                      <span className="option-name">
                        {item.name} • {item.country}
                      </span>
                    </div>
                    {isSelected && <Check size={14} className="selected-check" />}
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
