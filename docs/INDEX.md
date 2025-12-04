# 📚 ETF Pulse - 문서 인덱스

**최종 업데이트**: 2024-12-04  
**프로젝트 진행률**: 35% (Week 1/14)

---

## 🎯 문서 읽는 순서 (처음 오신 분)

```
1. README.md (프로젝트 개요)
   ↓
2. CORE_PURPOSE.md (핵심 주제)
   ↓
3. WORK_DEFINITION.md (업무 정의)
   ↓
4. PROJECT_SPEC.md (요구사항 명세)
   ↓
5. QUICKSTART.md (빠른 시작)
```

---

## 📖 문서 분류

### 🔴 필수 문서 (Must Read)

#### 1. [README.md](../README.md)
- **목적**: 프로젝트 첫인상
- **내용**: 
  - 문제-솔루션-가치
  - 빠른 시작 방법
  - 주요 기능 개요
  - 진행 상태
- **대상**: 모든 사람
- **읽는 시간**: 3분

#### 2. [CORE_PURPOSE.md](./CORE_PURPOSE.md) ⭐
- **목적**: 프로젝트 본질 이해
- **내용**:
  - 핵심 주제 정의
  - 문제 정의 (Problem Statement)
  - 솔루션 & 가치 제안
  - 프로젝트 경계 (Scope)
  - 성공의 정의
  - 프로젝트 철학
- **대상**: 팀원, 면접관, 협업자
- **읽는 시간**: 15분

#### 3. [WORK_DEFINITION.md](./WORK_DEFINITION.md) ⭐
- **목적**: 구현 업무 명확화
- **내용**:
  - 8개 핵심 업무 정의
  - 업무별 책임과 범위
  - 입력/출력 명세
  - 업무 간 인터페이스
  - 우선순위 로드맵
- **대상**: 개발자, 기술 리드
- **읽는 시간**: 20분

#### 4. [PROJECT_SPEC.md](./PROJECT_SPEC.md)
- **목적**: 요구사항 명세서
- **내용**:
  - 기능 요구사항 (Features)
  - 비기능 요구사항 (Performance, Security)
  - API 설계
  - 데이터 모델
  - 기술 스택
  - 일정 & 마일스톤
- **대상**: PM, 개발자, QA
- **읽는 시간**: 20분

---

### 🟡 참고 문서 (Reference)

#### 5. [ROADMAP_REACT.md](./ROADMAP_REACT.md)
- **목적**: 3.5개월 주간 타임라인
- **내용**:
  - Week별 태스크
  - 시간 예상 (총 180시간)
  - 체크포인트
  - 리스크 관리
- **대상**: 프로젝트 관리자, 본인
- **읽는 시간**: 15분

#### 6. [ETF_UNIVERSE_RATIONALE.md](./ETF_UNIVERSE_RATIONALE.md)
- **목적**: ETF 선정 근거 설명
- **내용**:
  - GICS 11 섹터 분류
  - SPDR Sector ETFs 선정 이유
  - ETFdb.com 분류 체계
  - 제외한 ETF와 이유
- **대상**: 도메인 전문가, 면접관
- **읽는 시간**: 10분

#### 7. [ETF_SELECTION_CRITERIA.md](./ETF_SELECTION_CRITERIA.md)
- **목적**: ETF 정량적 선정 기준
- **내용**:
  - AUM, 거래량, 비용비율 기준
  - Tier 1-3 구조
  - 검증 방법
- **대상**: 데이터 분석가
- **읽는 시간**: 10분

#### 8. [QUICKSTART.md](./QUICKSTART.md)
- **목적**: 빠른 설치 및 실행
- **내용**:
  - 환경 설정
  - 의존성 설치
  - 실행 방법
  - 트러블슈팅
- **대상**: 신규 개발자
- **읽는 시간**: 5분

---

### 🟢 부가 문서 (Optional)

#### 9. [CHANGES.md](./CHANGES.md)
- **목적**: 변경 이력 추적
- **내용**: 버전별 변경 사항
- **대상**: 유지보수
- **읽는 시간**: 5분

#### 10. [SESSION_SUMMARY.md](./SESSION_SUMMARY.md)
- **목적**: 작업 세션 기록
- **내용**: 일일 작업 내역
- **대상**: 본인
- **읽는 시간**: 3분

