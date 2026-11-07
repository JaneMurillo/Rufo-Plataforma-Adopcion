import React from 'react'
import {AboutBanner} from './banner/aboutusbanner'
import {Header} from './../../components/header/Header'
import { QuienesSomos } from './body/quienessomos/quienessomos'
import { MisionVisionValores } from './body/mision-vision-valores/mision-vision-valores'
import { Foto } from './body/foto/foto'
import { Footer } from '../../components/footer/footer'

export function AcercaNosotros() {
  return (
    <>
    <Header/>
    <AboutBanner />
    <QuienesSomos />
    <MisionVisionValores />
    <Foto />
    <Footer />
    </>
  )
}
