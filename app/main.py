from fastapi import FastAPI, Body
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv
import json
import sys
import pandas as pd

# 현재 디렉토리를 Python path에 추가
sys.path.insert(0, str(Path(__file__).parent))

# 환경 변수 로드
load_dotenv()

from models.etf_analyzer import ETFAnalyzer
from models.sector_aggregator import SectorAggregator
from services.llm import explain

app = FastAPI(title="VolumeQuant Lite", version="0.2.0")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)

STATIC_DIR = Path(__file__).parent / "static"

# 전역 분석기 인스턴스
analyzer = ETFAnalyzer()
sector_aggregator = SectorAggregator()

@app.get("/")
def serve_index():
    return FileResponse(STATIC_DIR / "index.html")

@app.get("/api/analysis/full")
async def api_full_analysis(tickers: str = None, period: str = "1y"):
    """
    전체 ETF 거래량 분석
    ?tickers=XLK,XLF,XLE 형태로 특정 티커 지정 가능
    ?period=1y, 6mo, 3mo 등 기간 지정 가능
    """
    try:
        ticker_list = tickers.split(',') if tickers else None
        result = analyzer.run_full_pipeline(tickers=ticker_list, period=period)
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse(
            content={
                "error": True,
                "message": f"분석 중 오류가 발생했습니다: {str(e)}",
                "timestamp": __import__('datetime').datetime.now().isoformat()
            },
            status_code=500
        )

@app.get("/api/analysis/quick")
async def api_quick_scan(tickers: str = None):
    """
    빠른 스캔 (최근 5일 데이터)
    실시간 모니터링용
    """
    try:
        ticker_list = tickers.split(',') if tickers else None
        result = analyzer.quick_scan(tickers=ticker_list)
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse(
            content={
                "error": True,
                "message": f"빠른 스캔 중 오류가 발생했습니다: {str(e)}",
                "timestamp": __import__('datetime').datetime.now().isoformat()
            },
            status_code=500
        )

@app.get("/api/sectors")
async def api_sectors(period: str = "5d"):
    """
    섹터별 거래량 집계
    11개 섹터의 평균 거래량 스파이크 반환
    """
    try:
        # 섹터 ETF 데이터 수집
        from config.etf_universe import SECTOR_ETFS
        tickers = list(SECTOR_ETFS.keys())
        
        # 데이터 수집 및 분석
        df = analyzer.collector.fetch_multiple(tickers, period=period)
        df = analyzer.detector.calculate_volume_features(df)
        
        # 섹터 집계
        result = sector_aggregator.get_sector_summary(df)
        
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse(
            content={
                "error": True,
                "message": f"섹터 집계 중 오류 발생: {str(e)}",
                "timestamp": __import__('datetime').datetime.now().isoformat()
            },
            status_code=500
        )

