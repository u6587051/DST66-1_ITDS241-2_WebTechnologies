//import express,mysql,router,dotenv
const express =require('express');
const mysql = require('mysql2');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
app.use(router);

//import cors เพื่อสามารถทำงานคนละ origin ได้
const cors = require('cors');
let whiteList = ["http://localhost:8021", "http://localhost:8022"];
let corsOptions = {
  origin: whiteList,
  methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));
router.use(cors(corsOptions));

//router ใช้งานไฟล์ json ได้
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//สร้างตัวเชื่อมต่อ database
let connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

//รับ get มาแล้วแสดงข้อความว่าอยู่ในหน้าการทำงาน product
router.get("/", function (req, res) {
    return res.send({ message: "you are in product page" });
});

// // post 
// router.post("/signin", (req, res) => {
//   console.log(req.body);
// });

//รับ get มาแล้วแสดงผล product ทั้งหมด
router.get("/products",function (req, res) {
  connection.query("SELECT * FROM product", function (error, results) {
      if (error)
        throw (error)
      return res.send({ error: false, data: results, message: "Product lists" });
    });
});

// รับค่า get มาแล้วรับค่าไอดี params เพื่อแสดงผล product ที่มีไอดีที่กำหนด
router.get("/product",function (req, res) {
  let id = req.query.PID;
  let brand = req.query.PBRAND;
  let cat = req.query.PCAT;

  console.log(id);
  console.log(brand);
  console.log(cat);

  let sql = `SELECT * FROM product
            WHERE PID LIKE "%${id}%" AND
            PBRAND LIKE "%${brand}%" AND
            PCAT LIKE "%${cat}%";`

  connection.query(sql,function (error, results) {
      if (error || results.length === 0)
        return res.send({
          error: true,
          message: "Product is not found.",
        });
      return res.send({
        error: false,
        data: results,
        message: "Product retrieved",
      });
  });
});
//รับ post มาเพื่อรับข้อมูลแล้ว insert เข้า database
router.post("/product",function (req, res) {
    let product = req.body
 
    connection.query(
      "INSERT INTO product SET ? ",product,function (error, results) {
        if (error)
          throw(error);
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "New product has been added.",
        });
      }
    );
  });

//รับ put มาเพื่ออัพเดทข้อมูลใน database จาก product id และอัพเดทข้อมูลจากข้อมูลที่ได้รับ
router.put("/product",function (req, res) {
    let product_id = req.body.PID;
    let product = req.body;

    connection.query("UPDATE product SET ? WHERE PID = ?",[product, product_id],function (error, results) {
        if (error)
          throw(error)
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "Product has been updated.",
        });
      }
    );
});

//รับ delete มาเพื่อลบข้อมูล admin จาก admin id ที่กำหนด
router.delete("/product",function (req, res) {
  let product_id = req.body.PID;

  connection.query("DELETE FROM product WHERE PID = ?",[product_id],function (error, results) {
      if (error)
        throw(error)
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Product has been deleted.",
      });
    }
  );
});

module.exports = router;