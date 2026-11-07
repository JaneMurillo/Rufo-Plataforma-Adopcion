import React, { useState } from 'react';
import { Button } from '../../button/Button';
import { Flecha } from '../../flecha/Flecha';
import './Updatebutton.css';

export function Updatebutton() {
  const [openEditForm, setOpenEdit] = useState('closed');
  const [editInfoPet, setEInfoPet] = useState('visible');
  const [editHistoryPet, setEHistoryPet] = useState('invisible');

  const btnOpenEdit = async () => {
    
    window.scroll(0, 0);
    setOpenEdit('open');
    setEInfoPet('visible');
    setEHistoryPet('invisible');
  };
  const continueEdit = (event) => {
    event.preventDefault();
    console.log(event);
    window.scroll(0, 0);
    setEInfoPet('invisible');
    setEHistoryPet('visible');
  };
  const showUpdatedInfo = () => {
    window.scroll(0, 0);
    setEInfoPet('visible');
    setEHistoryPet('invisible');
  };
  const closeEditForm = () => {
    setOpenEdit('closed');
  };
  const sendEdit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="pet-edit-button">
        <Button type="" text="Modificar mascota"  onClick={btnOpenEdit}/>
      </div>

      <div className={`overlay-btn-edit ${openEditForm}`}></div>

      <div className={`edit-popup ${openEditForm}`}>
        <div className="edit-popup-container">
          <p className="close-edit-popup" onClick={closeEditForm}>
            &times;
          </p>
          <form className="edit-form" onSubmit={continueEdit}>
            <h2 className={`edit-popup-title ${editInfoPet}`}>Modificar mascota</h2>
            <fieldset className={`form-edit-fieldset ${editInfoPet}`}>
              <div className="edit-imgs-container">
                <Flecha color="blue" direction="left" />
                <div className="edit-imgs">
                  <button className="edit-imgs-btn">
                    <div className="edit-icon">
                      <div className="edit-icon-h"></div>
                      <div className="edit-icon-v"></div>
                    </div>
                  </button>
                </div>
                <Flecha color="blue" direction="right" />
              </div>

              <div className="edit-info-input-text">
                <p>Nombre: </p>
                <input type="text" className="edit-text"></input>
              </div>
              <div className="edit-info-input">
                <label for="especie">Especie:</label>
                <div className="opts-edit">
                  <select name="especie" className="select-especie">
                    <option value="">Perro</option>
                    <option value="gato">Gato</option>
                  </select>
                </div>
              </div>
              <div className="edit-info-input-text">
                <p>Raza: </p>
                <input type="text" className="edit-text"></input>
              </div>
              <div className="edit-info-input">
                <label>Sexo:</label>
                <div className="opts-edit-radio">
                  <div className="opc-edit">
                    <input
                      className="radio-edit"
                      id="sex-hembra"
                      type="radio"
                      value="H"
                      name="sexo"
                    ></input>
                    <label className="lbl-edit" for="sex-hembra">
                      {' '}
                      Hembra
                    </label>
                  </div>
                  <div className="opc-edit">
                    <input
                      className="radio-edit"
                      type="radio"
                      value="M"
                      id="sex-macho"
                      name="sexo"
                    ></input>
                    <label className="lbl-edit" for="sex-macho">
                      {' '}
                      Macho
                    </label>
                  </div>
                </div>
              </div>
              <div className="edit-info-input">
                <label>Talla:</label>
                <div className="opts-edit-radio">
                  <div className="opc-edit">
                    <input
                      className="radio-edit"
                      id="talla-p"
                      type="radio"
                      value="P"
                      name="talla"
                    ></input>
                    <label className="lbl-edit" for="talla-p">
                      {' '}
                      Pequeña
                    </label>
                  </div>
                  <div className="opc-edit">
                    <input
                      className="radio-edit"
                      id="talla-m"
                      type="radio"
                      value="M"
                      name="talla"
                    ></input>
                    <label className="lbl-edit" for="talla-m">
                      {' '}
                      Mediana
                    </label>
                  </div>
                  <div className="opc-edit">
                    <input
                      className="radio-edit"
                      id="talla-g"
                      type="radio"
                      value="G"
                      name="talla"
                    ></input>
                    <label className="lbl-edit" for="talla-g">
                      {' '}
                      Grande
                    </label>
                  </div>
                </div>
              </div>
              <div className="edit-info-input-text">
                <p>Color: </p>
                <input type="text" className="edit-text"></input>
              </div>
              <div className="edit-info-input">
                <label className="edit-info-lbl" for="health-status">
                  Estado de salud:
                </label>
                <div className="opts-edit">
                  <select name="health-status" className="select-health-status">
                    <option value="">En revisión</option>
                    <option value="sano">Sano</option>
                    <option value="bajo-tratamiento">Bajo tratamiento</option>
                    <option value="grave">Grave</option>
                  </select>
                </div>
              </div>

              <div className="edit-personality-inputs">
                <div className="personality-letf">
                  <p>Personalidad: </p>
                </div>
                <div className="personality-right">
                  <input type="text" className="edit-pers"></input>
                  <input type="text" className="edit-pers"></input>
                  <input type="text" className="edit-pers"></input>
                  <input type="text" className="edit-pers"></input>
                </div>
              </div>
              <div className='form-btn-continue'>
                <Button type="" text="Continuar" submit="submit"/>
              </div>
            </fieldset>
          </form>

          <form className="up-med-hist-form" onSubmit={sendEdit}>
            <h2 className={`up-med-hist-popup-title ${editHistoryPet}`}>Historial Médico</h2>
            <fieldset className={`up-med-hist-popup-fieldset ${editHistoryPet}`}>
              <div className="up-med-hist-info-input">
                <label className="up-mhist-info-lbl">Esterilizado:</label>
                <div className="up-opts-med-hist-radio">
                  <div className="up-opc-med-hist">
                    <input
                      className="up-radio-med-hist"
                      id="up-esterilizado-si"
                      type="radio"
                      value="H"
                      name="esterilizado"
                    ></input>
                    <label className="up-lbl-med-hist" htmlFor="up-esterilizado-si">
                      {' '}
                      Sí
                    </label>
                  </div>
                  <div className="up-opc-med-hist">
                    <input
                      className="up-radio-med-hist"
                      type="radio"
                      value="M"
                      id="up-esterilizado-no"
                      name="esterilizado"
                    ></input>
                    <label className="up-lbl-med-hist" htmlFor="up-esterilizado-no">
                      {' '}
                      No
                    </label>
                  </div>
                </div>
              </div>

              <p className="up-mhist-p">Vacunas</p>
              <div className="up-mhist-table-vaccines">
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

              <p className="up-mhist-p">Cirugias</p>
              <div className="up-mhist-table-surgeries">
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
              <p className="up-mhist-p">Desparacitación</p>
              <div className="up-mhist-table-deworming">
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
              <p className="up-mhist-p">Necesidades especiales</p>
              <input type="text" className="up-mhist-input"></input>
              <p className="up-mhist-p">Fotos</p>
              <div className="up-mhist-imgs-container">
                <div className="up-mhist-img"></div>
                <p className="up-mhist-img-p">Foto de pepé</p>
                <p className="up-mhist-img-times">&times;</p>
              </div>
              <div className="up-mhist-btn-img">
                <Button type="" text="Añadir foto" />
              </div>
              <div className='up-mhist-btns'>
                <Button type="button-transparent" text="Regresar" submit="button"
                  onClick={showUpdatedInfo} />
                <Button type="button-pink" text="Terminar" submit="submit" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
