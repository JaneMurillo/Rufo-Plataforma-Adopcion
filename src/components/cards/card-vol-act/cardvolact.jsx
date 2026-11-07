import React from 'react';
import './cardvolact.css';
import { Flecha } from '../../flecha/Flecha';

export default function CardVol({ title, hashtag, content, img }) {
  return (
    <>
      <div className="cardvolact-container">
        <div className="cardvol-align">
          <div className="cardvol-left">
            <h4 className="tit-cardvol-h3">{title}</h4>
            <p className="hash-card-p">{hashtag}</p>
            <p className="cont-cardvol-p">{content}</p>
          </div>
          <img
            className="img-cardvol"
            src={img}
            alt="Foto de la actividad"
          ></img>
        </div>
        <div className="arrow-cardvolact">
          <Flecha color="pink" direction="right" />
        </div>
      </div>
    </>
  );
}
