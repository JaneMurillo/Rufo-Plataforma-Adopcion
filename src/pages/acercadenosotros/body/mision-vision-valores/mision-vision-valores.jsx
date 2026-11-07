import React from 'react'
import './mision-vision-valores.css'

export function MisionVisionValores() {
  return (
      //mvv = mision vision valores
    <div className='aboutus-mvv-div'>
        <div className='aboutus-section-div'>
            <h2 className='aboutus-h2'>Misión</h2>
            <p>Rescatar a los perros del sufrimiento y el abandono, proporcionándoles un lugar digno donde puedan rehabilitarse y reciban cuidados y amor hasta que estén listos para la adopción. Además de promover la adopción antes que la compra de animales de compañía y su tenencia responsable.</p>
        </div>

        <div className='aboutus-section-div'>
            <h2 className='aboutus-h2'>Visión</h2>
            <p>Cambiar las vidas de los animales que son rescatados y la percepción de los animales como seres que sienten y que forman parte de una familia.</p>
        </div>

        <div className='aboutus-section-div'>
            <h2 className='aboutus-h2'>Valores</h2>
            <ol>
                <li>Respeto. Promovemos el respeto a todo ser vivo y su derecho a una vida libre de sufrimiento.</li>
                <li>Trabajo voluntario. La mayoría de los colaboradores en el albergue son voluntarios que donan su tiempo en qualidad</li>
                <li>Beneficio de los animales que los necesitan. </li>
                <li>Compasión y amor. Son los principales valores al momento de ayudar a un animal desamparado.</li>
            </ol>
        </div>
    </div>
  )
}
