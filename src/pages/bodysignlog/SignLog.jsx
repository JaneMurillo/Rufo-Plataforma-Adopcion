import React from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/Header';
import { SignLogContent } from './signlogcontent/signlogcontent';

export function SignLog(){
    return(
        <>
            <Header />
            <SignLogContent />
            <Footer />
        </>
    )
}