import { pool } from "../utils/db.js";

// Get all amenities
export const getAllAminities = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM prop_aminities ORDER BY aminities_id DESC`;
    pool.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get amenities by property ID
export const getAminitiesByPropertyId = (propertyId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM prop_aminities WHERE property_id = ?`;
    pool.query(sql, [propertyId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Create a new amenity
export const createAminity = ({ aminities_name, property_id }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO prop_aminities (aminities_name, property_id) VALUES (?, ?)`;
    pool.query(sql, [aminities_name, property_id], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

//bulk insert amenities
export const bulkInsertAminities = (aminitiesList) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO prop_aminities (aminities_name, property_id)
      VALUES ?
    `;

    const values = aminitiesList.map(item => [item.aminities_name, item.property_id]);

    pool.query(sql, [values], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Update an amenity
export const updateAminity = (aminities_id, { aminities_name, property_id }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE prop_aminities
      SET aminities_name = ?, property_id = ?
      WHERE aminities_id = ?
    `;
    pool.query(sql, [aminities_name, property_id, aminities_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete an amenity
export const deleteAminity = (aminities_id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM prop_aminities WHERE aminities_id = ?`;
    pool.query(sql, [aminities_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
