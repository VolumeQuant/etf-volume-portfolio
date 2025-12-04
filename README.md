# 🚀 ETF Pulse

**ETF 거래량 국면분석 + AI 뉴스 브리핑 통합 대시보드**

증권사 HTS 개발자가 만든 금융 데이터 분석 플랫폼

---

## 🎯 프로젝트 목적

- **비즈니스**: 회사 내 AI/데이터 서비스 부서 직무 전환 증명
- **기술**: React + FastAPI 풀스택 개발 역량 증명
- **실사용**: 실제 ETF 투자 타이밍 인사이트 제공

---

## ⚡ 빠른 시작

### 1. Backend 실행
```bash
cd app
python main.py
```
→ http://localhost:8001

### 2. Frontend 실행 (새 터미널)
```bash
cd frontend
npm install  # 첫 실행 시만
npm run dev
```
→ http://localhost:5173

---

## 🛠️ 기술 스택

### Frontend
- React 18 + TypeScript
- Vite (빌드 툴)
- Tailwind CSS
- Zustand (상태 관리)
- Recharts (차트)
- Axios (API 통신)

### Backend
- FastAPI
- pandas + yfinance
- Groq API (LLM)

---

## 📁 프로젝트 구조

```
etf-volume-portfolio/
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── components/    # UI 컴포넌트
│   │   ├── services/      # API 통신
│   │   ├── stores/        # 상태 관리
│   │   ├── types/         # TypeScript 타입
│   │   └── App.tsx        # 메인 앱
│   └── package.json
│
├── app/                    # FastAPI 백엔드
│   ├── models/            # 데이터 수집 & 분석
│   ├── services/          # LLM 서비스
│   ├── config/            # 설정
│   └── main.py            # API 서버
│
└── docs/                   # 문서
    ├── PROJECT_SPEC.md     # 요구사항 정의서
    └── ROADMAP_REACT.md    # 3.5개월 로드맵
```

---

## 🎨 주요 기능

### Phase 1 (완료) ✅
- [x] ETF 데이터 수집 (yfinance)
- [x] 거래량 스파이크 탐지
- [x] 이벤트 레벨 분류 (EXTREME/HIGH/MEDIUM/ALERT)
- [x] React + TypeScript 프론트엔드
- [x] ETF 카드 UI

### Phase 2 (진행 중) 🚧
- [ ] 섹터 히트맵 (11개 섹터 시각화)
- [ ] 거래량 차트 (Recharts)
- [ ] 백테스팅 시스템
- [ ] 뉴스 피드 (RSS)

### Phase 3 (예정) 📅
- [ ] 알림 시스템 (텔레그램)
- [ ] SQLite 히스토리
- [ ] 배포 (Vercel + Railway)

---

## 📊 API 엔드포인트

### GET `/api/analysis/quick`
빠른 스캔 (최근 5일 데이터)
```bash
curl http://localhost:8001/api/analysis/quick
```

### GET `/api/analysis/full`
전체 분석 (1년 데이터)
```bash
curl http://localhost:8001/api/analysis/full?period=1y
```

### POST `/api/explain`
AI 인사이트 생성
```bash
curl -X POST http://localhost:8001/api/explain \
  -H "Content-Type: application/json" \
  -d '{"blob": {...}}'
```

---

## 🔧 환경 변수

`.env` 파일 생성 (선택사항):
```bash
PROVIDER=groq
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

---

## 📚 문서

- [프로젝트 요구사항 정의서](docs/PROJECT_SPEC.md)
- [3.5개월 로드맵](docs/ROADMAP_REACT.md)

---

## 🎯 로드맵 (3.5개월)

| 시점 | 마일스톤 |
|------|----------|
| Week 2 | 섹터 히트맵 완성 |
| Week 4 | 대시보드 v1 |
| Week 8 | 고급 기능 완료 |
| Week 14 | 타겟 부서 데모 🎯 |

---

## 🏆 목표

**"퀄리티 있는 결과물로 직무 전환 성공!"**

- 3.5개월 안에 프로덕션 수준 완성
- 실제 서비스 퀄리티 증명
- React + FastAPI 풀스택 역량 증명

---

## 📝 라이선스

MIT License

---

## 💬 문의

프로젝트 관련 문의는 GitHub Issues를 이용해주세요.

*Last Updated: 2024-12-03*
