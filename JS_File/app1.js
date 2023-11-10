const express =require('express');
const mysql = require('mysql2');
const app = express();
const dotenv = require('dotenv')
dotenv.config();

const router = express.Router();
app.use(router);

let connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

connection.connect((err) =>{
    if(err) throw err;
    console.log(`Connected DB : ${process.env.MYSQL_DATABASE}`);
})

router.get('/tools', (req, res) => {
    console.log("Requested at: "+req.url);
    let sql = `SELECT * FROM product`;
    connection.query( sql, function (error, results) {
        res.send(results)
    });
})

app.listen(process.env.MYSQL_PORT, ()=>{
    console.log(`Server is listening to Port: ${process.env.MYSQL_PORT}`);
});