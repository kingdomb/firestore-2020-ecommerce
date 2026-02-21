// firestore:src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    ErrorText,
    Field,
    Input,
    Label,
    PasswordInput,
} from '../components/forms/Input';
import { DEMO_USERS } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // simple inline errors
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
    if (loginError) setLoginError('');
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
    if (loginError) setLoginError('');
  };

  const fillCredentials = (user) => {
    setEmail(user.email);
    setPassword(user.password);
    setErrors({ email: '', password: '' });
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const next = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email';

    if (!password.trim()) next.password = 'Password is required';

    setErrors({ email: next.email || '', password: next.password || '' });
    if (Object.keys(next).length) return;

    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setLoginError(err.message || 'Invalid email or password');
    }
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

          {loginError && <LoginErrorText>{loginError}</LoginErrorText>}

          <Actions>
            <Button type='submit'>Log In</Button>
          </Actions>
        </Form>

        <Alt>
          New here? <Link to='/register'>Create an account</Link>
        </Alt>
      </Card>

      {/* Demo credentials card */}
      <DemoCard>
        <DemoTitle>Demo Accounts</DemoTitle>
        <DemoHint>Click a profile to auto-fill the login form.</DemoHint>
        {DEMO_USERS.map((u) => (
          <DemoUser key={u.email} onClick={() => fillCredentials(u)}>
            <DemoName>{u.name}</DemoName>
            <DemoDetail>
              {u.email} &nbsp;/&nbsp; {u.password}
            </DemoDetail>
          </DemoUser>
        ))}
      </DemoCard>
    </PageWrap>
  );
}

// styled-components
const PageWrap = styled.section`
  background: radial-gradient(#fff, #ffd6d6);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  gap: 16px;
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

const LoginErrorText = styled.p`
  color: #e02424;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  background: rgba(224, 36, 36, 0.08);
  border: 1px solid rgba(224, 36, 36, 0.2);
  border-radius: 10px;
  padding: 8px 12px;
`;

/* Demo credentials card */
const DemoCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  border-top: 3px solid #ff523b;
`;

const DemoTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
`;

const DemoHint = styled.p`
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
`;

const DemoUser = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: #fff3f1;
    border-color: #ff523b;
  }
`;

const DemoName = styled.span`
  display: block;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const DemoDetail = styled.span`
  display: block;
  font-size: 13px;
  color: #888;
  margin-top: 2px;
  font-family: 'Courier New', monospace;
`;
