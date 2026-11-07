import React from 'react';
import './footer.css';
import facebooklogo from './facebook-logo.png';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <>
      <footer>
        <div className="footer-blue-div">
          <div className="foot-nav">
            <ul className="foot-nav-ul">
              <li className="foot-nav-li">
                <Link to="/acercadenosotros">Nosotros</Link>
              </li>
              <li className="foot-nav-li">
                <Link to="/donate">Donar</Link>
              </li>
              <li className="foot-nav-li">
                <Link to="/events">Eventos</Link>
              </li>
              <li className="foot-nav-li">
                <Link to="/volunteer">Voluntariado</Link>
              </li>
              <li className="foot-nav-li">
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
            <a href="https://www.facebook.com/patitasdelacallegdl">
              <img
                className="facebooklogo"
                alt="facebooklogo"
                src={facebooklogo}
              />
            </a>
          </div>
          <div className="footer-line-div">
            <hr></hr>
          </div>
          <div className="footer-warning-div">
            <p className="foot-warning-p">Aviso de Privacidad</p>
          </div>
        </div>
      </footer>
    </>
  );
}
