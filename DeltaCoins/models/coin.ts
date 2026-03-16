export interface Coin {
  id: string;
  code: string;
  dirtyCode: string;
  name: string;
  slug: string;
  priceInUSD: number;
  availableSupply: number;
  totalSupply: number;
  marketCapRank: number;
  volume24hInUSD: number;
  marketCapInUSD: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  showDisclaimer: boolean;
}