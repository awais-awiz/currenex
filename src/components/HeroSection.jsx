import React from "react";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section" aria-label="Overview">
      {/* Ambient Brand Glows (Indigo, Violet, Coral, Orange) */}
      <div className="hero-glow hero-glow-left" aria-hidden="true"></div>
      <div className="hero-glow hero-glow-right" aria-hidden="true"></div>

      <div className="hero-inner">
        {/* Left: Copy & Trust Signals */}
        <div className="hero-content">
          <div className="hero-pill-badge">
            <Sparkles size={13} className="hero-badge-icon" />
            <span>Currenex FX Benchmark</span>
          </div>

          <h1 className="hero-title">
            Real-Time Global{" "}
            <span className="hero-title-accent">Currency Exchange</span>
          </h1>

          <p className="hero-subtitle">
            Live interbank rates, 20-digit precision math, and transparent cross-border provider fee comparisons.
          </p>

          <div className="hero-highlights">
            <div className="hero-stat-pill">
              <span className="live-dot"></span>
              <span>Live Interbank Feeds</span>
            </div>
            <div className="hero-stat-pill">
              <Zap size={12} className="hero-pill-icon" />
              <span>Decimal.js Precision</span>
            </div>
            <div className="hero-stat-pill">
              <ShieldCheck size={12} className="hero-pill-icon" />
              <span>0% Hidden Markups</span>
            </div>
          </div>
        </div>

        {/* Right: Custom Brand-Matched Vector Visual */}
        <div className="hero-visual" aria-hidden="true">
          <svg
            viewBox="0 0 280 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-illustration"
          >
            <defs>
              <linearGradient id="heroRingPrimary" x1="20" y1="20" x2="200" y2="190" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#c084fc" />
              </linearGradient>
              <linearGradient id="heroRingAccent" x1="80" y1="30" x2="250" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f43f5e" />
                <stop offset="1" stopColor="#fb923c" />
              </linearGradient>
              <linearGradient id="heroCardFill" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#ffffff" stopOpacity="0.22" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.06" />
              </linearGradient>
            </defs>

            {/* Outer Dashed Orbit */}
            <circle
              cx="145"
              cy="105"
              r="86"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
            />

            {/* Interlocking Brand Logo Curves (Scaled Up) */}
            <path
              d="M145 36C106.892 36 76 66.892 76 105C76 122.4 82.45 138.3 93.15 150.4"
              stroke="url(#heroRingPrimary)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M126 30L148 36L139 57"
              stroke="url(#heroRingPrimary)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M145 174C183.108 174 214 143.108 214 105C214 87.6 207.55 71.7 196.85 59.6"
              stroke="url(#heroRingAccent)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M164 180L142 174L151 153"
              stroke="url(#heroRingAccent)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center Frosted Glass Hub */}
            <circle cx="145" cy="105" r="34" fill="url(#heroCardFill)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
            <text
              x="145"
              y="112"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="20"
              fontWeight="800"
              fontFamily="JetBrains Mono, monospace"
            >
              FX
            </text>

            {/* Floating Currency Nodes */}
            <g transform="translate(36, 48)">
              <rect width="46" height="32" rx="10" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <text x="23" y="21" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800">$</text>
            </g>

            <g transform="translate(206, 26)">
              <rect width="46" height="32" rx="10" fill="url(#heroRingAccent)" />
              <text x="23" y="21" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800">€</text>
            </g>

            <g transform="translate(212, 140)">
              <rect width="46" height="32" rx="10" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <text x="23" y="21" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800">£</text>
            </g>

            <g transform="translate(28, 138)">
              <rect width="46" height="32" rx="10" fill="rgba(79,70,229,0.55)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <text x="23" y="21" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800">¥</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
