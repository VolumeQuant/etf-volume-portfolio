# 변경 사항 로그

## 2024-12-04: 프로젝트 핵심 주제 및 업무 정의 명확화 🎯

### 변경 이유
- **문제**: 기존 문서가 기능 나열 중심으로, 핵심 주제와 업무 정의가 불명확
- **필요성**: "왜 이 프로젝트를 하는가?", "어떻게 구현하는가?"에 대한 명확한 정의 필요
- **목적**: 직무 전환 면접 및 프로젝트 의사결정의 기준점 마련

### 주요 변경사항

#### 1. 새로운 핵심 문서 3개 작성

```
기존 구조:
- PROJECT_SPEC.md (요구사항 나열)
- README.md (간단한 소개)

새로운 구조:
1. CORE_PURPOSE.md ⭐ (핵심 주제 정의)
2. WORK_DEFINITION.md ⭐ (업무 정의)
3. PROJECT_SPEC.md (요구사항 명세 - 개선)
```

#### 2. CORE_PURPOSE.md (신규 작성)

**내용**:
- **한 줄 정의**: "섹터 로테이션 시그널 자동 탐지 시스템"
- **문제 정의**: 개인 투자자가 겪는 실제 문제
- **솔루션**: 거래량 스파이크 탐지 + AI 뉴스 분석
- **프로젝트 목적**:
  - Primary: HTS 개발자 → AI/데이터 서비스 직무 전환
  - Secondary: 실제 투자 도구
  - Tertiary: 기술 학습
- **프로젝트 경계**: In Scope / Out of Scope 명확화
- **성공의 정의**: 측정 가능한 지표
- **프로젝트 철학**: 4대 원칙 (단순함, 데이터 중심, 규제 준수, 실사용)

**주요 섹션**:
```markdown
1. 프로젝트의 핵심 주제
2. 이 프로젝트를 하는 진짜 이유
3. 프로젝트의 경계 (Scope)
4. 성공의 정의
5. 프로젝트의 핵심 가정
6. 프로젝트 철학
7. 이 프로젝트의 최종 목표
8. 핵심 질문과 답변 (FAQ)
9. 요약: 이 프로젝트의 본질
```

#### 3. WORK_DEFINITION.md (신규 작성)

**내용**:
- **8개 핵심 업무 도메인** 정의:
  1. WD-1: 데이터 수집
  2. WD-2: 시그널 탐지
  3. WD-3: 데이터 저장
  4. WD-4: API 서비스
  5. WD-5: 프론트엔드
  6. WD-6: AI 인사이트
  7. WD-7: 알림 발송
  8. WD-8: 배포 운영

- **각 업무별 명세**:
  - 업무 목적
  - 책임 범위 (In/Out Scope)
  - 입력/출력 (Input/Output)
  - 구현 요구사항
  - 성공 기준 (Acceptance Criteria)
  - 에러 처리

- **업무 간 인터페이스**: 데이터 계약 (Data Contract)
- **업무 우선순위 로드맵**: Phase별 진행 계획
- **핵심 지표 (KPIs)**: 기술/비즈니스 지표

**예시 (WD-2: 시그널 탐지)**:
```python
# 알고리즘 명세
Volume_MA_20 = df.groupby('Ticker')['Volume'].rolling(20).mean()
Spike_Ratio = Volume / Volume_MA_20

# 이벤트 분류
if Spike_Ratio >= 2.5: "EXTREME"
elif Spike_Ratio >= 2.0: "HIGH"
elif Spike_Ratio >= 1.5: "MEDIUM"
elif Spike_Ratio >= 1.3: "ALERT"
```

#### 4. PROJECT_SPEC.md 대폭 개선

**변경 전**:
- 기능 나열 중심 (F1.1, F1.2, ...)
- 핵심 주제 불명확

**변경 후**:
- CORE_PURPOSE.md와 WORK_DEFINITION.md 참조
- 구체적인 기능 명세에 집중
- 현재 진행률 표시 (35%)
- Phase별 우선순위 명확화

**새로운 섹션**:
```markdown
1. 프로젝트 핵심 (Quick Reference)
2. 업무 구조 (8개 업무 상태)
3. 기능 요구사항 (Phase 1-3)
4. 비기능 요구사항
5. 기술 스택 (상세)
6. 데이터 모델
7. API 설계
8. 리스크 및 대응
9. 성공 기준
10. 다음 단계
11. 참고 문서
```

#### 5. README.md 개선

**변경 전**:
- 간단한 소개
- 기능 리스트
- 빠른 시작

**변경 후**:
- 문제-솔루션-가치 명확화
- 현재 진행률 시각화 (35%)
- 핵심 문서 링크 추가
- 상황별 문서 가이드
- 로드맵 시각화

