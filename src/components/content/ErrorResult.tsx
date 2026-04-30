import { Wrapper, Icon, Message, Sub, RetryButton } from './ErrorResult.styles';

interface Props {
  onRetry: () => void;
}

export function ErrorResult({ onRetry }: Props) {
  return (
    <Wrapper role="alert" aria-live="polite">
      <Icon>⚠</Icon>
      <Message>Failed to load items</Message>
      <Sub>Something went wrong while fetching data.</Sub>
      <RetryButton onClick={onRetry}>Try again</RetryButton>
    </Wrapper>
  );
}
