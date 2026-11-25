import React, { useState } from "react";
import { getFlagUrl, getFallbackFlagUrl } from "../data/currencyData";

export default function CurrencyFlag({
  countryCode,
  currencyCode = "",
  className = "currency-flag-img",
  alt = "",
}) {
  const [stage, setStage] = useState("primary"); // 'primary' | 'fallback' | 'badge'

  const code = countryCode ? countryCode.toLowerCase() : "";

  if (stage === "badge" || !code) {
    return (
      <span className={`currency-flag-badge ${className}-badge`}>
        {currencyCode ? currencyCode.slice(0, 2).toUpperCase() : "??"}
      </span>
    );
  }

  const src = stage === "primary" ? getFlagUrl(code) : getFallbackFlagUrl(code);

  return (
    <img
      src={src}
      alt={alt || currencyCode}
      className={className}
      loading="lazy"
      onError={() => {
        if (stage === "primary") {
          setStage("fallback");
        } else {
          setStage("badge");
        }
      }}
    />
  );
}
