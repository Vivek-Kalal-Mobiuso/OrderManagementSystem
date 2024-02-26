import * as orderService from '../service/orderServices.js'

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