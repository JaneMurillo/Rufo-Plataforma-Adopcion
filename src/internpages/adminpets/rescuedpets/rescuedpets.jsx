import React, { useEffect, useState, useMemo } from 'react';
import './rescuedpets.css';
import axios from 'axios';
import { Addbutton } from '../../../components/crudbuttons/addbutton/Addbutton';
import { Table } from '../../../components/table/table';
import { Button } from '../../../components/button/Button';

export function Rescuedpets() {
  const [pets, setPets] = useState([]);
  /*const [tablaPets, setTablaPets] = useState([]);
  const [search, setSearch] = useState([]);*/

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
      {
        Header: 'Eliminar',
        accesor: '',
        Cell: (props) => {
          return (
            <Button
              name={props.row.values.pet_id}
              type="button-pink"
              text="Eliminar"
              onClick={eliminarMascota}
            />
          );
        },
      },
    ],
    []
  );

  const eliminarMascota = (e) => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/session/verify-login',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.data.user.user_type === 0) {
          axios({
            method: 'delete',
            url: 'http://localhost:5000/mascotas/delete/pet/' + e.target.name,
          })
            .then((res) => {
              //console.log('mascota a eliminar: ' + e.target.name);
              //console.log('mascota eliminada');
              //console.log(res);
              alert(res.data);
              window.location.reload(false);
            })
            .catch((err) => console.log(err));
        } else {
          alert('No tiene permiso para realizar esta accion');
        }
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  };

  return (
    <>
      <div className="pets-container">
        <div className="btns-pet-opts">
          <Addbutton />
        </div>

        <div className="pet-table">
          <Table columns={columns} data={pets} />
        </div>
      </div>
    </>
  );
}
