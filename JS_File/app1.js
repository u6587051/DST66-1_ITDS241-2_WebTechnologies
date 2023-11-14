const express = require('express');
const app = express();

const AdminServiceRouter = require("./backend_WS/adminWS");
const UserServiceRouter = require("./backend_WS/userWS");
const ProductServiceRouter = require("./backend_WS/productWS");

app.use("/adminWS",AdminServiceRouter);
app.use("/userWS", UserServiceRouter);
app.use("/productWS", ProductServiceRouter);

app.listen(process.env.MYSQL_PORT, ()=>{
    console.log(`Server is listening to Port: ${process.env.MYSQL_PORT}`);
});