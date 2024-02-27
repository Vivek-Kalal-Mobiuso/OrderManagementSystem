import * as orderService from '../service/orderServices.js'
import stripe from "stripe";

const secretKey = process.env.SECRET_KEY;
const stripeInstance = stripe(secretKey);

export const placeOrder = async (req, res) => {
    try {
        // if (req.user.id !== req.body.customerId) return res.status(403).send({ message: "Unauthorized Access" })

        const orderDetails = req.body

        const placedOrderDetails = await orderService.orderHeaderService(orderDetails);

        const orderItemsDetails = await orderService.orderItemsService(orderDetails, placedOrderDetails.result.insertId); // this is orderID

        // SRP : Single responsibility principle
        res.status(200).send({ message: "Order Succesfully Placed..", orderId: placedOrderDetails.result.insertId })
    } catch (error) {
        res.status(error.status || 500).send({ message: "Error in updating order" })
    }
}

export const getOrderByIdController = async (req, res) => {
    try {
        const orderId = req.params.id

        const orderDetails = await orderService.getOrderByIdService(orderId);

        return res.status(200).send({ message: orderDetails.message, order: orderDetails.result })
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" });
    }
}

export const updateOrderController = async (req, res) => {
    try {
        const orderDetails = req.body;
        const orderId = req.params.id

        const updateOrderHeader = await orderService.updateOrderHeaderService(orderDetails, orderId);

        const updateOrderItems = await orderService.updateOrderItemsService(orderDetails, orderId);

        res.status(200).send({ message: "Order Updated Successfully" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export const deleteOrderByIdController = async (req, res) => {
    try {
        const orderId = req.params.id

        const deletedOrder = await orderService.deleteOrderByIdService(orderId)

        return res.status(200).send({ message: deletedOrder.message })
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" })
    }
}
export const paymentController = async (req, res) => {
    try {
        const cartItems = req.body

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: cartItems.map((product) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product.productDesc
                        },
                        unit_amount: product.productPrice * 1000
                    },
                    quantity: 1
                }
            }),
            success_url: "http://localhost:3000/sucess",
            cancel_url: "http://localhost:3000/cancel",
        })
        res.redirect(303, session.url);
        return res.status(200).send({ url: session.url })
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" })
    }
}
export const paymentController2 = async (req, res) => {
    try {
        const cartItems = req.body

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: cartItems.map((product) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product.productDesc
                        },
                        unit_amount: Math.round(product.productPrice * 100)
                    },
                    quantity: 1
                }
            }),
            success_url: "http://localhost:3000/sucess",
            cancel_url: "http://localhost:3000/cancel",
        })
        console.log("hi");
        return res.status(200).send({ id: session.id })
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" })
    }
}