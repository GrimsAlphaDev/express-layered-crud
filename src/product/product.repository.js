// communicate with database
// Using ORM or Raw SQL

const prisma = require("../db");

const findProducts = async () => {
    const product = await prisma.product.findMany();

    return product;
};

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    return product;
};

const findProductByName = async (name) => {
    const product = await prisma.product.findFirst({
        where: {
            name,
        },
    });

    return product;
};

const insertProduct = async (newProductData) => {
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: newProductData.price,
        },
    });

    return product;
};

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where: {
            id,
        },
    });
};

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id,
        },
        data: {
            name: productData.name,
            description: productData.description,
            image: productData.image,
            price: productData.price,
        },
    });

    return product;

}

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    findProductByName,
    deleteProduct,
    editProduct,
};
