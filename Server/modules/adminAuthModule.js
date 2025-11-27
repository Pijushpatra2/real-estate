import { pool } from "../utils/db.js";

// 🔹 Create a new admin user
export const createUser = (name, email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO admin (name, email, password, is_admin) VALUES (?, ?, ?, ?)";
    pool.query(sql, [name, email, hashedPassword, 1], (err, result) => {
      if (err) return reject(err);
      resolve({ admin_id: result.insertId, name, email, is_admin: true });
    });
  });
};

// 🔹 Find admin user by email (used in login)
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT admin_id, name, email, password, is_admin FROM admin WHERE email = ?";
    pool.query(sql, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0 ? result[0] : null);
    });
  });
};

// 🔹 Find admin user by ID
export const findUserById = (adminId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT admin_id, name, email, is_admin FROM admin WHERE admin_id = ?";
    pool.query(sql, [adminId], (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0 ? result[0] : null);
    });
  });
};

// 🔹 Update admin password
export const updateUserPassword = (adminId, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE admin SET password = ? WHERE admin_id = ?";
    pool.query(sql, [hashedPassword, adminId], (err, result) => {
      if (err) return reject(err);
      resolve({ message: "Password updated successfully" });
    });
  });
};