**새로운 섹션**:
```markdown
## 📖 프로젝트 개요
  - 문제 (Problem)
  - 솔루션 (Solution)
  - 가치 (Value)

## 🎨 주요 기능
  - 현재 상태 (진행률)
  - 다음 마일스톤
  - 최종 목표

## 📚 문서 가이드
  - 처음 읽을 문서 (순서)
  - 참고 문서

## 🗓️ 로드맵 (시각화)
```

#### 6. INDEX.md (신규 작성)

**목적**: 문서 네비게이션 허브

**내용**:
- 문서 읽는 순서
- 문서 분류 (필수/참고/부가)
- 상황별 문서 가이드
- 문서 관계도
- 핵심 개념 빠른 참조
- 문서 업데이트 규칙

**상황별 가이드 예시**:
```
상황 1: "이 프로젝트가 뭔가요?"
  → README.md (3분)
  → CORE_PURPOSE.md (15분)

상황 2: "어떻게 구현하나요?"
  → WORK_DEFINITION.md (20분)
  → PROJECT_SPEC.md (20분)

상황 6: "면접 준비"
  → CORE_PURPOSE.md (핵심 주제)
  → WORK_DEFINITION.md (기술 역량)
  → ETF_UNIVERSE_RATIONALE.md (도메인 이해)
```

### 영향

#### 문서 구조
```
기존:
docs/
├── PROJECT_SPEC.md (기능 나열)
├── ROADMAP_REACT.md
├── ETF_UNIVERSE_RATIONALE.md
└── ETF_SELECTION_CRITERIA.md

신규:
docs/
├── INDEX.md ⭐ (네비게이션)
├── CORE_PURPOSE.md ⭐ (핵심 주제)
├── WORK_DEFINITION.md ⭐ (업무 정의)
├── PROJECT_SPEC.md (개선)
├── ROADMAP_REACT.md
├── ETF_UNIVERSE_RATIONALE.md
├── ETF_SELECTION_CRITERIA.md
├── QUICKSTART.md
└── CHANGES.md (본 파일)
```

#### 의사결정 기준 명확화

**기존**:
- "이 기능을 추가해야 하나?" → 모호한 판단

**신규**:
- CORE_PURPOSE.md의 "프로젝트 경계" 참조
- In Scope / Out of Scope 명확히 정의
- 4대 원칙으로 검증

**예시**:
```
Q: "개별 종목 분석 기능 추가?"
A: CORE_PURPOSE.md 참조 → Out of Scope
   "섹터 ETF만 분석, 개별 종목 제외"
```

#### 면접 준비 자료

**기존**:
- 산발적인 정보
- 핵심 메시지 불명확

**신규**:
- CORE_PURPOSE.md: "왜?" → 3분 안에 답변 가능
- WORK_DEFINITION.md: "어떻게?" → 기술 역량 증명
- ETF_UNIVERSE_RATIONALE.md: "도메인 이해" → 전문성 증명

### 작업 시간
- CORE_PURPOSE.md 작성: ~2시간
- WORK_DEFINITION.md 작성: ~2.5시간
- PROJECT_SPEC.md 개선: ~1시간
- README.md 개선: ~0.5시간
- INDEX.md 작성: ~0.5시간
- **총 소요 시간**: 약 6.5시간

### 다음 단계

1. **팀원/멘토 리뷰** (우선순위 높음)
   - CORE_PURPOSE.md 검토 요청
   - "핵심 주제가 명확한가?"
   - "프로젝트 철학에 동의하는가?"

2. **면접 준비**
   - CORE_PURPOSE.md 기반 3분 스크립트 작성
   - 핵심 질문 답변 준비

3. **구현 집중**
   - WD-5: 섹터 히트맵 개발 (최우선)
   - WORK_DEFINITION.md의 REQ-5.2 참조

4. **문서 유지보수**
   - 주간 회고 시 문서 업데이트
   - 변경 사항을 CHANGES.md에 기록

### 주요 인사이트

#### 1. "핵심 주제"가 먼저다
- 기능을 추가하기 전에 "이게 핵심 주제에 부합하는가?" 질문
- CORE_PURPOSE.md가 모든 의사결정의 기준

#### 2. "업무 정의"가 구현을 돕는다
- 업무별 책임과 범위가 명확하면 개발 속도 향상
- 인터페이스가 명확하면 통합 오류 감소

#### 3. "문서화"는 사후가 아닌 사전 작업
- 코드를 작성하기 전에 WORK_DEFINITION.md 작성
- 구현 중 혼란 방지

### 검증 방법

#### 문서 품질 체크리스트
- [ ] 비개발자가 CORE_PURPOSE.md를 읽고 이해 가능한가?
- [ ] WORK_DEFINITION.md만 보고 구현 시작 가능한가?
- [ ] INDEX.md로 원하는 정보를 3번 클릭 안에 찾을 수 있는가?
- [ ] README.md를 3분 안에 읽고 프로젝트 파악 가능한가?

