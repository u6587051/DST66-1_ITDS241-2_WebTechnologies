//import express,mysql,router
const express =require('express');
const mysql = require('mysql2');
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");

//import dotenv สภาพแวดล้อม เช่น port ชื่อdatabase
const dotenv = require('dotenv');
dotenv.config();

//import cors เพื่อสามารถทำงานคนละ origin ได้
const cors = require('cors');
let whiteList = ["http://localhost:8021", "http://localhost:8022"]; //port ที่ใช้งานได้
let corsOptions = { //function ที่ทำงานได้
  origin: whiteList,
  methods: "GET,POST,PUT,DELETE",
};
//app ใช้ cors
app.use(cors(corsOptions));
router.use(cors(corsOptions));

//app ใช้ router 
app.use(router);

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

//รับ get มาแล้วแสดงข้อความว่าอยู่ในหน้าการทำงาน admin
router.get("/", function (req, res) {
    return res.send({ message: "you are in admin page" });
});

router.post("/signin", (req, res) => {
  console.log(req.body);
  let user = req.body.data;
  let jwtToken = jwt.sign(
    {
      email: user.EMAIL,
      userid: user.AID.toString(),
      first_name: user.FNAME,
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

//รับ get มาแล้วแสดงผล admin ทั้งหมด
router.get("/admins", function (req, res) {
    connection.query("SELECT * FROM ADMINS", function (error, results) {
      if (error)
        throw (error)
      return res.send({ error: false, data: results, message: "Admin lists" });
    });
});

// //รับค่า get มาแล้วรับค่าไอดี params เพื่อแสดงผล admin ที่มีไอดีที่กำหนด
// router.get("/admin/:aid", function (req, res) {
//     let admin_id = req.params.aid;
  
//     connection.query("SELECT * FROM ADMINS where AID=?",admin_id,function (error, results) {
//         if (error || results.length === 0)
//           return res.send({
//             error: true,
//             message: "Admin is not found.",
//           });
//         return res.send({
//           error: false,
//           data: results[0],
//           message: "Admin retrieved",
//         });
//       }
//     );
// });

//รับค่า get มาแล้วรับค่าไอดี params เพื่อแสดงผล admin ที่มีไอดีที่กำหนด
router.get("/admin", function (req, res) {
  let aid = req.query.AID;
  let aemail = req.query.EMAIL;
  let afname = req.query.FNAME;

  console.log(aid);
  console.log(aemail);
  console.log(afname);

  let sql = `SELECT * FROM ADMINS
            WHERE AID LIKE "${aid}" AND
            EMAIL LIKE "%${aemail}%" AND
            FNAME LIKE "%${afname}%";`

  // let sql = `SELECT * FROM ADMINS WHERE email LIKE "${aemail}";`

  connection.query(sql),function (error, results) {
      if (error || results.length === 0)
        return res.send({
          error: true,
          message: "Admin is not found.",
        });
      return res.send({
        error: false,
        data: results[0],
        message: "Admin retrieved",
      });
    }
});

//รับ put มาเพื่ออัพเดทข้อมูลใน database จาก admin id และอัพเดทข้อมูลจากข้อมูลที่ได้รับ
router.put("/admin", function (req, res) {
    let admin_id = req.body.AID;
    let admin = req.body;

    connection.query("UPDATE ADMINS SET ? WHERE AID = ?",[admin, admin_id],function (error, results) {
        if (error)
          throw(error)
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "Admin has been updated.",
        });
      }
    );
});

//รับ delete มาเพื่อลบข้อมูล admin จาก admin id ที่กำหนด
router.delete("/admin", function (req, res) {
  let admin_id = req.body.AID;

  connection.query("DELETE FROM ADMINS WHERE AID = ?",[admin_id],function (error, results) {
      if (error)
        throw(error)
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Admin has been deleted.",
      });
    }
  );
});

//export ออกเป็น router
module.exports = router;