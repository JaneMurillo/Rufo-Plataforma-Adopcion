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

const getCandidates = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "Candidate" ORDER BY "cand_id" ASC',
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
const createCandidate = (body) => {
  //console.log('funcion crear candidato. body:');
  //console.log(JSON.stringify(body));
  return new Promise(function (resolve, reject) {
    const {
      cand_date,
      cand_age,
      cand_address,
      cand_ocupation,
      cand_facebook,
      cand_telefono,
      cand_question1,
      cand_question2,
      cand_question3,
      cand_question4,
      cand_question5,
      cand_question6,
      cand_question7,
      cand_question8,
      cand_question9,
      cand_question10,
      cand_question11,
      cand_question12,
      cand_question13,
      cand_question14,
      cand_question15,
      cand_question16,
      cand_question17,
      cand_user_id,
      cand_correo,
      cand_nombre,
    } = body;
    pool.query(
      'INSERT INTO "Candidate" ( cand_date, cand_age, cand_address, cand_ocupation, cand_facebook, cand_telefono, cand_question1,cand_question2,cand_question3,cand_question4,cand_question5,cand_question6,cand_question7,cand_question8,cand_question9,cand_question10,cand_question11,cand_question12,cand_question13,cand_question14,cand_question15,cand_question16,cand_question17,cand_user_id, cand_correo, cand_nombre) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14,$15,$16,$17,$18,$19,$20,$21,$22, $23, $24, $25, $26) RETURNING *',
      [
        cand_date,
        cand_age,
        cand_address,
        cand_ocupation,
        cand_facebook,
        cand_telefono,
        cand_question1,
        cand_question2,
        cand_question3,
        cand_question4,
        cand_question5,
        cand_question6,
        cand_question7,
        cand_question8,
        cand_question9,
        cand_question10,
        cand_question11,
        cand_question12,
        cand_question13,
        cand_question14,
        cand_question15,
        cand_question16,
        cand_question17,
        cand_user_id,
        cand_correo,
        cand_nombre,
      ],
      (error, res) => {
        if (error) {
          return console.error(error);
        }
        resolve(res.rows[0]);
      }
    );
  });
};
const deleteCandidate = (body) => {
  return new Promise(function (resolve, reject) {
    const candidate_id = parseInt(body);
    console.log(`ID recibido: ${candidate_id}`);
    pool.query(
      'DELETE FROM "Candidate" WHERE candidate_id = $1',
      [candidate_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`Candidate deleted with ID: ${candidate_id}`);
        return resolve(`Candidate deleted with ID: ${candidate_id}`);
      }
    );
  });
};

module.exports = {
  getCandidates,
  createCandidate,
  deleteCandidate,
};
