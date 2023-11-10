const express =require('express');
const mysql = require('mysql2');
const router = express.Router();
const app = express();
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config();

let connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

app.use(router);

app.listen(PORT, ()=>{
    console.log(`Server is listening to Port: ${PORT}`);
})