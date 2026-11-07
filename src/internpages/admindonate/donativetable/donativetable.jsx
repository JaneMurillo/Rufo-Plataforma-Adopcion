import React, { useMemo, useEffect, useState } from 'react';
import './donativetable.css';
import axios from 'axios';
import { Table } from '../../../components/table/table';

export function Donativetable() {
  const [donatives, setDonatives] = useState([]);
  //const [tablaDonatives, setTablaDonatives] = useState([]);
  const getDonatives = async () => {
    await axios
      .get('http://localhost:5000/donative')
      .then((response) => {
        setDonatives(response.data);
        //setTablaDonatives(response.data);

        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDonatives();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'donative_id',
      },
      {
        Header: 'Nombre',
        accessor: 'donative_name',
      },
      {
        Header: 'Fecha',
        accessor: 'donative_date',
      },
      {
        Header: 'Email',
        accessor: 'donative_email',
      },
      {
        Header: 'Tipo',
        accessor: 'donative_type',
      },
      {
        Header: 'Cantidad',
        accessor: 'donative_amount',
      },
    ],
    []
  );
  return (
    <>
      <div className="App"></div>

      <div className="donatives-container">
        <div className="donatives-table">
          <Table columns={columns} data={donatives} />
        </div>
      </div>
    </>
  );
}
