import { useState } from 'react';
import React from 'react';
import { Button } from './../button/Button';
import './filter.css';

export function Filter({ onSubmit }) {
  const [open, setOpen] = useState('closed');
  const changeOpen = () => {
    setOpen(open === 'closed' ? 'open' : 'closed');
  };

  return (
    <>
      <div className="burguer-icon-filter-adp" onClick={changeOpen}>
        <div className={`burguer-bar-filter-adp`}></div>
        <div className={`burguer-bar-filter-adp`}></div>
        <div className={`burguer-bar-filter-adp`}></div>
      </div>

      <div className={`overlay-adp-filter ${open}`}></div>

      <div className={`filter-container ${open}`}>
        <p className={`cerrar-filtro-adp ${open}`} onClick={changeOpen}>
          &times;
        </p>

        <h2 className={`title-filter`}>FILTRO</h2>

        <form className="form-filter-adp" onSubmit={onSubmit}>
          <div className="filter-section-adp-div">
            <label className="lbl-adp-tipo" htmlfor="talla">
              Talla:
            </label>
            <div className="opts-adp">
              <select name="talla" className="select-adp">
                <option value="">Todos</option>
                <option value="peque">Pequeña</option>
                <option value="medi">Mediana</option>
                <option value="gran">Grande</option>
              </select>
            </div>
          </div>

          <div className="filter-section-adp-div">
            <label className="lbl-adp-tipo">Sexo:</label>
            <div className="opts-adp">
              <div className="opc-adp">
                <input
                  className="radio-adp"
                  id="sexo-hembra"
                  type="radio"
                  value="H"
                  name="sexo"
                ></input>
                <label className="lbl-adp" htmlfor="sexo-hembra">
                  {' '}
                  Hembra
                </label>
              </div>
              <div className="opc-adp">
                <input
                  className="radio-adp"
                  type="radio"
                  value="M"
                  id="sexo-macho"
                  name="sexo"
                ></input>
                <label className="lbl-adp" htmlfor="sexo-macho">
                  {' '}
                  Macho
                </label>
              </div>
              <div className="opc-adp">
                <input
                  className="radio-adp"
                  type="radio"
                  value=""
                  id="sexo-todos"
                  name="sexo"
                  defaultChecked="true"
                ></input>
                <label className="lbl-adp" htmlfor="sexo-todos">
                  {' '}
                  Todos
                </label>
              </div>
            </div>
          </div>

          <div className="filter-section-adp-div">
            <label className="lbl-adp-tipo">Edad:</label>
            <div className="opts-adp">
              <div className="opc-adp">
                <input
                  className="radio-adp"
                  type="radio"
                  value="cach"
                  id="edad-cachorro"
                  name="edad"
                ></input>
                <label className="lbl-adp" htmlfor="edad-cachorro">
                  {' '}
                  Cachorro
                </label>
              </div>
              <div className="opc-adp">
                <input
                  className="radio-adp"
                  type="radio"
                  value="adul"
                  id="edad-adulto"
                  name="edad"
                ></input>
                <label className="lbl-adp" htmlfor="edad-adulto">
                  {' '}
                  Adulto
                </label>
              </div>
              <div className="opc-adp">
                <input
                  className="radio-adp"
                  type="radio"
                  value=""
                  id="edad-todos"
                  name="edad"
                  defaultChecked="true"
                ></input>
                <label className="lbl-adp" htmlfor="edad-todos">
                  {' '}
                  Todos
                </label>
              </div>
            </div>
          </div>

          <Button
            type=""
            text="Filtrar"
            submit="submit"
            onClick={() => {
              setOpen('closed');
            }}
          />
        </form>
      </div>
    </>
  );
}
