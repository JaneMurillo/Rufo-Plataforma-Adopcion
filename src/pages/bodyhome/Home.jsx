import React from 'react'
import {Header} from './../../components/header/Header';
import {Footer} from './../../components/footer/footer';
import {Bannerhome} from './bannerhome/bannerhome';
import {Aboutus} from './aboutus/aboutus';
import {Adoptsection} from './adoptsection/adoptsection'
import {Waystohelp} from './waystohelpsection/waystohelp';

export function Home() {
  return (
    <>
        <Header />
        <Bannerhome />
        <Aboutus />
        <Adoptsection />
        <Waystohelp />
        <Footer />
    </>
  )
}
