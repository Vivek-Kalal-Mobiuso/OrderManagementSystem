import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001"

export async function getAllProducts() {
    return new Promise(async (resolve, reject) => {
        try {
            // setTimeout(async () => {
            const { data } = await axios.get("/api/v1/products");
            resolve(data)
            // }, 2000)

        } catch (error) {
            reject(error.message)
        }
    })
}
export async function getAllCategories() {
    return new Promise(async (resolve, reject) => {
        try {
            const { data: { categories } } = await axios.get("/api/v1/products/categories");
            console.log(categories);
            resolve(categories)

        } catch (error) {
            reject(error.message)
        }
    })
}
export async function cancelOrderApi(orderId,token) {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header to application/json
                'Authorization': 'Bearer ' + token,
            },
        }
        try {
            const {data} = await axios.delete(`/api/v1/orders/${orderId}`, config);
            console.log(data);
            // console.log(data.data.url);
            resolve(data)
        } catch (error) {
            reject(error.message)
        }
    })
}