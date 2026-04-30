import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background: var(--panel-soft);
  border-radius: 6px;
  animation: ${pulse} 1.6s ease-in-out infinite;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Line = styled.div`
  height: 11px;
  background: var(--panel-soft);
  border-radius: 4px;
  animation: ${pulse} 1.6s ease-in-out infinite;
`;
