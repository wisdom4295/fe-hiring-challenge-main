import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Label = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const Options = styled.div`
  display: flex;
  gap: 8px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: var(--text);
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid rgba(121, 236, 206, 0.12);
  border-radius: 6px;
  transition:
    border-color 0.2s,
    background 0.2s;

  &:hover {
    border-color: var(--accent);
    background: rgba(121, 236, 206, 0.06);
  }
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;

export const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1.5px solid ${({ checked }) => (checked ? 'var(--accent)' : '#444')};
  background: ${({ checked }) => (checked ? 'var(--accent)' : 'transparent')};
  transition: all 0.15s;
  flex-shrink: 0;
`;
