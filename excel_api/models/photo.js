const { request } = require('express');
const res = require('express/lib/response');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getPhotoss = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "Photos" ORDER BY "photo_id" ASC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        console.log(results.rows);
        resolve(results.rows);
      }
    );
  });
};
const createPhotos = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      photo_confidential,
      photo_post,
      photo_user_type,
      photo_pet_id,
      photo_health_id,
    } = body;
    pool.query(
      'INSERT INTO "Photos" ( photo_confidential, photo_post, photo_user_type, photo_pet_id,photo_health_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        photo_confidential,
        photo_post,
        photo_user_type,
        photo_pet_id,
        photo_health_id,
      ],
      (error, res) => {
        if (error) {
          return console.error(error);
        }
        console.log(
          `A new photo has been added added: ${res.rows[0].photo_id}`
        );
        resolve(`A new photo has been added added: ${res.rows[0].photo_id}`);
      }
    );
  });
};
const deletePhotos = (body) => {
  return new Promise(function (resolve, reject) {
    const photo_id = parseInt(body);
    console.log(`ID recibido: ${photo_id}`);
    pool.query(
      'DELETE FROM "Photos" WHERE photo_id = $1',
      [photo_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`Photo deleted with ID: ${photo_id}`);
        return resolve(`Photo deleted with ID: ${photo_id}`);
      }
    );
  });
};

module.exports = {
  getPhotoss,
  createPhotos,
  deletePhotos,
};
