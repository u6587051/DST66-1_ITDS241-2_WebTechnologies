const express =require('express');
const mysql = require('mysql2');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const router = express.Router();
app.use(router);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

router.get("/", function (req, res) {
    return res.send({ message: "you are in admin page" });
});

router.get("/admins", function (req, res) {
    dbConn.query("SELECT * FROM ADMINS", function (error, results) {
      if (error)
        throw (error)
      return res.send({ error: false, data: results, message: "Admin lists" });
    });
  });

router.post("/admin", function (req, res) {
    let admin = req.body
 
    connection.query(
      "INSERT INTO ADMINS SET ? ",admin,function (error, results) {
        if (error)
          throw(error);
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "New admin has been created successfully.",
        });
      }
    );
  });

router.put("/student", function (req, res) {
    let admin_id = req.body.AID;
    let admin = req.body;

    connection.query("UPDATE student SET ? WHERE STU_ID = ?",[admin, admin_id],function (error, results) {
        if (error)
          return res.send({
            error: student,
            message: "The student cannot be updated.",
          });
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "Student has been updated successfully.",
        });
      }
    );
});

module.exports = router;