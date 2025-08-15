// firestore:src/pages/Login.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Input,
  PasswordInput,
  Field,
  Label,
  ErrorText,
} from '../components/forms/Input';
// import { useAuth } from '../hooks/useAuth';

export default function Login() {
  // const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // simple inline errors
  const [errors, setErrors] = useState({ email: '', password: '' });

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const next = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email';

    if (!password.trim()) next.password = 'Password is required';

    setErrors({ email: next.email || '', password: next.password || '' });
    if (Object.keys(next).length) return;

    // login({ email, password });
  };

  return (
    <PageWrap>
      <Card>
        <Heading>Welcome back</Heading>
        <Sub>Log in to continue</Sub>
        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <Label htmlFor='email' $required>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='ex. you@example.com'
              value={email}
              onChange={onChangeEmail}
              autoComplete='email'
              required
              error={errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor='password' $required>
              Password
            </Label>
            <PasswordInput
              id='password'
              value={password}
              onChange={onChangePassword}
              placeholder='ex. your password'
              autoComplete='current-password'
              required
              error={errors.password}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </Field>

          <Actions>
            <Button type='submit'>Log In</Button>
          </Actions>
        </Form>

        <Alt>
          New here? <a href='/register'>Create an account</a>
        </Alt>
      </Card>
    </PageWrap>
  );
}

// styled-components
const PageWrap = styled.section`
  background: radial-gradient(#fff, #ffd6d6);
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 40px 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const Heading = styled.h1`
  font-size: 28px;
  line-height: 1.2;
  color: #111;
`;

const Sub = styled.p`
  margin-top: 6px;
  color: #777;
`;

const Form = styled.form`
  margin-top: 22px;
  display: grid;
  gap: 16px;
`;

const Actions = styled.div`
  margin-top: 8px;
`;

const Button = styled.button`
  width: 100%;
  display: inline-block;
  background: #ff523b;
  color: #fff;
  padding: 12px 18px;
  border-radius: 30px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s;

  &:hover {
    background: #563434;
  }
`;

const Alt = styled.p`
  margin-top: 14px;
  text-align: center;
  color: #666;

  a {
    color: #ff523b;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;
