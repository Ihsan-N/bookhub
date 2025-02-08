const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const hbs = require("hbs");
const userRoutes = require("./routes/userRoutes"); // Add this
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as View Engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Serve Static Files (CSS, Images)
app.use(express.static(path.join(__dirname, "public")));

// Dummy Books Data
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "/images/1.jpg",
    description: "A novel set in the 1920s about wealth and love.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "/images/2.jpg",
    description: "A novel about justice and racial inequality.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    image: "/images/3.jpg",
    description: "A dystopian novel about a totalitarian regime.",
  },
];

// Home Route - Display Books
app.get("/", (req, res) => {
  res.render("home", { title: "Book Exchange", books });
});

// Book Details Route
app.get("/book/:id", (req, res) => {
  const book = books.find((b) => b.id == req.params.id);
  if (book) {
    res.render("book-details", { title: book.title, book });
  } else {
    res.status(404).send("Book not found");
  }
});

// Login Route
app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Signup Route
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

// Dashboard Route
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard", books });
});
app.use("/api/users", userRoutes); // ✅ Mount user routes here
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
