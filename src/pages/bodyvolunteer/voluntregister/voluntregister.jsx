import React, { useState, Fragment } from 'react';
import './voluntregister.css';
import { Button } from '../../../components/button/Button';
import volneedimg from './volunteers-needed.jpeg';
import { Habilidades } from './habilidadselector';

export function VolunteerRegister() {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    correo: '',
    telefono: '',
    habilidad: 'habilidad 1',
  });

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log(datos);
  };
  return (
    <>
      <div className="vol-reg-container">
        <h2>¡Sumate a esta noble causa!</h2>
        <div className="vol-with-img">
          <div className="vol-reg-card">
            <h3>¡Registrate y te mantendremos al día de nuestras dinámicas!</h3>
            <p>Introduce los siguientes datos: </p>
            <Fragment>
              <form className="vol-form" onSubmit={enviarDatos}>
                <fieldset className="vol-field-nombre">
                  <input
                    type="text"
                    className="input-vol"
                    placeholder="Nombre"
                    name="nombre"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="input-vol"
                    placeholder="Apellido"
                    name="apellido"
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="vol-field-dos">
                  <input
                    type="text"
                    className="input-vol"
                    placeholder="Edad"
                    name="edad"
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    className="input-vol"
                    placeholder="Correo electrónico"
                    name="correo"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="input-vol"
                    placeholder="Telefono"
                    name="telefono"
                    onChange={handleInputChange}
                  />

                  <Habilidades />
                </fieldset>

                <fieldset className="vol-btn-submit">
                  <Button
                    type="submit"
                    text="Enviar (CAPCHA)"
                    onClick={enviarDatos}
                  />
                </fieldset>
              </form>
            </Fragment>
          </div>
          <img className="volneedimg" alt="volneedimg" src={volneedimg} />
        </div>
      </div>
    </>
  );
}
