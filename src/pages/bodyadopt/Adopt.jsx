import React from 'react'
import {Header} from './../../components/header/Header'
import {Footer} from './../../components/footer/footer'
import { BannerAdopt } from './banneradopt/banneradopt'
import { Adoptcontent } from './adoptcontent/adoptcontent'

export function Adopt() {
  return (
    <>
        <Header/>
        <BannerAdopt/>
        <Adoptcontent />
        <Footer/>
    </>
  )
}
