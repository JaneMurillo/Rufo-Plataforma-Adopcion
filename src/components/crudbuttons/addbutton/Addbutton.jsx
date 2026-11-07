import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../../button/Button';
import { Flecha } from '../../flecha/Flecha';
import './Addbutton.css';

export function Addbutton() {
  const [openAddForm, setOpenAdd] = useState('closed');
  const [addInfoPet, setInfoPet] = useState('visible');
  const [addHistoryPet, setHistoryPet] = useState('invisible');

  const [pet_id, setPetID] = useState(0);
  const [pet_nombre, setPetName] = useState('');
  const [pet_raza, setPetBreed] = useState('');
  const [pet_tamano, setPetSize] = useState('');
  const [pet_personalidad, setPetPersonality] = useState('');
  const [pet_color, setPetColor] = useState('');
  const [pet_edad, setPetAge] = useState('');
  const [pet_sexo, setPetSex] = useState('');
  const [pet_especie, setPetSpecie] = useState('');
  const [health_id, setHealthID] = useState(0);

  const btnOpenAdd = async () => {
    
    window.scroll(0, 0);
    setOpenAdd('open');
    setInfoPet('visible');
    setHistoryPet('invisible');
  };
  const continueAdd = (event) => {
    event.preventDefault();
    console.log(event);
    setPetName(event.target.name.value);
    setPetBreed(event.target.breed.value);
    setPetSize(event.target.size.value);
    setPetPersonality(event.target.personality1.value);
    setPetColor(event.target.color.value);
    setPetAge(event.target.age.value);
    setPetSex(event.target.sex.value);
    setPetSpecie(event.target.specie.value);
    window.scroll(0, 0);
    setInfoPet('invisible');
    setHistoryPet('visible');
  };
  const showAddedInfo = () => {
    window.scroll(0, 0);
    setInfoPet('visible');
    setHistoryPet('invisible');
  };
  const closeAddForm = () => {
    setOpenAdd('closed');
  };
  const sendAdd = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      data: {
        pet_name: pet_nombre,
        pet_breed: pet_raza,
        pet_size: pet_tamano,
        pet_personality: pet_personalidad,
        pet_color: pet_color,
        pet_age: pet_edad,
        pet_sex: pet_sexo,
        pet_specie: pet_especie,
        pet_user_id: pet_id,
        health_date:  new Date(Date.now()),
        health_notes: e.target.notes.value,
        health_pet_id: health_id
      },
      url: 'http://localhost:5000/mascota/pet',
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="pet-add-button">
        <Button type="" text="Agregar mascota" onClick={btnOpenAdd}/>
      </div>

      <div className={`overlay-btn-add ${openAddForm}`}></div>
      <div className={`add-popup ${openAddForm}`}>
        <div className="add-popup-container">
          <p className="close-add-popup" onClick={closeAddForm}>
            &times;
          </p>
          <form className="add-form" onSubmit={continueAdd}>
            <h2 className={`add-popup-title ${addInfoPet}`}>Agregar mascota</h2>

            <fieldset className={`form-add-fieldset ${addInfoPet}`}>
              <div className="add-imgs-container">
                <Flecha color="blue" direction="left" />
                <div className="add-imgs">
                  <button className="add-imgs-btn">
                    <div className="add-icon">
                      <div className="add-icon-h"></div>
                      <div className="add-icon-v"></div>
                    </div>
                  </button>
                </div>
                <Flecha color="blue" direction="right" />
              </div>

              <div className="add-info-input-text">
                <label className="add-p" htmlFor="nombre">Nombre: </label>
                <input 
                  type="text" 
                  className="add-text"
                  id="name"
                  name="name"
                  required={true}
                  maxLength={20}
                ></input>
              </div>

              <div className="add-info-input">
                <label className="add-p" htmlFor="especie">
                  Especie:
                </label>
                <div className="opts-add">
                  <select 
                    id="specie"
                    name="specie" 
                    className="select-especie"
                    required={true}>
                    <option value=""></option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                  </select>
                </div>
              </div>

              <div className="add-info-input-text">
                <p className="add-p" htmlFor="raza">Raza: </p>
                <input 
                  type="text" 
                  className="add-text"
                  id="breed"
                  name="breed"
                  required={true}
                  maxLength={50}
                ></input>
              </div>

              <div className="add-info-input">
                <label className="add-p">Sexo:</label>
                <div className="opts-add-radio">
                  <div className="opc-add">
                    <input
                      className="radio-add"
                      id="sex-hembra"
                      type="radio"
                      value="H"
                      name="sexo"
                    ></input>
                    <label className="lbl-add" htmlFor="sex-hembra">
                      {' '}
                      Hembra
                    </label>
                  </div>
                  <div className="opc-add">
                    <input
                      className="radio-add"
                      type="radio"
                      value="M"
                      id="sex-macho"
                      name="sexo"
                    ></input>
                    <label className="lbl-add" htmlFor="sex-macho">
                      {' '}
                      Macho
                    </label>
                  </div>
                </div>
              </div>

              <div className="add-info-input">
                <label className="add-p">Talla:</label>
                <div className="opts-add-radio">
                  <div className="opc-add">
                    <input
                      className="radio-add"
                      id="talla-p"
                      type="radio"
                      value="P"
                      name="talla"
                    ></input>
                    <label className="lbl-add" htmlFor="talla-p">
                      {' '}
                      Pequeña
                    </label>
                  </div>
                  <div className="opc-add">
                    <input
                      className="radio-add"
                      id="talla-m"
                      type="radio"
                      value="M"
                      name="talla"
                    ></input>
                    <label className="lbl-add" htmlFor="talla-m">
                      {' '}
                      Mediana
                    </label>
                  </div>
                  <div className="opc-add">
                    <input
                      className="radio-add"
                      id="talla-g"
                      type="radio"
                      value="G"
                      name="talla"
                    ></input>
                    <label className="lbl-add" htmlFor="talla-g">
                      {' '}
                      Grande
                    </label>
                  </div>
                </div>
              </div>

              <div className="add-info-input-text">
                <p className="add-p" htmlFor="color">Color: </p>
                <input 
                  type="text" 
                  className="add-text"
                  name="color"
                  id="color"
                  required={true}
                  maxLength={50}
                ></input>
              </div>

              <div className="add-info-input">
                <label className="add-info-lbl" htmlFor="health-status">
                  Estado de salud:
                </label>
                <div className="opts-add">
                  <select 
                    id="health-status" 
                    name="health-status" 
                    className="select-health-status"
                    required={true}>
                    <option value=""></option>
                    <option value="en-revision">En revisión</option>
                    <option value="sano">Sano</option>
                    <option value="bajo-tratamiento">Bajo tratamiento</option>
                    <option value="grave">Grave</option>
                  </select>
                </div>
              </div>

              <div className="add-personality-inputs">
                <div className="personality-letf">
                  <p className="add-p">Personalidad: </p>
                </div>
                <div className="personality-right">
                  <input 
                    type="text" 
                    className="add-input-per"
                    name="personality"
                    id="personality"
                    maxLength={25}
                    required={true}
                  ></input>
                  <input 
                    type="text" 
                    className="add-input-per"
                    name="personality"
                    id="personality"
                    maxLength={25}
                  ></input>
                  <input 
                    type="text" 
                    className="add-input-per"
                    name="personality"
                    id="personality"
                    maxLength={25}
                  ></input>
                  <input 
                    type="text" 
                    className="add-input-per"
                    name="personality"
                    id="personality"
                    maxLength={25}
                  ></input>
                </div>
              </div>
              <div className='form-btn-continue'>
                <Button type="" text="Continuar" submit="submit"/>
              </div>
            </fieldset>
          </form>

          <form className="med-hist-form" onSubmit={sendAdd}>
            <h2 className={`med-hist-popup-title ${addHistoryPet}`}>Historial Médico</h2>
            <fieldset className={`med-hist-popup-fieldset ${addHistoryPet}`}>
              <div className="med-hist-info-input">
                <label className="mhist-info-lbl">Esterilizado:</label>
                <div className="opts-med-hist-radio">
                  <div className="opc-med-hist">
                    <input
                      className="radio-med-hist"
                      id="esterilizado-si"
                      type="radio"
                      value="H"
                      name="esterilizado"
                    ></input>
                    <label className="lbl-med-hist" htmlFor="esterilizado-si">
                      {' '}
                      Sí
                    </label>
                  </div>
                  <div className="opc-med-hist">
                    <input
                      className="radio-med-hist"
                      type="radio"
                      value="M"
                      id="esterilizado-no"
                      name="esterilizado"
                    ></input>
                    <label className="lbl-med-hist" htmlFor="esterilizado-no">
                      {' '}
                      No
                    </label>
                  </div>
                </div>
              </div>

              <p className="mhist-p">Vacunas</p>
              <div className="mhist-table-vaccines">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11/12/22</td>
                      <td>Rabia</td>
                    </tr>
                    <tr>
                      <td>11/12/22</td>
                      <td>Leptospirosis</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mhist-p">Cirugias</p>
              <div className="mhist-table-surgeries">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Tipo de exposición</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11/12/22</td>
                      <td>Quemaduras</td>
                    </tr>
                    <tr>
                      <td>11/12/22</td>
                      <td>Mordida</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mhist-p">Desparacitación</p>
              <div className="mhist-table-deworming">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Antiparasitario</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11/12/22</td>
                      <td>Vermiplex</td>
                    </tr>
                    <tr>
                      <td>11/12/22</td>
                      <td>Vermiplex</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mhist-p">Necesidades especiales</p>
              <input 
                type="text" 
                className="mhist-input"
                name="notes"
                id="notes"
                maxLength={100}
                ></input>
              <p className="mhist-p">Fotos</p>
              <div className="mhist-imgs-container">
                <div className="mhist-img"></div>
                <p className="mhist-img-p">Foto de pepé</p>
                <p className="mhist-img-times">&times;</p>
              </div>
              <div className="mhist-btn-img">
                <Button type="" text="Añadir foto" />
              </div>
              <div className='mhist-btns'>
                <Button type="button-transparent" text="Regresar" submit="button"
                  onClick={showAddedInfo} />
                <Button type="button-pink" text="Terminar" submit="submit" />
              </div>
            </fieldset>
            
          </form>

          
        </div>
      </div>
    </>
  );
}
