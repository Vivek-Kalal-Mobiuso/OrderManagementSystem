import mysql from "mysql2";
import dotenv from 'dotenv'

dotenv.config()
/** Database Connection ***/
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "orders",
})

export default connection ;