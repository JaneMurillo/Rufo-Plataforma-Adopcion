import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './donatecontent.css';
import { Link } from 'react-router-dom';
import donateimg from './donate.png';
import { Button } from '../../../components/button/Button';

export function Donatecontent() {
  const [unico, setUnico] = useState('selected');
  const [mensual, setMensual] = useState('not-selected');
  const [numDonativos, setNumDonativos] = useState();

  const changeSelectedUnico = () => {
    if (unico !== 'selected') {
      setUnico('selected');
      setMensual('not-selected');
    }
  };

  const changeSelectedMensual = () => {
    if (mensual !== 'selected') {
      setMensual('selected');
      setUnico('not-selected');
    }
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/donative/count',
    }).then((res) => {
      setNumDonativos(res.data);
    });
  }, []);

  return (
    <>
      <div className="donate-body-div">
        <h2 className="h2-dnt-mnt">Dona</h2>
        <h3 className="h3-dnt-mnt">
          Se han realizado {numDonativos} donativos...
        </h3>

        <div className="donate-options">
          <form className="donate-format" method="get">
            <fieldset className="dnt-field-form1">
              <div>
                <p className="dnt-tipos-p">Donativo: </p>
                <button
                  type="button"
                  className={`btn-opt ${unico}`}
                  onClick={changeSelectedUnico}
                >
                  Único
                </button>
                <button
                  type="button"
                  className={`btn-opt ${mensual}`}
                  onClick={changeSelectedMensual}
                >
                  Mensual
                </button>
              </div>
            </fieldset>

            <fieldset className="dnt-field-form">
              <p for="monto">Selecciona un monto:</p>
              <select name="monto" className="select-dnt-mnt">
                <option value="ciencuenta">50</option>
                <option value="cien">100</option>
                <option value="doscientos">200</option>
              </select>
            </fieldset>

            <fieldset className="dnt-field-form">
              <p>Información del donante: </p>
              <input
                type="text"
                className="input-dnt"
                placeholder="Correo electrónico"
              />
              <div className="dnt-input-doble-div">
                <input type="text" className="input-dnt" placeholder="Nombre" />
                <input
                  type="text"
                  className="input-dnt"
                  placeholder="Apellido"
                />
              </div>
            </fieldset>
            <div className="btn-submit-form">
              <Link to="/donate-payment">
                <Button type="button-pink" text="Seguir" />
              </Link>
            </div>
          </form>

          <div className="donate-other-ways">
            <img className="donateimg" alt="donateimg" src={donateimg} />
            <div>
              <h3 className="h3-otrasmaneras-dnt">Otras maneras de ayudar</h3>
              <p className="p-otrasmaneras-texto">
                Si no puedes hacer un donativo en efectivo, hay otras maneras en
                las que puedes ayudar <br></br>
                Donación en especie:
                <li className="list-opt-dnt">Casitas</li>
                <li className="list-opt-dnt">Productos de limpieza</li>
                <li className="list-opt-dnt">Platos</li>
                <li className="list-opt-dnt">Collares y correas</li>
                <li className="list-opt-dnt">Lonas para cubrir las jaulas</li>
                <li className="list-opt-dnt">Comida</li>
              </p>
              <Button type="" text="Seguir" />
            </div>
          </div>
        </div>
      </div>

      <div className="donate-info-div">
        <h2 className="h2-dnt-mnt">Algunos gastos del albergue</h2>
        <table className="donate-gastos-table">
          <tr>
            <td>Un costal de Canem Basis de 20 kilos cuesta $450.00</td>
            <td>
              En un solo día se necesitan 6 costales para alimentarlos a todos
            </td>
          </tr>
          <tr>
            <td>El costo de una vacuna múltiple es de $300 en promedio</td>
            <td>Los cachorros necesitan 3 refuerzos</td>
          </tr>
          <tr>
            <td>Costo de la vacuna contra rabia: $100</td>
            <td>
              Además necesitan vacunas contra Rabia y Bordetella para completar
              su esquema
            </td>
          </tr>
          <tr>
            <td>Costo de desparasitante: entre $60 y $150</td>
            <td>El costo varía de acuerdo al peso y tamaño del perro</td>
          </tr>
          <tr>
            <td>La cirugía de esterilización cuesta entre $300 y $1,500</td>
            <td>El costo varía de acuerdo al peso y tamaño del perro</td>
          </tr>
        </table>

        <div className="donate-extrainfo-div">
          <p>
            <strong>Comparte nuestra página en tus redes sociales.</strong>
            <br />
            Con esto nos ayudas a llegar a las familias que están buscando un
            nuevo compañero y que aún no saben que pueden adoptarlo en lugar de
            comprar.
          </p>

          <p>
            <strong>
              Participa en alguno de nuestros eventos de voluntariado.
            </strong>
            <br />
            Cada cierto tiempo organizamos eventos donde reclutamos voluntarios,
            pueden ser eventos de adopciones, jornadas de limpieza, etc.
          </p>
        </div>
      </div>
    </>
  );
}
