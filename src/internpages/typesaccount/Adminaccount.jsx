import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/Header';
import { Userbanner } from '../../components/userbanner/userbanner';
import { Adminmenu } from '../../components/usermenus/adminmenu/adminmenu';
import { Adminmyaccount } from './adminmyaccount/adminmyaccount';

export function Adminaccount() {
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
      <Userbanner type="banner-adopter" />
      <Adminmenu />
      <Adminmyaccount />
      <Footer />
    </>
  );
}
