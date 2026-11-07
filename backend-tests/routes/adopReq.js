const Router = require('express');
const adopReq_model = require('../models/adopReq');
const db = require('../src/db');

const router = Router();

router.get('/', (req, res) => {
  adopReq_model
    .getAdopReqs()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/tramite/finalizado', (req, res) => {
  db.any(
    'SELECT * FROM "Adoption_Request" WHERE "adopreq_state"=\'Finalizado\';\
    ',
    []
  )
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].adopreq_date =
          (data[i].adopreq_date.getDate() < 10
            ? '0' + data[i].adopreq_date.getDate()
            : data[i].adopreq_date.getDate()) +
          '/' +
          (data[i].adopreq_date.getMonth() + 1 < 10
            ? '0' + (data[i].adopreq_date.getMonth() + 1)
            : data[i].adopreq_date.getMonth() + 1) +
          '/' +
          data[i].adopreq_date.getFullYear();
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error en tabla de adopciones de admin');
      console.log(err);
      res.status(500).send(err);
    });
});

router.get('/id/:id', (req, res) => {
  db.one(
    'SELECT * FROM "Adoption_Request" JOIN "Candidate" ON adopreq_cand_id = cand_id JOIN "Pet" ON pet_id = adopreq_pet_id WHERE adopreq_id = $1',
    [req.params.id]
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error al recuperar un request');
      console.log(err);
      res.status(500).send(err);
    });
});

router.post('/status/id/:id', (req, res) => {
  db.one(
    'UPDATE "Adoption_Request" SET adopreq_state = $1 WHERE adopreq_id = $2 RETURNING *',
    [req.body.status, req.params.id]
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
});

router.post('/create', (req, res) => {
  //console.log('ruta crear adopt request');
  db.one(
    'INSERT INTO "Adoption_Request" (adopreq_date, adopreq_state, adopreq_visible, adopreq_cand_id, adopreq_pet_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [
      req.body.adopreq_date,
      'Pendiente',
      'Si',
      req.body.adopreq_cand_id,
      req.body.adopreq_pet_id,
    ]
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

module.exports = { router };
