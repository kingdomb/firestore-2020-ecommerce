// firestore:src/pages/Cart.jsx
import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartWrapper = styled.div`
  max-width: 1080px;
  margin: 80px auto;
  padding: 0 25px;
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 5px;
  color: #fff;
  background: #ff523b;
  font-weight: normal;
  &:last-child {
    text-align: right;
  }
`;

const TableCell = styled.td`
  padding: 10px 5px;
  &:last-child {
    text-align: right;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 30px;
  padding: 5px;
`;

const CartInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    p {
      display: none;
    }
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 10px;
`;

const TotalWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SummaryTable = styled.table`
  border-top: 3px solid #ff523b;
  width: 100%;
  max-width: 350px;
  border-collapse: collapse;
`;

const CheckoutButton = styled.a`
  display: inline-block;
  background: #ff523b;
  color: #fff;
  padding: 8px 30px;
  border-radius: 30px;
  text-decoration: none;
  transition: background 0.5s;

  &:hover {
    background: #563434;
  }
`;

export default function Cart() {
  return (
    <>
      <Header />

      <CartWrapper>
        <CartTable>
          <thead>
            <tr>
              <TableHeader>Product</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Subtotal</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>
                <CartInfo>
                  <ProductImage src='/images/buy-1.jpg' alt='Product' />
                  <div>
                    <p>Red Printed T-Shirt</p>
                    <small>Price: $50.00</small>
                    <br />
                    <a href=''>Remove</a>
                  </div>
                </CartInfo>
              </TableCell>
              <TableCell>
                <QuantityInput type='number' defaultValue={1} />
              </TableCell>
              <TableCell>$50.00</TableCell>
            </tr>
            <tr>
              <TableCell>
                <CartInfo>
                  <ProductImage src='/images/buy-2.jpg' alt='Product' />
                  <div>
                    <p>HRX Sports Shoes</p>
                    <small>Price: $75.00</small>
                    <br />
                    <a href=''>Remove</a>
                  </div>
                </CartInfo>
              </TableCell>
              <TableCell>
                <QuantityInput type='number' defaultValue={1} />
              </TableCell>
              <TableCell>$75.00</TableCell>
            </tr>
            <tr>
              <TableCell>
                <CartInfo>
                  <ProductImage src='/images/buy-3.jpg' alt='Product' />
                  <div>
                    <p>HRX Gray Trackpants</p>
                    <small>Price: $75.00</small>
                    <br />
                    <a href=''>Remove</a>
                  </div>
                </CartInfo>
              </TableCell>
              <TableCell>
                <QuantityInput type='number' defaultValue={1} />
              </TableCell>
              <TableCell>$75.00</TableCell>
            </tr>
          </tbody>
        </CartTable>

        <TotalWrapper>
          <SummaryTable>
            <tbody>
              <tr>
                <TableCell>Subtotal</TableCell>
                <TableCell>$200.00</TableCell>
              </tr>
              <tr>
                <TableCell>Tax</TableCell>
                <TableCell>$35.00</TableCell>
              </tr>
              <tr>
                <TableCell>Total</TableCell>
                <TableCell>$235.00</TableCell>
              </tr>
            </tbody>
          </SummaryTable>
        </TotalWrapper>

        <TotalWrapper>
          <CheckoutButton href='/checkout'>
            Proceed to checkout →
          </CheckoutButton>
        </TotalWrapper>
      </CartWrapper>

      <Footer />
    </>
  );
}
