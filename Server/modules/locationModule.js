import { pool } from "../utils/db.js";

// Create or insert new location
export const createLocation = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO prop_location (
        property_id, location_address, location_country, location_state,
        location_city, location_area, location_pin_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.property_id,
      data.location_address,
      data.location_country,
      data.location_state,
      data.location_city,
      data.location_area,
      data.location_pin_code,
    ];
    pool.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

// Get location by property_id
export const getLocationByPropertyId = (property_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM prop_location WHERE property_id = ?`;
    pool.query(sql, [property_id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

// Update location
export const updateLocation = (property_id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE prop_location SET
        location_address = ?, location_country = ?, location_state = ?,
        location_city = ?, location_area = ?, location_pin_code = ?
      WHERE property_id = ?
    `;
    const values = [
      data.location_address,
      data.location_country,
      data.location_state,
      data.location_city,
      data.location_area,
      data.location_pin_code,
      property_id
    ];
    pool.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete location
export const deleteLocation = (property_id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM prop_location WHERE property_id = ?`;
    pool.query(sql, [property_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
