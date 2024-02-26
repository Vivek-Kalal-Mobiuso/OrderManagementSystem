import connection from '../database/databaseConfig.js'
import { body, validationResult } from 'express-validator';

export const validateCustomer = (req, res, next) => {
    const customerDetails = req.body;

    if (!customerDetails.customerFirstName || !customerDetails.customerLastName ||
        !customerDetails.customerEmail || !customerDetails.customerPhone || !customerDetails.AddressLine1 || !customerDetails.city || !customerDetails.state || !customerDetails.city || !customerDetails.pincode || !customerDetails.country ||
        !customerDetails.customerUserName ) {
            // || !customerDetails.customerGender
        return res.status(400).send({ error: "Incomplete Details..." });
    }

    // check if customer already exist 
    const doesCustomerExist = `SELECT * FROM ONLINE_CUSTOMER WHERE CUSTOMER_EMAIL = '${customerDetails.customerEmail}';`
    // console.log(isCustomerExist);

    connection.query(doesCustomerExist, (error, result) => {
        if (error) {
            return res.status(501).send({ error: "Query Error", status: 501 });
            // return reject({ error: "Query Error" , status : 501})
        }
        if (result.length != 0) {
            return res.status(409).send({ error: "User Email Already Exist", status: 409 }); // 409 - Conflict Error
            // return reject({ error: "User Email Already Exist", status: 409 }) 
        }
    })

    next();
}

export const isValidCustomer = (req, res, next) => {
    const customerId = req.params.customerId

    const doesCustomerExist = `SELECT * FROM ONLINE_CUSTOMER WHERE CUSTOMER_ID=${customerId};`

    connection.query(doesCustomerExist, (error, result) => {
        if (error) {
            return res.status(501).send({ error: "Query Error", status: 501 });
            // return reject({ error: "Query Error" , status : 501})
        }
        if (result.length == 0) {
            return res.status(404).send({ error: "Customer Does not Exist", status: 404 }); // 404 - Not Found
            // return reject({ error: "User Email Already Exist", status: 409 }) 
        }
    })
    next();
}

export const isCustomer = (req, res, next) => {
    const customerId = req.body.customerId;

    const doesCustomerExist = `SELECT * FROM ONLINE_CUSTOMER WHERE CUSTOMER_ID=${customerId};`

    connection.query(doesCustomerExist, (error, result) => {
        if (error) {
            return res.status(501).send({ error: "Query Error", status: 501 });
            // return reject({ error: "Query Error" , status : 501})
        }
        if (result.length == 0) {
            return res.status(404).send({ error: "Customer Does not Exist", status: 404 }); // 404 - Not Found
            // return reject({ error: "User Email Already Exist", status: 409 }) 
        }
    })
    next();
}

export const validateOrder = (req, res, next) => {
    const orderDetails = req.body;

    if (!orderDetails.customerId ||
        !orderDetails.paymentMode ||
        !orderDetails.products) {
        return res.status(400).send({ message: "Incomplete Details... " })
    }

    next();
}

export const validationError = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    } else
        res.status(400).send({ errors: result.array() });
}

export const registerCustomerValidationsSchema = {
    customerPhone: {
        notEmpty: true,
        errorMessage: 'Phone number is required',
    },
    customerFirstName: {
        notEmpty: true,
        errorMessage: 'First Name is required',
    },
    customerLastName: {
        notEmpty: true,
        errorMessage: 'Last Name is required',
    },
    customerEmail: {
        notEmpty: true,
        errorMessage: 'Email is required',
        isEmail: {
            errorMessage: 'Invalid email address',
        }
    },
    customerPhone: {
        notEmpty: true,
        errorMessage: 'Enter Mobile Number',
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Phone number must be 10 digits',
        },
        // isMobilePhone: {
        //     options: ['any'],
        //     errorMessage: "Invalid Mobile Number for India"
        // }
    },
    customerPassword: {
        notEmpty: true,
        errorMessage: 'Password is required',
    },
    addressLine1: {
        notEmpty: true,
        errorMessage: "Address is Required"
    },
    city: {
        notEmpty: true,
        errorMessage: "City is Required"
    },
    state: {
        notEmpty: true,
        errorMessage: "State is Required"
    },
    pincode: {
        // notEmpty: {
        //     errorMessage: "Pincode is Required",
        // },
        isNumeric: {    // this also verifies string numbers "123456"
            errorMessage: "Pincode Should be Number"
        }
    },
    country: {
        notEmpty: true,
        errorMessage: "Country is Required"
    },
    customerUserName: {
        notEmpty: true,
        errorMessage: "Username is Required"
    },
    // customerGender: {
    //     notEmpty: true,
    //     errorMessage: "Gender is Required",
    //     isLength: {
    //         options: { min: 1, max: 1 },
    //         errorMessage: 'Gender Should Be 1 character only'
    //     }
    // },

};

export const loginCustomerValidationsSchema = {
    customerEmail: {
        notEmpty: true,
        errorMessage: 'Email is required',
        isEmail: {
            errorMessage: 'Invalid email address',
        }
    },
    customerPassword: {
        notEmpty: true,
        errorMessage: 'Password is required',
    },
}
export const orderValidationSchema = {
    orderStatus: {
        notEmpty: true,
        errorMessage: 'Order Status is required',
    },
    customerPassword: {
        notEmpty: true,
        errorMessage: 'Password is required',
    },
}