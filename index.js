const express = require('express');
const cors = require("cors");
const { getAllBooks, getBookById } = require("./controller/index");

const app = express();

app.use(cors());

app.get("/books", async (req, res) => {
    const books = getAllBooks();
    res.json({ books });
})

app.get("/books/details/:id", async (req, res) => {
     let book = getBookById(parseInt(req.params.id));
     res.json({ book });
})

module.exports = { app };