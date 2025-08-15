// firestore:src/pages/Checkout.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Field, Label, ErrorText } from '../components/forms/Input';
import { useCart } from '../hooks/useCart';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, tax, shipping, total, clear } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const next = {};

    // contact
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = 'Enter a valid email';

    // shipping
    if (!form.address.trim()) next.address = 'Address is required';
    if (!form.city.trim()) next.city = 'City is required';
    if (!form.state.trim()) next.state = 'State is required';
    if (!form.zip.trim()) next.zip = 'ZIP is required';

    // payment (light client-side checks)
    if (!form.cardNumber.trim()) next.cardNumber = 'Card number is required';
    else if (!/^\d[\d\s]{11,}$/.test(form.cardNumber))
      next.cardNumber = 'Enter a valid card number';

    if (!form.expiry.trim()) next.expiry = 'Expiry is required';
    else if (!/^\d{2}\/\d{2}$/.test(form.expiry))
      next.expiry = 'Use MM/YY format';

    if (!form.cvv.trim()) next.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(form.cvv)) next.cvv = 'Enter a valid CVV';

    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: real checkout
    clear();
    alert('Order placed! Thank you.');
    navigate('/');
  };

  const summary = [
    { label: 'Subtotal', amount: `$${subtotal.toFixed(2)}` },
    { label: 'Tax', amount: `$${tax.toFixed(2)}` },
    { label: 'Shipping', amount: `$${shipping.toFixed(2)}` },
  ];
  const totalAmount = `$${total.toFixed(2)}`;

  return (
    <PageWrap>
      <SmallContainer>
        <HeaderRow>
          <Title>Checkout</Title>
          <BackToCart to='/cart'>Modify cart →</BackToCart>
        </HeaderRow>

        <Grid>
          {/* Left: Form */}
          <Card>
            <SectionTitle>Contact</SectionTitle>
            <Form onSubmit={onSubmit} noValidate>
              <Field>
                <Label htmlFor='fullName' $required>
                  Full name
                </Label>
                <Input
                  id='fullName'
                  name='fullName'
                  type='text'
                  placeholder='ex. John Doe'
                  value={form.fullName}
                  onChange={onChange}
                  required
                  error={errors.fullName}
                />
                {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
              </Field>

              <Field>
                <Label htmlFor='email' $required>
                  Email
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='ex. you@example.com'
                  value={form.email}
                  onChange={onChange}
                  autoComplete='email'
                  required
                  error={errors.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </Field>

              <SectionTitle style={{ marginTop: 6 }}>Shipping</SectionTitle>

              <Field>
                <Label htmlFor='address' $required>
                  Address
                </Label>
                <Input
                  id='address'
                  name='address'
                  placeholder='ex. 123 Main St'
                  value={form.address}
                  onChange={onChange}
                  autoComplete='address-line1'
                  required
                  error={errors.address}
                />
                {errors.address && <ErrorText>{errors.address}</ErrorText>}
              </Field>

              <Row>
                <Field style={{ flex: 1 }}>
                  <Label htmlFor='city' $required>
                    City
                  </Label>
                  <Input
                    id='city'
                    name='city'
                    placeholder='ex. Chicago'
                    value={form.city}
                    onChange={onChange}
                    autoComplete='address-level2'
                    required
                    error={errors.city}
                  />
                  {errors.city && <ErrorText>{errors.city}</ErrorText>}
                </Field>

                <Field style={{ flex: 1 }}>
                  <Label htmlFor='state' $required>
                    State
                  </Label>
                  <Input
                    id='state'
                    name='state'
                    placeholder='ex. IL'
                    value={form.state}
                    onChange={onChange}
                    autoComplete='address-level1'
                    required
                    error={errors.state}
                  />
                  {errors.state && <ErrorText>{errors.state}</ErrorText>}
                </Field>

                <Field style={{ flex: 1 }}>
                  <Label htmlFor='zip' $required>
                    ZIP
                  </Label>
                  <Input
                    id='zip'
                    name='zip'
                    placeholder='ex. 60601'
                    value={form.zip}
                    onChange={onChange}
                    autoComplete='postal-code'
                    required
                    error={errors.zip}
                  />
                  {errors.zip && <ErrorText>{errors.zip}</ErrorText>}
                </Field>
              </Row>

              <SectionTitle style={{ marginTop: 6 }}>Payment</SectionTitle>

              <Field>
                <Label htmlFor='cardNumber' $required>
                  Card number
                </Label>
                <Input
                  id='cardNumber'
                  name='cardNumber'
                  placeholder='ex. 4242 4242 4242 4242'
                  value={form.cardNumber}
                  onChange={onChange}
                  autoComplete='cc-number'
                  inputMode='numeric'
                  required
                  error={errors.cardNumber}
                />
                {errors.cardNumber && (
                  <ErrorText>{errors.cardNumber}</ErrorText>
                )}
              </Field>

              <Row>
                <Field style={{ flex: 1 }}>
                  <Label htmlFor='expiry' $required>
                    Expiry
                  </Label>
                  <Input
                    id='expiry'
                    name='expiry'
                    placeholder='ex. 08/27'
                    value={form.expiry}
                    onChange={onChange}
                    autoComplete='cc-exp'
                    inputMode='numeric'
                    required
                    error={errors.expiry}
                  />
                  {errors.expiry && <ErrorText>{errors.expiry}</ErrorText>}
                </Field>
                <Field style={{ flex: 1 }}>
                  <Label htmlFor='cvv' $required>
                    CVV
                  </Label>
                  <Input
                    id='cvv'
                    name='cvv'
                    placeholder='ex. 123'
                    value={form.cvv}
                    onChange={onChange}
                    autoComplete='cc-csc'
                    inputMode='numeric'
                    required
                    error={errors.cvv}
                  />
                  {errors.cvv && <ErrorText>{errors.cvv}</ErrorText>}
                </Field>
              </Row>

              <SubmitBtn type='submit' disabled={items.length === 0}>
                {items.length === 0 ? 'Cart is empty' : 'Place order'}
              </SubmitBtn>
            </Form>
          </Card>

          {/* Right: Summary */}
          <SummaryCard>
            <SectionTitle>Order Summary</SectionTitle>
            <SummaryList>
              {summary.map((s) => (
                <li key={s.label}>
                  <span>{s.label}</span>
                  <strong>{s.amount}</strong>
                </li>
              ))}
            </SummaryList>
            <Divider />
            <TotalRow>
              <span>Total</span>
              <TotalAmt>{totalAmount}</TotalAmt>
            </TotalRow>
            <SecondaryLink to='/products'>Continue shopping</SecondaryLink>
          </SummaryCard>
        </Grid>
      </SmallContainer>
    </PageWrap>
  );
}

//styled-components
const PageWrap = styled.section`
  background: radial-gradient(#fff, #ffd6d6); /* brand background */
  min-height: 100vh;
  padding: 40px 0 70px;
`;

const SmallContainer = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 0 25px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  color: #555;
`;

const BackToCart = styled(Link)`
  color: #ff523b;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const cardBase = `
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
`;

const Card = styled.div`
  ${cardBase}
  padding: 20px;
`;

const SummaryCard = styled.div`
  ${cardBase}
  padding: 20px;
  height: fit-content;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SubmitBtn = styled.button`
  --brand: #ff523b;
  --brand-dark: #563434;

  margin-top: 8px;
  background: var(--brand);
  color: #fff;
  border: 1px solid var(--brand);
  border-radius: 9999px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.15s;

  &:hover {
    background: var(--brand-dark);
    border-color: var(--brand-dark);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 82, 59, 0.3);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    justify-content: space-between;
    color: #555;
    padding: 8px 2px;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #eee;
  margin: 10px 0 12px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TotalAmt = styled.strong`
  font-size: 18px;
  color: #111;
`;

const SecondaryLink = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  color: #ff523b;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
