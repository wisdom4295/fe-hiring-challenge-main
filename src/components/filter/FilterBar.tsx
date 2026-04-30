import { PricingOptionFilter } from './PricingOptionFilter';
import { PricingSlider } from './PricingSlider';
import { ResetButton } from './ResetButton';
import { Wrapper, Left, Divider } from './FilterBar.styles';

export function FilterBar() {
  return (
    <Wrapper>
      <Left>
        <PricingOptionFilter />
        <Divider />
        <PricingSlider />
      </Left>
      <ResetButton />
    </Wrapper>
  );
}
