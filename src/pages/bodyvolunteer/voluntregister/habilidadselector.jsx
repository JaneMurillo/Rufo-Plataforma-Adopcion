import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import './habilidades.css';

export class Habilidades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objectArray: [
        { key: 'Habilidad 1', value: 'habilidad1' },
        { key: 'Habilidad 2', value: 'habilidad2' },
        { key: 'Habilidad 3', value: 'habilidad3' },
        { key: 'Habilidad 4', value: 'habilidad4' },
      ],
    };
  }

  render() {
    const { objectArray } = this.state;
    return (
      <>
        <Multiselect
          options={objectArray}
          displayValue="key"
          showCheckbox={true}
          placeholder="Habilidades"
        />
      </>
    );
  }
}
