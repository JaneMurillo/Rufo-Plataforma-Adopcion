import '../adoptcontent/adoptcontent.css';
import React from 'react';
import axios from 'axios';
import { Card } from '../../../components/card/Card';
import { Flecha } from '../../../components/flecha/Flecha';
import { Filter } from '../../../components/filter/filter';
import { Button } from '../../../components/button/Button';
import { Link } from 'react-router-dom';

export class Recomendcontent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      //isLoaded: false,
      offset: 0,
      count: 0,
      elements: [],
      recomendaciones: [],
      talla: '',
      sexo: '',
      edad: '',
      search: '',
      recomendar: '',

      open: 'closed',
      showForm: false,
      showSecondOverlay: false,
      checkedBoxes: {
        sexo: false,
        talla: false,
        edad: false,
        activo: false,
        amigable: false,
        jugueton: false,
        amoroso: false,
        obediente: false,
        protector: false,
        sociable: false,
        tierno:false,
        timido:false,
        tranquilo:false
      },
      selectedCheckboxes: []
    };

    //agregar funciones creadas al componente
    this.recuperarElementos = this.recuperarElementos.bind(this);
    this.siguientePagina = this.siguientePagina.bind(this);
    this.anteriorPagina = this.anteriorPagina.bind(this);
    this.onSubmitFiltrar = this.onSubmitFiltrar.bind(this);
    this.searcChange = this.searchChange(this);
    this.changeOpen = this.changeOpen.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);
  }

  /*static getDerivedStateFromProps(props, state) {
    return { offset: props.offset };
  }*/

  buildApiUrl = (...paths) => {
    let baseUrl;
  
    if (process.env.REACT_APP_DOCKER === 'true') {
      // If running in Docker, use Docker-specific URL
      baseUrl = `http://${process.env.REACT_APP_API}:${process.env.REACT_APP_PORT}`;
    } else {
      // If not running in Docker, use the specified IP address and port
      baseUrl = `http://localhost:${process.env.REACT_APP_PORT}`;
    }
  
    return `${baseUrl}/${paths.join('/')}`;
  }

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
        url: this.buildApiUrl('mascotas', 'search'),
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
      url: this.buildApiUrl('mascotas', 'filter', 'offset', offset),
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
      url: this.buildApiUrl('mascotas', 'filter', 'offset', offset),
    }).then((data) => {
      //console.log('data recuperada adopta: ');
      //console.log(data);
      this.setState({ elements: data.data.display, count: data.data.count });
      console.log({ elements: data.data.display, count: data.data.count })
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.offset !== prevState.offset) {
      this.recuperarElementos();
    }
  }

  siguientePagina() {
    if (this.state.offset / 8 + 1 < Math.ceil(this.state.count / 8))
      this.setState({ offset: this.state.offset + 8 });
  }

  anteriorPagina() {
    if (this.state.offset > 0) {
      this.setState({ offset: this.state.offset - 8 });
    }
  }

  changeOpen = () => {
    if (this.state.open === 'closed') {
      window.scroll(0, 0);
      this.setState({ open: 'open', showForm: true });
    } else {
      this.setState({ open: 'closed', showForm: false, showSecondOverlay: false });
    }
  };

  checkboxChange(checkboxName) {
    this.setState(prevState => {
      let updatedCheckBoxes = { ...prevState.checkedBoxes };
    
    if (checkboxName === 'masculino') {
      updatedCheckBoxes = {
        ...updatedCheckBoxes,
        sexo: 'masculino' 
      };
    } else if (checkboxName === 'hembra') {
      updatedCheckBoxes = {
        ...updatedCheckBoxes,
        sexo: 'hembra' 
      };
    } else if (checkboxName === 'pequena') {
      updatedCheckBoxes = {
        ...updatedCheckBoxes,
        talla: 'pequena' 
      };
    } else if (checkboxName === 'mediana') {
      updatedCheckBoxes = {
        ...updatedCheckBoxes,
        talla: 'mediana' 
      };
    } else if (checkboxName === 'grande') {
      updatedCheckBoxes = {
        ...updatedCheckBoxes,
        talla: 'grande' 
      };
    } else if (checkboxName === 'adulto') {
      updatedCheckBoxes = {
        ...updatedCheckBoxes,
        edad: 'adulto' 
      };
    } else if (checkboxName === 'cachorro') {
      updatedCheckBoxes = {
        ...updatedCheckBoxes,
        edad: 'cachorro' 
      };
    } else {
      updatedCheckBoxes = {
        ...updatedCheckBoxes,
        [checkboxName]: !prevState.checkedBoxes[checkboxName]
      };
    }

    const selectedCheckboxes = Object.keys(updatedCheckBoxes).map(
      checkbox => {
        if (checkbox === 'sexo') {
          switch (updatedCheckBoxes[checkbox]) {
            case 'masculino':
              return '1';
            case 'hembra':
              return '2';
            default:
              return '1';
          }
        } else if (checkbox === 'talla') {
          switch (updatedCheckBoxes[checkbox]) {
            case 'pequena':
              return '1';
            case 'mediana':
              return '2';
            case 'grande':
              return '3';
              default:
                return '1';
          }
        } else if (checkbox === 'edad') {
          switch (updatedCheckBoxes[checkbox]) {
            case 'cachorro':
              return '1';
            case 'adulto':
              return '2';
            default:
              return '1';
          }
        } else {
          return updatedCheckBoxes[checkbox] ? '1' : '0';
        }
      }
    );

      console.log('Seleccionados:', selectedCheckboxes);
      return {
        checkedBoxes: updatedCheckBoxes,
        selectedCheckboxes: selectedCheckboxes
      };
    });
  }
  
  async recuperarRecomendaciones() {
    try {
      const response = await axios.post(
        this.buildApiUrl('mascotas', 'recomendar'),
        { selectedCheckboxes: this.state.selectedCheckboxes }
      );
      const recomendacion = response.data.recommendation;
      this.setState({ recomendar: recomendacion });
      //console.log('recomendar has been updated:', this.state.recomendar);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error; 
    }
  }

  async queryRecomendaciones() {
    try {
      axios({
        method: 'post',
        data: {
          id: this.state.recomendar
        },
        url: this.buildApiUrl('mascotas', 'filter','recomendar'),
      }).then((data) => {
        this.setState({ recomendaciones: data.data, count_re: data.data });
        //console.log(  this.state)
      });
    }catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error; 
    }
  }

 handleClick = async (event) => {
    event.preventDefault(); 
    await this.recuperarRecomendaciones();
    await this.queryRecomendaciones(); 
    this.setState({ showSecondOverlay: true });
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
                placeholder="Buscar..."
                className="buscar-adopta-input"
                onChange={this.searchChange}
              ></input>
              <Flecha
                color="blue"
                direction="right"
                onClick={this.siguientePagina}
              />
            </div>

            <div className="cards-container-div-adopta">

              {this.state.recomendaciones.map((element) => (
                <Card
                  pet_id={element.pet_id}
                  nombre={element.pet_name}
                  sex={element.pet_sex === 'M' ? 'Macho' : 'Hembra'}
                  age={element.pet_age}
                  size={
                    element.pet_size === 'P' ? 'Pequeño' :
                    element.pet_size === 'M' ? 'Mediano' :
                    'Grande'}
                  color={element.pet_color}
                  raza={element.pet_breed}
                  personalidades={element.pet_personality}
                  descripcion={element.pet_needs}
                  img={element.photo_data}
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
            
            <div className='but-adopt-back'>
              <Link to='/adopta'>
                <Button
                  className="button-adopt-recom"
                  type="button-float-pink"
                  text="Regresar a Adopta"
                />
              </Link>
            </div>
            
            <div className='but-adopt-recom'>
                <Button
                  className="button-adopt-recom"
                  type="button-float-blue"
                  text="Recomendar otra vez"
                  onClick={this.changeOpen}
                />
            </div>
          </div>
        </div>
        <div className={`overlay-recom ${this.state.open}`}></div>
        <div className={`card-popup ${this.state.open}`}>
          <form className='form-match-1' >
            <fieldset>
              <div className='card-recom'>
                <p className="cierre-card-popup" onClick={this.changeOpen}>
                  &times;
                </p>

                <h2 className="card-popup-title">Recomendaciones</h2>

                <div className='recom-sex'>
                  <h3 className='recom-h3'>Sexo: </h3>
                  <div className='recom-two-btns'>
                    <div className="check-adopt-recom">
                      <input type="radio" name='recom-sex' className='check-type-adopt'
                        checked={this.state.checkedBoxes.masculino}
                        onChange={() => this.checkboxChange('masculino')}/>
                      <label className={this.state.checkedBoxes.masculino ? 'checked' : ''}>Masculino</label>
                    </div>

                    <div className="check-adopt-recom">
                      <input type="radio"  name='recom-sex' className='check-type-adopt'
                        checked={this.state.checkedBoxes.femenino}
                        onChange={() => this.checkboxChange('femenino')}/>
                      <label className={this.state.checkedBoxes.femenino ? 'checked' : ''}>Femenino</label>
                    </div>

                  </div>
                </div>

                <div className='recom-size'>
                  <h3 className='recom-h3'>Talla: </h3>
                  <div className='recom-size-btns'>
                    <div className="check-adopt-recom">
                      <input type="radio"  name='recom-talla' className='check-type-adopt'
                        checked={this.state.checkedBoxes.pequena}
                        onChange={() => this.checkboxChange('pequena')}/>
                      <label className={this.state.checkedBoxes.pequena ? 'checked' : ''}>Pequeña</label>
                    </div>

                    <div className="check-adopt-recom">
                        <input type="radio"  name='recom-talla' className='check-type-adopt'
                          checked={this.state.checkedBoxes.mediana}
                          onChange={() => this.checkboxChange('mediana')}/>
                        <label className={this.state.checkedBoxes.mediana ? 'checked' : ''}>Mediana</label>
                    </div>

                    <div className="check-adopt-recom">
                        <input type="radio"  name='recom-talla' className='check-type-adopt'
                          checked={this.state.checkedBoxes.grande}
                          onChange={() => this.checkboxChange('grande')}/>
                        <label className={this.state.checkedBoxes.grande ? 'checked' : ''}>Grande</label>
                    </div>
                  </div>
                </div>

                <div className='recom-age'>
                  <h3 className='recom-h3'>Edad: </h3>
                  <div className='recom-two-btns'>
                    <div className="check-adopt-recom">
                      <input type="radio"  name='recom-age' className='check-type-adopt'
                        checked={this.state.checkedBoxes.adulto}
                        onChange={() => this.checkboxChange('adulto')}/>
                      <label className={this.state.checkedBoxes.adulto ? 'checked' : ''}>Adulto</label>
                    </div>

                    <div className="check-adopt-recom">
                        <input type="radio"  name='recom-age' className='check-type-adopt'
                          checked={this.state.checkedBoxes.cachorro}
                          onChange={() => this.checkboxChange('cachorro')}/>
                        <label className={this.state.checkedBoxes.cachorro ? 'checked' : ''}>Cachorro</label>
                    </div>
                  </div>
                </div>

                <p className="card-popup-p">Selecciona 3 o más que te gusten</p>

                <div className='recom-person'>
                  <h3 className='recom-h3'>Personalidad: </h3>
                  <div className='recom-person-btns'>
                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.activo}
                          onChange={() => this.checkboxChange('activo')}/>
                        <label className={this.state.checkedBoxes.activo ? 'checked' : ''}>Activo</label>
                    </div>

                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.amigable}
                          onChange={() => this.checkboxChange('amigable')}/>
                        <label className={this.state.checkedBoxes.amigable ? 'checked' : ''}>Amigable</label>
                    </div>

                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.jugueton}
                          onChange={() => this.checkboxChange('jugueton')}/>
                        <label className={this.state.checkedBoxes.jugueton ? 'checked' : ''}>Juguetón</label>
                    </div>

                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.amoroso}
                          onChange={() => this.checkboxChange('amoroso')}/>
                        <label className={this.state.checkedBoxes.amoroso ? 'checked' : ''}>Amoroso</label>
                    </div>
                    
                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.obediente}
                          onChange={() => this.checkboxChange('obediente')}/>
                        <label className={this.state.checkedBoxes.obediente ? 'checked' : ''}>Obediente</label>
                    </div>

                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.protector}
                          onChange={() => this.checkboxChange('protector')}/>
                        <label className={this.state.checkedBoxes.protector ? 'checked' : ''}>Protector</label>
                    </div>
                    
                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.sociable}
                          onChange={() => this.checkboxChange('sociable')}/>
                        <label className={this.state.checkedBoxes.sociable ? 'checked' : ''}>Sociable</label>
                    </div>
                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.tierno}
                          onChange={() => this.checkboxChange('tierno')}/>
                        <label className={this.state.checkedBoxes.tierno ? 'checked' : ''}>Tierno</label>
                    </div>
                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.timido}
                          onChange={() => this.checkboxChange('timido')}/>
                        <label className={this.state.checkedBoxes.timido ? 'checked' : ''}>Timido</label>
                    </div>
                    <div className="check-adopt-recom">
                        <input type="checkbox" className='check-type-adopt'
                          checked={this.state.checkedBoxes.tranquilo}
                          onChange={() => this.checkboxChange('tranquilo')}/>
                        <label className={this.state.checkedBoxes.tranquilo ? 'checked' : ''}>Tranquilo</label>
                    </div>
                  </div>
                  <div className='but-adopt-search'>
                    <Button className="button-adopt-search" type="button-blue" text="Buscar" onClick={this.handleClick}  submit="submit"/>
                  </div>
                </div>

              </div>
            </fieldset>
          </form>

        </div>

        {this.state.showSecondOverlay && (
          <div className={`overlay-recom ${this.state.showSecondOverlay ? 'open' : 'closed'}`}></div>
        )}
        {this.state.showSecondOverlay && (
          <div className={`card-popup ${this.state.showSecondOverlay ? 'open' : 'closed'}`}>
            
            <form className='form-match-2'>
              <fieldset>
                <div className='card-recom-matches'>
                  <p className="cierre-card-popup" onClick={this.changeOpen}>
                    &times;
                  </p>
                  <h2 className="card-popup-title">Recomendaciones</h2>
                  <h3 className="card-recom-subtitle">Veamos tus Matches!</h3>
                  
                  <div className="cards-container-div-adopta">

                    {this.state.elements.map((element) => (
                      <Card
                        pet_id={element.pet_id}
                        nombre={element.pet_name}
                        sex={element.pet_sex === 'M' ? 'Macho' : 'Hembra'}
                        age={element.pet_age}
                        size={
                          element.pet_size === 'S' ? 'Pequeño' :
                          element.pet_size === 'M' ? 'Mediano' :
                          'Grande'}
                        color={element.pet_color}
                        raza={element.pet_breed}
                        personalidades={element.pet_personality}
                        descripcion={element.pet_needs}
                        img={element.photo_data}
                      />
                    ))}
                  </div>
                  
                  <div className='but-adopt-search'>
                    <Link to='/recomendaciones'>
                      <Button 
                        className="button-adopt-search" 
                        type="button-blue" 
                        text="Ver mas" 
                      />
                    </Link>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        )}

      </>
    );
  }
}
