import { useFilterStore } from '../../store/filterStore';
import { useFilteredContents } from '../../hooks/useFilteredContents';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { ContentCard } from './ContentCard';
import { SkeletonCard } from './SkeletonCard';
import { NoResult } from './NoResult';
import { ErrorResult } from './ErrorResult';
import {
  Section,
  Header,
  Kicker,
  Meta,
  Grid,
  LoadMoreTrigger,
  Spinner,
} from './ContentGrid.styles';

export function ContentGrid() {
  const loadMore = useFilterStore((s) => s.loadMore);
  const { isLoading, isError, refetch, displayedContents, hasMore, totalCount } =
    useFilteredContents();
  const triggerRef = useInfiniteScroll(loadMore, hasMore);

  if (isError) {
    return (
      <Section>
        <ErrorResult onRetry={refetch} />
      </Section>
    );
  }

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

      {hasMore && (
        <LoadMoreTrigger ref={triggerRef}>
          <Spinner />
        </LoadMoreTrigger>
      )}
    </Section>
  );
}
