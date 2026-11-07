const Router = require('express');
const user_model = require('./../models/user');

const router = Router();

router.get('/', (req, res) => {
  user_model
    .getUsers()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/getTableUsers', (req, res) => {
  user_model
    .getTableUsers()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post('/', (req, res) => {
  user_model
    .createUser(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.delete('/:user_id', (req, res) => {
  user_model
    .deleteUser(req.params.user_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = { router };
