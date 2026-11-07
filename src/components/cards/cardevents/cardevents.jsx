import React from 'react';
import './cardevents.css';

export function CardEvents({ day, numberday, title, hours }) {
  return (
    <>
      <div className="cardevents-content">
        <div className="left-cardevents">
          <p className="day-cardeve-p">{day}</p>
          <p className="numbday-cardeve-p">{numberday}</p>
        </div>
        <div className="right-cardevents">
          <p className="title-cardeve-p">{title}</p>
          <p>{hours}</p>
        </div>
      </div>
    </>
  );
}
