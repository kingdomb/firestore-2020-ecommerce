// firestore:src/components/forms/Input.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

export function Input(props) {
  return <StyledInput {...props} />;
}

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = 'ex. your password',
  required,
  autoComplete = 'current-password',
  ...rest
}) {
  const [show, setShow] = useState(false);
  return (
    <PwWrap>
      <StyledInput
        id={id}
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        {...rest}
      />
      <PwToggle
        type='button'
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
        aria-pressed={show}
      >
        {show ? 'Hide' : 'Show'}
      </PwToggle>
    </PwWrap>
  );
}

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #444;
`;

// styled-components
const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 16px;
  color: #111;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff;

  &::placeholder {
    color: #b5b5b5;
  } /* lighter */

  &:focus {
    outline: none;
    border-color: #ff523b;
    box-shadow: 0 0 0 4px rgba(255, 82, 59, 0.15);
  }
`;

const PwWrap = styled.div`
  position: relative;
`;

const PwToggle = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: #ff523b;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 82, 59, 0.1);
  }
`;
