# 📋 ETF Pulse - 프로젝트 요구사항 정의서

**버전**: 2.0.0  
**작성일**: 2024-12-04  
**목표 완료일**: 2025-03-20 (3.5개월)

---

## 📚 문서 구조

이 프로젝트는 3개의 핵심 정의서로 구성됩니다:

1. **[CORE_PURPOSE.md](./CORE_PURPOSE.md)** - 핵심 주제 정의
   - "이 프로젝트는 무엇인가?"
   - "왜 이 프로젝트를 하는가?"
   - "성공의 정의는 무엇인가?"

2. **[WORK_DEFINITION.md](./WORK_DEFINITION.md)** - 업무 정의
   - "어떤 업무로 구성되는가?"
   - "각 업무의 책임과 범위는?"
   - "업무 간 인터페이스는?"

3. **PROJECT_SPEC.md (본 문서)** - 요구사항 명세
   - "구체적인 기능은?"
   - "기술 스택은?"
   - "일정은?"

---

## 1. 프로젝트 핵심 (Quick Reference)

### 1.1 한 줄 정의
> **"섹터 로테이션 시그널을 자동으로 탐지하여, 투자자에게 '지금 어느 섹터로 자금이 이동하고 있는가'를 알려주는 실시간 모니터링 시스템"**

*(상세: [CORE_PURPOSE.md](./CORE_PURPOSE.md) 참조)*

### 1.2 핵심 가치
| 항목 | 내용 |
|------|------|
| **문제** | 개인 투자자는 섹터 로테이션을 실시간으로 파악 불가 |
| **솔루션** | 거래량 스파이크 자동 탐지 + AI 뉴스 분석 |
| **가치** | 아침 3분 안에 시장 국면 파악 → 투자 타이밍 |
| **목적** | HTS 개발자 → AI/데이터 서비스 직무 전환 증명 |

### 1.3 핵심 원칙
- ⚠️ **투자 추천 절대 금지**: 데이터 전달만 (규제 준수)
- 🎯 **단순함 우선**: 3.5개월 내 프로덕션 수준 완성
- 📊 **데이터 중심**: 모든 판단은 수치 기반
- 🚀 **실사용 가능**: 본인이 30일 실제 사용

---

## 2. 업무 구조 (Work Breakdown)

### 2.1 핵심 업무 8개

*(상세: [WORK_DEFINITION.md](./WORK_DEFINITION.md) 참조)*

| ID | 업무 | 책임 | 상태 |
|----|------|------|------|
| **WD-1** | 데이터 수집 | ETF/뉴스 데이터 수집 | ✅ 완료 |
| **WD-2** | 시그널 탐지 | 거래량 스파이크 탐지 | ✅ 완료 |
| **WD-3** | 데이터 저장 | SQLite 영구 저장 | ⬜ 예정 |
| **WD-4** | API 서비스 | FastAPI RESTful | 🚧 진행중 |
| **WD-5** | 프론트엔드 | React 대시보드 | 🚧 진행중 |
| **WD-6** | AI 인사이트 | LLM 뉴스 요약 | ⬜ 예정 |
| **WD-7** | 알림 발송 | 텔레그램 봇 | ⬜ 예정 |
| **WD-8** | 배포 운영 | Vercel + Railway | ⬜ 예정 |

### 2.2 사용 시나리오

```
매일 아침 9시 (미국 장 마감 직후):

1. 텔레그램 알림 수신 (WD-7)
   "🔥 XLK (Technology) EXTREME 스파이크!"

2. 대시보드 접속 (WD-5)
   - 섹터 히트맵: Technology가 빨간색 (HOT)
   - 거래량 차트: 2.31배 스파이크 확인

3. AI 요약 읽기 (WD-6)
   "엔비디아 실적 호조로 반도체 섹터 전반 상승"

4. 판단 & 실행
   "기술주로 자금 이동 중 → QQQ 매수 타이밍"

⏱️ 소요 시간: 3분
```

---

## 3. 기능 요구사항 (Features)

### 3.1 현재 상태 (2024-12-04)

