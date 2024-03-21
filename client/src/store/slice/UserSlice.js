import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        cart: [],
        allProducts: [],
        filteredProducts: [],
        wishlist: [],
        myOrders: [],
    },
    reducers: {
        setUser(state, action) {
            console.log(action.payload);
            state.token = action.payload.token
            state.user = action.payload.user
        },
        logoutUser(state, action) {
            state.user = null
            state.token = null
            state.myOrders = []
        },
        usersCart(state, action) {
            const newProduct = action.payload.product;

            // Check if the product already exists in the cart
            const existingProduct = state.cart.find(
                (product) => product.productId === newProduct.productId
            );

            if (!existingProduct) {
                // If the product does not exist, add it to the cart
                state.cart = [...state.cart, newProduct];
            }
        },
        removeFromCart(state, action) {
            const productId = action.payload.productId

            state.cart = state.cart.filter(
                (product) => product.productId !== productId
            );
        },
        setAllProducts(state, action) {
            const products = action.payload.products

            state.allProducts = products
        },
        filteredProduct(state, action) {
            if (action.payload === "select") {
                state.filteredProducts = state.allProducts
            } else {
                const productCat = Number(action.payload)
                state.filteredProducts = state.allProducts.filter(
                    (product) => product.productCategory === productCat
                )
            }
        },
        removeCartItems(state, action) {
            state.cart = []
        },
        addWishlist(state, action) {
            const product = action.payload.product
            const newProduct = {...product , isWhislist : true }
            console.log(newProduct);
            state.wishlist = [...state.wishlist, newProduct];
            state.allProducts.find(
                productList => productList.productId === newProduct.productId
            ).isWhislist = true;
        },
        removeFromWishlist(state, action) {
            const productId = action.payload

            state.wishlist = state.wishlist.filter(
                (product) => product.productId !== productId
            );
        },
        setOrders(state, action) {
            // Get ProductId , OrderId ,Order Date ,orderStatus , paymentMode , productQty From Orders
            const orders = action.payload
            var newOrdersList = [];
            orders.map((order) => (
                newOrdersList.push({
                    productName: state.allProducts.find(product => product.productId === order.productId).productDesc,
                    productQauntity: order.productQuantity,
                    orderId: order.orderId,
                    orderDate: order.orderDate,
                    orderStatus: order.orderStatus,
                    paymentMode: order.paymentMode,
                    deliveredTill: order.orderShipmentDate
                })
            ))
            state.myOrders = newOrdersList
        },
    }
})

export default userSlice.reducer

export const { setUser, logoutUser, usersCart, removeFromCart, setAllProducts, filteredProduct, removeCartItems,
    addWishlist, removeFromWishlist, setOrders } = userSlice.actions