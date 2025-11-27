// modules/propMediaModules.js

import { pool } from "../utils/db.js";

// Get all media by property ID
export const getMediaByPropertyId = (prop_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM prop_media WHERE prop_id = ? ORDER BY media_id DESC`;
    pool.query(sql, [prop_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Add a single media entry
export const addMedia = ({ prop_id, img_name }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO prop_media (prop_id, img_name) VALUES (?, ?)`;
    pool.query(sql, [prop_id, img_name], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

// Bulk insert media entries
export const bulkInsertMedia = (mediaList) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO prop_media (prop_id, img_name) VALUES ?`;
    const values = mediaList.map(item => [item.prop_id, item.img_name]);
    pool.query(sql, [values], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete a media entry by ID
export const deleteMedia = (media_id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM prop_media WHERE media_id = ?`;
    pool.query(sql, [media_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete all media by property ID (optional utility)
export const deleteMediaByPropertyId = (prop_id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM prop_media WHERE prop_id = ?`;
    pool.query(sql, [prop_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
