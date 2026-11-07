import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Table } from '../../../components/table/table';
import { OpenRequest } from '../../../components/crudbuttons/openRequest/OpenRequest';
import './staffadoptapplications.css';

export function Staffadoptapplications() {
  const [adopt, setAdopts] = useState([]);

  const getAdopts = async () => {
    await axios
      .get('http://localhost:5000/adopReq/')
      .then((response) => {
        setAdopts(response.data);
        //setTablaAdopts(response.data);

        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAdopts();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'adopreq_id',
      },
      {
        Header: 'Fecha',
        accessor: 'adopreq_date',
      },
      {
        Header: 'Estado',
        accessor: 'adopreq_state',
        Cell: (props) => {
          return (
            <select
              name={props.row.values.adopreq_id}
              defaultValue={props.cell.value}
              onChange={changeStatus}
            >
              <option value="Rechazado">Rechazado</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          );
        },
      },
      {
        Header: 'Visible',
        accessor: 'adopreq_visible',
      },
      {
        Header: 'Usuario',
        accessor: 'adopreq_cand_id',
      },
      {
        Header: 'Mascota',
        accessor: 'adopreq_pet_id',
      },
      {
        Header: 'Información',
        accesor: '',
        Cell: (props) => {
          return <OpenRequest idRequest={props.row.values.adopreq_id} />;
        },
      },
    ],
    []
  );

  const changeStatus = (e) => {
    axios({
      method: 'post',
      data: {
        status: e.target.value,
      },
      url: 'http://localhost:5000/adopReq/status/id/' + e.target.name,
    }).then((res) => {
      if (res.status === 200) {
        alert('El registro ha sido actulaizado exitosamente');
      }
    });
  };

  return (
    <>
      <div className="staff-applications-container">
        <div className="staff-applications-table">
          <Table columns={columns} data={adopt} />
        </div>
      </div>
    </>
  );
}