| 기능 영역 | 완료율 | 상태 |
|----------|--------|------|
| 데이터 수집 | 100% | ✅ |
| 시그널 탐지 | 100% | ✅ |
| 기본 API | 70% | 🚧 |
| React 프론트엔드 | 40% | 🚧 |
| 섹터 히트맵 | 0% | ⬜ |
| AI 인사이트 | 0% | ⬜ |
| 알림 시스템 | 0% | ⬜ |
| 배포 | 0% | ⬜ |
| **전체** | **35%** | 🚧 |

### 3.2 Phase 1: 핵심 기능 (Week 1-4) 🎯

**목표**: 섹터 히트맵 + 대시보드 v1

| ID | 기능 | 설명 | 우선순위 | 상태 |
|----|------|------|---------|------|
| **F1.1** | 섹터 히트맵 | 11개 섹터 HOT/COLD 시각화 | 🔴 필수 | ⬜ |
| **F1.2** | 거래량 차트 | Volume + MA_20 표시 | 🔴 필수 | ⬜ |
| **F1.3** | 가격 차트 | OHLC 캔들차트 | 🔴 필수 | ⬜ |
| **F1.4** | 이벤트 리스트 | 최근 스파이크 목록 | 🔴 필수 | ⬜ |
| **F1.5** | 티커 상세 페이지 | 개별 ETF 상세 분석 | 🔴 필수 | ⬜ |
| **F1.6** | 반응형 디자인 | 모바일 대응 | 🟡 중요 | ⬜ |
| **F1.7** | 로딩/에러 처리 | UX 개선 | 🔴 필수 | ⬜ |

### 3.3 Phase 2: 고급 기능 (Week 5-8)

**목표**: 뉴스 연동 + 알림

| ID | 기능 | 설명 | 우선순위 | 상태 |
|----|------|------|---------|------|
| **F2.1** | 뉴스 수집 | RSS 피드 크롤링 | 🟡 중요 | ⬜ |
| **F2.2** | AI 요약 | LLM 3줄 요약 | 🟡 중요 | ⬜ |
| **F2.3** | 뉴스-거래량 연동 | 연관 분석 | 🟡 중요 | ⬜ |
| **F2.4** | 텔레그램 알림 | EXTREME 자동 발송 | 🟢 선택 | ⬜ |
| **F2.5** | SQLite 저장 | 히스토리 영구화 | 🟡 중요 | ⬜ |
| **F2.6** | 백테스팅 | 전략 검증 | 🟢 선택 | ⬜ |

### 3.4 Phase 3: 폴리싱 & 배포 (Week 9-14)

**목표**: 프로덕션 배포 + 데모

| ID | 기능 | 설명 | 우선순위 | 상태 |
|----|------|------|---------|------|
| **F3.1** | 다크모드 | 테마 토글 | 🟡 중요 | ⬜ |
| **F3.2** | 애니메이션 | Framer Motion | 🟢 선택 | ⬜ |
| **F3.3** | Vercel 배포 | Frontend 배포 | 🔴 필수 | ⬜ |
| **F3.4** | Railway 배포 | Backend 배포 | 🔴 필수 | ⬜ |
| **F3.5** | PPT 제작 | 데모 자료 | 🔴 필수 | ⬜ |
| **F3.6** | 문서화 | README 완성 | 🔴 필수 | ⬜ |

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

### 5.1 프론트엔드
```json
{
  "framework": "React 18 + TypeScript",
  "build": "Vite",
  "state": "Zustand",
  "charts": "Recharts",
  "ui": "Tailwind CSS",
  "animation": "Framer Motion (선택)",
  "router": "React Router",
  "deploy": "Vercel"
}
```

### 5.2 백엔드
```python
{
  "framework": "FastAPI",
  "server": "Uvicorn",
  "data": ["pandas", "numpy"],
  "api": ["yfinance", "feedparser"],
  "ai": "Groq API (llama-3.1-8b-instant)",
  "db": "SQLite → PostgreSQL",
  "notification": "python-telegram-bot",
  "deploy": "Railway"
}
```

