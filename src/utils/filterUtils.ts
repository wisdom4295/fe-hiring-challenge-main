import { PricingOption } from '../types';
import type { ContentItem, FilterState, PricingOptionValue } from '../types';

export function filterByKeyword(items: ContentItem[], keyword: string): ContentItem[] {
  if (!keyword.trim()) return items;
  const lower = keyword.toLowerCase();
  return items.filter(
    (item) => item.title.toLowerCase().includes(lower) || item.creator.toLowerCase().includes(lower)
  );
}

export function filterByPricingOptions(
  items: ContentItem[],
  selected: PricingOptionValue[]
): ContentItem[] {
  if (selected.length === 0) return items;
  return items.filter((item) => selected.includes(item.pricingOption));
}

export function filterByPriceRange(
  items: ContentItem[],
  selected: PricingOptionValue[],
  priceMin: number,
  priceMax: number
): ContentItem[] {
  if (!selected.includes(PricingOption.PAID)) return items;
  return items.filter((item) => {
    if (item.pricingOption !== PricingOption.PAID) return true;
    return item.price >= priceMin && item.price <= priceMax;
  });
}

export function sortContents(items: ContentItem[], sort: FilterState['sort']): ContentItem[] {
  /**
   * BE에서 FREE/VIEW_ONLY 아이템의 price가 0으로 내려옴
   * 숫자 정렬만 적용하면 FREE/VIEW_ONLY가 최저가로 분류되어 UX상 혼란을 줄 수 있음
   * 요구사항에 명시되진 않았으나, 구매 가능 여부 기준으로 정렬 우선순위를 부여함
   * Higher Price: PAID(높은가격순) → FREE → VIEW_ONLY(구매 불가, 항상 마지막)
   * Lower Price:  FREE → PAID(낮은가격순) → VIEW_ONLY(구매 불가, 항상 마지막)
   */

  const getHighPriority = (item: ContentItem) => {
    if (item.pricingOption === PricingOption.PAID) return 0;
    if (item.pricingOption === PricingOption.FREE) return 1;
    return 2; // VIEW_ONLY 항상 마지막
  };

  const getLowPriority = (item: ContentItem) => {
    if (item.pricingOption === PricingOption.FREE) return 0;
    if (item.pricingOption === PricingOption.PAID) return 1;
    return 2; // VIEW_ONLY 항상 마지막
  };

  return [...items].sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'price_high': {
        const priorityDiff = getHighPriority(a) - getHighPriority(b);
        if (priorityDiff !== 0) return priorityDiff;
        return b.price - a.price;
      }
      case 'price_low': {
        const priorityDiff = getLowPriority(a) - getLowPriority(b);
        if (priorityDiff !== 0) return priorityDiff;
        return a.price - b.price;
      }
      default:
        return 0;
    }
  });
}

export function applyFilters(items: ContentItem[], filter: FilterState): ContentItem[] {
  let result = filterByKeyword(items, filter.keyword);
  result = filterByPricingOptions(result, filter.selectedPricingOptions);
  result = filterByPriceRange(
    result,
    filter.selectedPricingOptions,
    filter.priceMin,
    filter.priceMax
  );
  result = sortContents(result, filter.sort);
  return result;
}
