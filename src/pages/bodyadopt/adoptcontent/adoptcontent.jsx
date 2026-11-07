import './adoptcontent.css';
import React from 'react';
import axios from 'axios';
import { Card } from '../../../components/card/Card';
import { Flecha } from '../../../components/flecha/Flecha';
import { Filter } from '../../../components/filter/filter';

export class Adoptcontent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      //isLoaded: false,
      offset: 0,
      count: 0,
      elements: [],
      talla: '',
      sexo: '',
      edad: '',
      search: '',
    };

    //agregar funciones creadas al componente
    this.recuperarElementos = this.recuperarElementos.bind(this);
    this.siguientePagina = this.siguientePagina.bind(this);
    this.anteriorPagina = this.anteriorPagina.bind(this);
    this.onSubmitFiltrar = this.onSubmitFiltrar.bind(this);
    this.searcChange = this.searchChange(this);
  }

  /*static getDerivedStateFromProps(props, state) {
    return { offset: props.offset };
  }*/

  searchChange = (event) => {
    //console.log('change');
    //let offset = this.state.offset;
    let talla = this.state.talla;
    let sexo = this.state.sexo;
    let edad = this.state.edad;
    if (event.target !== undefined) {
      this.setState({ search: event.target.value });
      //console.log('busqueda: ' + event.target.value);
      axios({
        method: 'post',
        data: {
          talla: talla,
          sexo: sexo,
          edad: edad,
          word: event.target.value,
        },
        url: 'http://localhost:5000/mascotas/search',
      }).then((res) => {
        this.setState({ elements: res.data.display, count: res.data.count });
      });
    }
  };

  onSubmitFiltrar = (event) => {
    event.preventDefault();
    let offset = this.state.offset;
    let word = this.state.search;
    axios({
      method: 'post',
      data: {
        talla: event.target.talla.value,
        sexo: event.target.sexo.value,
        edad: event.target.edad.value,
        word: word,
      },
      url: 'http://localhost:5000/mascotas/filter/offset/' + offset,
    }).then((res) => {
      console.log(res);
      this.setState({
        talla: event.target.talla.value,
        sexo: event.target.sexo.value,
        edad: event.target.edad.value,
        elements: res.data.display,
        count: res.data.count,
      });
    });
  };

  componentDidMount() {
    this.recuperarElementos();
  }

  recuperarElementos() {
    let offset = this.state.offset;
    let talla = this.state.talla;
    let sexo = this.state.sexo;
    let edad = this.state.edad;
    let word = this.state.search;
    axios({
      method: 'post',
      data: {
        talla: talla,
        sexo: sexo,
        edad: edad,
        word: word,
      },
      url: 'http://localhost:5000/mascotas/filter/offset/' + offset,
    }).then((data) => {
      //console.log('data recuperada adopta: ');
      //console.log(data);
      this.setState({ elements: data.data.display, count: data.data.count });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.offset !== prevState.offset) {
      this.recuperarElementos();
    }
  }

  siguientePagina() {
    if (this.state.offset / 5 + 1 < Math.ceil(this.state.count / 5))
      this.setState({ offset: this.state.offset + 5 });
  }

  anteriorPagina() {
    if (this.state.offset > 0) {
      this.setState({ offset: this.state.offset - 5 });
    }
  }

  render() {
    return (
      <>
        <div className="adopt-body-div">
          <Filter onSubmit={this.onSubmitFiltrar} />
          <div className="adopt-content-div">
            <div className="align-div-1">
              <Flecha
                color="blue"
                direction="left"
                onClick={this.anteriorPagina}
              />
              <input
                //type="text"
                placeholder="Buscar..."
                className="buscar-adopta-input"
                //name="search"
                //value={this.state.search}
                onChange={this.searchChange}
              ></input>
              <Flecha
                color="blue"
                direction="right"
                onClick={this.siguientePagina}
              />
            </div>

            <div className="cards-container-div-adopta">
              {this.state.elements.map((element) => (
                <Card
                  id={element.pet_id}
                  nombre={element.pet_name}
                  sex={element.pet_sex === 'M' ? 'Macho' : 'Hembra'}
                  age={element.pet_age}
                  size={element.pet_size}
                  color={element.pet_color}
                  raza={element.pet_specie}
                  personalidades={element.pet_personality}
                  //descripcion={element.descripcion}
                  //necesidadesEspeciales={element.necesidades}
                />
              ))}
            </div>

            <div className="adopt-num-pages">
              <Flecha
                color="blue"
                direction="left"
                onClick={this.anteriorPagina}
              />
              <div className="adopt-p-div">
                <p>
                  {this.state.offset / 5 + 1} de{' '}
                  {Math.ceil(this.state.count / 5)}
                </p>
              </div>
              <Flecha
                color="blue"
                direction="right"
                onClick={this.siguientePagina}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
