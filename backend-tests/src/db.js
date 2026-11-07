require('dotenv/config');
const pgp = require('pg-promise')();
const db = pgp(`${process.env.DB_LINK}`);

module.exports = db;
