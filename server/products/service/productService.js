import connection from "../../database/databaseConfig.js";
import mapNewKeys from '../../reusable/mapping.js'

export const getAllOrdersService = () => {
    return new Promise((resolve, reject) => {
        try {
            const allProductsQuery = `SELECT * FROM PRODUCT P 
                                    JOIN PRODUCT_CLASS PC 
                                    ON P.PRODUCT_CLASS_CODE = PC.PRODUCT_CLASS_CODE;`

            connection.query(allProductsQuery, (error, result) => {
                if (error) {
                    // return res.status(501).send({ error: "Query Error", status: 501 });
                    return reject({ message: "Query Error", status: 501 })
                }
                if (result.length == 0) return reject({ message: "No Products Found", status: 400 })

                let products = []
                if (result.length > 0) {

                    const newMapping = {
                        "PRODUCT_ID": "productId",
                        "PRODUCT_DESC": "productDesc",
                        "PRODUCT_CLASS_CODE": "productCategory",
                        "PRODUCT_CLASS_DESC": "productDescription",
                        "PRODUCT_PRICE": "productPrice",
                        "PRODUCT_QUANTITY_AVAIL": "productQtyAvailable",
                        "LEN": "length",
                        "WIDTH": "width",
                        "HEIGHT": "height",
                        "WEIGHT": "weight",
                    }

                    result.map((product) => {
                        products.push(mapNewKeys(product, newMapping))
                    })
                }

                resolve({ message: `${result.length === 0 ? "No Products Found..." : "Products Found..."}`, result: products, status: 200 })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}
export const getCategoriesService = () => {
    return new Promise((resolve, reject) => {
        try {
            const categoriesQuery = `SELECT * FROM PRODUCT_CLASS;`

            connection.query(categoriesQuery, (error, result) => {
                if (error) {
                    // return res.status(501).send({ error: "Query Error", status: 501 });
                    return reject({ message: "Query Error", status: 501 })
                }
                if (result.length === 0) return reject({ message: "No Categories Found", status: 400 })

                let categories = []
                if (result.length > 0) {

                    const newMapping = {
                        "PRODUCT_CLASS_CODE": "productCategory",
                        "PRODUCT_CLASS_DESC": "productDescription",
                    }

                    result.map((category) => {
                        categories.push(mapNewKeys(category, newMapping))
                    })
                }

                resolve({ message: `${result.length === 0 ? "No Categories Found..." : "Categories Found..."}`, result: categories, status: 200 })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}
