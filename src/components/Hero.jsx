// firestore:src/components/Hero.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Hero() {
  return (
    <HeaderHeroWrap>
      <Container>
        <HeroRow>
          <Col2>
            <Heading>
              Show Your Workout
              <br />
              Some Style!
            </Heading>
            <Text>
              “The Future Belongs To The Competent. Get Good, Get Better,
              <br />
              Be The Best!” – Brian Tracy
            </Text>
            <Button to='/products'>Explore Now →</Button>
          </Col2>
          <Col2>
            <img src='/images/image1.png' alt='Hero' />
          </Col2>
        </HeroRow>
      </Container>
    </HeaderHeroWrap>
  );
}

// styled-components
const HeaderHeroWrap = styled.section`
  background: radial-gradient(#fff, #ffd6d6);
  padding-top: 90px; /* space under the overlaid header on home */
`;

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 0 25px;
`;

const HeroRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 40px; /* slightly reduced; padding-top accounts for header */
`;

const Col2 = styled.div`
  flex-basis: 50%;
  min-width: 300px;
  text-align: left;

  img {
    max-width: 100%;
    padding: 50px 0;
  }
`;

const Heading = styled.h1`
  font-size: 50px;
  line-height: 60px;
  margin: 25px 0;
`;

const Text = styled.p`
  color: #555;
  line-height: 1.5;
`;

const Button = styled(Link)`
  display: inline-block;
  background: #ff523b;
  color: #fff;
  padding: 8px 30px;
  margin: 30px 0;
  border-radius: 30px;
  transition: background 0.5s;
  text-decoration: none;

  &:hover {
    background: #563434;
  }
`;
