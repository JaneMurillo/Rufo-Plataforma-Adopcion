import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './signlogcontent.css';
import logo from './logo.svg';
import { Button } from '../../../components/button/Button';

export function SignLogContent() {
  let history = useNavigate();

  const onLogin = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      data: {
        email: event.target.email.value,
        password: event.target.password.value,
      },
      withCredentials: true,
      url: 'http://localhost:5000/session/login',
    }).then(() => {
      saveToken();
    });
  };

  const onCreateUser = (event) => {
    event.preventDefault();
    if (event.target.password.value === event.target.passwordC.value) {
      axios({
        method: 'post',
        data: {
          user_email: event.target.email.value,
          user_password: event.target.password.value,
          user_fullname: event.target.username.value,
          user_lastconnection: new Date(Date.now()),
          user_type: 2,
        },
        withCredentials: true,
        url: 'http://localhost:5000/user',
      })
        .then((res) => {
          if (res.data.includes('Usuario ya existente')) {
            alert('El usuario ya existe');
          } else {
            onLogin(event);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert('Las contraseñas ingresadas no concuerdan');
    }
  };

  const onLoginFB = () => {
    window.open('http://localhost:5000/session/facebook', '_self');
  };

  const onLoginGoogle = () => {
    window.open('http://localhost:5000/session/google', '_self');
  };

  const saveToken = () => {
    axios({
      method: 'post',
      withCredentials: true,
      url: 'http://localhost:5000/session/create-token',
    })
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          if (res.data.type === 0) {
            history('/adminaccount');
          } else if (res.data.type === 1) {
            history('/staffaccount');
          } else if (res.data.type === 2) {
            history('/adopteraccount');
          }
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        alert('Error logging in, please try again\n' + err.message);
      });
  };

  return (
    <>
      <div className="signup-page-container">
        <h2 className="signup-h2">Sé parte de una vida</h2>
        <h3 className="signup-sign-h3">INGRESAR</h3>
        <div className="signup-cards-container">
          <div className="signup-card-div">
            <div className="signup-log-div">
              <img className="logo-signup" alt="Logo" src={logo} />
              <h3 className="signup-h3">INICIA SESIÓN</h3>
            </div>
            <p className="singup-datos-p">Ingresa los siguientes datos</p>
            <form onSubmit={onLogin}>
              <p className="singup-input-p">
                Nombre de usuario o correo eléctronico
              </p>
              <input
                type="email"
                placeholder="Escribe aquí..."
                className="signup-input"
                name="email"
                required={true}
              ></input>
              <p className="singup-input-p">Contraseña</p>
              <input
                type="password"
                placeholder="Escribe aquí..."
                className="signup-input"
                name="password"
                required={true}
              ></input>
              <p>
                <Link to="/contrasena">Olvidé mi contraseña</Link>
              </p>
              <Button type="button-pink" text="Continuar" submit="submit" />
            </form>

            <div className="signup-fb-google-button">
              <Button
                className="signup-fb-google-button"
                type="button-transp-black"
                text="Continua con Google"
                onClick={onLoginGoogle}
              />
              <Button type="button-blue" text="Continua con Facebook" />
            </div>
          </div>

          <div className="signup-card-div">
            <div className="signup-log-div">
              <img className="logo-signup" alt="Logo" src={logo} />
              <h3 className="signup-h3">REGISTRATE</h3>
            </div>
            <form onSubmit={onCreateUser}>
              <p className="singup-datos-p">Ingresa los siguientes datos</p>
              <p className="singup-input-p">Nombre de usuario</p>
              <input
                type="text"
                placeholder="Escribe aquí..."
                className="signup-input"
                name="username"
                required={true}
              ></input>
              <p className="singup-input-p">Correo eléctronico</p>
              <input
                type="email"
                placeholder="Escribe aquí..."
                className="signup-input"
                name="email"
                required={true}
              ></input>

              <p className="singup-input-p">Constraseña</p>
              <input
                type="password"
                placeholder="Escribe aquí..."
                className="signup-input"
                name="password"
                required={true}
              ></input>

              <p className="singup-input-p">Confirmar Constraseña</p>
              <input
                type="password"
                placeholder="Escribe aquí..."
                className="signup-input"
                name="passwordC"
                required={true}
              ></input>

              <fieldset className="signup-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    value="terminosCondiciones"
                    name="terminos"
                    required={true}
                  ></input>
                  Acepto <a href="/">Términos y Condiciones</a>
                </label>
                <p className="singup-field-form-p">
                  Si tiene dudas, revise nuestro{' '}
                  <a href="/">Aviso de Privacidad</a>
                </p>
              </fieldset>

              <Button type="button-pink" text="Continuar" submit="submit" />
            </form>
            <div className="signup-fb-google-button">
              <Button
                type="button-transp-black"
                text="Continua con Google"
                onClick={onLoginGoogle}
              />
              <Button
                type="button-blue"
                text="Continua con Facebook"
                onClick={onLoginFB}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
