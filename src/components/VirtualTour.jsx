import React, { useState, useEffect } from "react";
import {
  Compass,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";

const TOUR_DESTINATIONS = [
  {
    from: "USD",
    to: "EUR",
    city: "Frankfurt & Wall St",
    headline: "The Transatlantic Dollar-Euro Axis",
    story: "Represents over 28% of all global daily FX turnover. Anchored by the US Federal Reserve and European Central Bank policies.",
    marketStatus: "Bullish Volume",
    liquidity: "Ultra High ($1.8T/day)",
    fact: "The most liquid currency pair in human history.",
  },
  {
    from: "USD",
    to: "JPY",
    city: "Tokyo Financial District",
    headline: "The Asia-Pacific Safe Haven Corridor",
    story: "Tokyo opens global liquidity before London. The Yen acts as the classic world carry trade currency with near-zero benchmark rates.",
    marketStatus: "Volatile Carry Flow",
    liquidity: "High ($950B/day)",
    fact: "Tokyo's market handles 4x the daily transaction volume of the Tokyo Stock Exchange.",
  },
  {
    from: "GBP",
    to: "USD",
    city: "City of London (The Cable)",
    headline: "The Historic 'Cable' Deep Sea Channel",
    story: "Nicknamed 'Cable' after the 1858 transatlantic telegraph cable laying beneath the ocean between London and New York.",
    marketStatus: "Steady Momentum",
    liquidity: "High ($650B/day)",
    fact: "London still clears more foreign exchange volume than New York and Tokyo combined.",
  },
  {
    from: "USD",
    to: "AED",
    city: "DIFC Dubai Gate",
    headline: "Middle East Sovereign Capital Hub",
    story: "Dubai International Financial Centre connects Eastern capital flows with Western private equity, pegged rigidly at 3.6725.",
    marketStatus: "Sovereign Backed",
    liquidity: "Fast Growing ($240B/day)",
    fact: "Dubai is the fastest-growing multi-currency wealth sanctuary in the world.",
  },
  {
    from: "USD",
    to: "PKR",
    city: "Karachi & Islamabad",
    headline: "Emerging Market Remittance Corridor",
    story: "One of the world's most active bilateral retail flows, powering billions in real-time overseas worker remittances and export settlement.",
    marketStatus: "Remittance Inflow",
    liquidity: "Active Bilateral",
    fact: "Overseas remittances make up over 7% of total national economic output.",
  },
];

export default function VirtualTour({ onSelectTourPair, activePair }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const dest = TOUR_DESTINATIONS[currentStep];

  // Auto tour slideshow timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % TOUR_DESTINATIONS.length;
          return next;
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Sync destination pair changes to parent outside of render cycle
  useEffect(() => {
    const target = TOUR_DESTINATIONS[currentStep];
    if (target && onSelectTourPair) {
      onSelectTourPair(target.from, target.to);
    }
  }, [currentStep, onSelectTourPair]);

  const handleStepJump = (index) => {
    setCurrentStep(index);
  };

  return (
    <div className="tour-experience-card">
      {/* Tour Top Control Bar */}
      <div className="tour-bar-top">
        <div className="tour-title-group">
          <div className="tour-compass-badge">
            <Compass size={20} className="compass-icon" />
          </div>
          <div>
            <h3 className="card-title">Virtual Global FX Tour</h3>
            <p className="card-subtitle">
              Interactive 3D expedition through the world's highest volume financial capitals
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`tour-playback-btn ${isPlaying ? "playing" : ""}`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          <span>{isPlaying ? "Pause Tour" : "Auto-Pilot Tour"}</span>
        </button>
      </div>

      {/* Step Stepper Navigation */}
      <div className="tour-stepper-dots">
        {TOUR_DESTINATIONS.map((item, idx) => (
          <button
            key={item.city}
            type="button"
            className={`tour-step-pill ${currentStep === idx ? "active" : ""}`}
            onClick={() => handleStepJump(idx)}
          >
            <span className="step-num">{idx + 1}</span>
            <span className="step-label">{item.from} → {item.to}</span>
          </button>
        ))}
      </div>

      {/* Spotlight Hub Card */}
      <div className="tour-spotlight-box">
        <div className="spotlight-header">
          <div className="spotlight-pair-tag">
            <span className="spotlight-city">{dest.city}</span>
            <span className="spotlight-arrow">•</span>
            <span className="spotlight-code">{dest.from} / {dest.to} Corridor</span>
          </div>
          <span className="spotlight-status-pill">{dest.marketStatus}</span>
        </div>

        <h2 className="spotlight-headline">{dest.headline}</h2>
        <p className="spotlight-story">{dest.story}</p>

        <div className="spotlight-metrics-grid">
          <div className="spotlight-stat">
            <span className="spot-stat-label">Liquidity Depth</span>
            <span className="spot-stat-value">{dest.liquidity}</span>
          </div>
          <div className="spotlight-stat">
            <span className="spot-stat-label">Capital Hub</span>
            <span className="spot-stat-value">{dest.city}</span>
          </div>
          <div className="spotlight-stat fact-stat">
            <span className="spot-stat-label">Market Fact</span>
            <span className="spot-stat-value fact-text">{dest.fact}</span>
          </div>
        </div>

        <div className="tour-action-row">
          <button
            type="button"
            className="tour-apply-btn"
            onClick={() => onSelectTourPair(dest.from, dest.to)}
          >
            <span>Lock Converter to {dest.from} / {dest.to}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
