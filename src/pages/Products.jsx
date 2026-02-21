// firestore:src/pages/Products.jsx
import { useMemo, useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import productsData from '../data/products';

function Stars({ rating = 0 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <Rating aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f${i}`} />
      ))}
      {hasHalf && <FaStarHalfAlt key='half' />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e${i}`} />
      ))}
    </Rating>
  );
}

function parsePrice(value) {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9.]/g, '')) || 0;
}

export default function Products() {
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const sorted = useMemo(() => {
    const arr = [...productsData];
    if (sort === 'price') {
      arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sort === 'rating') {
      arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return arr;
  }, [sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = sorted.slice((page - 1) * pageSize, page * pageSize);

  const goTo = (n) => {
    if (n < 1 || n > pageCount) return;
    setPage(n);
    // scroll to top of grid on page change
    document
      ?.getElementById('products-top')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrap>
      <SmallContainer id='products-top'>
        {/* Title + sort row */}
        <Row2>
          <H2>All Products</H2>
          <Select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            aria-label='Sort products'
          >
            <option value='default'>Default Sorting</option>
            <option value='price'>Sort by price</option>
            <option value='rating'>Sort by rating</option>
            {/* Placeholders to mirror original UI; wire up later if desired */}
            <option value='popularity' disabled>
              Sort by popularity
            </option>
            <option value='sale' disabled>
              Sort by sale
            </option>
          </Select>
        </Row2>

        {/* Product grid (4 across like original) */}
        <Grid>
          {current.map((p) => (
            <Card key={p.id}>
              <Link to={`/products/${p.id}`}>
                <img src={p.src} alt={p.title} />
              </Link>
              <h4>
                <Link to={`/products/${p.id}`}>{p.title}</Link>
              </h4>
              <Stars rating={p.rating} />
              <Price>{p.price}</Price>
            </Card>
          ))}
        </Grid>

        {/* Pagination */}
        <PageBtn>
          {Array.from({ length: pageCount }).map((_, i) => (
            <span
              key={i}
              role='button'
              tabIndex={0}
              aria-current={page === i + 1 ? 'page' : undefined}
              className={page === i + 1 ? 'active' : ''}
              onClick={() => goTo(i + 1)}
              onKeyDown={(e) => (e.key === 'Enter' ? goTo(i + 1) : null)}
            >
              {i + 1}
            </span>
          ))}
          {page < pageCount && (
            <span
              role='button'
              tabIndex={0}
              onClick={() => goTo(page + 1)}
              onKeyDown={(e) => (e.key === 'Enter' ? goTo(page + 1) : null)}
            >
              &#8594;
            </span>
          )}
        </PageBtn>
      </SmallContainer>
    </PageWrap>
  );
}

// styled-components
const PageWrap = styled.section`
  margin: 40px 0 70px;
`;

const SmallContainer = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 0 25px;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: space-between; /* title left, select right */
  align-items: center;
  margin: 50px 0 30px;
`;

const H2 = styled.h2`
  color: #555;
`;

const Select = styled.select`
  border: 1px solid #ff523b;
  padding: 5px 10px;
  outline: none;
  background: #fff;
  color: #555;
`;

const Grid = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Card = styled.div`
  flex-basis: 25%;
  padding: 10px;
  min-width: 200px;
  margin-bottom: 50px;
  transition: transform 0.5s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    display: block;
  }

  h4 {
    margin: 10px 0;
    color: #555;
    font-weight: normal;
  }

  a {
    color: #555;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    flex-basis: 45%;
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 0 10px;

  svg {
    width: 14px;
    height: 14px;
    color: #ff523b;
  }
`;

const Price = styled.p`
  font-size: 14px;
  color: #555;
`;

const PageBtn = styled.div`
  text-align: center;

  span {
    display: inline-block;
    border: 1px solid #ff523b;
    margin: 0 5px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    color: #555;
    user-select: none;
  }

  span.active,
  span:hover {
    background: #ff523b;
    color: #fff;
  }
`;
