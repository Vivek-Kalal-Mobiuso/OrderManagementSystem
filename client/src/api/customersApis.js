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
            console.log(customerDetails);
            const result = await axios.post("/api/v1/customers", customerDetails, config);
            console.log(result);
            resolve(result)
        } catch (error) {
            console.log(error);
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
                console.log(customerDetails);
                const { data } = await axios.post("/api/v1/customers/login", customerDetails, config);
                resolve(data)
            } catch (error) {
                console.log(error);
                reject(error.message)
            }
        }, 2000)
    })
}