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