import { useFilterStore } from '../../store/filterStore';

import { ContentCard } from './ContentCard';
import { SkeletonCard } from './SkeletonCard';
import { NoResult } from './NoResult';
import { Section, Header, Kicker, Meta, Grid, LoadMoreTrigger } from './ContentGrid.styles';
import { useFilteredContents } from '../../hooks/useFilteredContents.ts';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts';

export function ContentGrid() {
  const loadMore = useFilterStore((s) => s.loadMore);
  const { isLoading, displayedContents, hasMore, totalCount } = useFilteredContents();
  const triggerRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <Section>
      <Header>
        <Kicker>Store selection</Kicker>
        <Meta>{totalCount} items</Meta>
      </Header>

      {!isLoading && totalCount === 0 ? (
        <NoResult />
      ) : (
        <Grid>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : displayedContents.map((item) => <ContentCard key={item.id} item={item} />)}
        </Grid>
      )}

      {hasMore && <LoadMoreTrigger ref={triggerRef} />}
    </Section>
  );
}
