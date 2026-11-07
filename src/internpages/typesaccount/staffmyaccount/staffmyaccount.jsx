import React from 'react';
import './staffmyaccount.css';

export function Staffmyaccount() {
  return (
    <>
      <div className="staffaccount-container">
        <form className="staffaccount-form">
          <h2>Mi cuenta</h2>
          <div className="staffaccount-col">
            <div className="staffaccount-img">
              <button className="staffaccount-imgs-btn">
                <div className="staffaccount-icon">
                  <div className="staffaccount-icon-h"></div>
                  <div className="staffaccount-icon-v"></div>
                </div>
              </button>
            </div>
            <div className="staffaccount-info-container">
              <div className="staffaccount-type-info">
                <p>Tipo de cuenta: </p>
                <input
                  type="text"
                  placeholder="Admin"
                  className="staffaccount-type-input"
                ></input>
              </div>
              <div className="staffaccount-info">
                <p>Nombre: </p>
                <input
                  type="text"
                  placeholder="Usuario Demo"
                  className="staffaccount-input"
                ></input>
              </div>
              <div className="staffaccount-info">
                <p>Email: </p>
                <input
                  type="text"
                  placeholder="usuario@ejemplo.com"
                  className="staffaccount-input"
                ></input>
              </div>
              <div className="staffaccount-info">
                <p>Contraseña: </p>
                <input
                  type="text"
                  placeholder="*********"
                  className="staffaccount-input"
                ></input>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
