import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001"

export async function registerCustomer(customerDetails) {
    console.log(customerDetails);
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                // Add more headers as needed
            },
        }
        try {
            const result = await axios.post("/api/v1/customers", customerDetails, config);
            resolve(result)
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

export async function checkout(cart) {
    return new Promise(async (resolve, reject) => {
        console.log(cart);
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                // Add more headers as needed
            },
        }
        try {
            const data = await axios.post("/api/v1/orders/payment", cart, config);
            console.log(data);
            console.log(data.data.url);
            resolve({ url: data.data.url })
        } catch (error) {
            reject(error.message)
        }
    })
}

export async function checkoutPay(cart) {
    return new Promise(async (resolve, reject) => {
        console.log(cart);
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                // Add more headers as needed
            },
        }
        try {
            const data = await axios.post("/api/v1/orders/payments", cart, config);
            console.log(data);
            resolve(data.data)
        } catch (error) {
            reject(error.message)
        }
    })
}

