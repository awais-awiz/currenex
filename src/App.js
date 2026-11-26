import React, { useState } from "react";
import BrandLogo from "./components/BrandLogo";
import CurrencyConverter from "./components/CurrencyConverter";
import Watchlist from "./components/Watchlist";
import ConversionHistory from "./components/ConversionHistory";
import CurrencyTicker from "./components/CurrencyTicker";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import "./App.css";

const VIEWS = [
  { id: "converter", label: "Converter" },
  { id: "watchlist", label: "Watchlist" },
  { id: "history", label: "History" },
];

export default function App() {
  const [activeView, setActiveView] = useState("converter");
  const [currentPair, setCurrentPair] = useState({ from: "USD", to: "EUR" });
  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem("app_audit_logs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleLogConversion = (entry) => {
    setLogs((prev) => {
      const next = [entry, ...prev].slice(0, 20);
      localStorage.setItem("app_audit_logs", JSON.stringify(next));
      return next;
    });
  };

  const handleClearLogs = () => {
    setLogs([]);
    localStorage.removeItem("app_audit_logs");
  };

  return (
    <div className="app-layout">
      {/* Minimal Top Header */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="brand-group">
            <BrandLogo size={32} />
            <span className="brand-title">Currenex</span>
          </div>

          <nav className="tab-bar" role="tablist">
            {VIEWS.map((tab) => {
              const isSelected = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  className={`tab-btn ${isSelected ? "active" : ""}`}
                  onClick={() => setActiveView(tab.id)}
                >
                  <span>{tab.label}</span>
                  {tab.id === "history" && logs.length > 0 && (
                    <span className="counter-badge">{logs.length}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-wrapper">
        <HeroSection />

        <CurrencyTicker
          onSelectPair={(from, to) => {
            setCurrentPair({ from, to });
            setActiveView("converter");
          }}
        />

        <main className="content-area">
          {activeView === "converter" && (
            <CurrencyConverter
              defaultFrom={currentPair.from}
              defaultTo={currentPair.to}
              onConversionLogged={handleLogConversion}
            />
          )}

          {activeView === "watchlist" && (
            <Watchlist baseCurrency={currentPair.from} baseAmount={1000} />
          )}

          {activeView === "history" && (
            <ConversionHistory history={logs} onClearHistory={handleClearLogs} />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
