import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/button/Button';
import { Flecha } from '../../../../components/flecha/Flecha';
import { Footer } from '../../../../components/footer/footer';
import { Header } from '../../../../components/header/Header';
import { Userbanner } from '../../../../components/userbanner/userbanner';
import { Adminmenu } from '../../../../components/usermenus/adminmenu/adminmenu';
import './Reportapplications.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fileDownload from 'js-file-download';
import { Table } from '../../../../components/table/table';

export function Reportapplications() {
  const [adopt, setAdopts] = useState([]);
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

  const getReAdopReq = async () => {
    await axios
      .get('http://localhost:5002/downloads/reporte/solicitudes/', {
        responseType: 'blob',
      })
      .then((response) => {
        fileDownload(response.data, 'db_report_adoption_reqs.xlsx');
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAdopts = async () => {
    await axios
      .get('http://localhost:5000/adopReq/')
      .then((response) => {
        setAdopts(response.data);
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
    ],
    []
  );

  return (
    <>
      <Header />
      <Userbanner type="banner-admin" text="Reportes" />
      <Adminmenu />
      <div className="reportapplications-container">
        <h2 className="reportapplications-h2">Datos del reporte solicitudes</h2>
        <div className="reportapplications-arrow-back">
          <Link to="/adminreports">
            <Flecha color="blue" direction="left" />
          </Link>
          <p className="rptapplication-back">Volver a Reportes</p>
        </div>

        <div className="reportapplications-table">
          <Table columns={columns} data={adopt} />
        </div>
        <div className="reportapplications-export-btn">
          <Button type="" text="Exportar a Excel" onClick={getReAdopReq} />
        </div>
      </div>
      <Footer />
    </>
  );
}
