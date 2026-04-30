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
