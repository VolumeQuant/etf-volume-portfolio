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
      case 'hot':
        return 'bg-red-500';
      case 'warm':
        return 'bg-orange-500';
      case 'normal':
        return 'bg-gray-500';
      case 'cold':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'hot':
        return '🔥';
      case 'warm':
        return '☀️';
      case 'normal':
        return '➡️';
      case 'cold':
        return '❄️';
      default:
        return '➡️';
    }
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
            <div className="flex justify-between items-start mb-2">
              <span className="text-xl md:text-2xl">{getStatusEmoji(sector.status)}</span>
              <span className="text-xs font-mono text-gray-400">{sector.ticker}</span>
            </div>
            <h3 className="font-bold text-xs md:text-sm mb-1 line-clamp-1">{sector.sector}</h3>
            <div className="text-xl md:text-2xl font-bold">
              {sector.avg_spike.toFixed(2)}x
            </div>
            <div className="text-xs text-gray-400 mt-1">
              현재: {sector.current_spike.toFixed(2)}x
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>HOT (≥1.5x)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>WARM (≥1.2x)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded"></div>
          <span>NORMAL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>COLD (&lt;0.8x)</span>
        </div>
      </div>
    </div>
  );
};

export default SectorHeatmap;
