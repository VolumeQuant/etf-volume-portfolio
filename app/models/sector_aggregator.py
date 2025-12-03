"""
섹터별 거래량 집계 모듈
"""
import pandas as pd
from typing import Dict, List
import logging

from config.etf_universe import SECTOR_ETFS

logger = logging.getLogger(__name__)

class SectorAggregator:
    """섹터별 거래량 집계기"""
    
    def __init__(self):
        self.sectors = SECTOR_ETFS
    
    def aggregate_sectors(self, df: pd.DataFrame) -> List[Dict]:
        """섹터별 평균 거래량 스파이크 계산"""
        results = []
        
        for ticker, sector_name in self.sectors.items():
            ticker_df = df[df['Ticker'] == ticker].copy()
            
            if ticker_df.empty:
                logger.warning(f"{ticker} 데이터 없음")
                continue
            
            # 최근 5일 평균 스파이크
            recent_data = ticker_df.tail(5)
            avg_spike = recent_data['Volume_Spike_Ratio'].mean()
            current_spike = ticker_df.iloc[-1]['Volume_Spike_Ratio']
            
            # 상태 분류
            if pd.isna(avg_spike):
                status = 'normal'
            elif avg_spike >= 1.5:
                status = 'hot'
            elif avg_spike >= 1.2:
                status = 'warm'
            elif avg_spike >= 0.8:
                status = 'normal'
            else:
                status = 'cold'
            
            results.append({
                'sector': sector_name,
                'ticker': ticker,
                'avg_spike': round(float(avg_spike), 2) if pd.notna(avg_spike) else 1.0,
                'current_spike': round(float(current_spike), 2) if pd.notna(current_spike) else 1.0,
                'status': status
            })
        
        results.sort(key=lambda x: x['avg_spike'], reverse=True)
        return results
    
    def get_sector_summary(self, df: pd.DataFrame) -> Dict:
        """섹터 전체 요약"""
        sectors_data = self.aggregate_sectors(df)
        
        return {
            'total_sectors': len(sectors_data),
            'hot_sectors': sum(1 for s in sectors_data if s['status'] == 'hot'),
            'warm_sectors': sum(1 for s in sectors_data if s['status'] == 'warm'),
            'sectors': sectors_data
        }
