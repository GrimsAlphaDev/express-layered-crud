const express = require("express");
const {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    editProductById,
    deleteProductById,
} = require("./product.service");

const router = express.Router();

router.get("/getAllProducts", async (req, res) => {
    const products = await getAllProducts();

    res.send(products);
});

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        const product = await getProductById(parseInt(productId));

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.send({
            data: product,
            message: "Product retrieved successfully",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("", async (req, res) => {
    try {
        const newProductData = req.body;

        const product = await createProduct(newProductData);

        res.status(201).send({
            data: product,
            message: "Product created successfully",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        await deleteProductById(parseInt(productId));

        res.send("Product deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
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
            return res.status(400).send("Some fields are missing");
        }

        const product = await editProductById(parseInt(productId), productData);

        res.send({
            data: product,
            message: "Product updated successfully",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        const product = await EditProductById(parseInt(productId), productData);

        res.send({
            data: product,
            message: "Product updated successfully",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
