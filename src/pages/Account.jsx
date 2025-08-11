// firestore:src/pages/Account.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Styled components
const PageWrapper = styled.div`
  padding: 50px 0;
  background: radial-gradient(#fff, #ffd6d6);
`;

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 0 25px;
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
`;

const FormContainer = styled.div`
  background: #fff;
  width: 300px;
  position: relative;
  text-align: center;
  padding: 20px 0;
  margin: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FormBtn = styled.div`
  margin-bottom: 20px;
  span {
    font-weight: bold;
    padding: 0 10px;
    color: #555;
    cursor: pointer;
    width: 100px;
    display: inline-block;
  }
`;

const Indicator = styled.hr`
  width: 100px;
  border: none;
  background: #ff523b;
  height: 3px;
  margin-top: 8px;
  transform: translateX(
    ${(props) => (props.active === 'login' ? '0px' : '100px')}
  );
  transition: transform 1s;
`;

const StyledForm = styled.form`
  max-width: 300px;
  padding: 0 20px;
  position: absolute;
  top: 130px;
  transform: translateX(
    ${(props) => (props.active === 'login' ? '300px' : '0px')}
  );
  transition: transform 1s;

  input {
    width: 100%;
    height: 30px;
    margin: 10px 0;
    padding: 0 10px;
    border: 1px solid #ccc;
    &:focus {
      outline: none;
    }
  }

  .btn {
    width: 100%;
    border: none;
    cursor: pointer;
    margin: 10px 0;
  }

  a {
    display: block;
    font-size: 12px;
  }
`;

export default function Account() {
  const [active, setActive] = useState('login');
  const { user } = useAuth();

  const handleToggle = (form) => () => setActive(form);

  // if user is logged in, show profile (not here yet)
  if (user) {
    return (
      <>
        <PageWrapper>
          <Container>
            <h2>Welcome, {user.name}</h2>
            {/* additional account details go here */}
          </Container>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  // if not logged in, show login/register form
  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <Row>
            <Col2>
              <img src='/images/image1.png' alt='' style={{ width: '100%' }} />
            </Col2>
            <Col2>
              <FormContainer>
                <FormBtn>
                  <span onClick={handleToggle('login')}>Login</span>
                  <span onClick={handleToggle('register')}>Register</span>
                </FormBtn>
                <Indicator active={active} />
                <StyledForm
                  id='LoginForm'
                  active={active}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input type='text' placeholder='username' />
                  <input type='password' placeholder='Password' />
                  <button type='submit' className='btn'>
                    Login
                  </button>
                  <a href='/forgot'>Forgot password</a>
                </StyledForm>
                <StyledForm
                  id='RegForm'
                  active={active}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input type='text' placeholder='username' />
                  <input type='email' placeholder='Email' />
                  <input type='password' placeholder='Password' />
                  <button type='submit' className='btn'>
                    Register
                  </button>
                </StyledForm>
              </FormContainer>
            </Col2>
          </Row>
        </Container>
      </PageWrapper>
      <Footer />
    </>
  );
}
