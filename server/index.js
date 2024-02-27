import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import customerRoutes from './routes/customerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productsRoutes.js'
import connection from "./database/databaseConfig.js";
import cors from "cors"
import stripe from "stripe";

const secretKey = process.env.SECRET_KEY;
const stripeInstance = stripe(secretKey);

const app = express();
const PORT = 3001

app.use(express.json())
app.use(cors())

// Connect 
connection.connect((err) => {
    if (err) {
        console.error("Error Connection database");
    } else {
        console.log("Database connected");
    }
})

// customer routes
app.use("/api/v1/customers", customerRoutes);
// 
// order routes
app.use("/api/v1/orders", orderRoutes);

// product routes
app.use("/api/v1/products", productRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log("server is running on port : ", process.env.PORT || PORT);
})