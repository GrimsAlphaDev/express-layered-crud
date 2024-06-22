const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', (req, res) => {
    res.send('Hello World');
});

app.get("/api", (req, res) => {
    res.send("Hello World");
});

const productController = require('./product/product.controller');

app.use('/product', productController);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

export default app;