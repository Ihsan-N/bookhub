const Book = require("../models/bookModel");

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("owner", "name email");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new book
const addBook = async (req, res) => {
  const { title, author, owner } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      owner,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update availability of a book
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.available = available;
    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBooks, addBook, updateBook };