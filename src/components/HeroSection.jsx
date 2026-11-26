import React from "react";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section" aria-label="Overview">
      {/* Background Vector Motif */}
      <div className="hero-bg-graphic" aria-hidden="true">
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="280" cy="80" r="120" stroke="url(#heroGrad1)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <circle cx="340" cy="140" r="80" stroke="url(#heroGrad2)" strokeWidth="2" opacity="0.3" />
          <path d="M120 180 C 180 120, 240 160, 320 60" stroke="url(#heroGrad1)" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
          <defs>
            <linearGradient id="heroGrad1" x1="120" y1="60" x2="340" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4f46e5" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="heroGrad2" x1="260" y1="60" x2="340" y2="140" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f43f5e" />
              <stop offset="1" stopColor="#fb923c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="hero-content">
        <div className="hero-pill-badge">
          <Sparkles size={13} className="hero-badge-icon" />
          <span>Institutional Grade FX Engine</span>
        </div>

        <h1 className="hero-title">
          Real-Time Global <span className="hero-title-accent">Currency Exchange</span>
        </h1>

        <p className="hero-subtitle">
          Live interbank benchmark rates, 20-digit precision mathematics, and transparent cross-border provider fee analysis.
        </p>

        <div className="hero-highlights">
          <div className="hero-stat-pill">
            <span className="live-dot"></span>
            <span>Live Interbank Feeds</span>
          </div>
          <div className="hero-stat-pill">
            <Zap size={12} />
            <span>Decimal.js Precision</span>
          </div>
          <div className="hero-stat-pill">
            <ShieldCheck size={12} />
            <span>0% Hidden FX Markups</span>
          </div>
        </div>
      </div>
    </section>
  );
}
