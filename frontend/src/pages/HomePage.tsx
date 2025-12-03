import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { etfApi } from '../services/api';
import type { ETFData } from '../types/etf';
import SectorHeatmap from '../components/SectorHeatmap';
import RecentEvents from '../components/RecentEvents';
import { DashboardSkeleton, CardSkeleton } from '../components/SkeletonLoader';

function HomePage() {
  const [data, setData] = useState<ETFData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await etfApi.getQuickScan();
        setData(result.data);
      } catch (err) {
        setError('데이터 로딩 실패');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // 자동 새로고침 (5분마다)
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4">데이터 로딩 실패</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">ETF Pulse 🚀</h1>
          <p className="text-gray-400 text-sm md:text-base">미국 ETF 거래량 분석 대시보드</p>
        </div>
        
        {/* 섹터 히트맵 */}
        <div className="mb-8">
          <SectorHeatmap />
        </div>

        {/* 최근 이벤트 */}
        <div className="mb-8">
          <RecentEvents data={data} />
        </div>

        {/* 시장 지수 (벤치마크) */}
        {data.filter(etf => ['SPY', 'QQQ', 'DIA'].includes(etf.ticker)).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">📈 시장 지수 (벤치마크)</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {data.filter(etf => ['SPY', 'QQQ', 'DIA'].includes(etf.ticker)).map((etf) => (
                <div 
                  key={etf.ticker} 
                  className="bg-gray-800 p-4 md:p-6 rounded-lg hover:bg-gray-750 transition cursor-pointer border-2 border-blue-600/30"
                  onClick={() => navigate(`/ticker/${etf.ticker}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">{etf.ticker}</h3>
                      <p className="text-gray-400 text-xs md:text-sm">{etf.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl md:text-2xl font-bold">${etf.price.toFixed(2)}</p>
                      <p className={`text-xs md:text-sm font-semibold ${
                        etf.price_change_pct && etf.price_change_pct > 0 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {etf.price_change_pct !== null 
                          ? `${etf.price_change_pct > 0 ? '+' : ''}${etf.price_change_pct.toFixed(2)}%`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-xs md:text-sm text-gray-500">
                    거래량: {etf.volume.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 섹터 ETF 모니터링 */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4">📊 섹터 ETF 모니터링</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.filter(etf => !['SPY', 'QQQ', 'DIA'].includes(etf.ticker)).map((etf) => (
              <div 
                key={etf.ticker} 
                className="bg-gray-800 p-4 md:p-6 rounded-lg hover:bg-gray-750 transition cursor-pointer"
                onClick={() => navigate(`/ticker/${etf.ticker}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">{etf.ticker}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">{etf.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold">${etf.price.toFixed(2)}</p>
                    <p className={`text-xs md:text-sm font-semibold ${
                      etf.price_change_pct && etf.price_change_pct > 0 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {etf.price_change_pct !== null 
                        ? `${etf.price_change_pct > 0 ? '+' : ''}${etf.price_change_pct.toFixed(2)}%`
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                
                {etf.volume_spike_ratio && etf.volume_spike_ratio >= 1.3 && (
                  <div className={`mt-2 p-2 rounded text-xs md:text-sm font-semibold ${
                    etf.volume_spike_ratio >= 2.5 ? 'bg-red-900/30 text-red-400' :
                    etf.volume_spike_ratio >= 2.0 ? 'bg-orange-900/30 text-orange-400' :
                    etf.volume_spike_ratio >= 1.5 ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-blue-900/30 text-blue-400'
                  }`}>
                    🔥 거래량 스파이크: {etf.volume_spike_ratio.toFixed(2)}x
                  </div>
                )}
                
                <div className="mt-4 text-xs md:text-sm text-gray-500">
                  거래량: {etf.volume.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>데이터는 5분마다 자동 업데이트됩니다 | 마지막 업데이트: {new Date().toLocaleTimeString('ko-KR')}</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

