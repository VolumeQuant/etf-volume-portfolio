export interface SectorData {
  sector: string;
  ticker: string;
  avg_spike: number;
  current_spike: number;
  status: 'hot' | 'warm' | 'normal' | 'cold';
}

export interface SectorSummary {
  total_sectors: number;
  hot_sectors: number;
  warm_sectors: number;
  sectors: SectorData[];
}
