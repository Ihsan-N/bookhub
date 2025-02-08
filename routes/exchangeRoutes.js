const express = require("express");
const Exchange = require("../models/exchangeModel");

const router = express.Router();

// 🔹 Request to Exchange a Book
router.post("/", async (req, res) => {
  try {
    const { requestedBy, book } = req.body;
    const exchangeRequest = await Exchange.create({ requestedBy, book });
    res.status(201).json(exchangeRequest);
  } catch (error) {
    res.status(400).json({ message: "Failed to request exchange", error });
  }
});

// 🔹 Get All Exchange Requests
router.get("/", async (req, res) => {
  try {
    const exchanges = await Exchange.find().populate("requestedBy", "name email").populate("book", "title author");
    res.json(exchanges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exchange requests", error });
  }
});

// 🔹 Accept/Decline Exchange Request
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const exchange = await Exchange.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(exchange);
  } catch (error) {
    res.status(400).json({ message: "Failed to update exchange request", error });
  }
});

module.exports = router;