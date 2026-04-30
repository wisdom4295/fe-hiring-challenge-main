import { type ChangeEvent, useCallback } from 'react';
import { useFilterStore } from '../../store/filterStore';
import {
  HeaderWrapper,
  Logo,
  Meta,
  Dot,
  SearchWrapper,
  SearchInput,
  SearchMeta,
  SearchIcon,
} from './Header.styles';

export function Header() {
  return (
    <HeaderWrapper>
      <Logo aria-label="CLO-SET Connect">CONNECT</Logo>
      <Meta aria-hidden="true">
        <span>Storefront archive</span>
        <Dot />
        <span>Curated assets</span>
      </Meta>
    </HeaderWrapper>
  );
}

export function SearchBar() {
  const keyword = useFilterStore((s) => s.keyword);
  const setKeyword = useFilterStore((s) => s.setKeyword);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  return (
    <SearchWrapper role="search">
      <SearchInput
        type="text"
        placeholder="Find the items you're looking for"
        value={keyword}
        onChange={handleSearch}
        aria-label="Search by title or creator"
      />
      <SearchMeta aria-hidden="true">
        <span>Keyword search</span>
        <SearchIcon>⌕</SearchIcon>
      </SearchMeta>
    </SearchWrapper>
  );
}
