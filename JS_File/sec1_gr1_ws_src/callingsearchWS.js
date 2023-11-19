// import libary เพื่อใช้งาน HTTP METHOD
const axios = require("axios").default;
const express = require("express");
const router = express.Router();

// กำหนด URL สำหรับ searchWS
let searchURL = "http://localhost:8022/searchWS/search";

// ฟังก์ชันในการเรียกรับ search results แบบ asynchronous
let getResults = async () => {
  try {
    let response = await axios.get(searchURL, { responseType: "json" });
    console.log(`Use Async/Await`);
    console.log(`The number of results: ${response.data.data.length}`);
    console.log(response.data);
    return response.data; // Return the retrieved data
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

// กำหนด route สำหรับ handling GET requests
router.get("/", async (req, res) => {
  res.json(await getResults());
});

// Export router
module.exports = router;