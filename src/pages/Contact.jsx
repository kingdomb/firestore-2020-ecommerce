// firestore:src/pages/Contact.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Field, Label } from '../components/forms/Input';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Form is fully functional, but submissions are disabled for demo.
    // You can wire this up later to your backend / Support service.
    alert('This is a demo-only form. Submissions are disabled.');
  };

  return (
    <PageWrap>
      <SmallContainer aria-describedby='contact-note'>
        <HeaderRow>
          <Title>Contact Us</Title>
          <InactiveBadge id='contact-note'>
            Demo only — submissions disabled
          </InactiveBadge>
        </HeaderRow>

        <SectionTitle>Get in Touch</SectionTitle>
        <Muted>
          You can fill out the form fields below (fully functional), but
          submitting is disabled in this demo.
        </Muted>

        <Form onSubmit={onSubmit}>
          <Field>
            <Label htmlFor='name' $required>
              Name
            </Label>
            <Input
              id='name'
              placeholder='ex. Jane Doe'
              value={form.name}
              onChange={onChange}
              required
            />
          </Field>

          <Field>
            <Label htmlFor='email' $required>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='ex. jane@email.com'
              value={form.email}
              onChange={onChange}
              autoComplete='email'
              required
            />
          </Field>

          <Field>
            <Label htmlFor='subject'>Subject</Label>
            <Input
              id='subject'
              placeholder='ex. Order question'
              value={form.subject}
              onChange={onChange}
            />
          </Field>

          <Field>
            <Label htmlFor='message' $required>
              Message
            </Label>
            <Textarea
              id='message'
              placeholder='ex. I have a question about...'
              value={form.message}
              onChange={onChange}
              required
            />
          </Field>

          <SubmitBtnMuted
            type='submit'
            disabled
            aria-disabled='true'
            title='This form is inactive in the demo'
          >
            Submit (inactive)
          </SubmitBtnMuted>
        </Form>
      </SmallContainer>
    </PageWrap>
  );
}

/* ------------------------------ styled ------------------------------ */

const PageWrap = styled.section`
  /* Brand gradient on the page only */
  background: radial-gradient(#fff, #ffd6d6);
  min-height: 100vh;
  padding: 40px 0 70px;
`;

const SmallContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 25px;

  /* Solid white panel to avoid any bleed-through */
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  color: #555;
  margin: 0;
`;

const InactiveBadge = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #563434;
  background: #ffe3de;
  border: 1px solid #ffd0c8;
  padding: 4px 8px;
  border-radius: 9999px;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin: 8px 0 10px;
`;

const Muted = styled.p`
  margin: 0 0 1.2rem;
  color: rgba(0, 0, 0, 0.65);
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 130px;
  resize: vertical;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #fff;
  padding: 0.9rem 1rem;
  outline: none;
  font-size: 14px;

  &::placeholder {
    color: #999;
  }
`;

const SubmitBtnMuted = styled.button`
  --brand: #ff523b;
  --brand-dark: #563434;

  margin-top: 8px;
  background: var(--brand);
  color: #fff;
  border: 1px solid var(--brand);
  border-radius: 9999px;
  padding: 12px 18px;
  font-weight: 700;

  /* muted/disabled presentation */
  opacity: 0.6;
  cursor: not-allowed;
`;
