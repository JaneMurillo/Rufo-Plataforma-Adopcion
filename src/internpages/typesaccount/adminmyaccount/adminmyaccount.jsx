import React from 'react';
import './adminmyaccount.css';

export function Adminmyaccount(){
    return(
        <>
            <div className='adminaccount-container'>
                <form className='adminaccount-form'>
                    <h2>Mi cuenta</h2>
                    <div className='adminaccount-col'>
                        <div className='adminaccount-img'>
                            <button className='adminaccount-imgs-btn'>
                                <div className='adminaccount-icon'>
                                    <div className='adminaccount-icon-h'></div>
                                    <div className='adminaccount-icon-v'></div>
                                </div>
                            </button>
                        </div>
                        <div className='adminaccount-info-container'>
                            <div className='adminaccount-type-info'>
                                <p>Tipo de cuenta: </p>
                                <p>Admin</p>
                            </div>
                            <div className='adminaccount-info'>
                                <p>Nombre: </p>
                                <input
                                    type="text"
                                    placeholder="Usuario Demo"
                                    className="adminaccount-input"
                                ></input>
                            </div>
                            <div className='adminaccount-info'>
                                <p>Email: </p>
                                <input
                                    type="text"
                                    placeholder="usuario@ejemplo.com"
                                    className="adminaccount-input"
                                ></input>
                            </div>
                            <div className='adminaccount-info'>
                                <p>Contraseña: </p>
                                <input
                                    type="text"
                                    placeholder="*********"
                                    className="adminaccount-input"
                                ></input>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>
        </>
    );
}