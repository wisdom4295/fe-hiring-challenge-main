import styled from '@emotion/styled';

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel);
  flex-wrap: wrap;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: var(--line);
`;
