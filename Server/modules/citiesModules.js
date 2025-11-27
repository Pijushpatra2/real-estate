import { pool } from "../utils/db.js"; // Assuming you're using MySQL2 with promises

export const getAllCities = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM cities ORDER BY id DESC`;
    pool.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const getCityById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM cities WHERE id = ?`;
    pool.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

export const createCity = ({ name, cityImage }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO cities (name, cityImage)
      VALUES (?, ?)
    `;
    pool.query(sql, [name, cityImage], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

export const updateCity = (id, { name, cityImage }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE cities SET name = ?, cityImage = ?
      WHERE id = ?
    `;
    pool.query(sql, [name, cityImage, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const deleteCity = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM cities WHERE id = ?`;
    pool.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};