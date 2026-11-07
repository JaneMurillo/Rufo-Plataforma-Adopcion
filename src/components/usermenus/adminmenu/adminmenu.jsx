import React from 'react';
import { Link } from 'react-router-dom';
import './adminmenu.css';

export function Adminmenu() {
  return (
    <>
      <div className="adminmenu-container">
        <ul className="adminmenu-nav-ul">
          <li>
            <div className="adminmenu-account-a">
              <Link to="/adminaccount">Usuario Demo</Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
