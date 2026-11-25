import React from "react";
import BrandLogo from "./BrandLogo";
import { ShieldCheck, Activity, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <BrandLogo size={28} />
              <span className="footer-brand-name">Currenex</span>
            </div>
            <p className="footer-tagline">
              Real-time foreign exchange benchmark engine with arbitrary-precision arithmetic and transparent cross-border fee analytics.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <span className="footer-heading">Architecture</span>
              <ul className="footer-nav">
                <li><span className="footer-item">Decimal.js (20-digit precision)</span></li>
                <li><span className="footer-item">Interbank & ECB Feeds</span></li>
                <li><span className="footer-item">Client-Side FX Routing</span></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-heading">Data & Sources</span>
              <ul className="footer-nav">
                <li><span className="footer-item">ExchangeRate-API (Primary)</span></li>
                <li><span className="footer-item">Open.er-api (Failover Mirror)</span></li>
                <li><span className="footer-item">ISO-4217 Currency Standards</span></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-heading">Status</span>
              <ul className="footer-nav">
                <li className="footer-status-item">
                  <span className="status-indicator"></span>
                  <span>Feeds Operational</span>
                </li>
                <li>
                  <span className="footer-meta-pill">
                    <Activity size={12} />
                    <span>Real-Time Ingestion</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Currenex. All rates indicative for retail exchange and transfer estimation.
          </div>
          <div className="footer-badges">
            <span className="footer-security-badge">
              <ShieldCheck size={14} />
              <span>Zero-Tracking Privacy</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
