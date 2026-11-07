import React from 'react';
import { Link } from 'react-router-dom';
import './staffmenu.css';

export function Staffmenu() {
  return (
    <>
      <div className="staffmenu-container">
        <ul className="staffmenu-nav-ul">
          <li>
            <div className="staffmenu-account-a">
              <Link to="/staffaccount">Usuario Demo</Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
