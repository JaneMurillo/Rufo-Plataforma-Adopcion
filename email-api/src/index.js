require('dotenv/config');
const express = require('express');
const cors = require('cors');
const routes = require('./../routes/index');
const bodyParser = require('body-parser');

const app = express();

/** ---------------------------------------- MIDLEWARE ---------------------------------------- */
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors(/*{
    origin: 'http://localhost:3000',
  }*/)
);

/** ---------------------------------------- RUTAS ---------------------------------------- */
app.use('/email', cors(), routes.email.router);

/** ---------------------------------------- INICIO SERVIDOR ---------------------------------------- */
app.listen(process.env.API_PORT, () => {
  console.log('Listening to port ' + process.env.API_PORT);
});
