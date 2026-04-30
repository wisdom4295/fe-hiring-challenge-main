import { useMemo } from 'react';
import { PricingOption } from '../../types';
import type { ContentItem } from '../../types';
import { Card, ImageWrapper, Info, TextGroup, Title, Creator, Price } from './ContentCard.styles';

interface Props {
  item: ContentItem;
}

export function ContentCard({ item }: Props) {
  const priceLabel = useMemo(() => {
    if (item.pricingOption === PricingOption.FREE) return 'FREE';
    if (item.pricingOption === PricingOption.VIEW_ONLY) return 'View Only';
    return `$${item.price.toFixed(2)}`;
  }, [item.pricingOption, item.price]);

  const isFree = item.pricingOption !== PricingOption.PAID;

  return (
    <Card>
      <ImageWrapper>
        <img src={item.imagePath} alt={item.title} loading="lazy" />
      </ImageWrapper>
      <Info>
        <TextGroup>
          <Title>{item.title}</Title>
          <Creator>{item.creator}</Creator>
        </TextGroup>
        <Price isFree={isFree}>{priceLabel}</Price>
      </Info>
    </Card>
  );
}
