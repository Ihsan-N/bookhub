const Exchange = require("../models/exchangeModel");
const Book = require("../models/bookModel");

// Request an exchange of a book
const requestExchange = async (req, res) => {
  const { bookId, requesterId } = req.body;

  try {
    const book = await Book.findById(bookId);

    if (!book || !book.available) {
      return res.status(400).json({ message: "Book is not available for exchange" });
    }

    const exchange = new Exchange({
      book: bookId,
      requester: requesterId,
    });

    const savedExchange = await exchange.save();
    res.status(201).json(savedExchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve an exchange request
const approveExchange = async (req, res) => {
  const { exchangeId } = req.params;

  try {
    const exchange = await Exchange.findById(exchangeId);
    if (!exchange) return res.status(404).json({ message: "Exchange request not found" });

    exchange.status = "accepted";
    const updatedExchange = await exchange.save();

    // Update the book availability after accepting the exchange
    const book = await Book.findById(exchange.book);
    book.available = false;
    await book.save();

    res.json(updatedExchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decline an exchange request
const declineExchange = async (req, res) => {
  const { exchangeId } = req.params;

  try {
    const exchange = await Exchange.findById(exchangeId);
    if (!exchange) return res.status(404).json({ message: "Exchange request not found" });

    exchange.status = "declined";
    const updatedExchange = await exchange.save();

    res.json(updatedExchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { requestExchange, approveExchange, declineExchange };