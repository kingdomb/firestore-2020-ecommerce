// firestore:src/pages/ProductDetails.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Styled components
const SmallContainer = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 0 25px;
`

const SingleProductWrapper = styled.div`
  margin-top: 80px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Col2 = styled.div`
  flex-basis: 50%;
  min-width: 300px;
  padding: 20px;
`

const MainImage = styled.img`
  width: 100%;
`

const SmallImgRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const SmallImgCol = styled.div`
  flex-basis: 24%;
  cursor: pointer;
`

const SmallImage = styled.img`
  width: 100%;
`

const Breadcrumb = styled.p`
  color: #555;
`

const ProductTitle = styled.h1`
  margin: 20px 0;
`

const Price = styled.h4`
  margin: 20px 0;
  font-size: 22px;
  font-weight: bold;
`

const Select = styled.select`
  display: block;
  padding: 10px;
  margin-top: 20px;
`

const QuantityInput = styled.input`
  width: 50px;
  height: 40px;
  padding-left: 10px;
  font-size: 20px;
  margin: 10px 0;
  border: 1px solid #ff523b;
  &:focus { outline: none; }
`

const AddButton = styled.a`
  display: inline-block;
  background: #ff523b;
  color: #fff;
  padding: 8px 30px;
  margin: 10px 0;
  border-radius: 30px;
  text-decoration: none;
  transition: background 0.5s;
  &:hover { background: #563434; }
`

const DetailsHeading = styled.h3`
  margin-top: 30px;
  color: #555;
`

const DetailsText = styled.p`
  color: #555;
  line-height: 1.6;
`

export default function ProductDetails() {
  const [mainImg, setMainImg] = useState('/images/product-1.jpg')
  const smallImages = [
    '/images/product-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
  ]

  return (
    <>
      <Header />

      <SmallContainer>
        <SingleProductWrapper>
          <Row>
            <Col2>
              <MainImage src={mainImg} alt="Product" id="ProductImg" />
              <SmallImgRow>
                {smallImages.map((src, idx) => (
                  <SmallImgCol key={idx}>
                    <SmallImage
                      src={src}
                      alt="Thumbnail"
                      onClick={() => setMainImg(src)}
                    />
                  </SmallImgCol>
                ))}
              </SmallImgRow>
            </Col2>
            <Col2>
              <Breadcrumb>Home / T-Shirt</Breadcrumb>
              <ProductTitle>Blue Tshirt by HRX</ProductTitle>
              <Price>$50.00</Price>

              <Select>
                <option>Select Size</option>
                <option>XXL</option>
                <option>XL</option>
                <option>Large</option>
                <option>Medium</option>
                <option>Small</option>
              </Select>

              <QuantityInput type="number" defaultValue={1} />
              <AddButton href="/cart">Add To Cart</AddButton>

              <DetailsHeading>
                PRODUCT DETAILS <i className="fa fa-indent"></i>
              </DetailsHeading>
              <DetailsText>
                Give your summer wardrobe a style upgrade with the HRX Men's Active
                T-shirt. Team it with a pair of shorts for your morning workout or a
                denim for an evening out with the guys.
              </DetailsText>
            </Col2>
          </Row>
        </SingleProductWrapper>
      </SmallContainer>

      {/* Related Products & footer go here */}
      <Footer />
    </>
  )
}
