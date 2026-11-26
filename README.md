# Currenex — Real-Time Currency Exchange & Transfer Comparison

A modern, frontend-only foreign exchange platform built with **React 19** and **Decimal.js**. Currenex combines live interbank benchmark rates, 20-digit arbitrary-precision banking arithmetic, and a cross-border remittance comparison engine that exposes upfront fees and hidden FX markups.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Currenex-4f46e5?style=for-the-badge)](https://currencyconverter-app0398.netlify.app/)

---

## Key Features

- **Precision Financial Math (`Decimal.js`):** 20 significant digits with `ROUND_HALF_UP` banker's rounding — zero IEEE-754 floating-point drift.
- **Resilient Live FX Feeds:** Primary [ExchangeRate-API](https://api.exchangerate-api.com) with automatic failover to [Open.er-api](https://open.er-api.com), `AbortController` timeouts, and 1-hour localStorage caching with offline stale-cache fallback.
- **Cross-Border Provider Comparison:** Compares estimated recipient payouts, upfront fees, and hidden FX spreads across Wise, Remitly Express, Western Union, and traditional banks.
- **Interactive Benchmark Ticker & Conversion Matrix:** Quick-switch major corridors (`EUR/USD`, `GBP/USD`, `USD/JPY`, `USD/PKR`, etc.) and two-way denomination reference tables.
- **Multi-Currency Watchlist & Audit History:** Track custom currency portfolios and maintain a local conversion log.
- **Resilient Vector Flags:** 3-tier fallback (`jsDelivr` SVG flags → `FlagCDN` PNG → crisp currency code badges).

---

## Tech Stack

- **React 19** (JavaScript ES6+)
- **Decimal.js** (Arbitrary-precision decimal arithmetic)
- **Lucide React** (Iconography)
- **Jest & React Testing Library** (Unit tests for financial math, provider calculations, and UI)

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/awais-awiz/currenex.git
cd currenex

# Install dependencies
npm install

# Start the development server
npm start

# Run unit tests
npm test

# Create a production build
npm run build
```

---

## Contact

Built by [Awais Arif](mailto:awaisariff004@gmail.com)
