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