import React from 'react';
import './Flecha.css';

const COLORS = ['blue', 'pink'];
const DIRECTIONS = ['right', 'left'];

export function Flecha({ color, direction, onClick, disabled, adminTable }) {
  const colorStyle = COLORS.includes(color) ? color : COLORS[1];
  const directionStyle = DIRECTIONS.includes(direction)
    ? direction
    : DIRECTIONS[0];

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flecha-container ${colorStyle}`}
    >
      {adminTable === 'true' ? (
        <p className={`flecha-p ${directionStyle}`}>&#11246;</p>
      ) : (
        <p className={`flecha-p ${directionStyle}`}>&#129122;</p>
      )}
    </button>
  );
}
