import type { SortOption } from '../../types';
import { useFilterStore } from '../../store/filterStore';
import { Wrapper, Label, Select } from './SortDropdown.styles';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Item Name', value: 'name' },
  { label: 'Higher Price', value: 'price_high' },
  { label: 'Lower Price', value: 'price_low' },
];

export function SortDropdown() {
  const sort = useFilterStore((s) => s.sort);
  const setSort = useFilterStore((s) => s.setSort);

  return (
    <Wrapper>
      <Label id="sort-label">Sort</Label>
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
        aria-labelledby="sort-label"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}
