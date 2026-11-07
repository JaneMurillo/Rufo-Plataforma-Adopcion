import React from 'react';
import { Button } from '../../../components/button/Button';
import './pagereports.css';
import reportimg from './../reporte.png';
import { Link } from 'react-router-dom';

export function Pagereports() {
  return (
    <>
      <div className="reports-container">
        <h2 className="reports-h2">Seleccione el tipo de reporte a generar</h2>
        <div className="reports-options">
          <div className="reports-icon">
            <img className="reportimg" alt="reportimg" src={reportimg} />
            <div className="reports-img-elipse"></div>
          </div>
          <div className="reports-buttons">
            <div className="report-button">
              <Link to="/reportpets">
                <Button type="" text="Reporte de Mascotas" />
              </Link>
            </div>
            <div className="report-button">
              <Link to="/reportapplications">
                <Button type="" text="Reporte de Solicitudes" />
              </Link>
            </div>
            <div className="report-button">
              <Link to="/reportadopters">
                <Button type="" text="Reporte de Adoptantes" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