### 5.3 개발 도구
```yaml
version_control: Git + GitHub
ci_cd: GitHub Actions (선택)
testing: pytest + React Testing Library
linting: ruff (Python) + ESLint (TypeScript)
docs: Swagger (FastAPI 자동 생성)
monitoring: Sentry (선택)
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

*(상세: [WORK_DEFINITION.md - WD-4](./WORK_DEFINITION.md#5-업무-정의-wd-4-api-서비스-api-service) 참조)*

### 7.1 Phase 1 API (필수)

| Method | Endpoint | 설명 | 상태 |
|--------|----------|------|------|
| GET | `/api/analysis/quick` | 빠른 스캔 (최근 5일) | ✅ |
| GET | `/api/analysis/full` | 전체 분석 (1년) | ✅ |
| GET | `/api/sectors` | 섹터별 집계 | ✅ |
| GET | `/api/ticker/{ticker}` | 티커 상세 | ✅ |
| POST | `/api/explain` | AI 인사이트 | ✅ |

### 7.2 Phase 2 API (예정)

| Method | Endpoint | 설명 | 우선순위 |
|--------|----------|------|---------|
| GET | `/api/news/latest` | 최신 뉴스 | 🟡 중요 |
| GET | `/api/news/sector/{sector}` | 섹터별 뉴스 | 🟡 중요 |
| POST | `/api/alerts/subscribe` | 알림 구독 | 🟢 선택 |
| GET | `/api/history/{ticker}` | 히스토리 조회 | 🟡 중요 |

### 7.3 응답 형식

```json
{
  "success": true,
  "data": { /* 실제 데이터 */ },
  "metadata": {
    "timestamp": "2024-12-04T09:00:00Z",
    "execution_time_ms": 1250
  }
}
```

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

## 9. 성공 기준 (Definition of Success)

*(상세: [CORE_PURPOSE.md - 섹션 4](./CORE_PURPOSE.md#4-성공의-정의-success-criteria) 참조)*

### 9.1 프로젝트 완료 체크리스트

```markdown
Phase 1 (Week 4):
- [ ] 섹터 히트맵 작동
- [ ] 거래량/가격 차트 표시
- [ ] 대시보드 통합
- [ ] 반응형 디자인
- [ ] 본인이 실제 사용 시작

Phase 2 (Week 8):
- [ ] 뉴스 수집 작동
- [ ] AI 요약 생성
- [ ] 텔레그램 알림 (선택)
- [ ] SQLite 저장

Phase 3 (Week 14):
- [ ] Vercel 배포 완료
- [ ] Railway 배포 완료
- [ ] PPT 제작 완료
- [ ] 타겟 부서 데모 완료 🎯
```

### 9.2 기술 지표

| 지표 | 목표 | 현재 |
|------|------|------|
| API 응답 시간 | < 3초 | - |
| 프론트엔드 로딩 | < 3초 | - |
| AI 응답 시간 | < 5초 | - |
| 타입 에러 | 0개 | - |
| 테스트 커버리지 | > 50% | - |

### 9.3 직무 전환 성공 지표

| 항목 | 증명 방법 |
|------|----------|
| React + TypeScript | 타입 에러 0개, 컴포넌트 재사용 |
| FastAPI | RESTful API 설계, Swagger 문서 |
| LLM 활용 | 프롬프트 최적화, 응답 품질 |
| 금융 도메인 | GICS 섹터, 거래량 분석 설명 |
| 프로덕션 배포 | 실제 URL, 30일 안정 운영 |

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

## 11. 다음 단계 (Next Steps)

### 이번 주 (Week 1)
```bash
# 1. React 프로젝트 확인
cd frontend
npm install
npm run dev

# 2. Backend 테스트
cd ../app
python main.py

# 3. API 통신 확인
curl http://localhost:8002/api/sectors
```

### 집중 업무
1. **WD-5: 섹터 히트맵 개발** (최우선)
2. **WD-5: 거래량/가격 차트**
3. **WD-4: API 엔드포인트 보완**

---

## 12. 참고 문서

| 문서 | 용도 |
|------|------|
| [CORE_PURPOSE.md](./CORE_PURPOSE.md) | 프로젝트 본질 이해 |
| [WORK_DEFINITION.md](./WORK_DEFINITION.md) | 구현 업무 정의 |
| [ROADMAP_REACT.md](./ROADMAP_REACT.md) | 주간 타임라인 |
| [ETF_UNIVERSE_RATIONALE.md](./ETF_UNIVERSE_RATIONALE.md) | ETF 선정 근거 |
| [QUICKSTART.md](./QUICKSTART.md) | 빠른 시작 가이드 |

---

*이 문서는 프로젝트 진행에 따라 업데이트됩니다.*

**최종 업데이트**: 2024-12-04


