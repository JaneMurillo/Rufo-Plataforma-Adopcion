import React from 'react';
import { Link } from 'react-router-dom';
import './adoptermenu.css';

export function Adoptermenu () {
    return(
        <>
            <div className='adoptermenu-container'>
                <ul className='adoptermenu-nav-ul'>
                    <li>
                        <div className="adoptermenu-account-a">
                            <Link to='/adopteraccount'>Usuario Demo</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}