import React from 'react';
import { Link } from 'react-router-dom';
import './waystohelp.css';
import donateimg from './donate.png';
import volunteerimg from './love.png';
import { Button } from '../../../components/button/Button';

export function Waystohelp() {
  return (
    <>
      <div className="waystohelp-container">
        <h2>Formas de ayudar</h2>
        <div className="ways-div">
          <div className="waystohelp-volunteer">
            <div className="img-elipse">
              <img
                className="volunteerimg"
                alt="volunteerimg"
                src={volunteerimg}
              />
              <div className="elipse"></div>
            </div>
            <h3>Se voluntario</h3>
            <p className="p-waystohelp">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
              dignissim diam nec tristique eget arcu. Semper nibh sagittis, cras
              elementum amet.{' '}
            </p>
            <div className="waystohelp-buttons">
              <Link to='/volunteer'><Button type="" text="Inscribirme ahora" /></Link>
            </div>
          </div>

          <div className="waystohelp-donate">
            <div className="img-elipse">
              <img className="donateimg-home" alt="donateimg" src={donateimg} />
              <div className="elipse"></div>
            </div>
            <h3>Haz donaciones</h3>
            <p className="p-waystohelp">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
              dignissim diam nec tristique eget arcu. Semper nibh sagittis, cras
              elementum amet.{' '}
            </p>
            <div className="waystohelp-buttons">
              <Link to='/donate'><Button type="" text="Hacer donación" /></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
