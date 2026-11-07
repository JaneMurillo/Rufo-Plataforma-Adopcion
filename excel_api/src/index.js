const express = require('express');
const cors = require('cors');
const routes = require('./../routes/index');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();

/** ---------------------------------------- MIDLEWARE ---------------------------------------- */
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',

  })
);


/** ---------------------------------------- RUTAS ---------------------------------------- */
app.use('/downloads', routes.excel.router);


/** ---------------------------------------- INICIO SERVIDOR ---------------------------------------- */
app.listen( process.env.API_PORT, () => {
  console.log('Listening to port ' + process.env.API_PORT);
});
