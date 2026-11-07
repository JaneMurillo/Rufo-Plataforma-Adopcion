const res = require('express/lib/response');
const md5 = require('md5');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "User" ORDER BY "user_id" ASC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        for (let i = 0; i < results.rows.length; i++) {
          results.rows[i].user_lastconnection =
            (results.rows[i].user_lastconnection.getDate() < 10
              ? '0' + results.rows[i].user_lastconnection.getDate()
              : results.rows[i].user_lastconnection.getDate()) +
            '/' +
            (results.rows[i].user_lastconnection.getMonth() + 1 < 10
              ? '0' + (results.rows[i].user_lastconnection.getMonth() + 1)
              : results.rows[i].user_lastconnection.getMonth() + 1) +
            '/' +
            results.rows[i].user_lastconnection.getFullYear();
        }
        console.log(results.rows);
        resolve(results.rows);
      }
    );
  });
};

const getTableUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT user_id,user_fullname,user_email,user_lastconnection, user_type FROM "User" ORDER BY "user_id" ASC',
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

const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      user_fullname,
      user_email,
      user_password,
      user_lastconnection,
      user_type,
    } = body;
    pool.query(
      'SELECT user_email FROM "User" WHERE user_email = $1',
      [user_email],
      (err, results) => {
        if (err) {
          reject(err);
        }
        if (results.rows.length === 0) {
          pool.query(
            'INSERT INTO "User" (user_fullname, user_email, user_password,user_lastconnection, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
              user_fullname,
              user_email,
              md5(user_password),
              user_lastconnection,
              user_type,
            ],
            (error, res) => {
              if (error) resolve(error);
              console.log(
                `A new user has been added added: ${res.rows[0].user_fullname}`
              );
              resolve(
                `A new user has been added added: ${res.rows[0].user_fullname}`
              );
            }
          );
        } else {
          resolve('Usuario ya existente');
        }
      }
    );
  });
};

const deleteUser = (body) => {
  return new Promise(function (resolve, reject) {
    const user_id = parseInt(body);
    console.log(`ID recibido: ${user_id}`);
    pool.query(
      'DELETE FROM "User" WHERE user_id = $1',
      [user_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`User deleted with ID: ${user_id}`);
        return resolve(`User deleted with ID: ${user_id}`);
      }
    );
  });
};

module.exports = {
  getUsers,
  getTableUsers,
  createUser,
  deleteUser,
};
