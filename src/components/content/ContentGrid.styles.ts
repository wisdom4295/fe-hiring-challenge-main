import styled from '@emotion/styled';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Kicker = styled.span`
  font-size: 11px;
  color: var(--subtle);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Meta = styled.span`
  font-size: 12px;
  color: var(--muted);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

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
  height: 40px;
`;
