import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Label = styled.span`
  color: #6e747d;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  white-space: nowrap;
`;

export const Options = styled.div`
  display: flex;
  gap: 16px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #dbe1e5;
  font-size: 13px;
  cursor: pointer;

  input[type='checkbox'] {
    accent-color: #79ecce;
    cursor: pointer;
  }
`;
