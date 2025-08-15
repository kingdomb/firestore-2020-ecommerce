// firestore:/src/pages/NotFound.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Wrap>
      <Card role='alert' aria-live='polite'>
        <H1>404</H1>
        <P>We couldn’t find that page.</P>
        <Actions>
          <Link className='btn' to='/'>
            Go Home
          </Link>
        </Actions>
      </Card>
    </Wrap>
  );
}

// styled-components
const Wrap = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(#fff, #ffd6d6);
  padding: 40px 0 70px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2rem 2.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

const H1 = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  margin: 0;
  color: #ff523b;
`;

const P = styled.p`
  color: #555;
  margin: 6px 0 18px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
