import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useFilteredContents } from '../hooks/useFilteredContents';
import { useFilterStore } from '../store/filterStore';
import { PricingOption } from '../types';
import type { ContentItem } from '../types';

// API 모킹
vi.mock('../api/contentApi', () => ({
  fetchContents: vi.fn(),
}));

import { fetchContents } from '../api/contentApi';

const mockItems: ContentItem[] = [
  {
    id: '1',
    title: 'Red Dress',
    creator: 'Alice',
    pricingOption: PricingOption.PAID,
    imagePath: '',
    price: 100,
  },
  {
    id: '2',
    title: 'Blue Jacket',
    creator: 'Bob',
    pricingOption: PricingOption.FREE,
    imagePath: '',
    price: 0,
  },
  {
    id: '3',
    title: 'Green Coat',
    creator: 'Charlie',
    pricingOption: PricingOption.VIEW_ONLY,
    imagePath: '',
    price: 0,
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFilteredContents', () => {
  it('API 데이터 fetch 후 전체 반환', async () => {
    vi.mocked(fetchContents).mockResolvedValue(mockItems);
    useFilterStore.setState({
      keyword: '',
      selectedPricingOptions: [],
      sort: 'name',
      priceMin: 0,
      priceMax: 999,
      displayCount: 20,
    });

    const { result } = renderHook(() => useFilteredContents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.totalCount).toBe(3);
  });

  it('keyword 필터 적용', async () => {
    vi.mocked(fetchContents).mockResolvedValue(mockItems);
    useFilterStore.setState({
      keyword: 'alice',
      selectedPricingOptions: [],
      sort: 'name',
      priceMin: 0,
      priceMax: 999,
      displayCount: 20,
    });

    const { result } = renderHook(() => useFilteredContents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.totalCount).toBe(1);
    expect(result.current.filteredContents[0].id).toBe('1');
  });

  it('pricingOption 필터 적용', async () => {
    vi.mocked(fetchContents).mockResolvedValue(mockItems);
    useFilterStore.setState({
      keyword: '',
      selectedPricingOptions: [PricingOption.FREE],
      sort: 'name',
      priceMin: 0,
      priceMax: 999,
      displayCount: 20,
    });

    const { result } = renderHook(() => useFilteredContents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.totalCount).toBe(1);
    expect(result.current.filteredContents[0].id).toBe('2');
  });

  it('displayCount 기준으로 displayedContents 슬라이싱', async () => {
    vi.mocked(fetchContents).mockResolvedValue(mockItems);
    useFilterStore.setState({
      keyword: '',
      selectedPricingOptions: [],
      sort: 'name',
      priceMin: 0,
      priceMax: 999,
      displayCount: 2,
    });

    const { result } = renderHook(() => useFilteredContents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.displayedContents).toHaveLength(2);
    expect(result.current.hasMore).toBe(true);
  });

  it('전체 표시 시 hasMore false', async () => {
    vi.mocked(fetchContents).mockResolvedValue(mockItems);
    useFilterStore.setState({
      keyword: '',
      selectedPricingOptions: [],
      sort: 'name',
      priceMin: 0,
      priceMax: 999,
      displayCount: 20,
    });

    const { result } = renderHook(() => useFilteredContents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.hasMore).toBe(false);
  });
});
