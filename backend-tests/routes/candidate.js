const Router = require('express');
const candidate_model = require('./../models/candidate');

const router = Router();

router.post('/create', (req, res) => {
  //console.log('ruta candidato crear');
  candidate_model
    .createCandidate(req.body)
    .then((response) => {
      //console.log('candidato creado');
      //console.log(response);
      res.send(response);
    })
    .catch((error) => {
      res.sendStatus(500).send(error);
    });
});

module.exports = { router };
