const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getDonatives = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "Donative" ORDER BY "donative_id" ASC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        //console.log(results.rows);
        for (let i = 0; i < results.rows.length; i++) {
          results.rows[i].donative_date =
            (results.rows[i].donative_date.getDate() < 10
              ? '0' + results.rows[i].donative_date.getDate()
              : results.rows[i].donative_date.getDate()) +
            '/' +
            (results.rows[i].donative_date.getMonth() + 1 < 10
              ? '0' + (results.rows[i].donative_date.getMonth() + 1)
              : results.rows[i].donative_date.getMonth() + 1) +
            '/' +
            results.rows[i].donative_date.getFullYear();
        }
        resolve(results.rows);
      }
    );
  });
};
const createDonative = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      donative_date,
      donative_name,
      donative_email,
      donative_type,
      donative_amount,
    } = body;
    pool.query(
      'INSERT INTO "Donative" ( donative_date, donative_name, donative_email, donative_type, donative_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        donative_date,
        donative_name,
        donative_email,
        donative_type,
        donative_amount,
      ],
      (error, res) => {
        if (error) {
          return console.error(error);
        }
        console.log(
          `A new donative has been added added: ${res.rows[0].donative_name}`
        );
        resolve(
          `A new donative has been added added: ${res.rows[0].donative_name}`
        );
      }
    );
  });
};
const deleteDonative = (body) => {
  return new Promise(function (resolve, reject) {
    const donative_id = parseInt(body);
    console.log(`ID recibido: ${donative_id}`);
    pool.query(
      'DELETE FROM "Donative" WHERE donative_id = $1',
      [donative_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`Pet deleted with ID: ${donative_id}`);
        return resolve(`Pet deleted with ID: ${donative_id}`);
      }
    );
  });
};

module.exports = {
  getDonatives,
  createDonative,
  deleteDonative,
};
