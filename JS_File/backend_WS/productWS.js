const express =require('express');
const mysql = require('mysql2');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const router = express.Router();
app.use(router);

const cors = require('cors');
let whiteList = ["http://203.159.93.114:8021", "http://203.159.93.114:8022"];
let corsOptions = {
  origin: whiteList,
  methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

router.get("/", function (req, res) {
    return res.send({ message: "you are in product page" });
});

//แสดงหลังจากกดปุ่ม product
router.get("/products", function (req, res) {
  connection.query("SELECT * FROM product", function (error, results) {
      if (error)
        throw (error)
      return res.send({ error: false, data: results, message: "Product lists" });
    });
  });

// router.get("/product/:pid", function (req, res) {
//     let product_id = req.params.pid;
  
//     connection.query("SELECT * FROM product where PID=?",product_id,function (error, results) {
//         if (error || results.length === 0)
//           return res.send({
//             error: true,
//             message: "Product is not found.",
//           });
//         return res.send({
//           error: false,
//           data: results[0],
//           message: "Product retrieved",
//         });
//       }
//     );
// });

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



//หา Product ที่สามารถไม่ใส่ Criteria หรือใส่ก็ได้ ยังไม่ได้

// router.get("/product/:pcat&:pbrand&:pricerange", function (req, res) {
router.get('/product/:pcat?/:pbrand?/:pricerange?', function (req, res) {
  let pcat = req.params.pcat ? req.params.pcat:'';
  let pbrand = req.params.pbrand ? req.params.pbrand:'';
  let pricerange = req.params.pricerange ? req.params.pricerange:'';
  
    // Build the base SQL query
  let sql = "SELECT * FROM product WHERE 1";
  
    // Add conditions for each parameter if provided
  if (pcat) {
    sql += " AND (pcat LIKE ? OR pcat = '')";
  }
  
  if (pbrand) {
    sql += " AND (pbrand LIKE ? OR pbrand = '')";
  }
  
    // Add a condition to categorize products based on price
  if (pricerange) {
    switch (pricerange) {
      case '1-1000':
        sql += " AND pprice BETWEEN 1 AND 1000";
      case '1001-2000':
        sql += " AND pprice BETWEEN 1001 AND 2000";
      case '>2000':
        sql += " AND pprice > 2000";
        // Add more cases as needed
      }
    }
  
    // Execute the query with appropriate parameters
    connection.query(sql, [`%${pcat}%`,`%${pbrand}%`], function (error, results) {
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
    });
});
  

module.exports = router;