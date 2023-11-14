// const express =require('express');
// const mysql = require('mysql2');
// const app = express();
// const dotenv = require('dotenv')
// dotenv.config();

// const router = express.Router();
// app.use(router);

// var cors = require('cors');
// app.use(cors());

// let connection = mysql.createConnection({
//     host : process.env.MYSQL_HOST,
//     user : process.env.MYSQL_USERNAME,
//     password : process.env.MYSQL_PASSWORD,
//     database : process.env.MYSQL_DATABASE
// });

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// connection.connect((err) =>{
//     if(err) throw err;
//     console.log(`Connected DB : ${process.env.MYSQL_DATABASE}`);
// })

// router.get('/tools', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let sql = `SELECT * FROM product`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         res.send(results)
//     });
// })

// router.post('/tool', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let name = req.body.name
//     let sql = `SELECT * FROM product WHERE PNAME LIKE "%${name}%";`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         console.log(results);
//         res.send(results)
//     });
// })

// router.post('/tool-add', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let pid = req.body.pid
//     let pname = req.body.pname
//     let price = req.body.price
//     let quan = req.body.quan
//     let detail = req.body.detail
//     let sql = `INSERT INTO product VALUES (${pid},"${pname}",${price},${quan},"${detail}");`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         console.log(results);
//         res.send("add complete")
//     });
// })

// router.put('/tool-edit', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let pid = req.body.pid
//     let pname = req.body.pname
//     let price = req.body.price
//     let quan = req.body.quan
//     let detail = req.body.detail
//     let sql = `UPDATE product SET PName = "${pname}", PPrice = ${price}, PQuan = ${quan}, PDetail = "${detail}" WHERE PID = ${pid};`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         console.log(results);
//         res.send("edit complete")
//     });
// })

// router.delete('/tool-del', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let pid = req.body.pid
//     let sql = `DELETE FROM product WHERE PID = "${pid}"`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         res.send("delete complete")
//     });
// })

// //!!ทำให้userข้อมูลตรงกันทั้งหมด

// router.get('/users', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let sql = `SELECT * FROM USERS`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         res.send(results)
//     });
// })

// router.post('/user-add', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let uid = req.body.uid
//     let email = req.body.email
//     let pwd = req.body.pwd
//     let fname = req.body.fname
//     let lname = req.body.lname
//     let add = req.body.add
//     let age = req.body.age
//     let need = req.body.need
//     let sql = `INSERT INTO USERS VALUES (${uid},"${email}","${pwd}","${fname}","${lname}","${add}",${age},"${need}",1);`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         console.log(results);
//         res.send("add complete")
//     });
// })

// // จะใช้ where จากไหนเช่น คนที่login หรือ search ชื่อแล้วแก้ไขได้เลย
// router.put('/user-edit', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let uid = req.body.uid
//     let name = req.body.name.split(" ")
//     let fname = name[0]
//     let lname = name[1]
//     let add = req.body.add
//     // let DOB = req.body.DOB // จะเก็บ DOB ไหมหรือแค่ age
//     // let pos = req.body.pos // ตรงนี้ต้องดูว่าจะเอา position ไหม
//     let sql = `UPDATE USERS SET fname = "${fname}", lname = "${lname}", address = "${add}" WHERE UID = ${uid};`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         console.log(results);
//         res.send("edit complete")
//     });
// })

// router.put('/user-edit', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let uid = req.body.uid
//     let name = req.body.name.split(" ")
//     let fname = name[0]
//     let lname = name[1]
//     let add = req.body.add
//     // let DOB = req.body.DOB // จะเก็บ DOB ไหมหรือแค่ age
//     // let pos = req.body.pos // ตรงนี้ต้องดูว่าจะเอา position ไหม
//     let sql = `UPDATE USERS SET fname = "${fname}", lname = "${lname}", address = "${add}" WHERE UID = ${uid};`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         console.log(results);
//         res.send("edit complete")
//     });
// })

// router.delete('/user-del', (req, res) => {
//     console.log("Requested at: "+req.url);
//     let uid = req.body.uid
//     let sql = `DELETE FROM USERS WHERE UID = "${uid}"`;
//     connection.query( sql, function (error, results) {
//         if(error) throw error;
//         res.send("delete complete")
//     });
// })

// app.listen(process.env.MYSQL_PORT, ()=>{
//     console.log(`Server is listening to Port: ${process.env.MYSQL_PORT}`);
// });


const express =require('express');
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
