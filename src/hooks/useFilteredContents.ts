import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchContents } from '../api/contentApi';
import { useFilterStore } from '../store/filterStore';
import { applyFilters } from '../utils/filterUtils';
import type { FilterState } from '../types';

export function useFilteredContents() {
  const { data: allContents = [], isLoading } = useQuery({
    queryKey: ['contents'],
    queryFn: fetchContents,
    staleTime: Infinity,
  });

  const keyword = useFilterStore((s) => s.keyword);
  const selectedPricingOptions = useFilterStore((s) => s.selectedPricingOptions);
  const sort = useFilterStore((s) => s.sort);
  const priceMin = useFilterStore((s) => s.priceMin);
  const priceMax = useFilterStore((s) => s.priceMax);
  const displayCount = useFilterStore((s) => s.displayCount);

  const filter: FilterState = { keyword, selectedPricingOptions, sort, priceMin, priceMax };

  const filteredContents = useMemo(
    () => applyFilters(allContents, filter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allContents, keyword, selectedPricingOptions, sort, priceMin, priceMax]
  );

  const displayedContents = filteredContents.slice(0, displayCount);
  const hasMore = filteredContents.length > displayCount;

  return {
    isLoading,
    filteredContents,
    displayedContents,
    hasMore,
    totalCount: filteredContents.length,
  };
}