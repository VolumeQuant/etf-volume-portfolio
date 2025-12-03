# 변경 사항 로그

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


