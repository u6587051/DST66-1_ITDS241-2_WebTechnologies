// import libary เพื่อใช้งาน HTTP METHOD
const axios = require("axios").default;
const express = require("express");
const router = express.Router();

let searchURL = "http://localhost:8022/adminWS/admins"; //กำหนด URL ที่ใช้ adminWS

let getAdmins = async () => {
  try {
    let response = await axios.get(searchURL, { responseType: "json" });
    console.log(`Use Async/Await`);
    console.log(`The number of results: ${response.data.data.length}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

router.get("/", async (req, res) => {
  res.json(await getAdmins());
});

module.exports = router;