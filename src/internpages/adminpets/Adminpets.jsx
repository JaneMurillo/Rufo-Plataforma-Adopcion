import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Footer } from './../../components/footer/footer';
import { Rescuedpets } from './rescuedpets/rescuedpets';
import { Userbanner } from '../../components/userbanner/userbanner';
import { Header } from '../../components/header/Header';
import { Adminmenu } from '../../components/usermenus/adminmenu/adminmenu';

export function Adminpets() {
  const history = useNavigate();

  useEffect(() => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/session/verify-login',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.data.user.user_type !== 0) {
          history('/signlog');
        }
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  }, [history]);

  return (
    <>
      <Header />
      <Userbanner type="banner-admin" text="Mascotas" />
      <Adminmenu />
      <Rescuedpets />
      <Footer />
    </>
  );
}
