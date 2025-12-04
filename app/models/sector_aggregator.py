"""
섹터별 거래량 집계 모듈
Z-Score 기반 통계적 이상치 탐지 시스템
"""
import pandas as pd
import numpy as np
from typing import Dict, List, Tuple
import logging

from config.etf_universe import SECTOR_ETFS

logger = logging.getLogger(__name__)

class SectorAggregator:
    """
    섹터별 거래량 집계기
    
    Z-Score 기반 시그널 정의:
    - ACCUMULATION: 단기 Z > 1.5σ AND 장기 Z < 1σ (자금 유입 시작)
    - BREAKOUT: 단기 Z > 2σ AND 장기 Z > 1σ (자금 유입 가속)
    - OVERHEATED: 단기 Z > 3σ (과열 경고)
    - DISTRIBUTION: 단기 Z < -1σ AND 장기 Z > 1σ (자금 이탈)
    """
    
    def __init__(
        self,
        short_period: int = 5,
        medium_period: int = 20,
        long_period: int = 252,  # 1년으로 변경
        weights: tuple = (0.5, 0.3, 0.2)
    ):
        """
        Args:
            short_period: 단기 기간 (기본 5일) - Trigger
            medium_period: 중기 기간 (기본 20일) - Confirm
            long_period: 장기 기간 (기본 252일/1년) - Context
            weights: (단기, 중기, 장기) 가중치 (합=1.0)
        """
        self.sectors = SECTOR_ETFS
        self.short_period = short_period
        self.medium_period = medium_period
        self.long_period = long_period
        self.weights = weights
    
    def calculate_zscore(self, series: pd.Series, window: int) -> float:
        """
        Z-Score 계산: (현재값 - 평균) / 표준편차
        
        Args:
            series: 거래량 시리즈
            window: 기준 기간
        
        Returns:
            Z-Score (표준편차 단위)
        """
        if len(series) < window:
            window = len(series)
        
        if window < 5:
            return 0.0
        
        recent = series.tail(window)
        mean = recent.mean()
        std = recent.std()
        
        if std == 0 or pd.isna(std):
            return 0.0
        
        current = series.iloc[-1]
        zscore = (current - mean) / std
        
        return zscore
    
    def calculate_volume_stats(self, ticker_df: pd.DataFrame) -> Dict:
        """
        거래량 통계 계산 (다중 기간)
        
        Returns:
            {
                'short_zscore': float,   # 5일 기준 Z-Score
                'medium_zscore': float,  # 20일 기준 Z-Score
                'long_zscore': float,    # 1년 기준 Z-Score
                'short_spike': float,    # 5일 평균 대비
                'medium_spike': float,   # 20일 평균 대비
                'long_spike': float,     # 1년 평균 대비
                'percentile': float      # 1년 기준 백분위
            }
        """
        volume = ticker_df['Volume']
        
        # Z-Score 계산 (각 기간 기준)
        short_zscore = self.calculate_zscore(volume, self.short_period)
        medium_zscore = self.calculate_zscore(volume, self.medium_period)
        long_zscore = self.calculate_zscore(volume, self.long_period)
        
        # 스파이크 비율 (각 기간 평균 대비)
        current_volume = volume.iloc[-1]
        
        short_mean = volume.tail(self.short_period).mean()
        medium_mean = volume.tail(self.medium_period).mean()
        long_mean = volume.tail(min(self.long_period, len(volume))).mean()
        
        short_spike = current_volume / short_mean if short_mean > 0 else 1.0
        medium_spike = current_volume / medium_mean if medium_mean > 0 else 1.0
        long_spike = current_volume / long_mean if long_mean > 0 else 1.0
        
        # 백분위 계산 (1년 기준)
        long_data = volume.tail(min(self.long_period, len(volume)))
        percentile = (long_data < current_volume).sum() / len(long_data) * 100
        
        return {
            'short_zscore': round(float(short_zscore), 2),
            'medium_zscore': round(float(medium_zscore), 2),
            'long_zscore': round(float(long_zscore), 2),
            'short_spike': round(float(short_spike), 2),
            'medium_spike': round(float(medium_spike), 2),
            'long_spike': round(float(long_spike), 2),
            'percentile': round(float(percentile), 1)
        }
    
    def classify_signal(self, stats: Dict) -> Tuple[str, str]:
        """
        Z-Score 기반 시그널 분류
        
        Returns:
            (signal_type, status)
            signal_type: ACCUMULATION, BREAKOUT, OVERHEATED, DISTRIBUTION, NEUTRAL
            status: extreme, hot, warm, active, normal, cool, cold
        """
        short_z = stats['short_zscore']
        long_z = stats['long_zscore']
        
        # 시그널 분류
        signal = 'NEUTRAL'
        
        if short_z > 3.0:
            signal = 'OVERHEATED'      # 🔥🔥 과열 경고
        elif short_z > 2.0 and long_z > 1.0:
            signal = 'BREAKOUT'        # 🚀 자금 유입 가속
        elif short_z > 1.5 and long_z < 1.0:
            signal = 'ACCUMULATION'    # 🟢 자금 유입 시작
        elif short_z < -1.0 and long_z > 1.0:
            signal = 'DISTRIBUTION'    # 🔴 자금 이탈
        
        # 상태 분류 (히트맵 색상용)
        if short_z >= 3.0:
            status = 'extreme'
        elif short_z >= 2.0:
            status = 'hot'
        elif short_z >= 1.0:
            status = 'warm'
        elif short_z >= 0:
            status = 'active'
        elif short_z >= -1.0:
            status = 'normal'
        elif short_z >= -2.0:
            status = 'cool'
        else:
            status = 'cold'
        
        return signal, status
    
    def aggregate_sectors(self, df: pd.DataFrame) -> List[Dict]:
        """섹터별 Z-Score 기반 거래량 분석"""
        results = []
        
        for ticker, sector_name in self.sectors.items():
            ticker_df = df[df['Ticker'] == ticker].copy()
            
            if ticker_df.empty:
                logger.warning(f"{ticker} 데이터 없음")
                continue
            
            # 통계 계산
            stats = self.calculate_volume_stats(ticker_df)
            
            # 시그널 분류
            signal, status = self.classify_signal(stats)
            
            # 가중 평균 (기존 호환성 유지)
            weighted_spike = (
                stats['short_spike'] * self.weights[0] +
                stats['medium_spike'] * self.weights[1] +
                stats['long_spike'] * self.weights[2]
            )
            
            results.append({
                'sector': sector_name,
                'ticker': ticker,
                # Z-Score (핵심 지표)
                'short_zscore': stats['short_zscore'],
                'medium_zscore': stats['medium_zscore'],
                'long_zscore': stats['long_zscore'],
                # 스파이크 비율
                'short_spike': stats['short_spike'],
                'medium_spike': stats['medium_spike'],
                'long_spike': stats['long_spike'],
                # 백분위
                'percentile': stats['percentile'],
                # 시그널
                'signal': signal,
                'status': status,
                # 가중 평균 (호환성)
                'weighted_spike': round(float(weighted_spike), 2),
                'avg_spike': round(float(weighted_spike), 2),
                'current_spike': stats['short_spike']
            })
        
        # Z-Score 기준 정렬
        results.sort(key=lambda x: x['short_zscore'], reverse=True)
        return results
    
    def get_sector_summary(self, df: pd.DataFrame) -> Dict:
        """섹터 전체 요약"""
        sectors_data = self.aggregate_sectors(df)
        
        # 시그널별 카운트
        signal_counts = {}
        for s in sectors_data:
            sig = s['signal']
            signal_counts[sig] = signal_counts.get(sig, 0) + 1
        
        return {
            'total_sectors': len(sectors_data),
            'hot_sectors': sum(1 for s in sectors_data if s['status'] in ['extreme', 'hot']),
            'warm_sectors': sum(1 for s in sectors_data if s['status'] == 'warm'),
            'cold_sectors': sum(1 for s in sectors_data if s['status'] in ['cool', 'cold']),
            'signals': signal_counts,
            'sectors': sectors_data
        }
