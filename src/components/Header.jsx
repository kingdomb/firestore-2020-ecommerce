// firestore:src/components/Header.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const onLogin = pathname === '/login';
  const onRegister = pathname === '/register';

  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const greeting = user?.name ? `Welcome, ${user.name}` : '';

  return (
    <HeaderWrap $isHome={isHome}>
      <Container>
        <NavBar>
          <Logo>
            <Link to='/'>
              <img
                src='/images/logo.png'
                alt='Logo'
                width='125'
                height='auto'
              />
            </Link>
          </Logo>

          <NavWrap>
            <Nav $open={open}>
              <ul>
                <li>
                  <NavLink to='/' onClick={() => setOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/products' onClick={() => setOpen(false)}>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/account' onClick={() => setOpen(false)}>
                    Account
                  </NavLink>
                </li>
                {user && (
                  <CartItem>
                    <Link to='/cart' aria-label='Cart'>
                      <img
                        src='/images/cart.png'
                        width='30'
                        height='30'
                        alt='Cart'
                      />
                    </Link>
                  </CartItem>
                )}
              </ul>
            </Nav>

            <MenuIcon
              src='/images/menu.png'
              alt='Menu'
              onClick={() => setOpen((v) => !v)}
            />
          </NavWrap>

          <RightSide>
            {greeting && <Greeting aria-hidden>{greeting}</Greeting>}

            {user ? (
              <LogoutBtn type='button' onClick={logout}>
                Logout
              </LogoutBtn>
            ) : (
              <AuthButtons>
                {onLogin ? (
                  <ButtonLink to='/register' $variant='primary'>
                    Register
                  </ButtonLink>
                ) : onRegister ? (
                  <ButtonLink to='/login' $variant='primary'>
                    Login
                  </ButtonLink>
                ) : (
                  <>
                    <ButtonLink to='/login' $variant='ghost'>
                      Login
                    </ButtonLink>
                    <ButtonLink to='/register' $variant='primary'>
                      Register
                    </ButtonLink>
                  </>
                )}
              </AuthButtons>
            )}
          </RightSide>
        </NavBar>
      </Container>
    </HeaderWrap>
  );
}

// styled-components
const HeaderWrap = styled.header`
  /* Home: overlay inside hero (transparent). Others: own gradient bg. */
  position: ${({ $isHome }) => ($isHome ? 'absolute' : 'sticky')};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  background: ${({ $isHome }) =>
    $isHome ? 'transparent' : 'radial-gradient(#fff, #ffd6d6)'};
`;

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 0 25px;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  min-height: 70px;
`;

const Logo = styled.div`
  img {
    display: block;
  }
`;

const NavWrap = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    list-style: none;
    margin: 0;
  }

  a {
    color: #555;
    text-decoration: none;
  }
  a.active {
    color: #ff523b;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    padding: 10px 20px;
    transform-origin: top right;
    transform: ${({ $open }) => ($open ? 'scaleY(1)' : 'scaleY(0)')};
    transition: transform 0.2s ease-out;
    z-index: 3;

    ul {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
`;

const CartItem = styled.li`
  display: inline-flex;
  align-items: center;
  a {
    display: inline-flex;
  }
  img {
    display: block;
  }
`;

const MenuIcon = styled.img`
  width: 28px;
  height: 28px;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    z-index: 4;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* more breathing room */
  margin-left: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Greeting = styled.div`
  color: #777;
  font-size: 14px;
  white-space: nowrap;
`;

const AuthButtons = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const BTN_HEIGHT = '36px';

const ButtonLink = styled(Link)`
  --brand: #ff523b;
  --brand-dark: #563434;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: ${BTN_HEIGHT};
  padding: 0 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  line-height: 1;

  border: 1px solid var(--brand);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    transform 0.15s ease;
  will-change: transform;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background: var(--brand);
    color: #fff;

    &:hover { background: var(--brand-dark); border-color: var(--brand-dark); transform: translateY(-1px); }
    &:active { transform: translateY(0); }
  `
      : `
    background: transparent;
    color: var(--brand);

    &:hover { background: rgba(255,82,59,0.08); transform: translateY(-1px); }
    &:active { transform: translateY(0); }
  `}

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 82, 59, 0.3);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover,
    &:active {
      transform: none;
    }
  }
`;

const LogoutBtn = styled.button`
  --brand: #ff523b;
  --brand-dark: #563434;

  height: ${BTN_HEIGHT};
  padding: 0 16px;
  border-radius: 9999px;
  border: 1px solid var(--brand);
  background: var(--brand);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  will-change: transform;

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

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover,
    &:active {
      transform: none;
    }
  }
`;
