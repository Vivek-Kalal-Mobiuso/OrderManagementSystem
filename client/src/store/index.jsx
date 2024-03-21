import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/UserSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { createStore } from 'redux'
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    users: userSlice,
})

const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//     reducer: {
//         users: userSlice,
//     }
// })

// export default store

export const store = configureStore({
    reducer: persistedReducer
})
export const persistor = persistStore(store)