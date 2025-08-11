// firesstore:/src/components/home/Testimonials.jsx
import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft, FaStar, FaRegStar } from 'react-icons/fa';

function StarRating({ value = 4 }) {
  return (
    <Rating aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) =>
        i < value ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
    </Rating>
  );
}

const data = [
  {
    copy: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    name: 'Sean Parker',
    avatar: '/images/user-1.png',
    rating: 4,
  },
  {
    copy: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    name: 'Mike Smith',
    avatar: '/images/user-2.png',
    rating: 4,
  },
  {
    copy: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    name: 'Mabel Joe',
    avatar: '/images/user-3.png',
    rating: 4,
  },
];

export default function Testimonials({ items = data }) {
  return (
    <Section>
      <SmallContainer>
        <Row>
          {items.map((t, idx) => (
            <Card key={idx}>
              <QuoteIcon>
                <FaQuoteLeft />
              </QuoteIcon>
              <Copy>{t.copy}</Copy>
              {/* Stars should be ABOVE the image */}
              <StarRating value={t.rating} />
              <Avatar src={t.avatar} alt={t.name} />
              <Name>{t.name}</Name>
            </Card>
          ))}
        </Row>
      </SmallContainer>
    </Section>
  );
}

/* ============ styled-components (below) ============ */

const Section = styled.section`
  padding-top: 100px;
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

const Card = styled.div`
  flex-basis: 30%;
  min-width: 250px;
  margin-bottom: 30px;

  /* Ensure vertical stacking so stars don't sit beside the image */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 40px 20px 40px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.5s;
  background: #fff;

  &:hover {
    transform: translateY(-10px);
  }
`;

const QuoteIcon = styled.div`
  display: inline-flex;
  font-size: 34px;
  line-height: 1;
  color: #ff523b;
`;

const Copy = styled.p`
  font-size: 12px;
  margin: 12px 0;
  color: #777;
`;

const Rating = styled.div`
  /* Block-level flex so the next element (img) wraps to next line */
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 0 10px;

  svg {
    color: #ff523b;
    width: 16px;
    height: 16px;
  }
`;

const Avatar = styled.img`
  display: block; /* avoid inline flow quirks */
  width: 50px;
  margin-top: 20px;
  border-radius: 50%;
`;

const Name = styled.h3`
  font-weight: 600;
  color: #555;
  font-size: 16px;
  margin-top: 10px;
`;
