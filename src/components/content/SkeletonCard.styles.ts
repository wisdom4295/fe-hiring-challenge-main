import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const Card = styled.div`
  background-color: #16181c;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.02);
`;

export const ImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #262a30;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const Info = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Line = styled.div`
  height: 12px;
  background-color: #262a30;
  border-radius: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;
