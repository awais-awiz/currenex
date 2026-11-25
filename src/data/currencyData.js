// Currency metadata with ISO-3166-1 alpha-2 country codes
export const currencyData = {
  USD: { code: "USD", name: "US Dollar", country: "United States", flag: "us", symbol: "$" },
  EUR: { code: "EUR", name: "Euro", country: "European Union", flag: "eu", symbol: "€" },
  GBP: { code: "GBP", name: "British Pound", country: "United Kingdom", flag: "gb", symbol: "£" },
  JPY: { code: "JPY", name: "Japanese Yen", country: "Japan", flag: "jp", symbol: "¥" },
  PKR: { code: "PKR", name: "Pakistani Rupee", country: "Pakistan", flag: "pk", symbol: "₨" },
  INR: { code: "INR", name: "Indian Rupee", country: "India", flag: "in", symbol: "₹" },
  AED: { code: "AED", name: "UAE Dirham", country: "United Arab Emirates", flag: "ae", symbol: "د.إ" },
  SAR: { code: "SAR", name: "Saudi Riyal", country: "Saudi Arabia", flag: "sa", symbol: "﷼" },
  CAD: { code: "CAD", name: "Canadian Dollar", country: "Canada", flag: "ca", symbol: "CA$" },
  AUD: { code: "AUD", name: "Australian Dollar", country: "Australia", flag: "au", symbol: "A$" },
  CHF: { code: "CHF", name: "Swiss Franc", country: "Switzerland", flag: "ch", symbol: "CHF" },
  CNY: { code: "CNY", name: "Chinese Yuan", country: "China", flag: "cn", symbol: "¥" },
  SGD: { code: "SGD", name: "Singapore Dollar", country: "Singapore", flag: "sg", symbol: "S$" },
  NZD: { code: "NZD", name: "New Zealand Dollar", country: "New Zealand", flag: "nz", symbol: "NZ$" },
  TRY: { code: "TRY", name: "Turkish Lira", country: "Turkey", flag: "tr", symbol: "₺" },
  BRL: { code: "BRL", name: "Brazilian Real", country: "Brazil", flag: "br", symbol: "R$" },
  ZAR: { code: "ZAR", name: "South African Rand", country: "South Africa", flag: "za", symbol: "R" },
  SEK: { code: "SEK", name: "Swedish Krona", country: "Sweden", flag: "se", symbol: "kr" },
  NOK: { code: "NOK", name: "Norwegian Krone", country: "Norway", flag: "no", symbol: "kr" },
  KRW: { code: "KRW", name: "South Korean Won", country: "South Korea", flag: "kr", symbol: "₩" },
  MXN: { code: "MXN", name: "Mexican Peso", country: "Mexico", flag: "mx", symbol: "Mex$" },
  RUB: { code: "RUB", name: "Russian Ruble", country: "Russia", flag: "ru", symbol: "₽" },
  HKD: { code: "HKD", name: "Hong Kong Dollar", country: "Hong Kong", flag: "hk", symbol: "HK$" },
  THB: { code: "THB", name: "Thai Baht", country: "Thailand", flag: "th", symbol: "฿" },
  MYR: { code: "MYR", name: "Malaysian Ringgit", country: "Malaysia", flag: "my", symbol: "RM" },
  IDR: { code: "IDR", name: "Indonesian Rupiah", country: "Indonesia", flag: "id", symbol: "Rp" },
  QAR: { code: "QAR", name: "Qatari Riyal", country: "Qatar", flag: "qa", symbol: "QR" },
  KWD: { code: "KWD", name: "Kuwaiti Dinar", country: "Kuwait", flag: "kw", symbol: "KD" },
  OMR: { code: "OMR", name: "Omani Rial", country: "Oman", flag: "om", symbol: "RO" },
  BHD: { code: "BHD", name: "Bahraini Dinar", country: "Bahrain", flag: "bh", symbol: "BD" },
  PLN: { code: "PLN", name: "Polish Zloty", country: "Poland", flag: "pl", symbol: "zł" },
  DKK: { code: "DKK", name: "Danish Krone", country: "Denmark", flag: "dk", symbol: "kr" },
  HUF: { code: "HUF", name: "Hungarian Forint", country: "Hungary", flag: "hu", symbol: "Ft" },
  CZK: { code: "CZK", name: "Czech Koruna", country: "Czech Republic", flag: "cz", symbol: "Kč" },
  ILS: { code: "ILS", name: "Israeli Shekel", country: "Israel", flag: "il", symbol: "₪" },
  CLP: { code: "CLP", name: "Chilean Peso", country: "Chile", flag: "cl", symbol: "CLP$" },
  PHP: { code: "PHP", name: "Philippine Peso", country: "Philippines", flag: "ph", symbol: "₱" },
  EGP: { code: "EGP", name: "Egyptian Pound", country: "Egypt", flag: "eg", symbol: "E£" },
  VND: { code: "VND", name: "Vietnamese Dong", country: "Vietnam", flag: "vn", symbol: "₫" },
  BDT: { code: "BDT", name: "Bangladeshi Taka", country: "Bangladesh", flag: "bd", symbol: "৳" },
  NGN: { code: "NGN", name: "Nigerian Naira", country: "Nigeria", flag: "ng", symbol: "₦" },
  KES: { code: "KES", name: "Kenyan Shilling", country: "Kenya", flag: "ke", symbol: "KSh" },
  GHS: { code: "GHS", name: "Ghanaian Cedi", country: "Ghana", flag: "gh", symbol: "GH₵" },
  COP: { code: "COP", name: "Colombian Peso", country: "Colombia", flag: "co", symbol: "COL$" },
  ARS: { code: "ARS", name: "Argentine Peso", country: "Argentina", flag: "ar", symbol: "$" }
};

/**
 * Multi-CDN Flag resolver:
 * Primary: jsdelivr flag-icons (SVG, fast, reliable, CORS enabled, no QUIC errors)
 * Fallback: flagcdn.com (PNG)
 */
export const getFlagUrl = (countryCode) => {
  if (!countryCode) return "";
  const code = countryCode.toLowerCase();
  return `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${code}.svg`;
};

export const getFallbackFlagUrl = (countryCode) => {
  if (!countryCode) return "";
  const code = countryCode.toLowerCase();
  return `https://flagcdn.com/w80/${code}.png`;
};
