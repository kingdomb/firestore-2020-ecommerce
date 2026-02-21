// firestore:src/pages/Cart.jsx
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, tax, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { message: 'Please log in to checkout your cart.' } });
    }
  };

  const isEmpty = items.length === 0;

  return (
    <PageWrap>
      <SmallContainer>
        <HeaderRow>
          <Title>Your Cart</Title>
          {!isEmpty && <Continue to='/products'>Continue shopping →</Continue>}
        </HeaderRow>

        {isEmpty ? (
          <EmptyState>
            <h3>Your cart is empty</h3>
            <p>Browse our latest products and add something you love.</p>
            <PrimaryLink to='/products'>Shop products</PrimaryLink>
          </EmptyState>
        ) : (
          <>
            <ResponsiveTableWrapper>
              <CartTable role='table' aria-label='Shopping cart'>
                <thead>
                  <tr>
                    <TableHeader>Product</TableHeader>
                    <TableHeader>Quantity</TableHeader>
                    <TableHeader $align='right'>Subtotal</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <TableCell>
                        <CartInfo>
                          <ProductImage src={it.src} alt={it.title} />
                          <div>
                            <p>{it.title}</p>
                            <small>Price: ${it.price.toFixed(2)}</small>
                            <br />
                            <RemoveBtn
                              type='button'
                              onClick={() => removeItem(it.id)}
                            >
                              Remove
                            </RemoveBtn>
                          </div>
                        </CartInfo>
                      </TableCell>

                      <TableCell>
                        <QuantityInput
                          type='number'
                          min={1}
                          value={it.qty}
                          onChange={(e) => updateQty(it.id, e.target.value)}
                          aria-label={`Quantity for ${it.title}`}
                        />
                      </TableCell>

                      <TableCell $align='right'>
                        ${(it.price * it.qty).toFixed(2)}
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </CartTable>
            </ResponsiveTableWrapper>

            <TotalsRow>
              <SummaryCard>
                <SummaryRow>
                  <span>Subtotal</span>
                  <strong>${subtotal.toFixed(2)}</strong>
                </SummaryRow>
                <SummaryRow>
                  <span>Tax</span>
                  <strong>${tax.toFixed(2)}</strong>
                </SummaryRow>
                <Divider />
                <SummaryRow $total>
                  <span>Total</span>
                  <strong>${total.toFixed(2)}</strong>
                </SummaryRow>

                <CheckoutButton onClick={handleCheckoutClick}>
                  Proceed to checkout →
                </CheckoutButton>
              </SummaryCard>
            </TotalsRow>
          </>
        )}
      </SmallContainer>
    </PageWrap>
  );
}

//styled-components
const PageWrap = styled.section`
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

const Continue = styled(Link)`
  color: #ff523b;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
`;

const TableHeader = styled.th`
  text-align: ${({ $align }) => $align || 'left'};
  padding: 12px 10px;
  color: #fff;
  background: #ff523b;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 14px 10px;
  vertical-align: top;
  text-align: ${({ $align }) => $align || 'left'};

  &:not(:last-child) {
    border-right: 1px solid #f2f2f2;
  }
  border-bottom: 1px solid #f2f2f2;
`;

// Mobile-friendly table
const ResponsiveTableWrapper = styled.div`
  @media (max-width: 640px) {
    ${CartTable} thead {
      display: none;
    }

    ${CartTable} tr {
      display: grid;
      grid-template-columns: 1fr 80px; /* product / subtotal column */
      gap: 8px;
      padding: 12px;
    }

    ${TableCell} {
      border: none !important;
      padding: 6px 0;
    }

    ${TableCell}:last-child {
      grid-column: 2 / 3;
      justify-self: end;
    }
  }
`;

const CartInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  p {
    color: #555;
  }
  small {
    color: #777;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: contain;
  object-position: center;
  background: #f9f9f9;
`;

const QuantityInput = styled.input`
  width: 64px;
  height: 36px;
  padding: 6px 8px;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #ff523b;
    box-shadow: 0 0 0 3px rgba(255, 82, 59, 0.15);
  }
`;

const RemoveBtn = styled.button`
  margin-top: 6px;
  padding: 0;
  border: none;
  background: none;
  color: #ff523b;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TotalsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SummaryCard = styled.div`
  width: 100%;
  max-width: 380px;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  border-top: 3px solid #ff523b;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 2px;
  color: ${({ $total }) => ($total ? '#111' : '#555')};

  strong {
    font-weight: 700;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #eee;
  margin: 8px 0;
`;

const CheckoutButton = styled.a`
  margin-top: 12px;
  display: inline-block;
  width: 100%;
  text-align: center;

  background: #ff523b;
  color: #fff;
  padding: 12px 18px;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 700;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background: #563434;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

  h3 {
    color: #333;
  }
  p {
    color: #777;
    margin: 6px 0 14px;
  }
`;

const PrimaryLink = styled(Link)`
  background: #ff523b;
  color: #fff;
  padding: 10px 16px;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #563434;
  }
`;
