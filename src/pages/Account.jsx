// firestore:src/pages/Account.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { Input, PasswordInput, Field, Label } from '../components/forms/Input';

export default function Account() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const saveProfile = (e) => {
    e.preventDefault();
    // TODO: call backend to save { name, email }
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      alert('New passwords do not match');
      return;
    }
    // TODO: call backend to change password
  };

  return (
    <PageWrap>
      <SmallContainer>
        <Grid>
          {/* Profile card */}
          <ProfileCard>
            <Avatar src='images/user-1.png' alt='Avatar' />
            <Name>{user?.name || 'Your Name'}</Name>
            <Email>{user?.email || 'you@example.com'}</Email>
            <Divider />
            <Form onSubmit={saveProfile}>
              <Field>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='ex. Jane Doe'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='ex. you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Button type='submit'>Save changes</Button>
            </Form>
          </ProfileCard>

          {/* Panels */}
          <Panels>
            <Panel>
              <PanelTitle>Security</PanelTitle>
              <Form onSubmit={changePassword}>
                <Field>
                  <Label htmlFor='currentPw'>Current password</Label>
                  <PasswordInput
                    id='currentPw'
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder='ex. your password'
                    autoComplete='current-password'
                    required
                  />
                </Field>

                <Row>
                  <Field style={{ flex: 1 }}>
                    <Label htmlFor='newPw'>New password</Label>
                    <PasswordInput
                      id='newPw'
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder='ex. 8+ characters'
                      autoComplete='new-password'
                      required
                    />
                  </Field>
                  <Field style={{ flex: 1 }}>
                    <Label htmlFor='confirmPw'>Confirm password</Label>
                    <PasswordInput
                      id='confirmPw'
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder='ex. repeat password'
                      autoComplete='new-password'
                      required
                    />
                  </Field>
                </Row>

                <Button type='submit'>Update password</Button>
              </Form>
            </Panel>

            <Panel>
              <PanelTitle>Recent orders</PanelTitle>
              <EmptyHint>No orders yet.</EmptyHint>
              {/* Later: render orders list/table here */}
            </Panel>
          </Panels>
        </Grid>
      </SmallContainer>
    </PageWrap>
  );
}

// styled-components
const PageWrap = styled.section`
  background: radial-gradient(#fff, #ffd6d6); /* match header */
  min-height: 100vh;
  padding: 40px 16px 80px;
`;

const SmallContainer = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 0 25px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CardBase = `
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
`;

const ProfileCard = styled.div`
  ${CardBase}
  padding: 24px;
  text-align: center;
`;

const Avatar = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 9999px;
  object-fit: cover;
  display: block;
  margin: 0 auto 12px;
`;

const Name = styled.h2`
  font-size: 20px;
  color: #111;
`;

const Email = styled.p`
  color: #777;
  margin-top: 4px;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #eee;
  margin: 18px 0;
`;

const Panels = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
`;

const Panel = styled.div`
  ${CardBase}
  padding: 24px;
`;

const PanelTitle = styled.h3`
  color: #333;
  margin-bottom: 14px;
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  --brand: #ff523b;
  --brand-dark: #563434;

  align-self: start;
  background: var(--brand);
  color: #fff;
  border: 1px solid var(--brand);
  border-radius: 9999px;
  padding: 10px 18px;
  font-weight: 600;
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
`;

const EmptyHint = styled.p`
  margin: 8px 0 0;
  color: #999;
  background: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
`;