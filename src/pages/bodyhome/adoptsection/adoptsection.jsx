import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './adoptsection.css';
import { Button } from '../../../components/button/Button';
import { Card } from './../../../components/card/Card';
import { Flecha } from './../../../components/flecha/Flecha';

export class Adoptsection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //error: null,
      //isLoaded: false,
      offset: 0,
      elements: [],
      count: 0,
    };

    //agregar funciones creadas al componente
    this.recuperarElementos = this.recuperarElementos.bind(this);
    this.siguientePagina = this.siguientePagina.bind(this);
    this.anteriorPagina = this.anteriorPagina.bind(this);
  }

  /*static getDerivedStateFromProps(props, state) {
        return { offset: props.offset };
      }*/

  componentDidMount() {
    this.recuperarElementos();
  }

  recuperarElementos() {
    let offset = this.state.offset;
    axios({
      method: 'get',
      url: 'http://localhost:5000/mascotas/pet/offset/' + offset,
    }).then((res) => {
      //console.log(res);
      this.setState({ elements: res.data.display, count: res.data.count });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.offset !== prevState.offset) {
      this.recuperarElementos();
    }
  }

  siguientePagina() {
    if (this.state.offset / 2 + 1 < Math.ceil(this.state.count / 2))
      this.setState({ offset: this.state.offset + 2 });
  }

  anteriorPagina() {
    if (this.state.offset > 0) {
      this.setState({ offset: this.state.offset - 2 });
    }
  }

  render() {
    return (
      <>
        <div className="adoptsection-container">
          <div className="flecha izquierda">
            <Flecha
              color={'blue'}
              direction="left"
              onClick={this.anteriorPagina}
            />
          </div>

          <div className="center">
            <h2>Adopciones</h2>

            <div className="cards-container-div-home">
              {this.state.elements.map((element) => (
                <Card
                  nombre={element.pet_name}
                  sex={element.pet_sex === 'M' ? 'Macho' : 'Femenino'}
                  age={element.pet_age}
                  size={element.pet_size}
                  color={element.pet_color}
                  raza={element.pet_specie}
                  personalidades={element.pet_personality}
                  //descripcion={element.descripcion}
                />
              ))}
            </div>

            <Link to="/adopta">
              <Button type="" text="Ver todos" />
            </Link>
          </div>

          <div className="flecha derecha">
            <Flecha color="blue" direction="" onClick={this.siguientePagina} />
          </div>
        </div>
      </>
    );
  }
}
