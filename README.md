# 🚀 ETF Pulse

> **섹터 로테이션 시그널을 자동으로 탐지하여, 투자자에게 '지금 어느 섹터로 자금이 이동하고 있는가'를 알려주는 실시간 모니터링 시스템**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/react-18.0+-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-3178c6.svg)](https://www.typescriptlang.org/)

---

## 📖 프로젝트 개요

### 문제 (Problem)
개인 투자자는 **섹터 로테이션**(자금 이동)을 실시간으로 파악할 수 없습니다.
- 뉴스는 사후 보도
- HTS는 개별 종목 중심
- 블룸버그 단말기는 연 $24,000

### 솔루션 (Solution)
ETF Pulse는 **거래량 스파이크를 자동 탐지**하여:
1. 11개 섹터를 히트맵으로 시각화 (HOT/COLD)
2. AI가 "왜 이 섹터인가" 뉴스 분석
3. 텔레그램으로 실시간 알림

### 가치 (Value)
⏱️ **아침 3분 안에 시장 국면 파악** → 투자 타이밍 개선

---

## 🎯 프로젝트 목적

| 목적 | 내용 |
|------|------|
| **비즈니스** | HTS 개발자 → AI/데이터 서비스 직무 전환 증명 |
| **기술** | React + FastAPI + LLM 풀스택 역량 증명 |
| **실사용** | 본인이 실제 투자에 활용 (30일 실사용) |
| **완료 목표** | 2025-03-20 (3.5개월) |

---

## ⚡ 빠른 시작

### 한 번에 실행 (PowerShell)
```powershell
.\start-all.ps1
```
백엔드와 프론트엔드가 새 창에서 자동으로 실행됩니다.

**접속**:
- Frontend: http://localhost:5173
- Backend: http://localhost:8002

### 개별 실행
```powershell
.\start-backend.ps1  # 백엔드만
.\start-frontend.ps1  # 프론트엔드만
```

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
etf-pulse/
├── 📂 frontend/               # React 18 + TypeScript
│   ├── src/
│   │   ├── components/       # 재사용 컴포넌트
│   │   │   ├── SectorHeatmap.tsx   ← 핵심!
│   │   │   ├── VolumeChart.tsx
│   │   │   └── EventList.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   └── TickerPage.tsx
│   │   ├── stores/           # Zustand 상태 관리
│   │   ├── services/         # API 통신
│   │   └── types/            # TypeScript 인터페이스
│   └── package.json
│
├── 📂 app/                    # FastAPI Backend
│   ├── models/
│   │   ├── etf_data_collector.py   # WD-1: 데이터 수집
│   │   ├── volume_event_detector.py # WD-2: 시그널 탐지
│   │   └── sector_aggregator.py    # 섹터 집계
│   ├── services/
│   │   └── llm.py            # WD-6: AI 인사이트
│   ├── config/
│   │   └── etf_universe.py   # ETF 유니버스 정의
│   └── main.py               # WD-4: API 서버
│
└── 📂 docs/                   # 프로젝트 문서
    ├── CORE_PURPOSE.md       ← 핵심 주제 정의
    ├── WORK_DEFINITION.md    ← 업무 정의
    ├── PROJECT_SPEC.md       # 요구사항 명세
    └── ROADMAP_REACT.md      # 3.5개월 타임라인
```

### 핵심 문서 (반드시 읽어야 할 3개)
1. **[CORE_PURPOSE.md](docs/CORE_PURPOSE.md)** - "이 프로젝트는 무엇인가?"
2. **[WORK_DEFINITION.md](docs/WORK_DEFINITION.md)** - "어떻게 구현하는가?"
3. **[PROJECT_SPEC.md](docs/PROJECT_SPEC.md)** - "구체적인 기능은?"

---

## 🎨 주요 기능

### 현재 상태 (2024-12-04)
```
✅ 데이터 수집      100% | yfinance로 26개 ETF 데이터 수집
✅ 시그널 탐지      100% | 거래량 스파이크 자동 탐지 (20일 MA 대비)
🚧 API 서비스      70%  | FastAPI RESTful 엔드포인트
🚧 React 프론트     40%  | TypeScript + Zustand
⬜ 섹터 히트맵      0%   | 11개 섹터 HOT/COLD 시각화
⬜ AI 인사이트      0%   | Groq LLM 뉴스 요약
⬜ 알림 시스템      0%   | 텔레그램 봇
⬜ 배포            0%   | Vercel + Railway

전체 진행률: 35%
```

### 다음 마일스톤 (Week 2)
- [ ] **섹터 히트맵** 완성 (최우선) 🎯
- [ ] 거래량/가격 차트
- [ ] 티커 상세 페이지
- [ ] 반응형 디자인

### 최종 목표 (Week 14)
- [ ] 프로덕션 배포 완료
- [ ] 타겟 부서 데모 🎯
- [ ] 직무 전환 요청

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

## 📚 문서 가이드

### 처음 읽을 문서 (순서대로)
1. **[CORE_PURPOSE.md](docs/CORE_PURPOSE.md)** ← 시작은 여기서
   - 프로젝트의 본질 이해
   - "왜 이 프로젝트를 하는가?"
   - 성공의 정의

2. **[WORK_DEFINITION.md](docs/WORK_DEFINITION.md)**
   - 8개 핵심 업무 정의
   - 업무별 책임과 범위
   - 업무 간 인터페이스

3. **[PROJECT_SPEC.md](docs/PROJECT_SPEC.md)**
   - 구체적인 기능 요구사항
   - 기술 스택 상세
   - Phase별 일정

### 참고 문서
- [ROADMAP_REACT.md](docs/ROADMAP_REACT.md) - 주간 타임라인
- [ETF_UNIVERSE_RATIONALE.md](docs/ETF_UNIVERSE_RATIONALE.md) - ETF 선정 근거
- [QUICKSTART.md](docs/QUICKSTART.md) - 빠른 시작 가이드

---

## 🗓️ 로드맵

```
2024-12   2025-01   2025-02   2025-03
  │         │         │         │
  ├─ Week 2: 섹터 히트맵 완성 🎯
  │
  ├───────── Week 4: 대시보드 v1
            │
            ├─────── Week 8: 뉴스 연동 + 알림
                    │
                    ├─────── Week 14: 배포 + 데모 🎯
```

| Week | 마일스톤 | 검증 |
|------|----------|------|
| **2** | 섹터 히트맵 | 11개 섹터 시각화 |
| **4** | 대시보드 v1 | 실사용 시작 |
| **8** | 고급 기능 | 뉴스 + 알림 |
| **14** | **타겟 부서 데모** | 🎯 직무 전환 요청 |

---

## 🏆 목표 & 원칙

### 최종 목표
> **"프로덕션 수준 퀄리티로 직무 전환 성공!"**

### 핵심 원칙
```
1. 투자 추천 절대 금지 (규제 준수)
2. 단순함 우선 (3.5개월 완성)
3. 데이터 중심 (수치 기반 판단)
4. 실사용 가능 (30일 실제 사용)
```

### 증명할 역량
- ✅ React + TypeScript 프론트엔드
- ✅ FastAPI 백엔드
- ✅ LLM API 활용
- ✅ 금융 도메인 이해
- ✅ 프로덕션 배포

---

## 📝 라이선스

MIT License

---

## 🤝 기여

이 프로젝트는 직무 전환 포트폴리오 목적이지만, 피드백과 제안은 환영합니다!

- 🐛 버그 제보: GitHub Issues
- 💡 기능 제안: GitHub Discussions
- 📧 직접 문의: [이메일 주소]

---

## 📄 라이선스

MIT License

---

## 📌 Quick Links

| 링크 | 설명 |
|------|------|
| [핵심 주제](docs/CORE_PURPOSE.md) | 프로젝트 본질 이해 |
| [업무 정의](docs/WORK_DEFINITION.md) | 구현 업무 정의 |
| [요구사항](docs/PROJECT_SPEC.md) | 기능 명세 |
| [로드맵](docs/ROADMAP_REACT.md) | 주간 타임라인 |
| [빠른 시작](docs/QUICKSTART.md) | 설치 & 실행 |

---

*Last Updated: 2024-12-04*
*Progress: 35% (Week 1/14)*

