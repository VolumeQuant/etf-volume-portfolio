import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { etfApi } from '../services/api';
import type { TickerDetail } from '../types/ticker';
import VolumeChart from '../components/VolumeChart';
import PriceChart from '../components/PriceChart';
import EventList from '../components/EventList';
import { TickerPageSkeleton } from '../components/SkeletonLoader';

function TickerPage() {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<TickerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!ticker) return;
      
      try {
        setLoading(true);
        const result = await etfApi.getTickerDetail(ticker, '1y');
        setData(result);
      } catch (err) {
        setError('데이터 로딩 실패');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  if (loading) {
    return <TickerPageSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4">데이터 로딩 실패</h2>
          <p className="text-gray-400 mb-6">{error || '데이터를 찾을 수 없습니다'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm md:text-base"
        >
          ← 홈으로
        </button>

        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.ticker}</h1>
          <p className="text-gray-400 text-sm md:text-base">{data.name}</p>
        </div>

        {/* 최신 데이터 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-xs md:text-sm text-gray-400">현재가</p>
            <p className="text-xl md:text-2xl font-bold">${data.latest.price.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-xs md:text-sm text-gray-400">가격 변동</p>
            <p className={`text-xl md:text-2xl font-bold ${
              data.latest.price_change_pct > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {data.latest.price_change_pct > 0 ? '+' : ''}
              {data.latest.price_change_pct.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-xs md:text-sm text-gray-400">거래량</p>
            <p className="text-xl md:text-2xl font-bold">{data.latest.volume.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-xs md:text-sm text-gray-400">거래량 스파이크</p>
            <p className={`text-xl md:text-2xl font-bold ${
              data.latest.volume_spike_ratio && data.latest.volume_spike_ratio >= 1.5 
                ? 'text-red-400' 
                : data.latest.volume_spike_ratio && data.latest.volume_spike_ratio >= 1.2
                ? 'text-orange-400'
                : 'text-gray-400'
            }`}>
              {data.latest.volume_spike_ratio?.toFixed(2) || 'N/A'}x
            </p>
          </div>
        </div>

        {/* 차트 영역 */}
        <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
          <PriceChart data={data.history} />
          <VolumeChart data={data.history} />
        </div>

        {/* 이벤트 목록 */}
        <EventList events={data.events} />
      </div>
    </div>
  );
}

export default TickerPage;

