const { body, validationResult } = require("express-validator");

// Middleware to validate book creation data
const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("owner").notEmpty().withMessage("Owner is required"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateBook };
