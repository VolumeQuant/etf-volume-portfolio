# ETF 유니버스 선정 근거

**최종 업데이트**: 2024-12-03

---

## 🎯 왜 이 ETF들인가?

### 문제의식
> "거래량 스파이크를 보려면 어떤 ETF들을 모니터링해야 하나?"

**잘못된 접근** ❌:
- 유명한 ETF 무작정 추가
- 섹터와 산업 혼재
- 기준 없이 선정

**올바른 접근** ✅:
- 명확한 계층 구조
- 정량적 선정 기준
- 비교 가능성 (apples-to-apples)

---

## 📊 ETFdb.com 분류 체계 분석

### ETFdb.com의 분류

```
1. Asset Class (자산 클래스)
   ├─ Equity (주식)
   ├─ Fixed Income (채권)
   └─ Commodity (원자재)

2. Geography (지역)
   ├─ U.S. (미국)
   ├─ International (해외)
   └─ Emerging Markets (신흥)

3. Equity Focus (주식 세부)
   ├─ Broad Market (전체 시장)
   ├─ Sector (섹터) ← 우리 프로젝트 핵심
   └─ Industry (산업)
```

### 핵심: GICS 섹터 분류

**GICS (Global Industry Classification Standard)**
- S&P와 MSCI가 공동 개발
- **11개 섹터**로 구성
- 산업 표준 (전 세계 사용)

```
11개 섹터:
1. Technology (기술)
2. Financials (금융)
3. Health Care (의료)
4. Energy (에너지)
5. Consumer Discretionary (임의소비재)
6. Consumer Staples (필수소비재)
7. Industrials (산업재)
8. Communication Services (통신서비스)
9. Real Estate (부동산)
10. Materials (소재)
11. Utilities (유틸리티)
```

---

## 🏆 우리의 선택: SPDR Sector Select ETFs

### 왜 SPDR 시리즈인가?

| 기준 | SPDR | Vanguard | iShares |
|------|------|----------|---------|
| **벤치마크** | S&P 500 섹터 | MSCI | 혼재 |
| **일관성** | ✅ 동일 | ❌ 상이 | ❌ 상이 |
| **거래량** | ✅ 최고 | ⚠️ 중간 | ⚠️ 중간 |
| **비용** | 0.10% | 0.10% | 0.40% |
| **AUM** | ✅ 최대 | ⚠️ 중간 | ⚠️ 중간 |

**결론**: 
- ✅ 동일한 S&P 500 기반 → 비교 용이
- ✅ 압도적 거래량 → 유동성 최고
- ✅ 11개 전체 커버 → 완전성

### 실제 데이터 (2024년 기준)

| 티커 | 섹터 | AUM | 일평균 거래량 | 선정 |
|------|------|-----|-------------|------|
| XLK | Technology | $61B | 8M | ✅ |
| XLF | Financials | $42B | 60M | ✅ (최고 거래량) |
| XLV | Health Care | $38B | 8M | ✅ |
| XLE | Energy | $36B | 25M | ✅ |
| XLY | Consumer Disc. | $21B | 5M | ✅ |
| XLI | Industrials | $20B | 10M | ✅ |
| XLP | Consumer Staples | $17B | 12M | ✅ |
| XLC | Communication | $16B | 6M | ✅ |
| XLU | Utilities | $15B | 11M | ✅ |
| XLRE | Real Estate | $7B | 5M | ✅ |
| XLB | Materials | $6B | 6M | ✅ |

**모두 기준 충족**:
- AUM $1B 이상 ✅
- 거래량 1M 이상 ✅
- 비용비율 0.50% 이하 ✅

---

## 🚫 제외한 ETF와 이유

### 1. 레버리지 ETF
```python
# 제외
"NAIL": "Homebuilders 3x",
"DPST": "Regional Banks 3x",
```
**이유**: 
- 일일 리밸런싱으로 장기 추적 불가
- 변동성 왜곡
- 투자용이 아닌 단기 트레이딩용

### 2. 중복 ETF
```python
# 제외
"IBB": "Biotech",  # XBI와 중복
"XHB": "Homebuilders",  # ITB와 중복
```
**이유**: 동일 산업 중복

### 3. 테마 ETF
```python
# Phase 2로 이동
"ARKK": "Innovation",
"ARKG": "Genomics",
"TAN": "Solar Energy",
"JETS": "Airlines",
```
**이유**: 
- 섹터가 아닌 테마
- 비교 불가능 (다른 기준)
- Phase 1은 섹터 집중

### 4. 산업 ETF
```python
# Phase 2로 이동
"SOXX": "Semiconductors",
"ITB": "Homebuilders",
"KRE": "Regional Banks",
```
**이유**: 
- 섹터의 **하위 분류**
- Technology 섹터 내 Semiconductors 산업
- Phase 1은 섹터 레벨만

