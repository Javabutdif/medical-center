const jwt = require("jsonwebtoken");
const token_key = process.env.JWT_SECRET;

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
    console.log(decoded);
		req.user = decoded || null;
    req.role = decoded.role || null;
    next();
  });
};

module.exports = authenticateToken;
