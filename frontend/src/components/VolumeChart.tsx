import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';
import type { TickerHistory } from '../types/ticker';

interface VolumeChartProps {
  data: TickerHistory[];
}

const VolumeChart = ({ data }: VolumeChartProps) => {
  // 데이터 변환: 최근 60일만 표시
  const chartData = data.slice(-60).map(item => ({
    date: item.date,
    volume: item.volume,
    volume_ma: item.volume_ma || 0,
    spike_ratio: item.volume_spike_ratio || 1.0,
    isSpike: (item.volume_spike_ratio || 0) >= 1.5
  }));

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p className="text-sm font-bold mb-2">{format(parseISO(data.date), 'yyyy-MM-dd')}</p>
          <p className="text-sm text-blue-400">
            거래량: {data.volume.toLocaleString()}
          </p>
          {data.volume_ma > 0 && (
            <p className="text-sm text-purple-400">
              20일 MA: {Math.round(data.volume_ma).toLocaleString()}
            </p>
          )}
          {data.spike_ratio >= 1.3 && (
            <p className="text-sm text-red-400 font-bold">
              스파이크: {data.spike_ratio.toFixed(2)}x
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // 커스텀 바 색상
  const CustomBar = (props: any) => {
    const { x, y, width, height, payload } = props;
    const fill = payload.isSpike ? '#ef4444' : payload.spike_ratio >= 1.2 ? '#f97316' : '#3b82f6';
    
    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">거래량 분석 (최근 60일)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            tickFormatter={(value) => format(parseISO(value), 'MM/dd')}
            interval="preserveStartEnd"
            minTickGap={20}
          />
          <YAxis stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={0} stroke="#6b7280" />
          <Bar 
            dataKey="volume" 
            name="거래량" 
            shape={<CustomBar />}
          />
          <Bar 
            dataKey="volume_ma" 
            name="20일 MA" 
            fill="#8b5cf6" 
            opacity={0.5}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>SPIKE (≥1.5x)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>WARM (≥1.2x)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>NORMAL</span>
        </div>
      </div>
    </div>
  );
};

export default VolumeChart;

