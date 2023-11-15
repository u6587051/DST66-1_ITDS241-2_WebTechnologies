const express =require('express');
const mysql = require('mysql2');
const app = express();
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
let whiteList = ["http://localhost:8021", "http://localhost:8022"];
let corsOptions = {
  origin: whiteList,
  methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));
router.use(cors(corsOptions));

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
    connection.query("SELECT * FROM ADMINS", function (error, results) {
      if (error)
        throw (error)
      return res.send({ error: false, data: results, message: "Admin lists" });
    });
  });

router.get("/admin/:aid", function (req, res) {
    let admin_id = req.params.aid;
  
    connection.query("SELECT * FROM ADMINS where AID=?",admin_id,function (error, results) {
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
    );
});

router.post("/admin", function (req, res) {
    let admin = req.body
    console.log(admin)
 
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

module.exports = router;