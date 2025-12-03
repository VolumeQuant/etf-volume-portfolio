"""
ETF 유니버스 정의

선정 기준:
- AUM $1B 이상
- 평균 거래량 1M shares 이상
- 비용비율 0.50% 이하
- 설립 3년 이상

참고: docs/ETF_SELECTION_CRITERIA.md
"""

# ============================================
# Tier 1: 시장 지수 (Phase 2 구현 예정)
# ============================================
MARKET_INDICES = {
    "SPY": "S&P 500",
    "QQQ": "NASDAQ-100",
    "DIA": "Dow Jones Industrial Average"
}

# ============================================
# Tier 2: 섹터 ETF (현재 구현) - GICS 11 Sectors
# ============================================
# SPDR Sector Select ETFs (State Street)
# - S&P 500 기반 일관된 방법론
# - 높은 AUM 및 유동성
# - 섹터 로테이션 분석 최적화
SECTOR_ETFS = {
    "XLK": "Technology",                    # AUM: $60B+, Vol: 8M+
    "XLF": "Financials",                    # AUM: $42B+, Vol: 60M+
    "XLV": "Health Care",                   # AUM: $38B+, Vol: 8M+
    "XLE": "Energy",                        # AUM: $36B+, Vol: 25M+
    "XLY": "Consumer Discretionary",        # AUM: $21B+, Vol: 5M+
    "XLI": "Industrials",                   # AUM: $20B+, Vol: 10M+
    "XLP": "Consumer Staples",              # AUM: $17B+, Vol: 12M+
    "XLC": "Communication Services",        # AUM: $16B+, Vol: 6M+
    "XLRE": "Real Estate",                  # AUM: $7B+, Vol: 5M+
    "XLB": "Materials",                     # AUM: $6B+, Vol: 6M+
    "XLU": "Utilities"                      # AUM: $15B+, Vol: 11M+
}

# ============================================
# Tier 3: 주요 산업 ETF (Phase 2 구현 예정)
# ============================================
# 섹터의 하위 산업별 상세 분석용
INDUSTRY_ETFS = {
    # Technology 하위
    "SOXX": "Semiconductors",               # AUM: $10B+
    "SKYY": "Cloud Computing",              # AUM: $2.5B
    "HACK": "Cybersecurity",                # AUM: $2B
    
    # Financials 하위
    "KRE": "Regional Banks",                # AUM: $6B+
    
    # Health Care 하위
    "XBI": "Biotechnology",                 # AUM: $6B+
    "IHI": "Medical Devices",               # AUM: $3B
    
    # Consumer Discretionary 하위
    "XRT": "Retail",                        # AUM: $500M+
    "ITB": "Homebuilders",                  # AUM: $2B+
    
    # Energy 하위
    "ICLN": "Clean Energy",                 # AUM: $5B+
    
    # Industrials 하위
    "IYT": "Transportation"                 # AUM: $1.5B
}

# ============================================
# 현재 사용 중인 유니버스 (Phase 1)
# ============================================
# 지수 3개 + 섹터 11개 = 총 14개
ALL_ETFS = {**MARKET_INDICES, **SECTOR_ETFS}

# 빠른 스캔용 (지수 3개 + 주요 섹터 8개 = 11개)
# - 지수: 벤치마크 역할
# - 섹터: 거래량/시총 상위
QUICK_SCAN_ETFS = [
    # 시장 지수 (벤치마크)
    "SPY", "QQQ", "DIA",
    # 주요 섹터 (거래량 & 시총 TOP 8)
    "XLK",   # Technology
    "XLF",   # Financials
    "XLV",   # Health Care
    "XLE",   # Energy
    "XLY",   # Consumer Discretionary
    "XLI",   # Industrials
    "XLP",   # Consumer Staples
    "XLC"    # Communication Services
]

# 거래량 이벤트 탐지 설정
VOLUME_SPIKE_THRESHOLDS = {
    "extreme": 2.5,      # 250% 이상 (극단적 폭증)
    "high": 2.0,         # 200% 이상 (강한 폭증)
    "medium": 1.5,       # 150% 이상 (중간 폭증)
    "alert": 1.3         # 130% 이상 (주의)
}

# 분석 기간 설정
LOOKBACK_DAYS = 252      # 1년 (트레이딩 일수)
MA_PERIOD = 20           # 20일 이동평균
EVENT_HISTORY_DAYS = 30  # 최근 30일 이벤트 추적

