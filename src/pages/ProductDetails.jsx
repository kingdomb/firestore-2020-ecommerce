// firestore:src/pages/ProductDetails.jsx
import { useMemo, useState } from 'react'
import { FaIndent, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useToast } from '../context/ToastContext'
import products from '../data/products'
import { useCart } from '../hooks/useCart'

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

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { addToast } = useToast();

  const product = useMemo(() => {
    const found = products.find((p) => String(p.id) === String(id));
    return found || products[0];
  }, [id]);

  const [mainImg, setMainImg] = useState(
    product?.src || '/images/product-1.jpg'
  );

  // quantity state
  const [qty, setQty] = useState(1);
  const onQtyChange = (e) => {
    const n = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQty(n);
  };

  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);

  // Determine if product needs size (skip for watches, socks, etc)
  const needsSize = product && !/(watch|socks)/i.test(product.title);
  const isShoes = product && /shoes/i.test(product.title);

  // TODO replace with real gallery paths later
  const smallImages = [
    product?.src || '/images/product-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
  ];

  const isPlaceholder = (src) => {
    if (String(product?.id) === '1') return false;
    return (
      src.includes('gallery-2.jpg') ||
      src.includes('gallery-3.jpg') ||
      src.includes('gallery-4.jpg')
    );
  };

  // pick four related items (anything with a different id)
  const related = useMemo(
    () => products.filter((p) => p.id !== product.id).slice(0, 4),
    [product.id]
  );

  // Add to cart click handler (no navigation)
  const handleAddToCart = () => {
    if (needsSize && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    // ensure numeric price for cart math
    const price =
      typeof product.price === 'number'
        ? product.price
        : parseFloat(String(product.price || '0').replace(/[^0-9.]/g, '')) || 0;

    // Use variant ID so different sizes of the same product don't merge
    const cartItemId = selectedSize ? `${product.id}-${selectedSize}` : product.id;
    const cartItemTitle = selectedSize ? `${product.title} - ${selectedSize}` : product.title;

    addItem(
      {
        id: cartItemId,
        title: cartItemTitle,
        price,
        src: product.src,
      },
      qty
    );
    
    addToast(`Added ${qty} ${qty === 1 ? 'item' : 'items'} to your cart`);
  };

  return (
    <>
      <SmallContainer>
        <SingleProductWrapper>
          <Row>
            <Col2>
              <ImageWrapper>
                <MainImage
                  src={mainImg}
                  alt={product?.title || 'Product'}
                  id='ProductImg'
                />
                {isPlaceholder(mainImg) && (
                  <PlaceholderOverlay>
                    <svg viewBox='0 0 300 50'>
                      <text x='50%' y='50%' textAnchor='middle' dominantBaseline='middle' fill='black' fontWeight='bold' fontSize='28'>
                        Placeholder image
                      </text>
                    </svg>
                  </PlaceholderOverlay>
                )}
              </ImageWrapper>
              <SmallImgRow>
                {smallImages.map((src, idx) => (
                  <SmallImgCol key={idx} onClick={() => setMainImg(src)}>
                    <ImageWrapper>
                      <SmallImage
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                      />
                      {isPlaceholder(src) && (
                        <PlaceholderOverlay>
                          <svg viewBox='0 0 300 50'>
                            <text x='50%' y='50%' textAnchor='middle' dominantBaseline='middle' fill='black' fontWeight='bold' fontSize='28'>
                              Placeholder image
                            </text>
                          </svg>
                        </PlaceholderOverlay>
                      )}
                    </ImageWrapper>
                  </SmallImgCol>
                ))}
              </SmallImgRow>
            </Col2>

            <Col2>
              <Breadcrumb>
                <Link to='/'>Home</Link> / <Link to='/products'>Products</Link>
              </Breadcrumb>

              <ProductTitle>{product?.title || 'Product Title'}</ProductTitle>
              <Price>{product?.price || '$0.00'}</Price>

              {needsSize && (
                <>
                  <Select 
                    aria-label='Select size'
                    value={selectedSize}
                    onChange={(e) => {
                      setSelectedSize(e.target.value);
                      if (e.target.value) setSizeError(false);
                    }}
                    $hasError={sizeError}
                  >
                    <option value=''>Select Size</option>
                    {isShoes ? (
                      <>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                      </>
                    ) : (
                      <>
                        <option value='XXL'>XXL</option>
                        <option value='XL'>XL</option>
                        <option value='Large'>Large</option>
                        <option value='Medium'>Medium</option>
                        <option value='Small'>Small</option>
                      </>
                    )}
                  </Select>
                  {sizeError && <ErrorText>Please select a size before adding to cart.</ErrorText>}
                </>
              )}

              <QuantityInput
                type='number'
                value={qty}
                min={1}
                onChange={onQtyChange}
                aria-label='Quantity'
              />
              <AddButton type='button' onClick={handleAddToCart}>
                Add To Cart
              </AddButton>

              <DetailsHeading>
                PRODUCT DETAILS <FaIndent />
              </DetailsHeading>
              <DetailsText>
                Give your summer wardrobe a style upgrade with the HRX Men's
                Active T-shirt. Team it with shorts for your morning workout or
                denim for an evening out.
              </DetailsText>

              {typeof product?.rating === 'number' && (
                <Stars rating={product.rating} />
              )}
            </Col2>
          </Row>
        </SingleProductWrapper>
      </SmallContainer>

      {/* Related Products */}
      <SmallContainer>
        <Row2>
          <H2>Related Products</H2>
          <ViewMore to='/products'>View More</ViewMore>
        </Row2>

        <Grid>
          {related.map((p) => (
            <Card key={p.id}>
              <Link to={`/products/${p.id}`}>
                <img src={p.src} alt={p.title} />
              </Link>
              <h4>
                <Link to={`/products/${p.id}`}>{p.title}</Link>
              </h4>
              {typeof p.rating === 'number' && <Stars rating={p.rating} />}
              <PriceText>{p.price}</PriceText>
            </Card>
          ))}
        </Grid>
      </SmallContainer>
    </>
  );
}

