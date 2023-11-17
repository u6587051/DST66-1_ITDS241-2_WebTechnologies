const express = require("express");
const app = express();
const port = 8021;
const path = require("path");

const clientServerRouter = require(`${__dirname}/ClientServer`);

app.use("/js",express.static(path.join(__dirname,"CallWs")));
app.use("/css",express.static(path.join(__dirname,"HTML/CSS")));
app.use("/picture",express.static(path.join(__dirname,"picture")));

app.use("/", clientServerRouter);

// Server running on the port: 8021
app.listen(port, function () {
  console.log(`Server listening at Port ${port}`);
});