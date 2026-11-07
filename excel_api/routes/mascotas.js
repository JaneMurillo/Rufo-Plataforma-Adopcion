const Router = require('express');
const pet_model = require('./../models/pet');
const db = require('./../src/db');

const router = Router();

router.post('/pet', (req, res) => {
  pet_model
    .createPet(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.delete('/pet/:pet_id', (req, res) => {
  pet_model
    .deletePet(req.params.pet_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.get('/pet', (req, res) => {
  db.any('SELECT * FROM "Pet"', [])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error en adopta');
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = { router };
