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

const getAdopReqs = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "Adoption_Request" ORDER BY "adopreq_id" ASC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        //console.log(results.rows);
        for (let i = 0; i < results.rows.length; i++) {
          results.rows[i].adopreq_date =
            (results.rows[i].adopreq_date.getDate() < 10
              ? '0' + results.rows[i].adopreq_date.getDate()
              : results.rows[i].adopreq_date.getDate()) +
            '/' +
            (results.rows[i].adopreq_date.getMonth() + 1 < 10
              ? '0' + (results.rows[i].adopreq_date.getMonth() + 1)
              : results.rows[i].adopreq_date.getMonth() + 1) +
            '/' +
            results.rows[i].adopreq_date.getFullYear();
        }
        resolve(results.rows);
      }
    );
  });
};

const createAdopReq = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      adopReq_date,
      adopReq_state,
      adopReq_visible,
      adopReq_cand_id,
      adopReq_pet_id,
    } = body;
    pool.query(
      'INSERT INTO "Adoption_Request" ( adopReq_date,adopReq_state, adopReq_visible, adopReq_cand_id, adopReq_pet_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        adopReq_date,
        adopReq_state,
        adopReq_visible,
        adopReq_cand_id,
        adopReq_pet_id,
      ],
      (error, res) => {
        if (error) {
          return console.error(error);
        }
        console.log(
          `A new adoption request has been added added: ${res.rows[0].donative_name}`
        );
        resolve(
          `A new adoption request has been added added: ${res.rows[0].donative_name}`
        );
      }
    );
  });
};
const deleteAdopReq = (body) => {
  return new Promise(function (resolve, reject) {
    const adopReq_id = parseInt(body);
    console.log(`ID recibido: ${adopReq_id}`);
    pool.query(
      'DELETE FROM "Adoption_Request" WHERE adopReq_id = $1',
      [adopReq_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`Adoption request deleted with ID: ${adopReq_id}`);
        return resolve(`Adoption request deleted with ID: ${adopReq_id}`);
      }
    );
  });
};

module.exports = {
  getAdopReqs,
  createAdopReq,
  deleteAdopReq,
};
