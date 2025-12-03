export interface TickerHistory {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  volume_ma: number | null;
  volume_spike_ratio: number | null;
}

export interface VolumeEvent {
  date: string;
  level: 'extreme' | 'high' | 'medium' | 'alert';
  ratio: number;
  volume: number;
  price: number;
  price_change: number;
}

export interface TickerLatest {
  date: string;
  price: number;
  volume: number;
  volume_spike_ratio: number | null;
  price_change: number;
  price_change_pct: number;
}

export interface TickerDetail {
  ticker: string;
  name: string;
  latest: TickerLatest;
  history: TickerHistory[];
  events: VolumeEvent[];
}

