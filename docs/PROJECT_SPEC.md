# 📋 ETF Pulse - 프로젝트 요구사항 정의서

**버전**: 1.0.0  
**작성일**: 2024-12-03  
**목표 완료일**: 2025-06-03 (6개월)

---

## 1. 프로젝트 개요

### 1.1 비전
> "금융 데이터를 분석해 투자 판단에 도움이 되는 인사이트를 제공하는 서비스"

### 1.2 프로젝트명
**ETF Pulse** - ETF 거래량 국면분석 + AI 뉴스 브리핑 통합 대시보드

### 1.3 목적
| 항목 | 내용 |
|------|------|
| **비즈니스 목적** | 회사 내 AI/데이터 서비스 부서 직무 전환 증명 |
| **사용자 가치** | ETF 시장 국면을 한눈에 파악, 투자 타이밍 인사이트 제공 |
| **기술 증명** | 데이터 수집 → 분석 → AI 요약 → 시각화 풀스택 역량 |

### 1.4 핵심 원칙
- ⚠️ **투자 추천 없음**: 국면 분석만 제공 (규제 리스크 회피)
- 🎯 **단순함 우선**: 6개월 내 데모 가능한 완성도
- 📊 **데이터 중심**: 감이 아닌 수치 기반 인사이트

---

## 2. 사용자 정의

### 2.1 타겟 사용자
| 페르소나 | 특징 | 니즈 |
|----------|------|------|
| **개인 투자자** | ETF 기반 포트폴리오 운용 | 섹터 로테이션 타이밍 파악 |
| **사내 데모 대상** | AI/데이터 서비스 팀장 | 기술 역량 + 비즈니스 이해도 |
| **본인** | 시스템 개발자 겸 사용자 | 실제 투자에 활용 가능한 도구 |

### 2.2 사용 시나리오
```
매일 아침 9시 (미국장 마감 후):
1. ETF Pulse 대시보드 접속
2. 전일 거래량 스파이크 확인 (히트맵)
3. 스파이크 발생 섹터의 관련 뉴스 AI 요약 확인
4. 시장 국면 판단 → 투자 의사결정 참고
```

---

## 3. 기능 요구사항

### 3.1 Phase 1: 거래량 국면분석 (Month 1-2) ✅ 대부분 완료

| ID | 기능 | 설명 | 상태 |
|----|------|------|------|
| F1.1 | ETF 데이터 수집 | yfinance로 26개 ETF OHLCV 수집 | ✅ 완료 |
| F1.2 | 거래량 스파이크 탐지 | 20일 MA 대비 비율 계산 | ✅ 완료 |
| F1.3 | 이벤트 레벨 분류 | EXTREME/HIGH/MEDIUM/ALERT 4단계 | ✅ 완료 |
| F1.4 | 웹 대시보드 | FastAPI + Chart.js 기반 | ✅ 완료 |
| F1.5 | AI 인사이트 | Groq API + Rule-based 폴백 | ✅ 완료 |
| F1.6 | **섹터 히트맵** | 섹터별 국면 시각화 | 🔲 추가 필요 |
| F1.7 | **히스토리 저장** | SQLite DB 연동 | 🔲 추가 필요 |

### 3.2 Phase 2: 뉴스 요약 연동 (Month 3-4) 🔲 미착수

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| F2.1 | 뉴스 데이터 수집 | 금융 뉴스 RSS/API 크롤링 | 🔴 필수 |
| F2.2 | 섹터 매핑 | 뉴스 → 관련 ETF 섹터 자동 분류 | 🔴 필수 |
| F2.3 | AI 뉴스 요약 | LLM으로 뉴스 핵심 요약 (3줄) | 🔴 필수 |
| F2.4 | 거래량-뉴스 연동 | 스파이크 발생 시 관련 뉴스 표시 | 🟡 중요 |
| F2.5 | 키워드 트렌드 | 뉴스 키워드 빈도 분석 | 🟢 선택 |

### 3.3 Phase 3: 통합 및 고도화 (Month 5-6) 🔲 미착수

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| F3.1 | 통합 대시보드 | 거래량 + 뉴스 원페이지 뷰 | 🔴 필수 |
| F3.2 | 알림 시스템 | 텔레그램/이메일 알림 | 🟡 중요 |
| F3.3 | 백테스팅 | 거래량 이벤트 기반 수익률 검증 | 🟢 선택 |
| F3.4 | 데모 패키지 | PPT + 발표 자료 + 라이브 데모 | 🔴 필수 |

---

## 4. 비기능 요구사항

### 4.1 성능
| 항목 | 목표 |
|------|------|
| 데이터 수집 | 26개 ETF 1년 데이터 < 30초 |
| 페이지 로딩 | 대시보드 초기 로딩 < 3초 |
| AI 응답 | 요약 생성 < 5초 |

