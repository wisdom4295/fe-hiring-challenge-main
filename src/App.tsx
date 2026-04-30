import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Header, SearchBar } from './components/layout/Header';
import { FilterBar } from './components/filter/FilterBar';
import { SortDropdown } from './components/sort/SortDropdown';
import { ContentGrid } from './components/content/ContentGrid';
import { useSyncFilterToUrl } from './hooks/useSyncFilterToUrl';

const queryClient = new QueryClient();

function AppInner() {
  useSyncFilterToUrl();

  return (
    <AppWrapper>
      <Header />
      <Main>
        <Shell>
          <SearchBar />
          <FilterBar />
          <SortDropdown />
          <ContentGrid />
        </Shell>
      </Main>
    </AppWrapper>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppInner />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

const AppWrapper = styled.div`
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
`;

const Main = styled.main`
  padding: 24px 20px 40px;
`;

const Shell = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
