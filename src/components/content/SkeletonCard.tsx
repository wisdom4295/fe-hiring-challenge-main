import { Card, ImageSkeleton, Info, Line } from './SkeletonCard.styles';

export function SkeletonCard() {
  return (
    <Card>
      <ImageSkeleton />
      <Info>
        <Line style={{ width: '65%' }} />
        <Line style={{ width: '40%' }} />
      </Info>
    </Card>
  );
}
