const express =require('express');
const mysql = require('mysql2');
const router = express.Router();
const app = express();
const dotenv = require('dotenv')
const PORT = 3030;
dotenv.config();

// let connection = mysql.createConnection({
//     host : process.env.MYSQL_HOST,
//     user : process.env.MYSQL_USERNAME,
//     password : process.env.MYSQL_PASSWORD,
//     database : process.env.MYSQL_DATABASE
// });

app.use(router);

// connection.connect((err){
//     if(err) throw err;
//     console.log(`Connected DB : ${process.env.MYSQL_DATABASE}`);
// })

app.listen(PORT, ()=>{
    console.log(`Server is listening to Port: ${PORT}`);
});