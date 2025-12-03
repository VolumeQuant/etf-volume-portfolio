import { useNavigate } from 'react-router-dom';
import type { ETFData } from '../types/etf';

interface RecentEventsProps {
  data: ETFData[];
}

const RecentEvents = ({ data }: RecentEventsProps) => {
  const navigate = useNavigate();

  // 거래량 스파이크가 있는 ETF만 필터링하고 정렬
  const eventsData = data
    .filter(etf => etf.volume_spike_ratio && etf.volume_spike_ratio >= 1.3)
    .sort((a, b) => (b.volume_spike_ratio || 0) - (a.volume_spike_ratio || 0))
    .slice(0, 10); // 상위 10개만

  const getLevelInfo = (ratio: number) => {
    if (ratio >= 2.5) {
      return { level: 'EXTREME', color: 'border-red-500 bg-red-900/20', emoji: '🔥🔥🔥' };
    } else if (ratio >= 2.0) {
      return { level: 'HIGH', color: 'border-orange-500 bg-orange-900/20', emoji: '🔥🔥' };
    } else if (ratio >= 1.5) {
      return { level: 'MEDIUM', color: 'border-yellow-500 bg-yellow-900/20', emoji: '🔥' };
    } else {
      return { level: 'ALERT', color: 'border-blue-500 bg-blue-900/20', emoji: '⚡' };
    }
  };

  if (eventsData.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🔔 최근 거래량 스파이크</h2>
        <div className="text-center text-gray-500 py-8">
          최근 거래량 스파이크 이벤트가 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🔔 최근 거래량 스파이크</h2>
        <span className="text-sm text-gray-400">Top {eventsData.length}</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {eventsData.map((etf) => {
          const ratio = etf.volume_spike_ratio || 0;
          const levelInfo = getLevelInfo(ratio);
          
          return (
            <div
              key={etf.ticker}
              onClick={() => navigate(`/ticker/${etf.ticker}`)}
              className={`rounded-lg p-4 border-l-4 ${levelInfo.color} cursor-pointer hover:scale-[1.02] transition-transform`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{levelInfo.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg">{etf.ticker}</h3>
                    <p className="text-xs text-gray-400">{etf.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${etf.price.toFixed(2)}</p>
                  <p className={`text-sm font-semibold ${
                    etf.price_change_pct && etf.price_change_pct > 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {etf.price_change_pct 
                      ? `${etf.price_change_pct > 0 ? '+' : ''}${etf.price_change_pct.toFixed(2)}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400">거래량 배율</p>
                  <p className="font-bold text-lg text-orange-400">{ratio.toFixed(2)}x</p>
                </div>
                <div>
                  <p className="text-gray-400">거래량</p>
                  <p className="font-bold">{etf.volume.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400 text-center">
        카드를 클릭하면 상세 분석을 확인할 수 있습니다
      </div>
    </div>
  );
};

export default RecentEvents;


