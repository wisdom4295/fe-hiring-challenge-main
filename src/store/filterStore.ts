import { create } from 'zustand';
import type { FilterState, PricingOptionValue, SortOption } from '../types/index.ts';

const DEFAULT_DISPLAY_COUNT = 20;

export const DEFAULT_FILTER: FilterState = {
  keyword: '',
  selectedPricingOptions: [],
  sort: 'name',
  priceMin: 0,
  priceMax: 999,
};

function parseUrlParams(): Partial<FilterState> {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get('keyword') ?? '';
  const sort = (params.get('sort') as SortOption) ?? 'name';
  const priceMin = Number(params.get('priceMin') ?? 0);
  const priceMax = Number(params.get('priceMax') ?? 999);
  const pricing = params.get('pricing');
  const selectedPricingOptions = pricing
    ? (pricing.split(',').map(Number) as PricingOptionValue[])
    : [];

  return { keyword, sort, priceMin, priceMax, selectedPricingOptions };
}

interface FilterStore extends FilterState {
  displayCount: number;

  setKeyword: (keyword: string) => void;
  togglePricingOption: (option: PricingOptionValue) => void;
  setSort: (sort: SortOption) => void;
  setPriceRange: (min: number, max: number) => void;
  loadMore: () => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...DEFAULT_FILTER,
  ...parseUrlParams(),
  displayCount: DEFAULT_DISPLAY_COUNT,

  setKeyword: (keyword) => set({ keyword, displayCount: DEFAULT_DISPLAY_COUNT }),
  togglePricingOption: (option) =>
    set((state) => {
      const exists = state.selectedPricingOptions.includes(option);
      const selectedPricingOptions = exists
        ? state.selectedPricingOptions.filter((o) => o !== option)
        : [...state.selectedPricingOptions, option];
      return { selectedPricingOptions, displayCount: DEFAULT_DISPLAY_COUNT };
    }),
  setSort: (sort) => set({ sort, displayCount: DEFAULT_DISPLAY_COUNT }),
  setPriceRange: (priceMin, priceMax) =>
    set({ priceMin, priceMax, displayCount: DEFAULT_DISPLAY_COUNT }),
  loadMore: () =>
    set((state) => ({ displayCount: state.displayCount + DEFAULT_DISPLAY_COUNT })),
  resetFilters: () =>
    set({ ...DEFAULT_FILTER, displayCount: DEFAULT_DISPLAY_COUNT }),
}));