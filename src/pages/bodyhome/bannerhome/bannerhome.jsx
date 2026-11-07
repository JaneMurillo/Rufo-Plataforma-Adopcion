import React from 'react'
import { Link } from 'react-router-dom';
import './bannerhome.css'
import {Button} from '../../../components/button/Button';

export function Bannerhome () {
    return(
        <>
            <div className='home-container'>
                <h1>Compartamos <br></br> una vida juntos</h1>
                <Link to="/adopta"><Button type="button-pink" text="Adopta un amigo"/></Link>
            </div>
        </>
    )
}