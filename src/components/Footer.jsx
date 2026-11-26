import React from "react";
import BrandLogo from "./BrandLogo";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-compact-row">
          <div className="footer-left">
            <div className="footer-brand">
              <BrandLogo size={22} />
              <span className="footer-brand-name">
                <span className="brand-part-primary">Curren</span>
                <span className="brand-part-accent">ex</span>
              </span>
            </div>
            <span className="footer-divider">•</span>
            <span className="footer-status-pill">
              <span className="status-indicator"></span>
              <span>Interbank Feeds Live</span>
            </span>
            <span className="footer-divider">•</span>
            <span className="footer-note">Decimal.js Arbitrary-Precision Engine</span>
          </div>

          <div className="footer-right">
            <span className="footer-security-badge">
              <ShieldCheck size={13} />
              <span>Zero-Tracking Privacy</span>
            </span>
            <span className="footer-divider">•</span>
            <span className="footer-copyright">
              © {new Date().getFullYear()} Currenex FX
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
