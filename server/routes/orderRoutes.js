import express from "express"
// import placeOrder from '../controllers/orderControllers.js'
import * as orderController from '../orders/controllers/orderControllers.js'
import * as validate from '../middlewares/validate.js'
import verifyToken from "../middlewares/auth.js";

const route = express.Router()
// create
route.post("/", validate.validateOrder, verifyToken, orderController.placeOrder);
// update
route.patch("/:id", verifyToken, orderController.updateOrderController);
// read
route.get("/:id", verifyToken, orderController.getOrderByIdController);
// delete
route.delete("/:id", verifyToken, orderController.deleteOrderByIdController);
// payment
route.post("/payment",orderController.paymentController);

route.post("/payments",orderController.paymentController2);
// 10127
export default route;