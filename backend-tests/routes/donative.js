const Router = require('express');
const db = require('../src/db');
const donative_model = require('./../models/donative');

const router = Router();

router.get('/', (req, res) => {
  donative_model
    .getDonatives()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/count', (req, res) => {
  db.one('SELECT COUNT(*) FROM "Donative"')
    .then((response) => {
      //console.log('donativos: ' + response.count);
      res.status(200).send(response.count);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

module.exports = { router };
