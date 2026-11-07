import React from 'react';
import './adoptermyaccount.css';

export function Adoptermyaccount() {
  return (
    <>
      <div className="adopteraccount-container">
        <form className="adopteraccount-form">
          <h2>Mi cuenta</h2>
          <div className="adopteraccount-col">
            <div className="adopteraccount-img">
              <button className="adopteraccount-imgs-btn">
                <div className="adopteraccount-icon">
                  <div className="adopteraccount-icon-h"></div>
                  <div className="adopteraccount-icon-v"></div>
                </div>
              </button>
            </div>
            <div className="adopteraccount-info-container">
              <div className="adopteraccount-info">
                <p>Nombre: </p>
                <input
                  type="text"
                  placeholder="Usuario Demo"
                  className="adopteraccount-input"
                ></input>
              </div>
              <div className="adopteraccount-info">
                <p>Email: </p>
                <input
                  type="text"
                  placeholder="usuario@ejemplo.com"
                  className="adopteraccount-input"
                ></input>
              </div>
              <div className="adopteraccount-info">
                <p>Contraseña: </p>
                <input
                  type="text"
                  placeholder="*********"
                  className="adopteraccount-input"
                ></input>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
