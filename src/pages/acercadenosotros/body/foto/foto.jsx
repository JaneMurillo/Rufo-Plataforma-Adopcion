import React from 'react';
import './foto.css';
import foto from '../../../bodyadopt/banneradopt/group-portrait-of-adorable-puppies.jpg';

export function Foto() {
  return (
    <div className="aboutus-foto-div">
      <img
        className="aboutus-foto"
        alt="Grupo de cachorros"
        src={foto}
      ></img>
    </div>
  );
}
