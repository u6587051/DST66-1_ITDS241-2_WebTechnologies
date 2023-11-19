const express = require('express');
const app = express();

const AdminServiceRouter = require("./sec1_gr1_ws_src/adminWS");
const ProductServiceRouter = require("./sec1_gr1_ws_src/productWS");
const SearchServiceRouter = require("./sec1_gr1_ws_src/searchWS");
const LoginServiceRouter = require("./sec1_gr1_ws_src/loginWS");
const CallingAdminServiceRouter = require("./sec1_gr1_ws_src/callingadminWS");
const CallingProductServiceRouter = require("./sec1_gr1_ws_src/callingproductWS");
const CallingSearchWS = require("./sec1_gr1_ws_src/callingsearchWS");
const CallingLoginWS = require("./sec1_gr1_ws_src/callingloginWS");

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