#### 실전 테스트
- [ ] 면접관에게 CORE_PURPOSE.md 기반 3분 프레젠테이션
- [ ] 신규 개발자에게 WORK_DEFINITION.md 주고 30분 내 이해 확인
- [ ] 본인이 1주일 후 문서만 보고 컨텍스트 복구 가능한가?

---

## 2024-12-03: ETF 유니버스 재정의

### 변경 이유
- 기준 없이 ETF를 임의로 선정했던 문제 해결
- ETFdb.com의 표준 분류 체계 적용
- 벤치마크(지수) 추가 필요성

### 주요 변경사항

#### 1. ETF 유니버스 재구조화

**이전 (기준 불명확)**:
```python
SECTOR_ETFS = {...}  # 11개
INDUSTRY_ETFS = {...}  # 15개 (중복, 레버리지 포함)
ALL_ETFS = {**SECTOR_ETFS, **INDUSTRY_ETFS}  # 26개 혼재
```

**이후 (명확한 계층)**:
```python
# Tier 1: 시장 지수 (벤치마크)
MARKET_INDICES = {
    "SPY": "S&P 500",
    "QQQ": "NASDAQ-100",
    "DIA": "Dow Jones"
}

# Tier 2: 섹터 (GICS 11개)
SECTOR_ETFS = {...}  # XLK, XLF, XLV... (11개)

# Tier 3: 산업 (Phase 2)
INDUSTRY_ETFS = {...}  # SOXX, XBI... (10개)

# 현재 사용: 지수 3개 + 섹터 11개 = 14개
ALL_ETFS = {**MARKET_INDICES, **SECTOR_ETFS}
```

#### 2. 빠른 스캔 업데이트

**이전**:
```python
# 6개 (기준 불명확)
["XLK", "XLF", "XLE", "XLY", "SOXX", "ITB"]
```

**이후**:
```python
# 11개 (지수 3 + 주요 섹터 8)
[
    "SPY", "QQQ", "DIA",  # 벤치마크
    "XLK", "XLF", "XLV", "XLE", "XLY", "XLI", "XLP", "XLC"  # 섹터
]
```

#### 3. 제외된 ETF

| 티커 | 이유 |
|------|------|
| SOXX, ITB, KRE | 산업 레벨 → Phase 2로 이동 |
| NAIL, DPST | 레버리지 → 제외 |
| ARKK, ARKG | 테마형 → Phase 3로 이동 |
| IBB, XHB | 중복 → 제외 |

#### 4. 선정 기준 수립

| 기준 | 값 |
|------|-----|
| AUM | $1B 이상 |
| 거래량 | 1M shares/day 이상 |
| 비용비율 | 0.50% 이하 |
| 설립 기간 | 3년 이상 |

모든 선정 ETF가 기준 충족 확인.

#### 5. Frontend 변경

**HomePage.tsx**:
- 시장 지수 섹션 추가 (SPY, QQQ, DIA)
- 섹터 ETF와 구분하여 표시
- 지수는 파란 테두리로 강조

**예상 화면 구조**:
```
1. 섹터 히트맵 (11개)
2. 최근 거래량 스파이크 (Top 10)
3. 시장 지수 (3개) ← 새로 추가
4. 섹터 ETF 모니터링 (8개)
```

### 영향

#### API 응답 변경
- `/api/analysis/quick`: 6개 → 11개
- `/api/sectors`: 11개 (변경 없음)

#### Backend
- `etf_universe.py`: 26개 → 14개 (명확한 구조)
- `etf_analyzer.py`: 빠른 스캔 로직 업데이트

#### Frontend
- 자동으로 11개 표시 (기존 로직 활용)
- 지수/섹터 구분 표시

### 테스트 필요사항

1. ✅ Backend 재시작 후 API 테스트
   ```bash
   curl http://localhost:8000/api/analysis/quick
   # 11개 ETF 반환 확인
   ```

2. ✅ Frontend 새로고침
   - 시장 지수 3개 표시 확인
   - 섹터 ETF 8개 표시 확인
   - 총 11개 카드 확인

3. ✅ 섹터 히트맵 작동 확인
   - 여전히 11개 섹터 표시
   - 지수는 제외됨 (섹터가 아님)

### 문서

- ✅ `docs/ETF_SELECTION_CRITERIA.md` - 정량적 기준
- ✅ `docs/ETF_UNIVERSE_RATIONALE.md` - 선정 근거
- ✅ `docs/CHANGES.md` - 이 파일

### 다음 단계

1. 실제 데이터로 검증
2. README 업데이트
3. 백테스팅으로 유효성 검증