---

## 🎯 Phase별 구현 전략

### Phase 1: 섹터 분석 (현재) ✅
**목표**: 11개 섹터 로테이션 분석

```python
SECTOR_ETFS = {
    "XLK": "Technology",
    # ... 11개
}
```

**분석**:
- 섹터별 거래량 스파이크
- 섹터 간 자금 이동
- Hot/Cold 섹터 식별

### Phase 2: 산업 분석 (향후)
**목표**: 섹터 내 세부 산업 트렌드

```python
INDUSTRY_ETFS = {
    "SOXX": "Semiconductors",  # Tech 하위
    "XBI": "Biotech",          # Healthcare 하위
    # ...
}
```

**분석**:
- Technology 섹터 내에서
  - Semiconductors (SOXX) vs Software (IGV)
  - 어디가 더 강한지

### Phase 3: 지수 벤치마킹 (향후)
**목표**: 전체 시장 대비 성과

```python
MARKET_INDICES = {
    "SPY": "S&P 500",
    "QQQ": "NASDAQ-100",
}
```

---

## 📈 왜 "빠른 스캔"은 6개만?

### 현재 구현
```python
QUICK_SCAN_ETFS = ["XLK", "XLF", "XLE", "XLY", "XLV", "XLI"]
```

### 선정 기준
1. **거래량 TOP 6**
   - XLF: 60M (1위)
   - XLE: 25M (2위)
   - XLP: 12M (3위)
   - XLU: 11M (4위)
   - XLI: 10M (5위)
   - XLK: 8M (6위)

2. **시가총액 TOP 6**
   - XLK: $61B (1위)
   - XLF: $42B (2위)
   - XLV: $38B (3위)
   - XLE: $36B (4위)
   - XLY: $21B (5위)
   - XLI: $20B (6위)

3. **경제 대표성**
   - XLK (Tech): 혁신/성장
   - XLF (Financials): 금융시스템
   - XLE (Energy): 원자재/인플레
   - XLY (Consumer): 소비 심리
   - XLV (Healthcare): 방어적
   - XLI (Industrials): 경기 선행

**결론**: 6개로 미국 경제 전반 커버

---

## ✅ 검증 체크리스트

### 1. 정량적 기준
- [x] AUM $1B 이상: 모든 섹터 ETF 충족
- [x] 거래량 1M 이상: 모든 섹터 ETF 충족
- [x] 비용비율 0.50% 이하: 모두 0.10%
- [x] 설립 3년 이상: 모두 5년 이상

### 2. 정성적 기준
- [x] 대표성: GICS 11 섹터 완전 커버
- [x] 일관성: 모두 S&P 500 기반
- [x] 투명성: State Street 운용
- [x] 유동성: 매수-매도 스프레드 <0.05%

### 3. 분석 목적 부합성
- [x] 섹터 로테이션: ✅ 11개 섹터 비교
- [x] 거래량 분석: ✅ 일일 데이터
- [x] 시장 국면: ✅ 상대 강도 비교
- [x] 백테스팅: ✅ 장기 히스토리

---

## 🔄 향후 확장 가능성

### 추가 가능한 분석
1. **지역별**: 미국 외 시장
   - EFA (유럽), EEM (신흥)
2. **스타일별**: Value vs Growth
   - VTV (가치주), VUG (성장주)
3. **시총별**: Large Cap vs Small Cap
   - IWM (소형주) vs SPY (대형주)

### 유연한 구조
```python
# 분석 목적별 그룹화
ANALYSIS_GROUPS = {
    "sector_rotation": SECTOR_ETFS,      # 섹터 로테이션
    "industry_deep_dive": INDUSTRY_ETFS,  # 산업 상세
    "market_benchmark": MARKET_INDICES,   # 벤치마크
}
```

---

## 📚 참고 자료

1. **ETFdb.com**
   - https://etfdb.com/etf-screener/
   - 섹터/산업 분류 체계

2. **GICS 표준**
   - https://www.msci.com/gics
   - 글로벌 산업 분류 표준

3. **SPDR Sector ETFs**
   - https://www.ssga.com/us/en/individual/etfs
   - State Street 공식 페이지

4. **우리 프로젝트**
   - `docs/ETF_SELECTION_CRITERIA.md` - 정량적 기준
   - `app/config/etf_universe.py` - 실제 구현

---

**핵심 메시지**:
> "임의로 뽑은 게 아니라, ETFdb.com의 표준 분류체계를 따르고, 정량적 기준으로 검증한 ETF들입니다."

이렇게 면접에서 답변하면 됩니다! 🎯


