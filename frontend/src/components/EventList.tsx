import type { VolumeEvent } from '../types/ticker';

interface EventListProps {
  events: VolumeEvent[];
}

const EventList = ({ events }: EventListProps) => {
  const getLevelInfo = (level: string) => {
    switch (level) {
      case 'extreme':
        return { color: 'border-red-500 bg-red-900/20', emoji: '🔥🔥🔥', label: 'EXTREME' };
      case 'high':
        return { color: 'border-orange-500 bg-orange-900/20', emoji: '🔥🔥', label: 'HIGH' };
      case 'medium':
        return { color: 'border-yellow-500 bg-yellow-900/20', emoji: '🔥', label: 'MEDIUM' };
      case 'alert':
        return { color: 'border-blue-500 bg-blue-900/20', emoji: '⚡', label: 'ALERT' };
      default:
        return { color: 'border-gray-500 bg-gray-900/20', emoji: '📊', label: 'NORMAL' };
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">거래량 스파이크 이벤트</h3>
        <div className="text-center text-gray-500 py-8">
          최근 이벤트가 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">
        거래량 스파이크 이벤트 ({events.length})
      </h3>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {events.map((event, idx) => {
          const levelInfo = getLevelInfo(event.level);
          return (
            <div
              key={idx}
              className={`rounded-lg p-4 border-l-4 ${levelInfo.color} transition-all hover:scale-[1.02]`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{levelInfo.emoji}</span>
                  <div>
                    <p className="font-bold text-lg">
                      {levelInfo.label}
                    </p>
                    <p className="text-sm text-gray-400">{event.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${event.price.toFixed(2)}</p>
                  <p className={`text-sm font-semibold ${
                    event.price_change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {event.price_change > 0 ? '+' : ''}${event.price_change.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                <div>
                  <p className="text-gray-400">거래량 배율</p>
                  <p className="font-bold text-lg">{event.ratio.toFixed(2)}x</p>
                </div>
                <div>
                  <p className="text-gray-400">거래량</p>
                  <p className="font-bold text-lg">{event.volume.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;

