import React, { useState } from 'react';
import './openRequest.css';
import { Button } from '../../button/Button';
import axios from 'axios';

export function OpenRequest({ idRequest }) {
  const [openForm, setOpenForm] = useState('closed');
  const [personalInfo, setPersonalInfo] = useState();
  const [cuestionario, setCuestionario] = useState();
  const [data, setData] = useState({
    cand_ocupation: '',
    cand_name: '',
    cand_address: '',
    cand_email: '',
    cand_tel: '',
    cand_facebook: '',
    cand_age: '',
    cand_question1: '',
    cand_question2: '',
    cand_question3: '',
    cand_question4: '',
    cand_question5: '',
    cand_question6: '',
    cand_question7: '',
    cand_question8: '',
    cand_question9: '',
    cand_question10: '',
    cand_question11: '',
    cand_question12: '',
    cand_question13: '',
    cand_question14: '',
    cand_question15: '',
    cand_question16: '',
    cand_question17: '',
    pet_name: '',
  });

  const continuarCuestionario = (event) => {
    event.preventDefault();
    window.scroll(0, 0);
    setPersonalInfo('invisible');
    setCuestionario('visible');
  };

  const showPersonalInfo = () => {
    window.scroll(0, 0);
    setPersonalInfo('visible');
    setCuestionario('invisible');
  };

  const closeForm = () => {
    setOpenForm('closed');
  };

  const buttonOpenForm = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:5000/adopReq/id/' + idRequest,
    }).then((res) => {
      //console.log(res);
      setData(res.data);
      //console.log(res.data.cand_ocupation);
    });
    window.scroll(0, 0);
    setOpenForm('open');
    setPersonalInfo('visible');
    setCuestionario('invisible');
  };

  return (
    <>
      <Button type="button-transparent" text="Abrir" onClick={buttonOpenForm} />

      {/** -------------------------FORMULARIO DE ADOPCION ---------------------------- */}
      <div className={`overlay-form-adopt-req ${openForm}`}> </div>
      <div className={`form-adopt-div-container-req ${openForm}`}>
        <p className="cerrar-form-adopt-req" onClick={closeForm}>
          &times;
        </p>
        <h2 className="form-adopt-h2-req">
          Formulario de adopción para {data.pet_name}
        </h2>
        <form className="form-adopt-form-req" onSubmit={continuarCuestionario}>
          <h3 className={`form-adopt-h3-req ${personalInfo}`}>
            Información personal
          </h3>

          <fieldset className={`form-adopt-fieldset-req ${personalInfo}`}>
            <div className="form-adopt-label-div-req">
              <label className="form-adopt-label-req">Nombre completo:</label>
              <input
                className="form-adopt-text-input-req"
                type="text"
                defaultValue={data.cand_name}
                readOnly={true}
              ></input>
            </div>

            <div className="form-adopt-label-div-req">
              <label className="form-adopt-label-req">Ocupación:</label>
              <input
                className="form-adopt-text-input-req"
                type="text"
                defaultValue={data.cand_ocupation}
                readOnly={true}
              ></input>
            </div>

            <div className="form-adopt-label-div-req">
              <label className="form-adopt-label-req" htmlFor="correo">
                Correo:
              </label>
              <input
                className="form-adopt-text-input-req"
                type="email"
                defaultValue={data.cand_email}
                readOnly
              ></input>
            </div>

            <div className="form-adopt-label-div-req">
              <label className="form-adopt-label-req" htmlFor="facebook">
                Facebook:
              </label>
              <input
                className="form-adopt-text-input-req"
                type="text"
                defaultValue={data.cand_facebook}
                readOnly
              ></input>
            </div>

            <div className="form-adopt-label-div-req">
              <label className="form-adopt-label-req" htmlFor="telefono">
                Teléfono:
              </label>
              <input
                className="form-adopt-text-input-req"
                type="tel"
                defaultValue={data.cand_tel}
                readOnly
              ></input>
            </div>

            <div className="form-adopt-label-div-req">
              <label className="form-adopt-label-req" htmlFor="domicilio">
                Domicilio:
              </label>
              <input
                className="form-adopt-text-input-req"
                type="text"
                defaultValue={data.cand_address}
                readOnly
              ></input>
            </div>

            <div className="form-adopt-label-div-req" htmlFor="edad">
              <label className="form-adopt-label-req">Edad:</label>
              <input
                className="form-adopt-text-input-req"
                type="number"
                defaultValue={data.cand_age}
                readOnly
              ></input>
            </div>

            <div className="form-button-continuar-req">
              <Button type="button-pink" text="Continuar" submit="submit" />
            </div>
          </fieldset>
        </form>

        <form className="form-adopt-form-req">
          <h3 className={`form-adopt-h3-req ${cuestionario}`}>Cuestionario</h3>
          <fieldset
            className={`form-adopt-fieldset-req cuestionario ${cuestionario}`}
          >
            <label className="form-adopt-label-cuestionario-req">
              ¿Por qué deseas adoptar?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                defaultValue={data.cand_question1}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Has tenido animales anteriormente? ¿Cuáles?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                defaultValue={data.cand_question2}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Qué pasó con ellos?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                defaultValue={data.cand_question3}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Tienes otros animales actualmente? ¿Están vacunados?
              <input
                className="form-adopt-text-input-req"
                name="question4"
                defaultValue={data.cand_question4}
                readOnly
              ></input>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Estás de acuerdo con que se hagan visitas periódicas al adoptado
              para saber cómo está?
              <input
                className="form-adopt-text-input-req"
                name="question5"
                defaultValue={data.cand_question5}
                readOnly
              />
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Hay niños en casa? ¿De qué edades?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question6"
                defaultValue={data.cand_question6}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              Si cambiaras de domicilio, ¿Qué sucedería con el animalito?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question7"
                defaultValue={data.cand_question7}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Qué pasará con el animalito si toda la familia sale de
              vacaciones?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question8"
                defaultValue={data.cand_question8}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Tiene espacio suficiente para que el animalito esté cómodo?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question9"
                defaultValue={data.cand_question9}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Dónde dormirá?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question10"
                defaultValue={data.cand_question10}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Cuánto tiempo pasará solo en casa?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question11"
                defaultValue={data.cand_question11}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Quién se encargará de cubrir sus gastos, limpiarlo, alimentarlo,
              cuidarlo, pasearlo, etc?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question12"
                defaultValue={data.cand_question12}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              Todos los miembros de la familia están de acuerdo con la adopción?
              <input
                className="form-adopt-text-input-req"
                name="question13"
                defaultValue={data.cand_question13}
                readOnly
              />
            </label>

            <label className="form-adopt-label-cuestionario-req">
              En caso de embarazo, divorcio, enfermedad, u otra contingencia
              familiar, ¿Con quién se quedará el animalito?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question14"
                defaultValue={data.cand_question14}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Estás consciente de los cuidados que implica tener un animal de
              compañía, y que tendrá que cuidarlo por el resto de su vida?
              (veterinario, cuidados, comida, paciencia, amor, etc)
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question15"
                defaultValue={data.cand_question15}
                readOnly
              ></textarea>
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Tienes algún veterinario de confianza?
              <input
                className="form-adopt-text-input-req"
                name="question16"
                defaultValue={data.cand_question16}
                readOnly
              />
            </label>

            <label className="form-adopt-label-cuestionario-req">
              ¿Cuentas con recursos económicos para cubrir los gastos
              veterinarios de la mascota?
              <textarea
                className="form-adopt-text-input-req"
                type="text"
                name="question17"
                defaultValue={data.cand_question17}
                readOnly
              ></textarea>
            </label>

            <div className="form-button-div-req">
              <Button
                type="button-transparent"
                text="Regresar"
                submit="button"
                onClick={showPersonalInfo}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
