const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));


const productController = require('../src/product/product.controller')

app.use('/product', productController);

app.listen(2001, () => console.log("Server ready on port 2001."));

module.exports = app;