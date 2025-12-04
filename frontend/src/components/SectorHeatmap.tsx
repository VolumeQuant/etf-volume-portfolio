import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { etfApi } from '../services/api';
import type { SectorData } from '../types/sector';

const SectorHeatmap = () => {
  const [sectors, setSectors] = useState<SectorData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const data = await etfApi.getSectors();
        setSectors(data.sectors);
      } catch (error) {
        console.error('섹터 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'extreme':
        return 'bg-red-600';      // 진한 빨강
      case 'hot':
        return 'bg-red-500';      // 빨강
      case 'warm':
        return 'bg-orange-500';   // 주황
      case 'active':
        return 'bg-yellow-500';   // 노랑
      case 'normal':
        return 'bg-gray-500';     // 회색
      case 'cool':
        return 'bg-blue-400';     // 연한 파랑
      case 'cold':
        return 'bg-blue-600';     // 진한 파랑
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'extreme':
        return '🔥🔥';
      case 'hot':
        return '🔥';
      case 'warm':
        return '☀️';
      case 'active':
        return '🟡';
      case 'normal':
        return '➡️';
      case 'cool':
        return '🟦';
      case 'cold':
        return '❄️';
      default:
        return '➡️';
    }
  };

  const getSignalBadge = (signal: string) => {
    switch (signal) {
      case 'ACCUMULATION':
        return { text: '🟢 유입', color: 'bg-green-600' };
      case 'BREAKOUT':
        return { text: '🚀 가속', color: 'bg-purple-600' };
      case 'OVERHEATED':
        return { text: '⚠️ 과열', color: 'bg-red-700' };
      case 'DISTRIBUTION':
        return { text: '🔴 이탈', color: 'bg-rose-600' };
      default:
        return null;
    }
  };

  const formatZScore = (z: number) => {
    const sign = z >= 0 ? '+' : '';
    return `${sign}${z.toFixed(1)}σ`;
  };

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">🗺️ 섹터 히트맵</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(11)].map((_, i) => (
            <div key={i} className="bg-gray-800 bg-opacity-20 border-2 border-gray-700 rounded-lg p-4 animate-pulse">
              <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
                <div className="w-12 h-4 bg-gray-700 rounded"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-4">🗺️ 섹터 히트맵</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {sectors.map((sector) => (
          <div
            key={sector.ticker}
            onClick={() => navigate(`/ticker/${sector.ticker}`)}
            className={`${getStatusColor(sector.status)} bg-opacity-20 border-2 ${getStatusColor(
              sector.status
            ).replace('bg-', 'border-')} rounded-lg p-3 md:p-4 hover:scale-105 transition-transform cursor-pointer`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-xl md:text-2xl">{getStatusEmoji(sector.status)}</span>
              <div className="text-right">
                <span className="text-xs font-mono text-gray-400 block">{sector.ticker}</span>
                {getSignalBadge(sector.signal) && (
                  <span className={`text-xs px-1.5 py-0.5 rounded ${getSignalBadge(sector.signal)!.color} mt-1 inline-block`}>
                    {getSignalBadge(sector.signal)!.text}
                  </span>
                )}
              </div>
            </div>
            <h3 className="font-bold text-xs md:text-sm mb-1 line-clamp-1">{sector.sector}</h3>
            {/* Z-Score 메인 표시 */}
            <div className="text-xl md:text-2xl font-bold mb-1">
              {formatZScore(sector.short_zscore)}
            </div>
            <div className="text-xs text-gray-400 space-y-0.5">
              {/* 백분위 */}
              {sector.percentile !== undefined && (
                <div className="text-gray-300">상위 {(100 - sector.percentile).toFixed(0)}%</div>
              )}
              {/* Z-Score 상세 */}
              <div className="text-gray-500">
                5일:{formatZScore(sector.short_zscore)} / 20일:{sector.medium_zscore !== undefined ? formatZScore(sector.medium_zscore) : '-'} / 1년:{sector.long_zscore !== undefined ? formatZScore(sector.long_zscore) : '-'}
              </div>
              {/* 스파이크 비율 */}
              <div className="text-gray-600">
                거래량: {sector.short_spike.toFixed(1)}x (vs 1년 평균)
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Z-Score 레전드 */}
      <div className="mt-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
        <div className="text-xs text-gray-400 mb-2">Z-Score 기준 (표준편차 단위)</div>
        <div className="flex flex-wrap gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-600 rounded"></div>
            <span>≥+3σ (상위 0.1%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>≥+2σ (상위 2.5%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>≥+1σ (상위 16%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>0~+1σ (평균~상위)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span>-1σ~0 (평균~하위)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span>≤-1σ (하위 16%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>≤-2σ (하위 2.5%)</span>
          </div>
        </div>
        {/* 시그널 레전드 */}
        <div className="text-xs text-gray-400 mt-3 mb-2">시그널</div>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="px-2 py-0.5 bg-green-600 rounded">🟢 ACCUMULATION: 자금 유입 시작</span>
          <span className="px-2 py-0.5 bg-purple-600 rounded">🚀 BREAKOUT: 자금 유입 가속</span>
          <span className="px-2 py-0.5 bg-red-700 rounded">⚠️ OVERHEATED: 과열 경고</span>
          <span className="px-2 py-0.5 bg-rose-600 rounded">🔴 DISTRIBUTION: 자금 이탈</span>
        </div>
      </div>
    </div>
  );
};

export default SectorHeatmap;
