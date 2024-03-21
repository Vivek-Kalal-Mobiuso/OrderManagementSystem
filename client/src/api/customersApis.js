import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001"

export async function registerCustomer(customerDetails) {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
            },
        }
        try {
            const { data } = await axios.post("/api/v1/customers", customerDetails, config);
            resolve(data)
        } catch (error) {
            reject(error.message)
        }
    })
}

export async function loginCustomer(customerDetails) {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                // Add more headers as needed
            },
        }
        setTimeout(async () => {
            try {
                const { data } = await axios.post("/api/v1/customers/login", customerDetails, config);
                resolve(data)
            } catch (error) {
                reject(error.message)
            }
        }, 2000)
    })
}
export async function updateCustomer(customerDetails, token) {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                'Authorization': 'Bearer ' + token,
            },
        }
        setTimeout(async () => {
            try {
                const { data: { updatedCustomer } } = await axios.put(`/api/v1/customers/${customerDetails.customerId}`, customerDetails, config);
                resolve(updatedCustomer.updatedCustomer.result)
            } catch (error) {
                reject(error.message)
            }
        }, 2000)
    })
}
export async function getMyOrders(customerId, token) {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                'Authorization': 'Bearer ' + token,
            },
        }
        setTimeout(async () => {
            try {
                const { data } = await axios.get(`/api/v1/customers/${customerId}/orders`, config);
                resolve(data.orders)
            } catch (error) {
                reject(error.message)
            }
        }, 2000)
    })
}

export async function checkout(cart) {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                // Add more headers as needed
            },
        }
        try {
            const data = await axios.post("/api/v1/orders/payment", cart, config);
            resolve({ url: data.data.url })
        } catch (error) {
            reject(error.message)
        }
    })
}

export async function checkoutPay(cart, user, token) {
    return new Promise(async (resolve, reject) => {
        const orderData = {
            customerId: user.customerId,
            paymentMode: "CARD",
            products: cart
        }

        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                // Add more headers as needed
            },
        }
        const orderConfig = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                'Authorization': 'Bearer ' + token, // Set Content-Type header to application/json
                // Add more headers as needed
            },
        }
        try {
            const response = await axios.post("/api/v1/orders", orderData, orderConfig);

            const data = await axios.post("/api/v1/orders/payments", cart, config);

            console.log(response);
            resolve({ session: data.data })
        } catch (error) {
            reject(error.message)
        }
    })
}

