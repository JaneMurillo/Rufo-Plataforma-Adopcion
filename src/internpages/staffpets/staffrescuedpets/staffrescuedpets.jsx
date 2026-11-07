import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './staffrescuedpets.css';
import { Addbutton } from '../../../components/crudbuttons/addbutton/Addbutton';
import { Table } from '../../../components/table/table';
import { Button } from '../../../components/button/Button';

export function Staffrescuedpets() {
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    await axios
      .get('http://localhost:5000/mascotas/pet/admin/table/2')
      .then((response) => {
        setPets(response.data);
        //setTablaPets(response.data);

        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPets();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'pet_id',
      },
      {
        Header: 'Especie',
        accessor: 'pet_specie',
      },
      {
        Header: 'Raza',
        accessor: 'pet_breed',
      },
      {
        Header: 'Fecha',
        accessor: 'health_date',
      },
      {
        Header: 'Sexo',
        accessor: 'pet_sex',
      },
      {
        Header: 'Talla',
        accessor: 'pet_size',
      },
      {
        Header: 'Edad',
        accessor: 'pet_age',
      },
      {
        Header: 'Solicitudes',
        accessor: 'count',
        Cell: (props) => {
          if (props.cell.value === null) {
            return '0';
          } else {
            return props.cell.value;
          }
        },
      },
      {
        Header: 'Estado',
        accessor: 'health_state',
      },
      {
        Header: 'Ficha de Salud',
        accesor: '',
        Cell: ({ cell }) => <Button type="button-transparent" text="Ver" />,
      },
      {
        Header: 'Modificar',
        accesor: '',
        Cell: ({ cell }) => <Button type="button-pink" text="Editar" />,
      },
    ],
    []
  );

  return (
    <>
      <div className="staff-pets-container">
        <div className="staff-btns-pet-button">
          <Addbutton />
        </div>
        <div className="staff-pet-table">
          <Table columns={columns} data={pets} />
        </div>
      </div>
    </>
  );
}
