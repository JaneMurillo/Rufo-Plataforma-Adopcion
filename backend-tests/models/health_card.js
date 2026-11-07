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

const getHealthCards = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "Health_Card" ORDER BY "health_id" ASC',
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
const createHealthCard = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      health_date,
      health_state,
      health_condition,
      health_notes,
      health_pet_id,
      health_photo_id,
    } = body;
    pool.query(
      'INSERT INTO "Health_Card" ( health_date, health_state, health_condition, health_notes, health_pet_id, health_photo_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        health_date,
        health_state,
        health_condition,
        health_notes,
        health_pet_id,
        health_photo_id,
      ],
      (error, res) => {
        if (error) {
          return console.error(error);
        }
        console.log(
          `A new health card has been added added: ${res.rows[0].health_id}`
        );
        resolve(
          `A new health card has been added added: ${res.rows[0].health_id}`
        );
      }
    );
  });
};
const deleteHealthCard = (body) => {
  return new Promise(function (resolve, reject) {
    const health_id = parseInt(body);
    console.log(`ID recibido: ${health_id}`);
    pool.query(
      'DELETE FROM "Health_Card" WHERE health_id = $1',
      [health_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`Health card deleted with ID: ${health_id}`);
        return resolve(`Health card deleted with ID: ${health_id}`);
      }
    );
  });
};

module.exports = {
  getHealthCards,
  createHealthCard,
  deleteHealthCard,
};
