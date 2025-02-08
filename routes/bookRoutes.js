const express = require("express");
const Book = require("../models/bookModel");

const router = express.Router();

// Add a new book
router.post("/", async (req, res) => {
  try {
    const { title, author, owner } = req.body;
    const book = await Book.create({ title, author, owner });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Failed to add book", error });
  }
});

// Get all available books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({ status: "available" }).populate("owner", "name email");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Mark book as exchanged
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { status: "exchanged" }, { new: true });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: "Failed to update book status", error });
  }
});

module.exports = router;
