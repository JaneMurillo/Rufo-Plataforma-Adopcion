import React from 'react'
import {Header} from './../../components/header/Header'
import {Footer} from './../../components/footer/footer'
import { BannerRecomend } from './banneradopt/banneradopt'
import { Recomendcontent } from './recomendations/recomendcontent'

export function Recomend() {
  return (
    <>
        <Header/>
        <BannerRecomend/>
        <Recomendcontent />
        <Footer/>
    </>
  )
}
