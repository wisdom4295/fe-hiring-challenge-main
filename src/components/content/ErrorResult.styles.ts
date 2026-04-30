import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  gap: 14px;
`;

export const Icon = styled.div`
  font-size: 52px;
  color: var(--muted);
`;

export const Message = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: var(--text);
`;

export const Sub = styled.p`
  font-size: 13px;
  color: var(--subtle);
`;

export const RetryButton = styled.button`
  margin-top: 8px;
  padding: 8px 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(121, 236, 206, 0.08);
  }
`;
