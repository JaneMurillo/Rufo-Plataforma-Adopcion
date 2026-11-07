import React from 'react';
import './aboutus.css';
import aboutusimg from './pexels-helena-lopes-1904105.jpg';
import { Button } from '../../../components/button/Button';
import { Link } from 'react-router-dom';

export function Aboutus() {
  return (
    <>
      <div className="aboutus-container">
        <img className="aboutusimg" alt="aboutusimg" src={aboutusimg} />
        <div className="right-column-div">
          <h2>¿Quienes somos?</h2>
          <p className="p-aboutus">
            En el albergue Patitas de la Calle se encuentran alrededor de 300
            perros, todos rescatados de la calle. Ahí se rehabilitan, vacunan y
            se les realiza la cirugía esterilización y una vez que han
            completado éste protocolo son puestos en adopción.{' '}
          </p>
          <div className="aboutus-button">
            <Link to="/acercadenosotros">
              <Button type="button-pink" text="Conocenos" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