/* ===========================
 styled-components (below)
 =========================== */
const SmallContainer = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 0 25px;
`;

const SingleProductWrapper = styled.div`
  margin-top: 80px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Col2 = styled.div`
  flex-basis: 50%;
  min-width: 300px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PlaceholderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.3);

  svg {
    width: 90%;
    height: auto;
  }
`;

const MainImage = styled.img`
  width: 100%;
  display: block;
`;

const SmallImgRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;

const SmallImgCol = styled.div`
  flex-basis: 24%;
  cursor: pointer;
`;

const SmallImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  display: block;
`;

const Breadcrumb = styled.p`
  color: #555;

  a {
    color: #555;
    text-decoration: none;
  }
`;

const ProductTitle = styled.h1`
  margin: 20px 0;
`;

const Price = styled.h4`
  margin: 20px 0;
  font-size: 22px;
  font-weight: bold;
`;

const Select = styled.select`
  display: block;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#dc2626' : '#ccc')};
  border-radius: 6px;
  font-family: inherit;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #ff523b;
  }
`;

const ErrorText = styled.p`
  color: #dc2626;
  font-size: 13px;
  margin-top: 6px;
  margin-bottom: 0;
  font-weight: 500;
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 40px;
  padding-left: 10px;
  font-size: 20px;
  margin: 10px 0;
  border: 1px solid #ff523b;

  &:focus {
    outline: none;
  }
`;

const AddButton = styled.button`
  display: inline-block;
  background: #ff523b;
  color: #fff;
  padding: 8px 30px;
  margin: 10px 0 10px 12px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: #563434;
  }
`;

const DetailsHeading = styled.h3`
  margin-top: 30px;
  color: #555;

  svg {
    vertical-align: middle;
    margin-left: 6px;
    color: #555;
  }
`;

const DetailsText = styled.p`
  color: #555;
  line-height: 1.6;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0 30px;
`;

const H2 = styled.h2`
  color: #555;
`;

const ViewMore = styled(Link)`
  color: #ff523b;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Grid = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 60px;
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

const PriceText = styled.p`
  font-size: 14px;
  color: #555;
`;
