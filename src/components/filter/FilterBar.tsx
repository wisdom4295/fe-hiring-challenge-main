import { PricingOptionFilter } from './PricingOptionFilter';
import { PricingSlider } from './PricingSlider';
import { ResetButton } from './ResetButton';
import { Wrapper, Left, Right } from './FilterBar.styles';

export function FilterBar() {
  return (
    <Wrapper>
      <Left>
        <PricingOptionFilter />
      </Left>
      <Right>
        <ResetButton />
        <PricingSlider />
      </Right>
    </Wrapper>
  );
}
