// firestore:src/pages/Home.jsx
import React from 'react';
import styled from 'styled-components';
import ProductsSection from '../components/ProductsSection';
import products from '../data/products';

import Offer from '../components/home/Offer';
import Testimonials from '../components/home/Testimonials';
import Brands from '../components/home/Brands';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <>
      <Hero />

      <Categories>
        <SmallContainer>
          <CategoryRow>
            <Col3>
              <img src='images/category-1.jpg' alt='' />
            </Col3>
            <Col3>
              <img src='images/category-2.jpg' alt='' />
            </Col3>
            <Col3>
              <img src='images/category-3.jpg' alt='' />
            </Col3>
          </CategoryRow>
        </SmallContainer>
      </Categories>

      {/* Featured & Latest Products sections */}
      <ProductsSection
        title='Featured Products'
        products={products.slice(0, 4)}
      />
      <ProductsSection
        title='Latest Products'
        products={products.slice(4, 8)}
      />

      <Offer />
      <Testimonials />
      <Brands />
    </>
  );
}

// styled-components
const Categories = styled.div`
  margin: 70px 0;
`;

const SmallContainer = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 0 25px;
`;

const CategoryRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Col3 = styled.div`
  flex-basis: 30%;
  min-width: 250px;
  margin-bottom: 30px;

  img {
    width: 100%;
  }
`;
