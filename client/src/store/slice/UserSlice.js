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
            state.wishlist = [...state.wishlist, product];
        },
        removeFromWishlist(state, action) {
            const productId = action.payload

            state.wishlist = state.wishlist.filter(
                (product) => product.productId !== productId
            );
        },
    }
})

export default userSlice.reducer

export const { setUser, logoutUser, usersCart, removeFromCart, setAllProducts, filteredProduct, removeCartItems,
    addWishlist, removeFromWishlist } = userSlice.actions