import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No token provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin
    if (!decoded.is_admin) {
      return res.status(403).json({ error: "Admins only. Permission denied." });
    }

    // Attach admin ID to request for later use
    req.admin_id = decoded.id;
    next();
  } catch (err) {
    console.error("Admin token verification failed:", err.message);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
