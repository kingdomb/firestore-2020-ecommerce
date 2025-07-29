// firestore:src/components/Header.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const greeting = user?.name ? `Welcome, ${user.name}` : 'Welcome';

  return (
    <HeaderWrap $isHome={isHome}>
      <Container>
        <NavBar>
          {/* Left: Logo */}
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
                  <a href='#' onClick={(e) => e.preventDefault()}>
                    About
                  </a>
                </li>
                <li>
                  <a href='#' onClick={(e) => e.preventDefault()}>
                    Contact
                  </a>
                </li>
                <li>
                  <NavLink to='/account' onClick={() => setOpen(false)}>
                    Account
                  </NavLink>
                </li>
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
              </ul>
            </Nav>

            {/* Mobile menu toggle (only shows on small screens) */}
            <MenuIcon
              src='/images/menu.png'
              alt='Menu'
              onClick={() => setOpen((v) => !v)}
            />
          </NavWrap>

          <RightSide>
            <Greeting aria-hidden>{greeting}</Greeting>

            <AuthArea>
              {user ? (
                <LogoutBtn type='button' onClick={logout}>
                  Logout
                </LogoutBtn>
              ) : (
                <AuthLinks>
                  <Link to='/login'>Login</Link>
                  <span>•</span>
                  <Link to='/register'>Register</Link>
                </AuthLinks>
              )}
            </AuthArea>
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
  margin-left: auto; /* shove nav rightward */
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

  /* Mobile dropdown */
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
  gap: 14px;
  margin-left: 36px; /* was 16px — gives more space between nav and greeting */

  @media (min-width: 1280px) {
    margin-left: 48px; /* a touch more on very wide screens (optional) */
  }
`;

const Greeting = styled.div`
  color: #777;
  font-size: 14px;
  white-space: nowrap;

  @media (max-width: 992px) {
    display: none;
  }
`;

const AuthArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutBtn = styled.button`
  background: #ff523b;
  color: #fff;
  padding: 6px 16px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #563434;
  }
`;

const AuthLinks = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  a {
    color: #555;
  }
`;
