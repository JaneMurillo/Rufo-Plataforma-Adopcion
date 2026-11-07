import React from 'react';
import './userbanner.css';

const STYLES = [
  'banner-adopter',
  'banner-staff',
  'banner-admin'
];

export function Userbanner({ type, text, submit }) {
  const adminbannerStyle = STYLES.includes(type) ? type : STYLES[0];
  if (!submit) submit = 'banner';

  return (
    <div 
        type={submit} 
        className={`normal-banner ${adminbannerStyle}`}>
            <h1>{text}</h1>
    </div>
  );
}