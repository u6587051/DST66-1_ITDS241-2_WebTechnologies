//import express,mysql,router,dotenv
const express =require('express');
const mysql = require('mysql2');
const app = express();
const dotenv = require('dotenv')
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

// post 
router.post("/signin", (req, res) => {
  console.log(req.body);
  let user = req.body.user;
  let jwtToken = jwt.sign(
    {
      email: user.email,
      userid: user.userid.toString(),
      first_name: user.first_name,
    },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({
    token: jwtToken,
    message: user,
  });
});

//รับ get มาแล้วแสดงผล product ทั้งหมด
router.get("/products", function (req, res) {
  connection.query("SELECT * FROM product", function (error, results) {
      if (error)
        throw (error)
      return res.send({ error: false, data: results, message: "Product lists" });
    });
  });

// รับค่า get มาแล้วรับค่าไอดี params เพื่อแสดงผล product ที่มีไอดีที่กำหนด
router.get("/product/:pid", function (req, res) {
  let product_id = req.params.pid;connection.query("SELECT * FROM product where PID=?",product_id,function (error, results) {
    if (error || results.length === 0)
      return res.send({
        error: true,
        message: "Product is not found.",
      });
    return res.send({
      error: false,
      data: results[0],
      message: "Product retrieved",
    });
  }
);
});

//รับ post มาเพื่อรับข้อมูลแล้ว insert เข้า database
router.post("/product", function (req, res) {
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
router.put("/product", function (req, res) {
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
router.delete("/product", function (req, res) {
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




// //หา Product ที่สามารถไม่ใส่ Criteria หรือใส่ก็ได้ ยังไม่ได้
router.get('/product/:pid?/:pname?/:pbrand?', function (req, res) {
  let pid = req.params.pid || '';
  let pname = req.params.pname||'';
  let pbrand = req.query.pbrand || '';
  let pcat = req.query.pcat
  let pprice = req.query.Pprice 
  let pquan = req.query.PQuan
  let pdetail = req.query.Pdetail
  
    // Build the base SQL query

  if (pname==''){
    req.query.pname = '';
  }
  if (pbrand==''){
    req.query.pbrand = '';
  }
  
  let sql = `SELECT * FROM product WHERE 1
            AND pname LIKE '%${pname}%'
            AND pbrand LIKE '%${pbrand}%';`;
  
    // Execute the query with appropriate parameters
  connection.query(sql, function (error, results) {
      if (error || results.length === 0) {
        return res.send({
          error: true,
          message: `Product is not found.`,
        });
      }
  
      return res.send({
        error: false,
        data: results,
        message: "Products retrieved",
      });
    })
  });
  

module.exports = router;