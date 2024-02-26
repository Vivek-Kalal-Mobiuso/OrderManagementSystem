import * as productService from '../service/productService.js'

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productService.getAllOrdersService();

        return res.status(200).send({ message: products.message, products: products.result });
    } catch (error) {
        // console.log( err);
        return res.status(error.status || 500).send({ error: error.message });
    }
}
export const getCategories = async (req, res) => {
    try {
        const categories = await productService.getCategoriesService();

        return res.status(200).send({ message: categories.message, categories: categories.result });
    } catch (error) {
        // console.log( err);
        return res.status(error.status || 500).send({ error: error.message });
    }
}
