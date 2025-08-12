// firestore:src/pages/Register.jsx
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

export default function Register() {
  // const { register: registerUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const next = {};
    if (!name.trim()) next.name = 'Name is required';

    if (!email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email';

    if (!password.trim()) next.password = 'Password is required';
    else if (password.length < 8) next.password = 'Use at least 8 characters';

    if (!confirm.trim()) next.confirm = 'Confirm your password';
    else if (password !== confirm) next.confirm = 'Passwords do not match';

    setErrors({
      name: next.name || '',
      email: next.email || '',
      password: next.password || '',
      confirm: next.confirm || '',
    });
    if (Object.keys(next).length) return;

    // registerUser({ name, email, password });
  };

  return (
    <PageWrap>
      <Card>
        <Heading>Create your account</Heading>
        <Sub>Join FireStore in seconds</Sub>

        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <Label htmlFor='name' $required>
              Name
            </Label>
            <Input
              id='name'
              type='text'
              placeholder='ex. Jane Doe'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: '' }));
              }}
              autoComplete='name'
              required
              error={errors.name}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor='email' $required>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='ex. you@example.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: '' }));
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((p) => ({ ...p, password: '' }));
              }}
              placeholder='ex. 8+ characters'
              autoComplete='new-password'
              required
              error={errors.password}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor='confirm' $required>
              Confirm Password
            </Label>
            <PasswordInput
              id='confirm'
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (errors.confirm) setErrors((p) => ({ ...p, confirm: '' }));
              }}
              placeholder='ex. confirm password'
              autoComplete='new-password'
              required
              error={errors.confirm}
            />
            {errors.confirm && <ErrorText>{errors.confirm}</ErrorText>}
          </Field>

          <Actions>
            <Button type='submit'>Create Account</Button>
          </Actions>
        </Form>

        <Alt>
          Already have an account? <a href='/login'>Log in</a>
        </Alt>
      </Card>
    </PageWrap>
  );
}

/* ===========================
   styled-components (below)
   =========================== */

const PageWrap = styled.section`
  background: radial-gradient(#fff, #ffd6d6);
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 40px 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
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
