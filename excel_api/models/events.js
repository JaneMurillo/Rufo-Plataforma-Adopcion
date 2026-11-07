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

const getEventss = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "Events" ORDER BY "event_id" ASC',
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
const createEvents = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      event_date,
      event_title,
      event_text,
      event_pic,
      event_contact,
      event_user_id,
    } = body;
    pool.query(
      'INSERT INTO "Events" ( event_date, event_title, event_text, event_pic, event_contact, event_user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        event_date,
        event_title,
        event_text,
        event_pic,
        event_contact,
        event_user_id,
      ],
      (error, res) => {
        if (error) {
          return console.error(error);
        }
        console.log(
          `A new event has been added added: ${res.rows[0].event_title}`
        );
        resolve(`A new event has been added added: ${res.rows[0].event_title}`);
      }
    );
  });
};
const deleteEvents = (body) => {
  return new Promise(function (resolve, reject) {
    const donative_id = parseInt(body);
    console.log(`ID recibido: ${donative_id}`);
    pool.query(
      'DELETE FROM "Events" WHERE event_id = $1',
      [event_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`Event deleted with ID: ${event_id}`);
        return resolve(`Event deleted with ID: ${event_id}`);
      }
    );
  });
};

module.exports = {
  getEventss,
  createEvents,
  deleteEvents,
};
