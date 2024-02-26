import connection from "../../database/databaseConfig.js";
import mapNewKeys from '../../reusable/mapping.js'

export const orderHeaderService = (orderDetails) => {
    return new Promise((resolve, reject) => {
        try {
            connection.connect((err) => {
                if (err) {
                    return reject({ message: "DB connection Error " + err.message, status: 501 })
                }
                const currDate = new Date();
                // Customer Creation Date
                const orderCreationDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;

                const orderHeaderQuery = `INSERT INTO ORDER_HEADER(
                                                                CUSTOMER_ID,
                                                                ORDER_DATE,
                                                                ORDER_STATUS,
                                                                PAYMENT_MODE) VALUES (${orderDetails.customerId} ,'${orderCreationDate}' ,'In Process' ,'${orderDetails.paymentMode}')`;

                connection.query(orderHeaderQuery, (error, result) => {

                    if (error) {
                        console.log(error + " in  executing query of placeOrder");
                        // res.status(500).status({ err: "Query Error Execution" })
                        return reject({ message: error.message, status: 501 })

                    }
                    // console.log(result);
                    resolve({ message: "Order Created Succesfully", status: 200, result: result })
                })

            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const orderItemsService = (orderDetails, orderId) => {

    return new Promise((resolve, reject) => {
        try {
            const products = orderDetails.products;

            products.map((product, index) => {
                const orderItemsQuery = `INSERT INTO ORDER_ITEMS VALUES(${orderId} , ${product.productId} ,${product.productQuantity} )`;

                connection.query(orderItemsQuery, (err, result) => {
                    if (err) {
                        return reject({ message: "Query Error Execution", status: 501 })
                    }
                    console.log(result);
                    resolve({ message: "Order Placed Succesfully :)", result: result, status: 200 })
                })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const getOrderByIdService = (orderId) => {
    return new Promise((resolve, reject) => {
        try {
            const orderIdQuery = `SELECT * FROM ORDER_HEADER JOIN ORDER_ITEMS ON ORDER_ITEMS.ORDER_ID = ORDER_HEADER.ORDER_ID WHERE order_header.ORDER_ID=${orderId};`

            connection.query(orderIdQuery, (error, result) => {
                if (error) {
                    return reject({ message: "Query Error Execution", status: 501 })
                }
                if (result.length == 0) return reject({ message: "Order Not Found", status: 200 })

                const newMapping = {
                    "ORDER_ID": "orderId",
                    "CUSTOMER_ID": "customerId",
                    "ORDER_DATE": "orderDate",
                    "ORDER_STATUS": "orderStatus",
                    "PAYMENT_MODE": "paymentMode",
                    "PAYMENT_DATE": "paymentDate",
                    "ORDER_SHIPMENT_DATE": "orderShipmentDate",
                    "SHIPPER_ID": "shipperId",
                    "PRODUCT_ID": "productId",
                    "PRODUCT_QUANTITY": "productQuantity"
                }
                const order = mapNewKeys(result[0], newMapping);
                // return resolve({ message: (result.length === 0) ? "Order Doesn't exist" : "Order Found.. :)", result: order })
                return resolve({ message: (result.length === 0) ? "Order Doesn't exist" : "Order Found.. :)", result: order })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const updateOrderHeaderService = (orderDetails, orderId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const updateOrderQuery = `UPDATE ORDER_HEADER SET ORDER_STATUS = ? , PAYMENT_MODE = ? ,PAYMENT_DATE = ? ,ORDER_SHIPMENT_DATE = ? ,SHIPPER_ID = ? WHERE ORDER_ID=${orderId}`
            const values = [
                orderDetails.orderStatus,
                orderDetails.paymentMode,
                orderDetails.paymentDate,
                orderDetails.orderShipmentDate,
                orderDetails.shipperId,
            ]
            connection.query(updateOrderQuery, values, (error, result) => {
                if (error) {
                    return reject({ message: "Query Error", status: 501 })
                }
                if (result.length == 0) return reject({ message: "Order Not Found", status: 400 })
                // resolve
                return resolve({ message: "Order Updated Successfully", result })
            })
        } catch (error) {
            return reject({ message: "Internal Server Error", status: 500 })
        }
    })
}

export const updateOrderItemsService = (orderDetails, orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(orderId);
            orderDetails.products.map((product) => {
                const updateOrderQuery = `UPDATE ORDER_ITEMS SET PRODUCT_QUANTITY = ${product.productQuantity} 
                                                        WHERE ORDER_ID=${orderId} AND PRODUCT_ID=${product.productId}`
                console.log(updateOrderQuery);
                connection.query(updateOrderQuery, (error, result) => {
                    if (error) {
                        return reject({ message: "Query Error "+error.message, status: 501 })
                    }
                    // resolve
                    return resolve({ message: "Order Updated Successfully", result })
                })
            })

        } catch (error) {
            return reject({ message: error.message, status: 500 })
        }
    })
}

export const deleteOrderByIdService = (orderId) => {
    return new Promise((resolve, reject) => {
        try {
            const deleteOrderQuery = `DELETE ORDER_HEADER,ORDER_ITEMS FROM ORDER_HEADER
                                                            JOIN ORDER_ITEMS 
                                                            ON ORDER_HEADER.ORDER_ID = ORDER_ITEMS.ORDER_ID
                                                            WHERE ORDER_HEADER.ORDER_ID=${orderId}`

            connection.query(deleteOrderQuery, (error, result) => {
                if (error) {
                    return reject({ message: "Query error..." + error.message, status: 501 })
                }
                if (result.length === 0) return reject({ message: "Order Not Found", status: 400 })

                resolve({ message: "Order Deleted Successfully", result })
            })
        } catch (error) {
            return reject({ message: "Internal Server Error" })
        }
    })
}