### 4.2 확장성
| 항목 | 현재 | 목표 |
|------|------|------|
| ETF 유니버스 | 26개 | 50개+ 확장 가능 |
| 데이터 보존 | 메모리 | SQLite (1년 히스토리) |
| 배포 | 로컬 | Docker 컨테이너화 |

### 4.3 안정성
- 외부 API 실패 시 Rule-based 폴백
- 데이터 수집 실패 시 캐시 활용
- 에러 로깅 및 모니터링

---

## 5. 기술 스택

### 5.1 현재 스택
```
Backend     : Python 3.10, FastAPI, Uvicorn
Data        : pandas, numpy, yfinance
AI/LLM      : Groq API (LLaMA3), httpx
Frontend    : HTML5, CSS3, Vanilla JS, Chart.js
```

### 5.2 추가 예정
```
Database    : SQLite (→ PostgreSQL 확장 가능)
News API    : NewsAPI / RSS 피드 / 직접 크롤링
Notification: python-telegram-bot / smtplib
Deploy      : Docker, (선택: Railway/Render)
```

---

## 6. 데이터 모델

### 6.1 ETF 거래량 데이터 (기존)
```sql
CREATE TABLE etf_daily (
    id INTEGER PRIMARY KEY,
    ticker TEXT NOT NULL,
    date DATE NOT NULL,
    open REAL,
    high REAL,
    low REAL,
    close REAL,
    volume INTEGER,
    volume_ma_20 REAL,
    volume_spike_ratio REAL,
    event_level TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ticker, date)
);
```

### 6.2 뉴스 데이터 (Phase 2)
```sql
CREATE TABLE news (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    source TEXT,
    url TEXT,
    published_at TIMESTAMP,
    summary TEXT,           -- AI 생성 요약
    sectors TEXT,           -- JSON: ["XLK", "SOXX"]
    sentiment TEXT,         -- POSITIVE/NEGATIVE/NEUTRAL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.3 알림 기록 (Phase 3)
```sql
CREATE TABLE alerts (
    id INTEGER PRIMARY KEY,
    alert_type TEXT,        -- VOLUME_SPIKE, NEWS_ALERT
    ticker TEXT,
    message TEXT,
    sent_at TIMESTAMP,
    channel TEXT            -- telegram, email
);
```

---

## 7. API 설계

### 7.1 기존 API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/analysis/quick` | 빠른 스캔 (5일) |
| GET | `/api/analysis/full` | 전체 분석 (1년) |
| POST | `/api/explain` | AI 인사이트 생성 |

### 7.2 추가 API (Phase 2-3)
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/news/latest` | 최신 뉴스 목록 |
| GET | `/api/news/sector/{sector}` | 섹터별 뉴스 |
| GET | `/api/dashboard/unified` | 통합 대시보드 데이터 |
| POST | `/api/alerts/subscribe` | 알림 구독 |
| GET | `/api/history/{ticker}` | 티커별 히스토리 |

---

## 8. 리스크 및 대응

| 리스크 | 영향 | 대응 방안 |
|--------|------|-----------|
| yfinance 차단 | 데이터 수집 불가 | 백업 API 준비 (Alpha Vantage) |
| 뉴스 API 비용 | 예산 초과 | 무료 RSS 피드 활용 |
| LLM 토큰 비용 | 예산 초과 | Rule-based 폴백 강화 |
| 개발 시간 부족 | 완성도 저하 | MVP 범위 축소 (알림 제외) |
| 규제 이슈 | 서비스 불가 | 투자 추천 문구 제거 철저 |

---

## 9. 성공 기준

### 9.1 프로젝트 성공 지표
| 지표 | 목표 |
|------|------|
| 기능 완성도 | Phase 1-2 필수 기능 100% |
| 데모 품질 | 3분 내 핵심 가치 전달 가능 |
| 코드 품질 | README + 주석으로 즉시 이해 가능 |
| 실사용 가능 | 본인이 실제 투자에 활용 |

### 9.2 직무 전환 성공 지표
| 지표 | 목표 |
|------|------|
| 기술 증명 | "데이터 수집-분석-AI-시각화 가능" |
| 도메인 이해 | "금융 비즈니스 맥락 이해" |
| 커뮤니케이션 | "비개발자에게 가치 설명 가능" |

---

## 10. 부록

### 10.1 참고 자료
- [yfinance 문서](https://github.com/ranaroussi/yfinance)
- [Groq API 문서](https://console.groq.com/docs)
- [Chart.js 문서](https://www.chartjs.org/docs/)

### 10.2 용어 정의
| 용어 | 정의 |
|------|------|
| 거래량 스파이크 | 20일 이동평균 대비 1.3x 이상 거래량 |
| 섹터 로테이션 | 자금이 특정 섹터로 이동하는 현상 |
| 국면 | 시장의 현재 상태 (상승/하락/횡보) |

---

*이 문서는 프로젝트 진행에 따라 업데이트됩니다.*