---

## 🔍 상황별 문서 가이드

### 상황 1: "이 프로젝트가 뭔가요?"
```
→ README.md (3분)
→ CORE_PURPOSE.md (15분)
```

### 상황 2: "어떻게 구현하나요?"
```
→ WORK_DEFINITION.md (20분)
→ PROJECT_SPEC.md (20분)
```

### 상황 3: "지금 바로 실행하고 싶어요"
```
→ QUICKSTART.md (5분)
→ 터미널에서 실행
```

### 상황 4: "왜 이런 ETF를 선택했나요?"
```
→ ETF_UNIVERSE_RATIONALE.md (10분)
→ ETF_SELECTION_CRITERIA.md (10분)
```

### 상황 5: "일정이 어떻게 되나요?"
```
→ ROADMAP_REACT.md (15분)
→ PROJECT_SPEC.md - 섹션 3 (기능 요구사항)
```

### 상황 6: "면접 준비"
```
→ CORE_PURPOSE.md (핵심 주제)
→ WORK_DEFINITION.md (기술 역량)
→ ETF_UNIVERSE_RATIONALE.md (도메인 이해)
→ README.md (프레젠테이션)
```

---

## 📊 문서 관계도

```
                    ┌─────────────┐
                    │  README.md  │ ← 시작점
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌──────────────┐
│CORE_PURPOSE.md│  │WORK_DEFINITION│  │PROJECT_SPEC  │
│  (왜?)        │  │  (어떻게?)     │  │  (무엇?)     │
└───────┬───────┘  └───────┬───────┘  └──────┬───────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ROADMAP      │  │ ETF_UNIVERSE │  │ QUICKSTART   │
│ (언제?)      │  │ (데이터?)    │  │ (실행?)      │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🎯 핵심 개념 빠른 참조

### 프로젝트 본질
- **정의**: 섹터 로테이션 시그널 자동 탐지 시스템
- **문제**: 개인 투자자는 자금 이동을 실시간으로 파악 불가
- **솔루션**: 거래량 스파이크 탐지 + AI 뉴스 분석
- **가치**: 아침 3분 안에 시장 국면 파악

### 8대 핵심 업무
1. **WD-1**: 데이터 수집 (yfinance)
2. **WD-2**: 시그널 탐지 (거래량 스파이크)
3. **WD-3**: 데이터 저장 (SQLite)
4. **WD-4**: API 서비스 (FastAPI)
5. **WD-5**: 프론트엔드 (React)
6. **WD-6**: AI 인사이트 (Groq LLM)
7. **WD-7**: 알림 발송 (텔레그램)
8. **WD-8**: 배포 운영 (Vercel + Railway)

### 기술 스택
- **Frontend**: React 18 + TypeScript + Vite + Zustand + Recharts + Tailwind
- **Backend**: FastAPI + pandas + yfinance + Groq API
- **Database**: SQLite → PostgreSQL
- **Deploy**: Vercel (FE) + Railway (BE)

### 진행 상태
- ✅ 데이터 수집: 100%
- ✅ 시그널 탐지: 100%
- 🚧 API 서비스: 70%
- 🚧 프론트엔드: 40%
- ⬜ 나머지: 0%
- **전체**: 35%

---

## 📝 문서 업데이트 규칙

### 언제 업데이트?
- 새로운 기능 추가 시
- 아키텍처 변경 시
- 주요 결정 사항 발생 시
- 마일스톤 완료 시

### 어떻게 업데이트?
1. 변경 내용을 해당 문서에 반영
2. CHANGES.md에 이력 기록
3. INDEX.md (본 문서) 업데이트
4. README.md 진행률 업데이트

---

## 🔗 외부 링크

| 링크 | 설명 |
|------|------|
| [GitHub Repository](https://github.com/...) | 소스 코드 |
| [Vercel Deployment](https://etf-pulse.vercel.app) | 프론트엔드 배포 (예정) |
| [Railway API](https://api.etf-pulse.com) | 백엔드 API (예정) |

---

## 💬 문서 피드백

문서 개선 제안:
- GitHub Issues에 `docs` 라벨로 등록
- 또는 직접 PR 제출

---

**이 문서는 프로젝트의 네비게이션 허브입니다.**

*최종 업데이트: 2024-12-04*
