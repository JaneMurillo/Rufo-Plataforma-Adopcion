import React, { useEffect, useState, useMemo } from 'react';
import './Reportpets.css';
import { Flecha } from '../../../../components/flecha/Flecha';
import { Footer } from '../../../../components/footer/footer';
import { Header } from '../../../../components/header/Header';
import { Userbanner } from '../../../../components/userbanner/userbanner';
import { Adminmenu } from '../../../../components/usermenus/adminmenu/adminmenu';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fileDownload from 'js-file-download';
import { Table } from '../../../../components/table/table';

export function Reportpets() {
  const [pets, setPets] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/session/verify-login',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.data.user.user_type !== 0) {
          history('/signlog');
        }
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  }, [history]);

  const getRePets = async () => {
    await axios
      .get('http://localhost:5002/downloads/reporte/mascotas/', {
        responseType: 'blob',
      })
      .then((response) => {
        fileDownload(response.data, 'db_report_pets.xlsx');
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPets = async () => {
    await axios
      .get('http://localhost:5000/mascotas/pet/admin/table/2')
      .then((response) => {
        setPets(response.data);

        console.log(response.data);
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
    ],
    []
  );
  return (
    <>
      <Header />
      <Userbanner type="banner-admin" text="Reportes" />
      <Adminmenu />
      <div className="reportpets-container">
        <h2 className="reportpets-h2">Datos del reporte mascota</h2>
        <div className="reportpets-arrow-back">
          <Link to="/adminreports">
            <Flecha color="blue" direction="left" />
          </Link>
          <p className="rptpet-back">Volver a Reportes</p>
        </div>

        <div className="reportpets-table">
          <Table columns={columns} data={pets} />
        </div>
        <div className="reportpets-export-btn">
          <Button type="" text="Exportar a Excel" onClick={getRePets} />
        </div>
      </div>
      <Footer />
    </>
  );
}
