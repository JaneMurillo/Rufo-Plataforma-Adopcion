import React, { useEffect, useState, useMemo } from 'react';
import './userstable.css';
import { Table } from '../../../components/table/table';
import axios from 'axios';

export default function Userstable() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await axios
      .get('http://localhost:5000/user')
      .then((response) => {
        setUsers(response.data);
        //setTablaDonatives(response.data);

        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'user_id',
      },
      {
        Header: 'Nombre',
        accessor: 'user_fullname',
      },
      {
        Header: 'Email',
        accessor: 'user_email',
      },
      {
        Header: 'Tipo de usuario',
        accessor: 'user_type',
        Cell: (props) => {
          return props.cell.value === 0
            ? 'Admin'
            : props.cell.value === 1
            ? 'Staff'
            : props.cell.value === 2
            ? 'Usuario'
            : 'Visitante';
        },
      },
      {
        Header: 'Última conexión',
        accessor: 'user_lastconnection',
      },
    ],
    []
  );

  return (
    <>
      <div className="userstable-container">
        <div className="userstable-table">
          <Table columns={columns} data={users} />
        </div>
      </div>
    </>
  );
}
