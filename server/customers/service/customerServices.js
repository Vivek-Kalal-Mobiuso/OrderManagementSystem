import connection from "../../database/databaseConfig.js";
import { getAddressId } from "./addressService.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mapNewKeys from '../../reusable/mapping.js'

export const createNewCustomerService = (customerDetails) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Getting the Address ID 
            const { addressId } = await getAddressId(customerDetails);

            // Hasing the password
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(customerDetails.customerPassword, salt);

            connection.connect((err) => {
                if (err) {
                    return reject({ message: err.message, status: 501 })
                }

                // Customer Creation Date
                const currDate = new Date();
                const customerCreationDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;

                // Can make other function for query execution
                const createCustomerQuery = `INSERT INTO ONLINE_CUSTOMER (
                        CUSTOMER_FNAME, 
                        CUSTOMER_LNAME, 
                        CUSTOMER_EMAIL, 
                        CUSTOMER_PHONE,
                        ADDRESS_ID, 
                        CUSTOMER_CREATION_DATE, 
                        CUSTOMER_USERNAME, 
                        CUSTOMER_GENDER, 
                        CUSTOMER_PASSWORD
                        ) VALUES ( 
                        '${customerDetails.customerFirstName}' ,
                        '${customerDetails.customerLastName}' ,
                        '${customerDetails.customerEmail}' ,
                        ${customerDetails.customerPhone} ,
                        ${addressId} ,
                        '${customerCreationDate}',
                        '${customerDetails.customerUserName}' ,
                        '${customerDetails.customerGender}',
                        '${hashedPassword}' 
                        );`
                connection.query(createCustomerQuery, function (err, result) {
                    if (err) {
                        return reject({ message: err.message, status: 501 });
                    }
                    resolve({ message: "Customer created Succesfully :)", result: result })
                });
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const getAllOrdersService = (customerId) => {
    return new Promise((resolve, reject) => {
        try {
            const allOrdersQuery = `SELECT * FROM ORDER_HEADER JOIN ORDER_ITEMS 
            ON ORDER_ITEMS.ORDER_ID = ORDER_HEADER.ORDER_ID
            WHERE CUSTOMER_ID=${customerId};`

            connection.query(allOrdersQuery, (error, result) => {
                if (error) {
                    // return res.status(501).send({ error: "Query Error", status: 501 });
                    return reject({ message: "Query Error", status: 501 })
                }
                if (result.length == 0) return reject({ message: "Customer Not Found", status: 400 })

                let orders = []
                if (result.length > 0) {

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

                    result.map((order) => {
                        orders.push(mapNewKeys(order, newMapping))
                    })
                }

                resolve({ message: `${result.length === 0 ? "No Orders Found..." : "Orders Found..."}`, result: orders, status: 200 })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const getCustomerByIdService = (customerId) => {
    return new Promise((resolve, reject) => {
        try {
            const customerQuery = `SELECT * FROM ONLINE_CUSTOMER 
                JOIN ADDRESS A
                ON A.ADDRESS_ID = ONLINE_CUSTOMER.ADDRESS_ID
                WHERE CUSTOMER_ID='${customerId}';`

            connection.query(customerQuery, (error, result) => {
                if (error) {
                    return reject({ message: "Query Error", status: 501 })
                }
                if (result.length == 0) return reject({ message: "Customer Not Found", status: 400 })

                delete result[0].CUSTOMER_PASSWORD
                delete result[0].ADDRESS_ID;

                const newMapping = {
                    "CUSTOMER_ID": "customerId",
                    "CUSTOMER_FNAME": "customerFirstName",
                    "CUSTOMER_LNAME": "customerLastName",
                    "CUSTOMER_EMAIL": "customerEmail",
                    "CUSTOMER_PHONE": "customerPhone",
                    "CUSTOMER_CREATION_DATE": "customerCreationDate",
                    "CUSTOMER_USERNAME": "customerUsername",
                    "CUSTOMER_GENDER": "customerGender",
                    "ADDRESS_LINE1": "addressLine1",
                    "ADDRESS_LINE2": "addressLine2",
                    "CITY": "city",
                    "STATE": "state",
                    "PINCODE": "pincode",
                    "COUNTRY": "country"
                }

                const newResult = mapNewKeys(result[0], newMapping);
                resolve({ message: `${result.length === 0 ? "Customer Does not Exists..." : "Customer Found"}`, result: newResult })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const getAllCustomersService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getCustomersQuery = `SELECT * FROM ONLINE_CUSTOMER`;

            connection.query(getCustomersQuery, (error, result) => {
                if (error) return reject({ message: error.message })

                const newMapping = {
                    "CUSTOMER_ID": "customerId",
                    "CUSTOMER_FNAME": "customerFirstName",
                    "CUSTOMER_LNAME": "customerLastName",
                    "CUSTOMER_EMAIL": "customerEmail",
                    "CUSTOMER_PHONE": "customerPhone",
                    "CUSTOMER_CREATION_DATE": "customerCreationDate",
                    "CUSTOMER_USERNAME": "customerUsername",
                    "CUSTOMER_GENDER": "customerGender",
                    "ADDRESS_LINE1": "addressLine1",
                    "ADDRESS_LINE2": "addressLine2",
                    "CITY": "city",
                    "STATE": "state",
                    "PINCODE": "pincode",
                    "COUNTRY": "country"
                }
                let customers = []
                result.map((cutomer) => {
                    customers.push(mapNewKeys(cutomer, newMapping))
                })
                // const newResult = mapNewKeys(result[0], newMapping);
                resolve({ result: customers });
            })
        } catch (error) {
            return reject({ message: error.message })
        }
    })
}

export const deleteCustomerByIdService = (customerId) => {
    return new Promise((resolve, reject) => {
        try {
            const deleteCustomerQuery = `DELETE FROM ONLINE_CUSTOMER WHERE CUSTOMER_ID=${customerId}`

            connection.query(deleteCustomerQuery, (error, result) => {
                if (error) {
                    return reject({ message: "Query error...", status: 501 })
                }
                if (result.length == 0) return reject({ message: "Customer Not Found", status: 400 })

                resolve({ message: "Customer Deleted Successfully", result })
            })
        } catch (error) {
            return reject({ message: "Internal Server Error..." })
        }
    })
}

export const updateCustomerService = (customerId, customerDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const oldCustomerDetails = await getCustomerByIdService(customerId);

            const updateCustomerQuery = `UPDATE ONLINE_CUSTOMER 
            JOIN ADDRESS A ON A.ADDRESS_ID = ONLINE_CUSTOMER.ADDRESS_ID
            SET
                CUSTOMER_FNAME = ? ,
                CUSTOMER_LNAME = ? ,
                CUSTOMER_PHONE = ? ,
                CUSTOMER_USERNAME = ? ,
                CUSTOMER_GENDER = ? ,
                ADDRESS_LINE1 = ? ,
                ADDRESS_LINE2 = ? ,
                CITY = ? ,
                STATE = ? ,
                PINCODE = ? ,
                COUNTRY = ? 
                ${oldCustomerDetails.customerEmail === customerDetails.customerEmail ? 'CUSTOMER_EMAIL = ? ,' : ''}
            WHERE CUSTOMER_ID = ${customerId};`

            // update address table also using joins
            const values = [
                customerDetails.customerFirstName,
                customerDetails.customerLastName,
                customerDetails.customerPhone,
                customerDetails.customerUserName,
                customerDetails.customerGender,
                customerDetails.AddressLine1,
                customerDetails.AddressLine2,
                customerDetails.city,
                customerDetails.state,
                customerDetails.pincode,
                customerDetails.country,
                (oldCustomerDetails.customerEmail === customerDetails.customerEmail ? customerDetails.customerEmail : '')
            ]

            connection.query(updateCustomerQuery, values, async (error, result) => {
                if (error) {
                    return reject({ message: "Query error... " + error.message, status: 501 })
                }
                if (result.length == 0) return reject({ message: "Customer Not Found", status: 400 })

                // If Customer is Updated fetch the updated value and send it
                const updatedCustomer = await getCustomerByIdService(customerId);

                resolve({ message: "Customer Updated Successfully",  updatedCustomer })
            })
        } catch (error) {
            return reject({ message: "Internal Server Error... " + error.message })
        }
    })
}

export const loginCustomerService = (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            const searchQuery = `SELECT * FROM ONLINE_CUSTOMER OC
            JOIN ADDRESS A ON A.ADDRESS_ID = OC.ADDRESS_ID 
            WHERE CUSTOMER_EMAIL='${email}';`

            connection.query(searchQuery, async (error, result) => {
                if (error) {
                    return reject({ message: "Query error... ", status: 501 })
                }
                if (result.length == 0) return reject({ message: "Customer Not Found", status: 400 })

                const user = result[0];
                const isMatch = await bcrypt.compare(password, user.CUSTOMER_PASSWORD);
                if (!isMatch) {
                    return reject({ message: "Invalid Credentials...", status: 401 })
                }

                // Creating token
                const token = jwt.sign(
                    {
                        id: user.CUSTOMER_ID
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"
                    }
                )
                delete user.CUSTOMER_PASSWORD

                const newMapping = {
                    "CUSTOMER_ID": "customerId",
                    "CUSTOMER_FNAME": "customerFirstName",
                    "CUSTOMER_LNAME": "customerLastName",
                    "CUSTOMER_EMAIL": "customerEmail",
                    "CUSTOMER_PHONE": "customerPhone",
                    "CUSTOMER_CREATION_DATE": "customerCreationDate",
                    "CUSTOMER_USERNAME": "customerUsername",
                    "CUSTOMER_GENDER": "customerGender",
                    "ADDRESS_LINE1": "addressLine1",
                    "ADDRESS_LINE2": "addressLine2",
                    "CITY": "city",
                    "STATE": "state",
                    "PINCODE": "pincode",
                    "COUNTRY": "country"
                }

                const newMappedResult = mapNewKeys(user, newMapping)

                return resolve({ message: "Login Successfull...", newMappedResult, token })
            })
        } catch (error) {
            return reject({ message: "Internal Server Error..." })
        }
    })
}