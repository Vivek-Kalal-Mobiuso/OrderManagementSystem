import * as productController from "../products/controllers/productControllers.js"
import express from "express"

const route = express.Router()

route.get("/",
    productController.getAllProductsController
);
route.get("/categories",
    productController.getCategories
);

export default route
