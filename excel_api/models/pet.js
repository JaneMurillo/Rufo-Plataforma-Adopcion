const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getPets = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "Pet" ORDER BY "pet_id" ASC',
      (error, results) => {
        if (error) {
          console.log('error');
          reject(error);
        }
        console.log(results);
        resolve(results);
      }
    );
  });
};
const createPet = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      pet_name,
      pet_breed,
      pet_size,
      pet_personality,
      pet_color,
      pet_age,
      pet_sex,
      pet_specie,
      pet_user_id,
    } = body;
    pool.query(
      'INSERT INTO "Pet" (pet_name, pet_breed, pet_size, pet_personality, pet_color, pet_age, pet_sex, pet_specie,pet_user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        pet_name,
        pet_breed,
        pet_size,
        pet_personality,
        pet_color,
        pet_age,
        pet_sex,
        pet_specie,
        pet_user_id,
      ],
      (error, res) => {
        if (error) {
          return console.error(error);
        }
        console.log(`A new pet has been added added: ${res.rows[0].pet_name}`);
        resolve(`A new pet has been added added: ${res.rows[0].pet_name}`);
      }
    );
  });
};
const deletePet = (body) => {
  return new Promise(function (resolve, reject) {
    const pet_id = parseInt(body);
    console.log(`ID recibido: ${pet_id}`);
    pool.query(
      'DELETE FROM "Pet" WHERE pet_id = $1',
      [pet_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`Pet deleted with ID: ${pet_id}`);
        return resolve(`Pet deleted with ID: ${pet_id}`);
      }
    );
  });
};

module.exports = {
  getPets,
  createPet,
  deletePet,
};
