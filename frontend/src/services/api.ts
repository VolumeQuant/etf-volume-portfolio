import axios from 'axios';
import type { QuickScanResponse } from '../types/etf';
import type { SectorSummary } from '../types/sector';
import type { TickerDetail } from '../types/ticker';

const API_BASE_URL = 'http://localhost:8002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const etfApi = {
  getQuickScan: async (): Promise<QuickScanResponse> => {
    const response = await api.get<QuickScanResponse>('/analysis/quick');
    return response.data;
  },

  getFullAnalysis: async (period = '1y') => {
    const response = await api.get('/analysis/full', {
      params: { period }
    });
    return response.data;
  },
  
  getSectors: async (period = '5d'): Promise<SectorSummary> => {
    const response = await api.get<SectorSummary>('/sectors', {
      params: { period }
    });
    return response.data;
  },

  getTickerDetail: async (ticker: string, period = '1y'): Promise<TickerDetail> => {
    const response = await api.get<TickerDetail>(`/ticker/${ticker}`, {
      params: { period }
    });
    return response.data;
  },
};

export default api;
