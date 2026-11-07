import React from 'react';
import { Button } from '../../components/button/Button';
import './Contrasena.css';
import axios from 'axios';

export function Contrasena() {
  const onSubmitRestaurar = (e) => {
    axios({
      method: 'post',
      data: {
        email: e.target.email.value,
        type: 'hello',
      },
      url: 'http://localhost:5001/email/enviar',
    });
  };

  return (
    <>
      <div className="contrasena-div-cont">
        <div className="contrasena-card-div">
          <h1 className="contrasena-h1">Restaurar contraseña</h1>
          <form onSubmit={onSubmitRestaurar} className="contrasena-form">
            <input type="email" name="email" placeholder="E-mail" />
            <Button type="button-pink" submit="submit" text="Enviar" />
          </form>
        </div>
      </div>
    </>
  );
}
