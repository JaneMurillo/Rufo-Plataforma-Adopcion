import React from 'react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/footer';
import { Userbanner } from '../../components/userbanner/userbanner';
import { Adminmenu } from '../../components/usermenus/adminmenu/adminmenu';
import { Rescuedpets } from '../../internpages/adminpets/rescuedpets/rescuedpets';

export function Blog() {
  return (
    <>
      <Header />
      <Userbanner type='banner-admin' text="Mascotas"/>
      <Adminmenu />
      <Rescuedpets />
      <Footer />
    </>
  );
}
