import { describe, it, expect } from 'vitest';
import {
  filterByKeyword,
  filterByPricingOptions,
  filterByPriceRange,
  sortContents,
  applyFilters,
} from '../utils/filterUtils';
import { PricingOption } from '../types';
import type { ContentItem } from '../types';

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
    pricingOption: PricingOption.PAID,
    imagePath: '',
    price: 50,
  },
  {
    id: '3',
    title: 'Green Coat',
    creator: 'Alice',
    pricingOption: PricingOption.FREE,
    imagePath: '',
    price: 0,
  },
  {
    id: '4',
    title: 'Yellow Skirt',
    creator: 'Charlie',
    pricingOption: PricingOption.VIEW_ONLY,
    imagePath: '',
    price: 0,
  },
  {
    id: '5',
    title: 'Pink Cardigan',
    creator: 'Bob',
    pricingOption: PricingOption.PAID,
    imagePath: '',
    price: 200,
  },
];

// filterByKeyword
describe('filterByKeyword', () => {
  it('키워드가 없으면 전체 반환', () => {
    expect(filterByKeyword(mockItems, '')).toHaveLength(5);
  });

  it('title 기준 검색', () => {
    const result = filterByKeyword(mockItems, 'dress');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('creator 기준 검색', () => {
    const result = filterByKeyword(mockItems, 'alice');
    expect(result).toHaveLength(2);
  });

  it('대소문자 구분 없이 검색', () => {
    const result = filterByKeyword(mockItems, 'RED');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('title + creator 모두 검색', () => {
    const result = filterByKeyword(mockItems, 'bob');
    expect(result).toHaveLength(2);
  });

  it('일치하는 결과 없으면 빈 배열 반환', () => {
    expect(filterByKeyword(mockItems, 'zzz')).toHaveLength(0);
  });
});

// filterByPricingOptions
describe('filterByPricingOptions', () => {
  it('선택 없으면 전체 반환', () => {
    expect(filterByPricingOptions(mockItems, [])).toHaveLength(5);
  });

  it('PAID만 선택', () => {
    const result = filterByPricingOptions(mockItems, [PricingOption.PAID]);
    expect(result).toHaveLength(3);
    result.forEach((item) => expect(item.pricingOption).toBe(PricingOption.PAID));
  });

  it('FREE만 선택', () => {
    const result = filterByPricingOptions(mockItems, [PricingOption.FREE]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('PAID + FREE 복합 선택', () => {
    const result = filterByPricingOptions(mockItems, [PricingOption.PAID, PricingOption.FREE]);
    expect(result).toHaveLength(4);
  });

  it('VIEW_ONLY만 선택', () => {
    const result = filterByPricingOptions(mockItems, [PricingOption.VIEW_ONLY]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('4');
  });
});

// filterByPriceRange
describe('filterByPriceRange', () => {
  it('PAID 미선택 시 가격 필터 미적용', () => {
    const result = filterByPriceRange(mockItems, [], 50, 100);
    expect(result).toHaveLength(5);
  });

  it('PAID 선택 시 가격 범위 필터 적용', () => {
    const result = filterByPriceRange(mockItems, [PricingOption.PAID], 50, 100);
    // PAID 중 50~100: id 1(100), id 2(50) 포함 / id 5(200) 제외
    // FREE, VIEW_ONLY는 통과
    expect(result).toHaveLength(4);
  });

  it('양 끝값 포함', () => {
    const result = filterByPriceRange(mockItems, [PricingOption.PAID], 100, 200);
    const paidResults = result.filter((i) => i.pricingOption === PricingOption.PAID);
    expect(paidResults.map((i) => i.id)).toContain('1'); // 100
    expect(paidResults.map((i) => i.id)).toContain('5'); // 200
  });

  it('PAID 아이템만 가격 필터 적용, FREE/VIEW_ONLY는 통과', () => {
    const result = filterByPriceRange(mockItems, [PricingOption.PAID], 100, 200);
    expect(result.find((i) => i.id === '3')).toBeDefined(); // FREE 통과
    expect(result.find((i) => i.id === '4')).toBeDefined(); // VIEW_ONLY 통과
  });
});

// sortContents
describe('sortContents', () => {
  it('name 정렬 - 알파벳순', () => {
    const result = sortContents(mockItems, 'name');
    expect(result[0].title).toBe('Blue Jacket');
    expect(result[1].title).toBe('Green Coat');
  });

  it('price_high 정렬 - PAID 높은가격순 → FREE → VIEW_ONLY', () => {
    const result = sortContents(mockItems, 'price_high');
    expect(result[0].id).toBe('5'); // 200
    expect(result[1].id).toBe('1'); // 100
    expect(result[2].id).toBe('2'); // 50
    expect(result[3].id).toBe('3'); // FREE
    expect(result[4].id).toBe('4'); // VIEW_ONLY
  });

  it('price_low 정렬 - FREE → PAID 낮은가격순 → VIEW_ONLY', () => {
    const result = sortContents(mockItems, 'price_low');
    expect(result[0].id).toBe('3'); // FREE
    expect(result[1].id).toBe('2'); // 50
    expect(result[2].id).toBe('1'); // 100
    expect(result[3].id).toBe('5'); // 200
    expect(result[4].id).toBe('4'); // VIEW_ONLY
  });
});

// applyFilters
describe('applyFilters', () => {
  it('복합 필터 - keyword + pricingOption', () => {
    const result = applyFilters(mockItems, {
      keyword: 'blue',
      selectedPricingOptions: [PricingOption.PAID],
      sort: 'name',
      priceMin: 0,
      priceMax: 999,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2'); // Blue Jacket / Bob / PAID
  });

  it('복합 필터 - keyword + priceRange', () => {
    const result = applyFilters(mockItems, {
      keyword: 'alice',
      selectedPricingOptions: [PricingOption.PAID],
      sort: 'name',
      priceMin: 0,
      priceMax: 150,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1'); // Red Dress / Alice / PAID / 100
  });

  it('필터 결과 없으면 빈 배열', () => {
    const result = applyFilters(mockItems, {
      keyword: 'zzz',
      selectedPricingOptions: [],
      sort: 'name',
      priceMin: 0,
      priceMax: 999,
    });
    expect(result).toHaveLength(0);
  });

  it('한 조건 변경이 다른 조건 해제하지 않음', () => {
    const base = {
      keyword: 'alice',
      selectedPricingOptions: [PricingOption.PAID, PricingOption.FREE],
      sort: 'name' as const,
      priceMin: 0,
      priceMax: 999,
    };
    const result = applyFilters(mockItems, base);
    // Alice의 PAID(Red Dress) + FREE(Green Coat) 둘 다 포함
    expect(result).toHaveLength(2);
  });

  it('Reset 후 초기 상태 - 전체 반환', () => {
    const result = applyFilters(mockItems, {
      keyword: '',
      selectedPricingOptions: [],
      sort: 'name',
      priceMin: 0,
      priceMax: 999,
    });
    expect(result).toHaveLength(5);
  });
});
