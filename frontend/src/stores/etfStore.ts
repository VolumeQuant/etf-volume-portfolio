import { create } from 'zustand';
import type { ETFData } from '../types/etf';

interface ETFStore {
  etfs: ETFData[];
  loading: boolean;
  error: string | null;
  setETFs: (etfs: ETFData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useETFStore = create<ETFStore>((set) => ({
  etfs: [],
  loading: false,
  error: null,
  setETFs: (etfs) => set({ etfs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
