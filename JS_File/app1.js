const express = require('express');
const app = express();

const AdminServiceRouter = require("./backend_WS/adminWS");
const ProductServiceRouter = require("./backend_WS/productWS");
const CallingAdminServiceRouter = require("./backend_WS/callingadminWS");
const CallingProductServiceRouter = require("./backend_WS/callingproductWS")

app.use("/adminWS",AdminServiceRouter);
app.use("/productWS", ProductServiceRouter);
app.use("/callingadminWS", CallingAdminServiceRouter);
app.use("/callingproductWS", CallingProductServiceRouter);

app.listen(process.env.MYSQL_PORT, ()=>{
    console.log(`Server is listening to Port: ${process.env.MYSQL_PORT}`);
});