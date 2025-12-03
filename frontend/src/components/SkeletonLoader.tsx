// Skeleton UI 컴포넌트들

export const CardSkeleton = () => (
  <div className="bg-gray-800 p-6 rounded-lg animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <div className="h-8 bg-gray-700 rounded w-20 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-32"></div>
      </div>
      <div className="text-right">
        <div className="h-8 bg-gray-700 rounded w-24 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
    <div className="h-6 bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
  </div>
);

export const SectorCardSkeleton = () => (
  <div className="bg-gray-800 bg-opacity-20 border-2 border-gray-700 rounded-lg p-4 animate-pulse">
    <div className="flex justify-between items-start mb-2">
      <div className="w-8 h-8 bg-gray-700 rounded"></div>
      <div className="w-12 h-4 bg-gray-700 rounded"></div>
    </div>
    <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
    <div className="h-8 bg-gray-700 rounded w-16 mb-1"></div>
    <div className="h-3 bg-gray-700 rounded w-20"></div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
    <div className="h-96 bg-gray-700 rounded"></div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="bg-gray-800 p-4 rounded-lg animate-pulse">
    <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
    <div className="h-8 bg-gray-700 rounded w-24"></div>
  </div>
);

export const EventCardSkeleton = () => (
  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-gray-700 animate-pulse">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-700 rounded"></div>
        <div>
          <div className="h-6 bg-gray-700 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-32"></div>
        </div>
      </div>
      <div className="text-right">
        <div className="h-6 bg-gray-700 rounded w-20 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-3">
      <div className="h-12 bg-gray-700 rounded"></div>
      <div className="h-12 bg-gray-700 rounded"></div>
    </div>
  </div>
);

// 전체 페이지 스켈레톤
export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-7xl mx-auto">
      <div className="h-12 bg-gray-700 rounded w-64 mb-8 animate-pulse"></div>
      
      {/* 섹터 히트맵 스켈레톤 */}
      <div className="mb-8">
        <div className="h-8 bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(11)].map((_, i) => (
            <SectorCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* ETF 카드 스켈레톤 */}
      <div className="h-8 bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export const TickerPageSkeleton = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-7xl mx-auto">
      <div className="h-10 bg-gray-700 rounded w-32 mb-6 animate-pulse"></div>
      
      <div className="mb-8">
        <div className="h-12 bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-700 rounded w-48 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid md:grid-cols-1 gap-6 mb-8">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="h-8 bg-gray-700 rounded w-64 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);


