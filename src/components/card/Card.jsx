import React, { useState } from 'react';
import axios from 'axios';
import './Card.css';
import './Form.css';
import { Flecha } from './../flecha/Flecha';
import { Button } from './../button/Button';

export function Card({
  id,
  img,
  imgMini = [],
  nombre,
  sex,
  age,
  size,
  raza,
  color,
  imgPersonalidades = [],
  personalidades = [],
  descripcion,
  necesidadesEspeciales,
}) {
  const [open, setOpen] = useState('closed');
  const [openForm, setOpenForm] = useState('closed');
  const [personalInfo, setPersonalInfo] = useState('visible');
  const [cuestionario, setCuestionario] = useState('invisible');

  const [user_fullname, setUsername] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [user_id, setUserID] = useState(null);
  const [cand_edad, setCandEdad] = useState(0);
  const [cand_ocupacion, setCandOcupacion] = useState('');
  const [cand_domicilio, setCandDomicilio] = useState('');
  const [cand_facebook, setCandFacebook] = useState('');
  const [cand_telefono, setCandTelefono] = useState('');

  const changeOpen = () => {
    if (open === 'closed') {
      window.scroll(0, 0);
      setOpen('open');
    } else setOpen('closed');
  };

  const buttonOpenForm = async () => {
    if (localStorage.getItem('token')) {
      await axios({
        method: 'get',
        withCredentials: true,
        url: 'http://localhost:5000/session/verify-login',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((res) => {
        //console.log(res);
        setUsername(res.data.user.user_fullname);
        setUserEmail(res.data.user.user_email);
        setUserID(res.data.user.user_id);
      });
    }
    window.scroll(0, 0);
    setOpenForm('open');
    setPersonalInfo('visible');
    setCuestionario('invisible');
  };

  const continuarCuestionario = (event) => {
    event.preventDefault();
    console.log(event);
    setCandEdad(event.target.edad.value);
    setCandOcupacion(event.target.ocupacion.value);
    setCandDomicilio(event.target.domicilio.value);
    setUsername(event.target.nombre.value);
    setUserEmail(event.target.correo.value);
    setCandFacebook(event.target.facebook.value);
    setCandTelefono(event.target.telefono.value);
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

  const enviarRequest = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      data: {
        cand_date: new Date(Date.now()),
        cand_age: cand_edad,
        cand_address: cand_domicilio,
        cand_ocupation: cand_ocupacion,
        cand_facebook: cand_facebook,
        cand_telefono: cand_telefono,
        cand_question1: e.target.question1.value,
        cand_question2: e.target.question2.value,
        cand_question3: e.target.question3.value,
        cand_question4: e.target.question4.value,
        cand_question5: e.target.question5.value,
        cand_question6: e.target.question6.value,
        cand_question7: e.target.question7.value,
        cand_question8: e.target.question8.value,
        cand_question9: e.target.question9.value,
        cand_question10: e.target.question10.value,
        cand_question11: e.target.question11.value,
        cand_question12: e.target.question12.value,
        cand_question13: e.target.question13.value,
        cand_question14: e.target.question14.value,
        cand_question15: e.target.question15.value,
        cand_question16: e.target.question16.value,
        cand_question17: e.target.question17.value,
        cand_user_id: user_id,
        cand_correo: user_email,
        cand_nombre: user_fullname,
      },
      url: 'http://localhost:5000/candidato/create',
    })
      .then((res) => {
        //console.log('crear candidato res');
        //console.log(res);
        axios({
          method: 'post',
          data: {
            adopreq_date: new Date(Date.now()),
            adopreq_cand_id: res.data.cand_id,
            adopreq_pet_id: id,
          },
          url: 'http://localhost:5000/adopReq/create/',
        }).then((res) => {
          //console.log(res);
          window.location.reload(false);
          alert('Su solicitud ha sido enviada exitosamente');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="card-container">
        <img
          className="foto-card-img"
          src={img}
          alt="Foto del perro"
          onClick={changeOpen}
        ></img>
        <h3 className="nombre-card-h3">Nombre: {nombre}</h3>
        <p className="info-perro-card-p">
          {sex} &middot; {age} &middot; {size}
        </p>
        <div className="flecha-card" onClick={changeOpen}>
          <Flecha color="pink" direction="right" />
        </div>
      </div>
      <div className={`overlay-card ${open}`}></div>
      <div className={`card-popup ${open}`}>
        <div className="left-card-popup">
          <div className="popup-img">
            <div className="imgs-list-popup">
              <Flecha color="blue" direction="left" />
              <img
                className="minifoto-card-img"
                src={img}
                alt="Minifoto del perro"
              ></img>
              <img
                className="minifoto-card-img"
                src={img}
                alt="Minifoto del perro"
              ></img>
              <img
                className="minifoto-card-img"
                src={img}
                alt="Minifoto del perro"
              ></img>
              <Flecha color="blue" direction="right" />
            </div>
            <img
              src={img}
              alt="imagen del perro"
              className="img-actual-popup"
            ></img>
            <h2 className="img-card-popup-titulo">Nombre: {nombre}</h2>
          </div>
          <div className="img-card-popup-button">
            <Button
              type="button-pink"
              text="Me interesa"
              onClick={buttonOpenForm}
            />
          </div>
        </div>

        <div className="right-card-popup">
          <div className="ficha-card-popup">
            <h2 className="ficha-card-popup-titulo">Acerca de {nombre}</h2>

            <div className="columnas-card-popup">
              <div className="columnas-card-popup-left">
                <div>
                  <p>Raza:</p>
                  <p>Sexo:</p>
                  <p>Talla:</p>
                  <p>Color:</p>
                  <p>Edad:</p>
                </div>
                <hr className="divisor-card-popup"></hr>
                <div>
                  <p>{raza}</p>
                  <p>{sex}</p>
                  <p>{size}</p>
                  <p>{color}</p>
                  <p>{age}</p>
                </div>
              </div>

              <div className="columnas-card-popup-right">
                <div className="icons-personalidad">
                  <img
                    className="img-icon-personalidad"
                    src={imgPersonalidades[0]}
                    alt="icon"
                  />
                  <img
                    className="img-icon-personalidad"
                    src={imgPersonalidades[1]}
                    alt="icon"
                  />
                  <img
                    className="img-icon-personalidad"
                    src={imgPersonalidades[2]}
                    alt="icon"
                  />
                  <img
                    className="img-icon-personalidad"
                    src={imgPersonalidades[3]}
                    alt="icon"
                  />
                </div>
                <hr className="divisor-card-popup"></hr>
                <div>
                  <p>Personalidad</p>
                  <p>{personalidades[0]}</p>
                  <p>{personalidades[1]}</p>
                  <p>{personalidades[2]}</p>
                  <p>{personalidades[3]}</p>
                </div>
              </div>
            </div>

            <h4>Descripción</h4>
            <p>{descripcion}</p>

            <h4>Necesidades Especiales</h4>
            <p>{necesidadesEspeciales}</p>
          </div>

          <div className="card-popup-flecha-info">
            <Flecha color="pink" direction="left" />
            <Flecha color="pink" direction="right" />
          </div>

          <p className="cierre-card-popup" onClick={changeOpen}>
            &times;
          </p>
        </div>
      </div>

      {/** -------------------------FORMULARIO DE ADOPCION ---------------------------- */}
      <div className={`overlay-form-adopt ${openForm}`}> </div>
      <div className={`form-adopt-div-container ${openForm}`}>
        <p className="cerrar-form-adopt" onClick={closeForm}>
          &times;
        </p>
        <h2 className="form-adopt-h2">Formulario de adopción para {nombre}</h2>
        <form className="form-adopt-form" onSubmit={continuarCuestionario}>
          <h3 className={`form-adopt-h3 ${personalInfo}`}>
            Información personal
          </h3>

          <fieldset className={`form-adopt-fieldset ${personalInfo}`}>
            <div className="form-adopt-label-div">
              <label className="form-adopt-label" htmlFor="nombre">
                Nombre completo:
              </label>
              <input
                className="form-adopt-text-input"
                type="text"
                name="nombre"
                id="nombre"
                required={true}
                maxLength={50}
                defaultValue={user_fullname}
              ></input>
            </div>

            <div className="form-adopt-label-div">
              <label className="form-adopt-label" htmlFor="ocupacion">
                Ocupación:
              </label>
              <input
                className="form-adopt-text-input"
                type="text"
                name="ocupacion"
                id="ocupacion"
                required={true}
                maxLength={30}
              ></input>
            </div>

            <div className="form-adopt-label-div">
              <label className="form-adopt-label" htmlFor="correo">
                Correo:
              </label>
              <input
                className="form-adopt-text-input"
                type="email"
                name="correo"
                id="correo"
                required={true}
                maxLength={50}
                defaultValue={user_email}
              ></input>
            </div>

            <div className="form-adopt-label-div">
              <label className="form-adopt-label" htmlFor="facebook">
                Facebook:
              </label>
              <input
                className="form-adopt-text-input"
                type="text"
                name="facebook"
                id="facebook"
                required={true}
                maxLength={50}
              ></input>
            </div>

            <div className="form-adopt-label-div">
              <label className="form-adopt-label" htmlFor="telefono">
                Teléfono:
              </label>
              <input
                className="form-adopt-text-input"
                type="tel"
                name="telefono"
                id="telefono"
                required={true}
                maxLength={15}
              ></input>
            </div>

            <div className="form-adopt-label-div">
              <label className="form-adopt-label" htmlFor="domicilio">
                Domicilio:
              </label>
              <input
                className="form-adopt-text-input"
                type="text"
                name="domilicio"
                id="domicilio"
                maxLength={40}
                required={true}
              ></input>
            </div>

            <div className="form-adopt-label-div" htmlFor="edad">
              <label className="form-adopt-label">Edad:</label>
              <input
                className="form-adopt-text-input"
                type="number"
                name="edad"
                id="edad"
                required={true}
              ></input>
            </div>

            <div className="form-button-continuar">
              <Button type="button-pink" text="Continuar" submit="submit" />
            </div>
          </fieldset>
        </form>

        <form className="form-adopt-form" onSubmit={enviarRequest}>
          <h3 className={`form-adopt-h3 ${cuestionario}`}>Cuestionario</h3>
          <fieldset
            className={`form-adopt-fieldset cuestionario ${cuestionario}`}
          >
            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question1"
              >
                ¿Por qué deseas adoptar?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question1"
                id="question1"
                maxLength={200}
                required={true}
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question2"
              >
                ¿Has tenido animales anteriormente? ¿Cuáles?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question2"
                id="question2"
                required={true}
                maxLength={150}
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question3"
              >
                ¿Qué pasó con ellos?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question3"
                id="question3"
                required={true}
                maxLength={100}
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question4"
              >
                ¿Tienes otros animales actualmente? ¿Están vacunados?
              </label>
              <select
                className="form-adopt-text-input"
                name="question4"
                id="question4"
                required={true}
              >
                <option value="si, están vacunados">
                  Si tengo, y están vacunados{' '}
                </option>
                <option value="si, no tienen todas las vacunas">
                  Si tengo, les hacen falta algunas vacunas{' '}
                </option>
                <option value="si, no están vacunados">
                  Si tengo, peor no están vacunados{' '}
                </option>
                <option value="no tengo">No tengo otros animales</option>
              </select>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question5"
              >
                ¿Estás de acuerdo con que se hagan visitas periódicas al
                adoptado para saber cómo está?
              </label>
              <select
                className="form-adopt-text-input"
                name="question5"
                required={true}
                id="question5"
              >
                <option value="no">No estoy de acuerdo</option>
                <option value="si">Si, estoy de acuerdo</option>
              </select>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question6"
              >
                ¿Hay niños en casa? ¿De qué edades?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question6"
                required={true}
                maxLength={100}
                id="question6"
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question7"
              >
                Si cambiaras de domicilio, ¿Qué sucedería con el animalito?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question7"
                maxLength={100}
                id="question7"
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question8"
              >
                ¿Qué pasará con el animalito si toda la familia sale de
                vacaciones?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question8"
                maxLength={100}
                id="question8"
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question9"
              >
                ¿Tiene espacio suficiente para que el animalito esté cómodo?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question9"
                id="question9"
                maxLength={100}
              />
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question10"
              >
                ¿Dónde dormirá?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question10"
                maxLength={100}
                id="question10"
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question11"
              >
                ¿Cuánto tiempo pasará solo en casa?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question11"
                id="question11"
                maxLength={100}
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question12"
              >
                ¿Quién se encargará de cubrir sus gastos, limpiarlo,
                alimentarlo, cuidarlo, pasearlo, etc?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question12"
                id="question12"
                maxLength={100}
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question13"
              >
                Todos los miembros de la familia están de acuerdo con la
                adopción?
              </label>
              <select
                className="form-adopt-text-input"
                name="question13"
                id="question13"
                required={true}
              >
                <option value="si">Si, todos están de acuerdo</option>
                <option value="hay desacuerdos">
                  Hay algunas discordancias
                </option>
                <option value="no">Algunos miebros están en desacuerdo</option>
                <option value="no lo saben">No lo saben aún</option>
              </select>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question14"
              >
                En caso de embarazo, divorcio, enfermedad, u otra contingencia
                familiar, ¿Con quién se quedará el animalito?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question14"
                id="question14"
                maxLength={100}
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question15"
              >
                ¿Estás consciente de los cuidados que implica tener un animal de
                compañía, y que tendrá que cuidarlo por el resto de su vida?
                (veterinario, cuidados, comida, paciencia, amor, etc)
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question15"
                id="question15"
                maxLength={100}
              ></textarea>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question16"
              >
                ¿Tienes algún veterinario de confianza?
              </label>
              <select
                className="form-adopt-text-input"
                name="question16"
                id="question16"
              >
                <option value="no">No tengo uno aún</option>
                <option value="si">Si, lo tengo</option>
              </select>
            </div>

            <div className="form-adopt-div-textarea-cuestionario">
              <label
                className="form-adopt-label-cuestionario"
                htmlFor="question17"
              >
                ¿Cuentas con recursos económicos para cubrir los gastos
                veterinarios de la mascota?
              </label>
              <textarea
                className="form-adopt-text-input"
                type="text"
                name="question17"
                id="question17"
                maxLength={100}
              ></textarea>
            </div>

            <div className="form-button-div">
              <Button
                type="button-transparent"
                text="Regresar"
                submit="button"
                onClick={showPersonalInfo}
              />
              <Button type="button-pink" text="Enviar" submit="submit" />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
