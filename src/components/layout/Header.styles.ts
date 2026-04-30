import styled from '@emotion/styled';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 22px 28px 18px;
  border-bottom: 1px solid var(--line);
  background: rgba(3, 4, 5, 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #6ff2d0, #3ec8d7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 14px rgba(121, 236, 206, 0.55);
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 76px;
  padding: 0 24px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel);
`;

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 15px;
  padding: 18px 0;
  outline: none;

  &::placeholder {
    color: var(--subtle);
  }
`;

export const SearchMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const SearchIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 15px;
  border: 1px solid rgba(121, 236, 206, 0.18);
  border-radius: 999px;
`;
