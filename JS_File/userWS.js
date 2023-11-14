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
    return res.send({ message: "you are in user page" });
});

//แสดงหลังจากกดปุ่ม edit user
router.get("/users", function (req, res) {
    dbConn.query("SELECT * FROM USERS", function (error, results) {
      if (error)
        throw (error)
      return res.send({ error: false, data: results, message: "User lists" });
    });
  });

router.post("/user", function (req, res) {
    let user = req.body
 
    connection.query(
      "INSERT INTO USERS SET ? ",user,function (error, results) {
        if (error)
          throw(error);
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "New user has been added.",
        });
      }
    );
  });

router.put("/user", function (req, res) {
    let user_id = req.body.UID;
    let user = req.body;

    connection.query("UPDATE USERS SET ? WHERE UID = ?",[user, user_id],function (error, results) {
        if (error)
          throw(error)
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "User has been updated.",
        });
      }
    );
});

router.delete("/user", function (req, res) {
  let user_id = req.body.UID;

  connection.query("DELETE FROM USERS WHERE UID = ?",[user_id],function (error, results) {
      if (error)
        throw(error)
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "User has been deleted.",
      });
    }
  );
});

module.exports = router;