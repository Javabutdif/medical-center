const jwt = require("jsonwebtoken");
require("dotenv").config();
const token_key = process.env.JWT_SECRET;

console.log("JWT_SECRET:", token_key); // Log the token key to ensure it has a value

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, token_key, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Forbidden" });
		}

		req.user = decoded || null;
		req.role = decoded.role || null;
		next();
	});
};

module.exports = authenticateToken;
