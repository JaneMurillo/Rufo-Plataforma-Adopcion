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

const getBlogs = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "Blog" ORDER BY "blog_id" ASC',
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
const createBlog = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      blog_date,
      blog_title,
      blog_text,
      blog_pic,
      blog_comment,
      blog_user_id,
    } = body;
    pool.query(
      'INSERT INTO "Blog" ( blog_date,blog_title, blog_text, blog_pic, blog_comment, blog_user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [blog_date, blog_title, blog_text, blog_pic, blog_comment, blog_user_id],
      (error, res) => {
        if (error) {
          return console.error(error);
        }
        console.log(
          `A new blog has been added added: ${res.rows[0].donative_name}`
        );
        resolve(
          `A new blog has been added added: ${res.rows[0].donative_name}`
        );
      }
    );
  });
};
const deleteBlog = (body) => {
  return new Promise(function (resolve, reject) {
    const blog_id = parseInt(body);
    console.log(`ID recibido: ${blog_id}`);
    pool.query(
      'DELETE FROM "Blog" WHERE blog_id = $1',
      [blog_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(`Blog deleted with ID: ${blog_id}`);
        return resolve(`Blog deleted with ID: ${blog_id}`);
      }
    );
  });
};

module.exports = {
  getBlogs,
  createBlog,
  deleteBlog,
};
