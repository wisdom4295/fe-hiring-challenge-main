import { PricingOption } from '../../types';
import type { PricingOptionValue } from '../../types';
import { useFilterStore } from '../../store/filterStore';
import {
  Wrapper,
  Label,
  Options,
  CheckboxLabel,
  HiddenCheckbox,
  CustomCheckbox,
} from './PricingOptionFilter.styles';

const FILTER_OPTIONS: { label: string; value: PricingOptionValue }[] = [
  { label: 'Paid', value: PricingOption.PAID },
  { label: 'Free', value: PricingOption.FREE },
  { label: 'View Only', value: PricingOption.VIEW_ONLY },
];

export function PricingOptionFilter() {
  const selectedPricingOptions = useFilterStore((s) => s.selectedPricingOptions);
  const togglePricingOption = useFilterStore((s) => s.togglePricingOption);

  return (
    <Wrapper>
      <Label>Pricing</Label>
      <Options>
        {FILTER_OPTIONS.map((opt) => (
          <CheckboxLabel key={opt.value}>
            <HiddenCheckbox
              type="checkbox"
              checked={selectedPricingOptions.includes(opt.value)}
              onChange={() => togglePricingOption(opt.value)}
            />
            <CustomCheckbox checked={selectedPricingOptions.includes(opt.value)} />
            <span>{opt.label}</span>
          </CheckboxLabel>
        ))}
      </Options>
    </Wrapper>
  );
}
