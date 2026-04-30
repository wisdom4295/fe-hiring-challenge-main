import styled from '@emotion/styled';

export const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 170px;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.35)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  transition: opacity 0.2s;
`;

export const Value = styled.span`
  color: #70767e;
  font-size: 11px;
  min-width: 36px;
  text-align: center;
`;

export const SliderContainer = styled.div`
  position: relative;
  flex: 1;
  height: 4px;
  background-color: #31353b;
  border-radius: 2px;
`;

export const RailBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: #31353b;
  border-radius: 2px;
`;

export const RailActive = styled.div`
  position: absolute;
  height: 100%;
  background-color: #79ecce;
  border-radius: 2px;
`;

export const Thumb = styled.input`
  position: absolute;
  width: 100%;
  height: 4px;
  top: 0;
  pointer-events: none;
  appearance: none;
  background: transparent;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #79ecce;
    cursor: pointer;
    pointer-events: all;
    border: 2px solid #111318;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #79ecce;
    cursor: pointer;
    pointer-events: all;
    border: 2px solid #111318;
  }
`;
