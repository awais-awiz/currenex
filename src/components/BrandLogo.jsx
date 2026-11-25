import React from "react";

/**
 * Custom Brand Icon: "Currenex / Dual Interlocking Currency Rings"
 * Represents dynamic foreign exchange equilibrium.
 * Precision SVG vector with clean geometric paths and indigo-violet gradient.
 */
export default function BrandLogo({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="primaryRing" x1="6" y1="6" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="accentArrow" x1="18" y1="18" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f43f5e" />
          <stop offset="1" stopColor="#fb923c" />
        </linearGradient>
      </defs>

      {/* Main Base Ring */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />

      {/* Primary Counter-Clockwise Currency Curve */}
      <path
        d="M24 10C16.268 10 10 16.268 10 24C10 27.534 11.31 30.76 13.484 33.218"
        stroke="url(#primaryRing)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Primary Directional Arrowhead */}
      <path
        d="M20 9L25 10L23 15"
        stroke="url(#primaryRing)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Secondary Complementary Currency Curve */}
      <path
        d="M24 38C31.732 38 38 31.732 38 24C38 20.466 36.69 17.24 34.516 14.782"
        stroke="url(#accentArrow)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Secondary Directional Arrowhead */}
      <path
        d="M28 39L23 38L25 33"
        stroke="url(#accentArrow)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Exchange Node */}
      <circle cx="24" cy="24" r="3" fill="#4f46e5" />
    </svg>
  );
}
