import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/bodyhome/Home';
import { Adopt } from './pages/bodyadopt/Adopt';
import { AcercaNosotros } from './pages/acercadenosotros/AcercaNosotros';
import { Donate } from './pages/bodydonate/Donate';
import { Volunteer } from './pages/bodyvolunteer/Volunteer';
import { DonatePayment } from './pages/bodydonate/donatepayment/donatepayment';
import { Events } from './pages/bodyevents/Events';
import { SignLog } from './pages/bodysignlog/SignLog';
import { Adminpets } from './internpages/adminpets/Adminpets';
import { Adminapplications } from './internpages/adminapplications/Adminapplications';
import { Admindonate } from './internpages/admindonate/Admindonate';
import { Adminusers } from './internpages/adminusers/Adminusers';
import { Staffpets } from './internpages/staffpets/Staffpets';
import { Staffapplications } from './internpages/staffapplications/Staffapplications';
import { Blog } from './pages/bodyblog/Blog';
import { Adminreports } from './internpages/adminreports/Adminreports';
import { Reportpets } from './internpages/adminreports/typereport/reportpets/Reportpets';
import { Reportapplications } from './internpages/adminreports/typereport/reportapplications/Reportapplications';
import { Reportadopters } from './internpages/adminreports/typereport/reportadopters/Reportadopters';
import { Adopteraccount } from './internpages/typesaccount/Adopteraccount';
import { Adminaccount } from './internpages/typesaccount/Adminaccount';
import { Staffaccount } from './internpages/typesaccount/Staffaccount';
import { Contrasena } from './pages/contrasena/Contrasena';

ReactDOM.render(
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto"
    ></link>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Amatic+SC"
    ></link>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="adopta" element={<Adopt />} />
        <Route path="acercadenosotros" element={<AcercaNosotros />} />
        <Route path="donate" element={<Donate />} />
        <Route path="donate-payment" element={<DonatePayment />} />
        <Route path="volunteer" element={<Volunteer />} />
        <Route path="events" element={<Events />} />
        <Route path="blog" element={<Blog />} />
        <Route path="signlog" element={<SignLog />} />

        <Route path="contrasena" element={<Contrasena />} />

        <Route path="adopteraccount" element={<Adopteraccount />} />

        <Route path="adminaccount" element={<Adminaccount />} />
        <Route path="adminpets" element={<Adminpets />} />
        <Route path="adminapplications" element={<Adminapplications />} />
        <Route path="admindonate" element={<Admindonate />} />
        <Route path="adminusers" element={<Adminusers />} />
        <Route path="adminreports" element={<Adminreports />} />
        <Route path="reportpets" element={<Reportpets />} />
        <Route path="reportapplications" element={<Reportapplications />} />
        <Route path="reportadopters" element={<Reportadopters />} />

        <Route path="staffaccount" element={<Staffaccount />} />
        <Route path="staffpets" element={<Staffpets />} />
        <Route path="staffapplications" element={<Staffapplications />} />
      </Routes>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);
