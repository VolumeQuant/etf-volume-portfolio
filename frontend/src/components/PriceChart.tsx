import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import type { TickerHistory } from '../types/ticker';

interface PriceChartProps {
  data: TickerHistory[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  // 데이터 변환: 최근 60일만 표시
  const chartData = data.slice(-60).map(item => ({
    date: item.date,
    price: item.close,
    high: item.high,
    low: item.low,
  }));

  // 가격 범위 계산
  const prices = chartData.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.1;

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p className="text-sm font-bold mb-2">{format(parseISO(data.date), 'yyyy-MM-dd')}</p>
          <p className="text-sm text-green-400">
            종가: ${data.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">
            고가: ${data.high.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">
            저가: ${data.low.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">가격 차트 (최근 60일)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            tickFormatter={(value) => format(parseISO(value), 'MM/dd')}
            interval="preserveStartEnd"
            minTickGap={20}
          />
          <YAxis 
            stroke="#9ca3af"
            domain={[minPrice - padding, maxPrice + padding]}
            tickFormatter={(value) => `$${value.toFixed(1)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            name="종가" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;

