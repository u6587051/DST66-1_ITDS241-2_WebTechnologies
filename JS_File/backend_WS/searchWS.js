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
  methods: "GET",
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
    return res.send({ message: "you are in search page" });
});


router.get("/search",function (req, res) {
  let brand = req.query.PBRAND;
  let cat = req.query.PCAT;
  let pname = req.query.PNAME;

  console.log(brand);
  console.log(cat);
  console.log(pname);

  let sql = `SELECT * FROM product
            WHERE PNAME LIKE "%${pname}%" AND
            PCAT LIKE "%${cat}%" AND
            PBRAND LIKE "%${brand}%";`

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

module.exports = router;