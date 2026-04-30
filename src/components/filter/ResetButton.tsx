import { useFilterStore } from '../../store/filterStore';
import { Button } from './ResetButton.styles';

export function ResetButton() {
  const resetFilters = useFilterStore((s) => s.resetFilters);
  return (
    <Button onClick={resetFilters} aria-label="Reset all filters">
      Reset
    </Button>
  );
}
