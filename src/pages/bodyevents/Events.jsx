import React from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/Header';
import { EventsContent } from './eventscontent/eventscontent';

export function Events(){
    return(
        <>
            <Header />
            <EventsContent />
            <Footer />
        </>
    )
}