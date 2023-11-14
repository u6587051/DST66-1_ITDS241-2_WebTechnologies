const express = require('express');
const app = express();

const AdminServiceRouter = require("./backend_WS/adminWS");
const ProductServiceRouter = require("./backend_WS/productWS");

app.use("/adminWS",AdminServiceRouter);
app.use("/productWS", ProductServiceRouter);

app.listen(process.env.MYSQL_PORT, ()=>{
    console.log(`Server is listening to Port: ${process.env.MYSQL_PORT}`);
});