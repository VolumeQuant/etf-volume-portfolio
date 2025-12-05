# ⚡ ETF Pulse - 빠른 시작 가이드

**이 문서는 Week 1에 바로 실행할 수 있는 단계별 가이드입니다.**

---

## 🎯 Week 1 목표

- [ ] React + TypeScript 프로젝트 생성
- [ ] FastAPI와 통신 확인
- [ ] 첫 번째 컴포넌트 만들기

**예상 시간**: 12시간

---

## 📋 사전 준비

### 필수 설치
```bash
# Node.js 18+ 확인
node --version  # v18.0.0 이상

# Python 3.10+ 확인
python --version  # 3.10 이상

# Git 확인
git --version
```

### 폴더 구조 확인
```
C:\dev\etf-volume-portfolio\
├── app/          # 기존 FastAPI (그대로 유지)
└── frontend/     # 새로 생성할 폴더
```

---

## 🚀 Step 1: React 프로젝트 생성 (30분)

### 1.1 Vite로 React 프로젝트 생성
```bash
cd C:\dev\etf-volume-portfolio

# Vite로 React + TypeScript 프로젝트 생성
npm create vite@latest frontend -- --template react-ts

cd frontend
npm install
```

### 1.2 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 → Vite 로고 보이면 성공! ✅

---

## 🎨 Step 2: Tailwind CSS 설정 (20분)

### 2.1 Tailwind 설치
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2.2 tailwind.config.js 수정
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2.3 src/index.css 수정
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2.4 테스트
`src/App.tsx` 수정:
```tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">ETF Pulse 🚀</h1>
    </div>
  )
}

export default App
```

저장 후 브라우저 확인 → 다크 배경에 흰 글자 보이면 성공! ✅

---

## 📦 Step 3: 필수 패키지 설치 (10분)

```bash
# 상태 관리 & 라우팅
npm install zustand react-router-dom

# API 통신
npm install axios

# 차트 라이브러리
npm install recharts

# 날짜 처리
npm install date-fns

# 타입 정의
npm install -D @types/react @types/react-router-dom
```

---

## 🔌 Step 4: FastAPI 연동 (1시간)

### 4.1 API 서비스 레이어 생성

`src/services/api.ts` 파일 생성:
```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// 타입 정의
export interface QuickScanData {
  ticker: string;
  name: string;
  price: number;
  volume: number;
  volume_spike_ratio: number | null;
  price_change_pct: number | null;
}

export interface QuickScanResponse {
  timestamp: string;
  mode: string;
  data: QuickScanData[];
}

// API 함수
export const etfApi = {
  // 빠른 스캔
  getQuickScan: async (): Promise<QuickScanResponse> => {
    const response = await api.get<QuickScanResponse>('/analysis/quick');
    return response.data;
  },

  // 전체 분석
  getFullAnalysis: async (period = '1y') => {
    const response = await api.get('/analysis/full', {
      params: { period }
    });
    return response.data;
  },
};

export default api;
```

### 4.2 Backend 실행

**새 터미널** 열기:
```bash
cd C:\dev\etf-volume-portfolio\app
python main.py
```

브라우저에서 `http://localhost:8000/api/analysis/quick` 접속 → JSON 데이터 보이면 성공! ✅

### 4.3 React에서 API 호출 테스트

`src/App.tsx` 수정:
```tsx
import { useEffect, useState } from 'react'
import { etfApi, type QuickScanData } from './services/api'

function App() {
  const [data, setData] = useState<QuickScanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">ETF Pulse 🚀</h1>
      
      <div className="grid gap-4">
        {data.map((etf) => (
          <div key={etf.ticker} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{etf.ticker}</h3>
                <p className="text-gray-400 text-sm">{etf.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl">${etf.price}</p>
                <p className={`text-sm ${etf.price_change_pct && etf.price_change_pct > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {etf.price_change_pct?.toFixed(2)}%
                </p>
              </div>
            </div>
            {etf.volume_spike_ratio && etf.volume_spike_ratio > 1.3 && (
              <div className="mt-2 text-yellow-400 text-sm">
                🔥 거래량 스파이크: {etf.volume_spike_ratio.toFixed(2)}x
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
```

저장 후 브라우저 확인 → ETF 데이터가 카드 형태로 보이면 성공! ✅

---

## 📁 Step 5: 프로젝트 구조 정리 (30분)

### 5.1 폴더 구조 만들기
```bash
cd src

# 폴더 생성
mkdir components
mkdir components/Layout
mkdir pages
mkdir stores
mkdir types
mkdir hooks
```

### 5.2 types/etf.ts 생성
```typescript
export interface ETFData {
  ticker: string;
  name: string;
  price: number;
  volume: number;
  volume_spike_ratio: number | null;
  price_change_pct: number | null;
}

export interface SectorData {
  name: string;
  spike_ratio: number;
  tickers: string[];
}

export interface VolumeEvent {
  ticker: string;
  date: string;
  event_level: 'EXTREME' | 'HIGH' | 'MEDIUM' | 'ALERT';
  volume_spike_ratio: number;
  price_change_pct: number;
}
```

### 5.3 stores/etfStore.ts 생성 (Zustand)
```typescript
import { create } from 'zustand';
import type { ETFData } from '../types/etf';

interface ETFStore {
  etfs: ETFData[];
  loading: boolean;
  error: string | null;
  setETFs: (etfs: ETFData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useETFStore = create<ETFStore>((set) => ({
  etfs: [],
  loading: false,
  error: null,
  setETFs: (etfs) => set({ etfs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
```

### 5.4 최종 폴더 구조
```
frontend/
├── src/
│   ├── components/
│   │   └── Layout/
│   ├── pages/
│   ├── services/
│   │   └── api.ts
│   ├── stores/
│   │   └── etfStore.ts
│   ├── types/
│   │   └── etf.ts
│   ├── hooks/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## ✅ Week 1 체크리스트

- [ ] React 프로젝트 생성 완료
- [ ] Tailwind CSS 작동 확인
- [ ] FastAPI 통신 성공
- [ ] ETF 데이터 화면에 표시
- [ ] 프로젝트 구조 정리
- [ ] Git commit

---

## 🎯 다음 단계 (Week 2)

**섹터 히트맵 개발**
- [ ] Recharts 학습
- [ ] 섹터 집계 API 개발 (Backend)
- [ ] 히트맵 컴포넌트 개발
- [ ] 인터랙션 추가

---

## 🆘 문제 해결

### CORS 에러
FastAPI `main.py`에 CORS 설정 확인:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React 개발 서버
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Port 충돌
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

둘 다 실행 중이어야 함!

### TypeScript 에러
```bash
# tsconfig.json에서 strict 모드 일시 끄기
{
  "compilerOptions": {
    "strict": false,  // 처음엔 false로 시작
  }
}
```

---

## 📸 Week 1 완료 스크린샷

완료 시 다음 화면이 보여야 합니다:
- ✅ 다크 테마 배경
- ✅ ETF 카드 6개 (XLK, XLF, XLE, XLY, SOXX, ITB)
- ✅ 가격, 거래량, 스파이크 비율 표시
- ✅ 스파이크 발생 시 🔥 이모지

---

**"첫 주를 성공적으로 마치면 나머지는 술술 풀립니다!"** 💪

*마지막 업데이트: 2024-12-03*



