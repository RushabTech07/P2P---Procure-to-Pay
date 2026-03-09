const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);

  if (!authHeader) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token ? "Yes" : "No");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified successfully. User:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = { verifyToken };