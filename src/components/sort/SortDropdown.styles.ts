import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Label = styled.span`
  color: #70767e;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
`;

export const Select = styled.select`
  min-width: 130px;
  background: transparent;
  color: #e7ecef;
  border: none;
  border-bottom: 1px solid rgba(121, 236, 206, 0.24);
  border-radius: 0;
  padding: 6px 18px 6px 8px;
  font-size: 13px;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #79ecce;
  }

  option {
    background: #16181c;
  }
`;
