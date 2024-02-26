import express from "express"
import * as customerController from '../customers/controllers/customerControllers.js'
import * as validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/auth.js";
import {
    checkSchema
} from 'express-validator';

const route = express.Router()

// add
route.post("/",
    checkSchema(validate.registerCustomerValidationsSchema),
    validate.validationError,
    customerController.newCustomerController
);

route.post("/login",
    checkSchema(validate.loginCustomerValidationsSchema),
    validate.validationError,
    customerController.loginCustomerController
);
// read
route.get(
    "/:customerId/orders",
    verifyToken,
    customerController.getCustomerOrdersController
);
route.get(
    "/:customerId",
    verifyToken,
    customerController.getCustomerByIdController
);
route.get(
    "/",
    verifyToken,
    customerController.getAllCustomersController
);
// delete
route.delete(
    "/:customerId",
    verifyToken,
    customerController.deleteCustomerByIdController);
// update
route.put(
    "/:customerId",
    verifyToken,
    customerController.updateCustomerController
);

export default route;