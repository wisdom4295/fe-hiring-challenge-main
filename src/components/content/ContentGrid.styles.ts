import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Section = styled.section`
  padding-bottom: 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

export const Kicker = styled.span`
  color: #e7ecef;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

export const Meta = styled.span`
  color: #6f757c;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const LoadMoreTrigger = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #2d3136;
  border-top: 3px solid #79ecce;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
