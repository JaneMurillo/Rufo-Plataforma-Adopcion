import React from 'react';
import './Button.css';

const STYLES = [
  'button-transparent',
  'button-pink',
  'button-transp-black',
  'button-blue',
];

export function Button({ type, text, onClick, submit, name }) {
  const buttonStyle = STYLES.includes(type) ? type : STYLES[0];
  if (!submit) submit = 'button';

  return (
    <button
      type={submit}
      className={`normal-buttons ${buttonStyle}`}
      onClick={onClick}
      name={name}
    >
      {text}
    </button>
  );
}
