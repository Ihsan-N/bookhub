const User = require("../models/userModel");

// Middleware to check if the user is the owner of the resource (e.g., book)
const authorize = (role) => {
  return async (req, res, next) => {
    try {
      // Get the user from the database (if needed for more checks)
      const user = await User.findById(req.user);

      // Check if the user has the required role
      if (!user || (role && user.role !== role)) {
        return res.status(403).json({ message: "Not authorized" });
      }

      // Check if the logged-in user is the owner of the resource
      if (req.params.bookId) {
        const book = await Book.findById(req.params.bookId);
        if (book.owner.toString() !== req.user) {
          return res.status(403).json({ message: "Not authorized to perform this action" });
        }
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { authorize };