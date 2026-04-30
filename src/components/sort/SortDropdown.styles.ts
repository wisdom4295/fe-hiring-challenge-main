import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const Select = styled.select`
  background: var(--panel);
  color: var(--text);
  border: 1px solid #2e333b;
  border-radius: 6px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  option {
    background: var(--panel);
  }
`;
