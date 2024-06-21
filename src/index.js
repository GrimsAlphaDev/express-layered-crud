const express = require('express');
const dotenv = require('dotenv');
const {PrismaClient} = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api', (req, res) => {
    res.send("Hello World");
})

app.get('/getAllProducts', async (req,res) => {
    const products = await prisma.product.findMany();

    res.send(products);
})

app.post('/product', async (req, res) => {
    
    const newProductData = req.body;
    
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: newProductData.price
        }
    })

    res.status(201).send({
        data: product,
        message: 'Product created successfully'
    });
})

app.delete('/product/:id', async (req, res) => {
    const {id} = req.params;

    const product = await prisma.product.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.send({
        data: product,
        message: 'Product deleted successfully'
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
}) 