// src/components/ProductsSection.jsx
import React from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

function Stars({ rating = 0 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <RatingRow aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f${i}`} />
      ))}
      {hasHalf && <FaStarHalfAlt key='half' />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e${i}`} />
      ))}
    </RatingRow>
  );
}

export default function ProductsSection({ title, products }) {
  return (
    <Section>
      <SmallContainer>
        <Title>{title}</Title>
        <Grid>
          {products.map((p) => (
            <Card key={p.id}>
              <a href={`/products/${p.id}`}>
                <img src={p.src} alt={p.title} />
              </a>
              <h4>
                <a href={`/products/${p.id}`}>{p.title}</a>
              </h4>
              <Stars rating={p.rating} />
              <p>{p.price}</p>
            </Card>
          ))}
        </Grid>
      </SmallContainer>
    </Section>
  );
}

// styled-components
const Section = styled.section`
  margin: 70px 0;
`;

const SmallContainer = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 0 25px;
`;

const Title = styled.h2`
  text-align: center;
  margin: 0 auto 80px;
  position: relative;
  line-height: 60px;
  color: #555;

  &::after {
    content: '';
    background: #ff523b;
    width: 80px;
    height: 5px;
    border-radius: 5px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Card = styled.div`
  flex-basis: 25%;
  padding: 10px;
  min-width: 200px;
  margin-bottom: 50px;
  transition: transform 0.5s;
  text-align: left;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    display: block;
  }

  h4 {
    margin: 10px 0;
    color: #555;
    font-weight: normal;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const RatingRow = styled.div`
  display: flex; /* block-level → forces next content to a new line */
  align-items: center;
  gap: 6px;
  margin: 6px 0 10px;

  svg {
    width: 14px;
    height: 14px;
    color: #ff523b;
  }
`;
