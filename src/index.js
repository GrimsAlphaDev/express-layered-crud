const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World");
});

app.get("/getAllProducts", async (req, res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});

app.get('/product/:id', async (req, res) => {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(productId),
        }
    });

    if(!product) {
        return res.status(404).send("Product not found");
    }

    res.send({
        data: product,
        message: "Product retrieved successfully",
    });
})

app.post("/product", async (req, res) => {
    const newProductData = req.body;

    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: newProductData.price,
        },
    });

    res.status(201).send({
        data: product,
        message: "Product created successfully",
    });
});

app.delete("/product/:id", async (req, res) => {
    const productId = req.params.id;

    await prisma.product.delete({
        where: {
            id: parseInt(productId),
        },
    });

    res.send("Product deleted successfully");
});

app.put("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    if (
        !(
            productData.image &&
            productData.description &&
            productData.name &&
            productData.price
        )
    ) {
        return res.status(400).send("Some fields are missing")
    }

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId),
        },
        data: {
            name: productData.name,
            description: productData.description,
            image: productData.image,
            price: productData.price,
        },
    });

    res.send({
        data: product,
        message: "Product updated successfully",
    });
});

app.patch("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId),
        },
        data: productData,
    });

    res.send({
        data: product,
        message: "Product updated successfully",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
