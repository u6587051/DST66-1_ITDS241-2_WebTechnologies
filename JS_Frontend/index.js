const express = require("express");
const app = express();
const port = 8021;

const clientServerRouter = require(`${__dirname}/ClientServer`);

app.use("/", clientServerRouter);

// Server running on the port: 8021
app.listen(port, function () {
  console.log(`Server listening at Port ${port}`);
});
