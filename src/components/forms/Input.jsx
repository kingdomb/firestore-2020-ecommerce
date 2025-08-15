// firestore:src/components/forms/Input.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

export function Input({ error, ...props }) {
  return <StyledInput $error={!!error} aria-invalid={!!error} {...props} />;
}

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = 'ex. your password',
  required,
  autoComplete = 'current-password',
  error,
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
        $error={!!error}
        aria-invalid={!!error}
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
  /* Optional red superscript asterisk when $required is true */
  &::after {
    content: ${(props) => (props.$required ? '" *"' : '""')};
    color: #ff523b;
    font-size: 1.25em;
    margin-left: 2px;
    line-height: 1;
  }
`;

/* New inline error text component */
export const ErrorText = styled.span`
  color: #e02424;
  font-size: 12px;
  line-height: 1.3;
`;

// styled-components
const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${({ $error }) => ($error ? '#e02424' : '#e9e9e9')};
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 16px;
  color: #111;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff;

  &::placeholder {
    color: #b5b5b5; /* lighter placeholder */
  }

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? '#e02424' : '#ff523b')};
    box-shadow: 0 0 0 4px
      ${({ $error }) =>
        $error ? 'rgba(224, 36, 36, 0.15)' : 'rgba(255, 82, 59, 0.15)'};
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
