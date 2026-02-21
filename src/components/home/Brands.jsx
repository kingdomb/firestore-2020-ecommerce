// firesstore:/src/components/home/Brands.jsx
import React from 'react';
import styled from 'styled-components';

export default function Brands({ items = logos, links = [] }) {
  return (
    <Section>
      <SmallContainer>
        <Row>
          {items.map((src, i) => {
            const content = <img src={src} alt={`Brand ${i + 1}`} />;
            return (
              <Col5 key={src}>
                {links[i] ? <a href={links[i]}>{content}</a> : content}
              </Col5>
            );
          })}
        </Row>
      </SmallContainer>
    </Section>
  );
}

const Section = styled.section`
  margin: 100px auto;
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

const Col5 = styled.div`
  width: 160px;
  margin: 10px 0;

  img {
    width: 100%;
    cursor: pointer;
    filter: grayscale(100%);
    transition: filter 0.2s ease-out;
  }

  img:hover {
    filter: grayscale(0);
  }
`;

const logos = [
  'images/logo-godrej.png',
  'images/logo-oppo.png',
  'images/logo-coca-cola.png',
  'images/logo-paypal.png',
  'images/logo-philips.png',
];
