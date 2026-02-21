// firesstore:/src/components/home/Offer.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Offer({
  eyebrow = 'Exclusively Available on FireStore',
  title = 'Smart Band 4',
  copy = `The Mi Smart Band 4 features a 39.9% larger (than Mi Band 3) AMOLED color full-touch display with adjustable brightness, so everything is clear as can be.`,
  ctaText = 'Buy Now →',
  ctaHref = '/cart',
  imageSrc = 'images/exclusive.png',
  imageAlt = 'Smart Band 4',
}) {
  return (
    <Section>
      <SmallContainer>
        <Row>
          <Col2>
            <img className='offer-img' src={imageSrc} alt={imageAlt} />
          </Col2>
          <Col2>
            <Eyebrow>{eyebrow}</Eyebrow>
            <H1>{title}</H1>
            <Small>{copy}</Small>
            <br />
            <Button to={ctaHref}>{ctaText}</Button>
          </Col2>
        </Row>
      </SmallContainer>
    </Section>
  );
}

const Section = styled.section`
  background: radial-gradient(#fff, #ffd6d6);
  margin-top: 80px;
  padding: 30px 0;
`;

const SmallContainer = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 0 25px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const Col2 = styled.div`
  flex-basis: 50%;
  min-width: 300px;

  @media (max-width: 600px) {
    flex-basis: 100%;
  }

  img.offer-img {
    max-width: 100%;
    padding: 50px;
  }
`;

const Eyebrow = styled.p`
  color: #555;
`;

const H1 = styled.h1`
  font-size: 50px;
  line-height: 60px;
  margin: 25px 0;
  color: #000;
`;

const Small = styled.small`
  color: #555;
  display: inline-block;
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
