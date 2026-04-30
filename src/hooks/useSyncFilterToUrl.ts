import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilterStore } from '../store/filterStore';

export function useSyncFilterToUrl() {
  const [, setSearchParams] = useSearchParams();

  const keyword = useFilterStore((s) => s.keyword);
  const selectedPricingOptions = useFilterStore((s) => s.selectedPricingOptions);
  const sort = useFilterStore((s) => s.sort);
  const priceMin = useFilterStore((s) => s.priceMin);
  const priceMax = useFilterStore((s) => s.priceMax);

  useEffect(() => {
    const params = new URLSearchParams();

    if (keyword) params.set('keyword', keyword);
    if (selectedPricingOptions.length > 0) params.set('pricing', selectedPricingOptions.join(','));
    if (sort !== 'name') params.set('sort', sort);
    if (priceMin !== 0) params.set('priceMin', String(priceMin));
    if (priceMax !== 999) params.set('priceMax', String(priceMax));

    setSearchParams(params, { replace: true });
  }, [keyword, selectedPricingOptions, sort, priceMin, priceMax, setSearchParams]);
}
