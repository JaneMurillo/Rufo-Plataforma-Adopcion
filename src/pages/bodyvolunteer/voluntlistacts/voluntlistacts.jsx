import React from 'react';
import { Button } from '../../../components/button/Button';
import CardVol from '../../../components/cards/card-vol-act/cardvolact';
import './voluntlistacts.css';
import imgact1 from './Act1.jpeg';
import imgact2 from './Act2.jpeg';

export function VoluntListActs(){
    return(
        <>
            <div className='vol-list-act-container'>
                <h2>Lista de Actividades</h2>
                <div className='cards-container-div-vol-acts'>
                    <CardVol
                        title="¡¡BAZAR CON CAUSA!!"
                        hashtag="#Bazar #Voluntariado"
                        content="Ayudanos en el bazar con causa ubicado en Angel Romero 1822, por Paseo del Sol, Zapopan, el 20 y 21 de Marzo de 10:00-17:00"
                        img={imgact1}
                    />
                    <CardVol
                        title="Construccion de casitas"
                        hashtag="#Construccion #Voluntariado"
                        content="Ven a nuestra cede y ayudanos en la construcción y pintada de las casas de nuestros perritos."
                        img={imgact2}
                    />
                </div>
                
                <Button type="button-pink" text="Ver más"/>
            </div>
        </>
    )
}