// modules/propFloorPlanModules.js

import { pool } from "../utils/db.js";

// Get all floor plans by property ID
export const getFloorPlansByPropertyId = (prop_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM prop_floor_plan WHERE prop_id = ? ORDER BY floor_plan_id DESC`;
    pool.query(sql, [prop_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Add a single floor plan
export const addFloorPlan = ({ prop_id, floor_name, floor_price, floor_size, floor_img }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO prop_floor_plan (prop_id, floor_name, floor_price, floor_size, floor_img) VALUES (?, ?, ?, ?, ?)`;
    pool.query(sql, [prop_id, floor_name, floor_price, floor_size, floor_img], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

// Update a floor plan by ID
export const updateFloorPlan = ({ floor_plan_id, floor_name, floor_price, floor_size, floor_img }) => {
  return new Promise((resolve, reject) => {
    const fields = [];
    const values = [];

    if (floor_name !== undefined) {
      fields.push("floor_name = ?");
      values.push(floor_name);
    }
    if (floor_price !== undefined) {
      fields.push("floor_price = ?");
      values.push(floor_price);
    }
    if (floor_size !== undefined) {
      fields.push("floor_size = ?");
      values.push(floor_size);
    }
    if (floor_img !== undefined) {
      fields.push("floor_img = ?");
      values.push(floor_img);
    }

    if (fields.length === 0) {
      return resolve({ affectedRows: 0 }); // No fields to update
    }

    values.push(floor_plan_id);
    const sql = `UPDATE prop_floor_plan SET ${fields.join(", ")} WHERE floor_plan_id = ?`;

    pool.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete a floor plan by ID
export const deleteFloorPlan = (floor_plan_id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM prop_floor_plan WHERE floor_plan_id = ?`;
    pool.query(sql, [floor_plan_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Optional: Delete all floor plans by property ID
export const deleteFloorPlansByPropertyId = (prop_id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM prop_floor_plan WHERE prop_id = ?`;
    pool.query(sql, [prop_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
