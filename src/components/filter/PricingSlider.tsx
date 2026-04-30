import { PricingOption } from '../../types';
import { useFilterStore } from '../../store/filterStore';
import { Wrapper, Value, SliderContainer, RailBg, RailActive, Thumb } from './PricingSlider.styles';

export function PricingSlider() {
  const selectedPricingOptions = useFilterStore((s) => s.selectedPricingOptions);
  const priceMin = useFilterStore((s) => s.priceMin);
  const priceMax = useFilterStore((s) => s.priceMax);
  const setPriceRange = useFilterStore((s) => s.setPriceRange);

  const isActive = selectedPricingOptions.includes(PricingOption.PAID);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), priceMax - 1);
    setPriceRange(value, priceMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), priceMin + 1);
    setPriceRange(priceMin, value);
  };

  const minPercent = (priceMin / 999) * 100;
  const maxPercent = (priceMax / 999) * 100;

  return (
    <Wrapper isActive={isActive}>
      <Value>${priceMin}</Value>
      <SliderContainer>
        <RailBg />
        <RailActive style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }} />
        <Thumb
          type="range"
          min={0}
          max={999}
          value={priceMin}
          onChange={handleMinChange}
          disabled={!isActive}
          style={{ zIndex: priceMin > 900 ? 5 : 3 }}
        />
        <Thumb
          type="range"
          min={0}
          max={999}
          value={priceMax}
          onChange={handleMaxChange}
          disabled={!isActive}
          style={{ zIndex: 4 }}
        />
      </SliderContainer>
      <Value>${priceMax}</Value>
    </Wrapper>
  );
}
