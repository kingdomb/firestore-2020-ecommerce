// firestore:src/pages/Checkout.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Styled components
const CheckoutWrapper = styled.div`
  max-width: 1080px;
  margin: 80px auto;
  padding: 0 25px;
`;

const Title = styled.h2`
  margin-bottom: 40px;
  color: #333;
`;

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const FormSection = styled.div`
  flex: 1 1 60%;
  background: #fff;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;

const SummarySection = styled.div`
  flex: 1 1 35%;
  background: #fff;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  height: fit-content;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #ff523b;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #ff523b;
  }
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #555;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 30px;
  background: #ff523b;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #e04e2f;
  }
`;

export default function Checkout() {
  // placeholder state
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: process payment and redirect
    alert('Order placed!');
  };

  // static summary (replace with dynamic data)
  const summaryItems = [
    { label: 'Subtotal', amount: '$200.00' },
    { label: 'Tax', amount: '$35.00' },
    { label: 'Shipping', amount: '$10.00' },
  ];

  const totalAmount = '$245.00';

  return (
    <>
      <Header />
      <CheckoutWrapper>
        <Title>Checkout</Title>
        <FlexRow>
          <FormSection>
            <form onSubmit={handleSubmit}>
              <Field>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  name='name'
                  placeholder='John Doe'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  name='address'
                  placeholder='123 Main St'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor='city'>City</Label>
                <Input
                  id='city'
                  name='city'
                  placeholder='City'
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor='state'>State</Label>
                <Input
                  id='state'
                  name='state'
                  placeholder='State'
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor='zip'>ZIP Code</Label>
                <Input
                  id='zip'
                  name='zip'
                  placeholder='ZIP Code'
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor='cardNumber'>Card Number</Label>
                <Input
                  id='cardNumber'
                  name='cardNumber'
                  placeholder='0000 0000 0000 0000'
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor='expiry'>Expiry Date</Label>
                <Input
                  id='expiry'
                  name='expiry'
                  placeholder='MM/YY'
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor='cvv'>CVV</Label>
                <Input
                  id='cvv'
                  name='cvv'
                  placeholder='123'
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Button type='submit'>Place Order</Button>
            </form>
          </FormSection>

          <SummarySection>
            <h3>Order Summary</h3>
            <OrderList>
              {summaryItems.map((item) => (
                <OrderItem key={item.label}>
                  <span>{item.label}</span>
                  <span>{item.amount}</span>
                </OrderItem>
              ))}
            </OrderList>
            <Total>
              <span>Total</span>
              <span>{totalAmount}</span>
            </Total>
            <Button as={Link} to='/cart'>
              Modify Cart
            </Button>
          </SummarySection>
        </FlexRow>
      </CheckoutWrapper>
      <Footer />
    </>
  );
}