@app.get("/api/ticker/{ticker}")
async def api_ticker_detail(ticker: str, period: str = "1y"):
    """
    특정 티커의 상세 데이터 반환
    - 가격/거래량 히스토리
    - 거래량 스파이크 이벤트 목록
    """
    try:
        # 데이터 수집
        df = analyzer.collector.fetch_multiple([ticker], period=period)
        if df.empty:
            return JSONResponse(
                content={
                    "error": True,
                    "message": f"티커 {ticker} 데이터를 찾을 수 없습니다.",
                },
                status_code=404
            )
        
        # 거래량 분석
        df = analyzer.detector.calculate_volume_features(df)
        
        # 히스토리 데이터 포맷팅
        history = []
        for _, row in df.iterrows():
            history.append({
                "date": row['Date'].strftime('%Y-%m-%d'),
                "open": float(row['Open']),
                "high": float(row['High']),
                "low": float(row['Low']),
                "close": float(row['Close']),
                "volume": int(row['Volume']),
                "volume_ma": float(row['Volume_MA']) if 'Volume_MA' in row and not pd.isna(row['Volume_MA']) else None,
                "volume_spike_ratio": float(row['Volume_Spike_Ratio']) if 'Volume_Spike_Ratio' in row and not pd.isna(row['Volume_Spike_Ratio']) else None,
            })
        
        # 스파이크 이벤트 탐지
        events = []
        for _, row in df.iterrows():
            if 'Volume_Spike_Ratio' in row and not pd.isna(row['Volume_Spike_Ratio']):
                ratio = row['Volume_Spike_Ratio']
                if ratio >= 1.5:  # MEDIUM 이상만
                    level = 'extreme' if ratio >= 2.5 else 'high' if ratio >= 2.0 else 'medium' if ratio >= 1.5 else 'alert'
                    events.append({
                        "date": row['Date'].strftime('%Y-%m-%d'),
                        "level": level,
                        "ratio": float(ratio),
                        "volume": int(row['Volume']),
                        "price": float(row['Close']),
                        "price_change": float(row['Close'] - row['Open'])
                    })
        
        # 최신 데이터
        latest = df.iloc[-1]
        
        result = {
            "ticker": ticker,
            "name": ticker,  # TODO: 실제 이름 매핑
            "latest": {
                "date": latest['Date'].strftime('%Y-%m-%d'),
                "price": float(latest['Close']),
                "volume": int(latest['Volume']),
                "volume_spike_ratio": float(latest['Volume_Spike_Ratio']) if not pd.isna(latest['Volume_Spike_Ratio']) else None,
                "price_change": float(latest['Close'] - latest['Open']),
                "price_change_pct": float((latest['Close'] - latest['Open']) / latest['Open'] * 100)
            },
            "history": history,
            "events": sorted(events, key=lambda x: x['date'], reverse=True)[:20]  # 최근 20개
        }
        
        return JSONResponse(result)
    except Exception as e:
        import traceback
        return JSONResponse(
            content={
                "error": True,
                "message": f"티커 상세 데이터 조회 중 오류 발생: {str(e)}",
                "traceback": traceback.format_exc(),
                "timestamp": __import__('datetime').datetime.now().isoformat()
            },
            status_code=500
        )

@app.get("/api/blob")
def api_blob():
    """레거시 엔드포인트 - 빠른 스캔으로 리다이렉트"""
    result = analyzer.quick_scan()
    return JSONResponse(result)

@app.post("/api/explain")
async def api_explain(payload: dict = Body(...)):
    if "blob" in payload:
        blob = payload["blob"]
        # 데이터 크기 축소: 핵심 정보만 추출
        summary_data = _create_summary_for_ai(blob)
        user_content = json.dumps(summary_data, ensure_ascii=False, indent=2)
    else:
        user_content = payload.get("text", "")
    result = await explain(user_content)
    return {"explanation": result}

def _create_summary_for_ai(data: dict) -> dict:
    """AI 전송용 요약 데이터 생성 (토큰 절약)"""
    summary = {}
    
    # 빠른 스캔 모드
    if data.get("mode") == "quick_scan":
        summary = {
            "mode": "quick_scan",
            "timestamp": data.get("timestamp", ""),
            "data": data.get("data", [])[:10]  # 최대 10개만
        }
    # 전체 분석 모드
    else:
        summary = {
            "mode": "full_analysis",
            "metadata": {
                "date_range": data.get("metadata", {}).get("date_range", {}),
                "tickers_analyzed": data.get("metadata", {}).get("tickers_analyzed", 0)
            },
            "summary": {
                "total_events": data.get("summary", {}).get("total_events", 0),
                "by_level": data.get("summary", {}).get("by_level", {}),
                "latest_events": data.get("summary", {}).get("latest_events", [])[:5]  # 최대 5개
            },
            "top_spikes": data.get("top_spikes", [])[:5]  # 최대 5개
        }
    
    return summary

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8002))  # 기본값 8002, 환경변수로 변경 가능
    uvicorn.run(app, host="0.0.0.0", port=port)
