import React from 'react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/footer';
import { Bannerdonate } from './bannerdonate/bannerdonate';
import { Donatecontent } from './donatecontent/donatecontent';

export function Donate() {
  return (
    <>
      <Header />
      <Bannerdonate />
      <Donatecontent donativos={0} />
      <Footer />
    </>
  );
}
