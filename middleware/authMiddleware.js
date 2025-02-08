const jwt = require("jsonwebtoken");

// Middleware to check if the user is authenticated
const protect = (req, res, next) => {
  let token;

  // Check if token is in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add the user's ID to the request object
      req.user = decoded.id;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };