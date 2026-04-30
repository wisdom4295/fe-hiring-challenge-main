import styled from '@emotion/styled';

export const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.35)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  transition: opacity 0.2s;
`;

export const Value = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  min-width: 38px;
  text-align: center;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 180px;
  height: 24px;
`;

export const RailBg = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 3px;
  background: #2a2e36;
  border-radius: 2px;
`;

export const RailActive = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
`;

export const Thumb = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  appearance: none;
  background: transparent;
  pointer-events: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--accent);
    pointer-events: auto;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(121, 236, 206, 0.4);
  }

  &::-webkit-slider-runnable-track {
    background: transparent;
    height: 3px;
  }
`;
