export interface SectorData {
  sector: string;
  ticker: string;
  // Z-Score (핵심 지표)
  short_zscore: number;       // 5일 기준 Z-Score (표준편차 단위)
  medium_zscore?: number;     // 20일 기준 Z-Score
  long_zscore?: number;       // 1년 기준 Z-Score
  // 스파이크 비율
  short_spike: number;        // 5일 평균 대비
  medium_spike?: number;      // 20일 평균 대비
  long_spike?: number;        // 1년 평균 대비
  // 백분위
  percentile?: number;        // 1년 기준 백분위 (0-100)
  // 시그널
  signal: 'ACCUMULATION' | 'BREAKOUT' | 'OVERHEATED' | 'DISTRIBUTION' | 'NEUTRAL';
  status: 'extreme' | 'hot' | 'warm' | 'active' | 'normal' | 'cool' | 'cold';
  // 호환성
  avg_spike: number;
  weighted_spike?: number;
  current_spike: number;
}

export interface SectorSummary {
  total_sectors: number;
  hot_sectors: number;
  warm_sectors: number;
  cold_sectors?: number;
  signals?: Record<string, number>;
  sectors: SectorData[];
}
