import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/Header';
import { Userbanner } from '../../components/userbanner/userbanner';
import { Staffmenu } from '../../components/usermenus/staffmenu/staffmenu';
import { Staffmyaccount } from './staffmyaccount/staffmyaccount';

export function Staffaccount() {
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
        if (res.data.user.user_type !== 1) {
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
      <Staffmenu />
      <Staffmyaccount />
      <Footer />
    </>
  );
}
