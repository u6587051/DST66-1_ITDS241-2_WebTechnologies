const express = require('express');
const app = express();

const AdminServiceRouter = require("./backend_WS/adminWS");
const ProductServiceRouter = require("./backend_WS/productWS");
const SearchServiceRouter = require("./backend_WS/searchWS");
const LoginServiceRouter = require("./backend_WS/loginWS");
const CallingAdminServiceRouter = require("./backend_WS/callingadminWS");
const CallingProductServiceRouter = require("./backend_WS/callingproductWS");
const CallingSearchWS = require("./backend_WS/callingsearchWS");
const CallingLoginWS = require("./backend_WS/callingloginWS");

app.use("/adminWS",AdminServiceRouter);
app.use("/productWS", ProductServiceRouter);
app.use("/searchWS", SearchServiceRouter);
app.use("/loginWS",LoginServiceRouter);
app.use("/callingadminWS", CallingAdminServiceRouter);
app.use("/callingproductWS", CallingProductServiceRouter);
app.use("/callingsearchWS", CallingSearchWS);
app.use("/callingloginWS",CallingLoginWS);

app.listen(process.env.MYSQL_PORT, ()=>{
    console.log(`Server is listening to Port: ${process.env.MYSQL_PORT}`);
});