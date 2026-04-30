import { Wrapper, Icon, Message, Sub } from './NoResult.styles';

export function NoResult() {
  return (
    <Wrapper>
      <Icon>⌕</Icon>
      <Message>No results found</Message>
      <Sub>Try adjusting your filters or search keyword.</Sub>
    </Wrapper>
  );
}
