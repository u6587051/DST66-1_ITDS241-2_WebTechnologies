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
// router.get('/product/:pid?/:pname?/:pbrand?/:pcat?/:pricerange?/:pquan?/:pdetail?', function (req, res) {
//   let pid = req.params.pid ? req.params.pid:'';
//   let pname = req.params.pname ? req.params.pname:'';
//   let pbrand = req.params.pbrand ? req.params.pbrand:'';
//   let pcat = req.params.pcat ? req.params.pcat:'';
//   let pricerange = req.params.pricerange ? req.params.pricerange:'';
//   let pquan = req.params.pquan ? req.params.pquan:'';
//   let pdetail = req.params.pdetail ? req.params.pdetail:'';
  
//     // Build the base SQL query
//   let sql = "SELECT * FROM product WHERE 1";
  
//     // Add conditions for each parameter if provided
//   if (pid) {
//       sql += " AND (pid LIKE ? OR pid = '')";
//     }

//   if (pname) {
//       sql += " AND (pname LIKE ? OR pname = '')";
//     }
  
//   if (pbrand) {
//       sql += " AND (pbrand LIKE ? OR pbrand = '')";
//     }
    
//   if (pcat) {
//     sql += " AND (pcat LIKE ? OR pcat = '')";
//   }
//   if (pquan) {
//     sql += " AND (pquan LIKE ? OR pquan = '')";
//   }
//   if (pdetail) {
//     sql += " AND (pdetail LIKE ? OR pdetail = '')";
//   }
  

  
//     // Add a condition to categorize products based on price
//   if (pricerange) {
//     switch (pricerange) {
//       case '1-1000':
//         sql += " AND pprice BETWEEN 1 AND 1000";
//       case '1001-2000':
//         sql += " AND pprice BETWEEN 1001 AND 2000";
//       case '>2000':
//         sql += " AND pprice > 2000";
//         // Add more cases as needed
//       }
//     }
  
//     // Execute the query with appropriate parameters
//     connection.query(sql, [`%${pid}%`,`%${pname}%`,`%${pbrand}%`,`%${pcat}%`,`%${pquan}%`,`%${pdetail}%`], function (error, results) {
//       if (error || results.length === 0) {
//         return res.send({
//           error: true,
//           message: `Product is not found.`,
//         });
//       }
  
//       return res.send({
//         error: false,
//         data: results,
//         message: "Products retrieved",
//       });
//     });
// });
  

module.exports = router;