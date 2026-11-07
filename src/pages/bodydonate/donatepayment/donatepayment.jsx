import React from 'react';
import './donatepayment.css';
import { Header } from '../../../components/header/Header';
import { Footer } from '../../../components/footer/footer';
import { Bannerdonate } from './../bannerdonate/bannerdonate';
import { Button } from '../../../components/button/Button';

export function DonatePayment({ donativos }) {
  return (
    <>
      <Header />
      <Bannerdonate />
      <div className="donate-body-div">
        <h2 className="h2-dnt-mnt">Dona</h2>
        <h3 className="h3-dnt-mnt">
          Se han realizado {donativos} cantidad de donativos...
        </h3>

        <div className="donate-second-form-div">
          <form className="donate-format">
            <fieldset className="dnt-field-form">
              <p>Métodos de pago:</p>
              <input
                type="text"
                className="input-dnt"
                placeholder="Número de tarjeta"
              />
              <input
                type="text"
                className="input-dnt"
                placeholder="Nombre del tarjetahabiente"
              />
              <div className="dnt-input-doble-div">
                <input
                  type="text"
                  className="input-dnt"
                  placeholder="Vencimiento"
                />
                <input type="text" className="input-dnt" placeholder="CCV" />
              </div>
            </fieldset>

            <fieldset className="dnt-field-form">
              <label>
                <input type="checkbox" value="comprobanteFiscal"></input>
                ¿Requiere comprobante fiscal?
              </label>
              <label>
                <input type="checkbox" value="terminosCondiciones"></input>
                Acepto términos y condiciones
              </label>
              <p>
                Si tiene dudas, revise nuestro{' '}
                <a href="/">Aviso de Privacidad</a>
              </p>
            </fieldset>

            <div className="btn-submit-form">
              <Button type="button-pink" text="Dona" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
