const express = require('express');
const cors = require('cors');
const routes = require('./../routes/index');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

/** ---------------------------------------- MIDLEWARE ---------------------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 30 }, //tiempo de expiracion en milisegundos
  })
);

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

/*app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  );
  next();
});*/

/** ---------------------------------------- RUTAS ---------------------------------------- */
app.use('/mascotas', routes.mascotas.router);
app.use('/session', routes.session.router);
app.use('/user', routes.user.router);
app.use('/donative', routes.donative.router);
app.use('/adopReq', routes.adopReq.router);
app.use('/candidato', routes.candidate.router);

/** ---------------------------------------- INICIO SERVIDOR ---------------------------------------- */
app.listen(process.env.API_PORT, () => {
  console.log('Listening to port ' + process.env.API_PORT);
});
