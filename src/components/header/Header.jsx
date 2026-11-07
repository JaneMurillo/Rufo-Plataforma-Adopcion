import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './Header.css';
import { Button } from './../button/Button';

export function Header() {
  let history = useNavigate();
  const [openMenu, setOpenMenu] = useState('closed');
  const changeOpenMenu = () => {
    setOpenMenu(openMenu === 'closed' ? 'open' : 'closed');
  };

  const [auth, setAuth] = useState('false');
  const [userType, setUserType] = useState();

  useEffect(() => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/session/user-exists',
    })
      .then(async (res) => {
        //console.log(res);
        //console.log(!localStorage.getItem('token'));
        //si hay usuario pero no hay token, se crea un token (facebook y google)
        if (res.data && !localStorage.getItem('token')) {
          await axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:5000/session/create-token',
          })
            .then((res) => {
              //console.log(res);
              if (res.status === 200) {
                //console.log('saving token..' + res.data.token);
                localStorage.setItem('token', res.data.token);
                if (res.data.type === 0) {
                  history('/adminaccount');
                } else if (res.data.type === 1) {
                  history('/staffaccount');
                } else {
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
        }
      })
      .then(async () => {
        //verificacion de token existente
        await axios({
          method: 'get',
          withCredentials: true,
          url: 'http://localhost:5000/session/verify-login',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res) => {
            //console.log(res);
            if (res.data.auth === 'false') localStorage.removeItem('token');
            setVariables(res);
          })
          .catch((err) => {
            console.log('error');
            console.log(err);
          });
      });
  }, [auth, userType, history]);

  const setVariables = (res) => {
    setAuth(res.data.auth);
    setUserType(res.data.user.user_type);
  };

  /*useEffect(async () => {
    await axios({
          method: 'get',
          withCredentials: true,
          url: 'http://localhost:5000/session/verify-login',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.auth === 'false') localStorage.removeItem('token');
            setAuth(res.data.auth);
            setUserType(res.data.user.user_type);
          })
          .catch((err) => {
            console.log('error');
            console.log(err);
          });
  }, [auth, userType]);*/

  function cerrarSesionButton() {
    localStorage.removeItem('token');
    setAuth('false');
    window.location.reload(false);
  }

  function logInOutButton() {
    //console.log('auth: ' + auth);
    if (auth === 'true') {
      //console.log('hay usuario: ' + auth);
      if (userType === 0) {
        return (
          <Link to="/adminaccount">
            <Button type="" text="Perfil" />
          </Link>
        );
      } else if (userType === 1) {
        return (
          <Link to="/staffaccount">
            <Button type="" text="Perfil" />
          </Link>
        );
      } else if (userType === 2) {
        return (
          <Link to="/adopteraccount">
            <Button type="" text="Perfil" />
          </Link>
        );
      } else {
        return null;
      }
    } else {
      return (
        <Link to="/signlog">
          <Button type="" text="Ingresar" />
        </Link>
      );
    }
  }

  return (
    <>
      <header>
        <div className="logo-div">
          <div className="burguer-icon" onClick={changeOpenMenu}>
            <div className={`burguer-bar ${openMenu}`}></div>
            <div className={`burguer-bar ${openMenu}`}></div>
            <div className={`burguer-bar ${openMenu}`}></div>
          </div>

          <h3 className={`menu-title ${openMenu}`}>MENÚ</h3>
          <Link to="/">
            <img className="Logo" alt="Logo" src={logo} />
          </Link>
        </div>

        <div className={`back-nav ${openMenu}`}></div>
        <ul className={`head-nav-ul ${openMenu}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/acercadenosotros">Nosotros</Link>
          </li>
          <li>
            <Link to="/donate">Donar</Link>
          </li>
          <li>
            <Link to="/events">Eventos</Link>
          </li>
          <li>
            <Link to="/volunteer">Voluntariado</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <h3 className="subtitle-menu">
              {userType === 0
                ? 'Admin'
                : userType === 1
                ? 'Staff'
                : userType === 2
                ? 'Perfil'
                : null}
            </h3>
          </li>
          {userType === 0 ? (
            <>
              <li className="perf-li-header">
                <Link to="/adminapplications">Solicitudes</Link>
              </li>
              <li className="perf-li-header">
                <Link to="/adminpets">Mascotas</Link>
              </li>
              <li className="perf-li-header">
                <Link to="/adminusers">Usuarios</Link>
              </li>
              <li className="perf-li-header">
                <Link to="/admindonate">Donativos</Link>
              </li>
              <li className="perf-li-header">
                <Link to="/adminreports">Reportes</Link>
              </li>
              <li className="perf-li-header">
                <p className="cerrar-sesion" onClick={cerrarSesionButton}>
                  Cerrar sesión
                </p>
              </li>
            </>
          ) : userType === 1 ? (
            <>
              <li className="perf-li-header">
                <Link to="/staffapplications">Solicitudes</Link>
              </li>
              <li className="perf-li-header">
                <Link to="/staffpets">Mascotas</Link>
              </li>
              <li className="perf-li-header">
                <p className="cerrar-sesion" onClick={cerrarSesionButton}>
                  Cerrar sesión
                </p>
              </li>
            </>
          ) : userType === 2 ? (
            <>
              <li className="perf-li-header">
                <Link to="/">Solicitudes</Link>
              </li>
              <li className="perf-li-header">
                <p className="cerrar-sesion" onClick={cerrarSesionButton}>
                  Cerrar sesión
                </p>
              </li>
            </>
          ) : null}
        </ul>
        <div className="inicio-sesion-div">
          {logInOutButton()}
          <Link to="/adopta">
            <Button type="button-pink" text="Adopta" />
          </Link>
        </div>
      </header>

      <div className={`overlay ${openMenu}`}></div>
    </>
  );
}
