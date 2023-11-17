const express = require('express');
const app = express();
// const router = express.Router();
// const mysql = require('mysql2');
// app.use(router);

// const dotenv = require('dotenv');
// dotenv.config();

// let connection = mysql.createConnection({
//     host : process.env.MYSQL_HOST,
//     user : process.env.MYSQL_USERNAME,
//     password : process.env.MYSQL_PASSWORD,
//     database : process.env.MYSQL_DATABASE
// });

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

const AdminServiceRouter = require("./backend_WS/adminWS");
const ProductServiceRouter = require("./backend_WS/productWS");
const SearchServiceRouter = require("./backend_WS/searchWS");
const CallingAdminServiceRouter = require("./backend_WS/callingadminWS");
const CallingProductServiceRouter = require("./backend_WS/callingproductWS");

app.use("/adminWS",AdminServiceRouter);
app.use("/productWS", ProductServiceRouter);
app.use("/searchWS", SearchServiceRouter);
app.use("/callingadminWS", CallingAdminServiceRouter);
app.use("/callingproductWS", CallingProductServiceRouter);

app.listen(process.env.MYSQL_PORT, ()=>{
    console.log(`Server is listening to Port: ${process.env.MYSQL_PORT}`);
});