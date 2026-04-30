import styled from '@emotion/styled';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 6px;
  background: var(--panel);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

export const Badge = styled.div<{ isPaid: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  background: ${({ isPaid }) => (isPaid ? 'rgba(0,0,0,0.75)' : 'rgba(121,236,206,0.15)')};
  color: ${({ isPaid }) => (isPaid ? '#fff' : 'var(--accent)')};
  border: 1px solid ${({ isPaid }) => (isPaid ? 'rgba(255,255,255,0.1)' : 'rgba(121,236,206,0.3)')};
  backdrop-filter: blur(4px);
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const Title = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Creator = styled.p`
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
