export interface ETFData {
  ticker: string;
  name: string;
  price: number;
  volume: number;
  volume_spike_ratio: number | null;
  price_change_pct: number | null;
}

export interface QuickScanResponse {
  timestamp: string;
  mode: string;
  data: ETFData[];
}
