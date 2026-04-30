import styled from '@emotion/styled';

export const Card = styled.div`
  background: #16181c;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: #ececec;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 12px;
`;

export const TextGroup = styled.div`
  overflow: hidden;
`;

export const Title = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
  color: #e7ecef;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Creator = styled.p`
  font-size: 11px;
  color: #747b82;
`;

export const Price = styled.span<{ isFree: boolean }>`
  font-size: 14px;
  white-space: nowrap;
  color: ${({ isFree }) => (isFree ? '#79ecce' : '#ffffff')};
  font-weight: 700;
`;
