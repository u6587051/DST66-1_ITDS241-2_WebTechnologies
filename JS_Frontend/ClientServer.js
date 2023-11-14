var express = require("express"),
  router = express.Router(),
  path = require("path");

router.use(
  express.urlencoded({
    extended: true,
  })
);


// Add js to Node.js Server ไว้ Call Service
// router.get("/js/callStudentService.js", function (req, res) {
//   res.sendFile(path.join(__dirname + "/js/callStudentService.js"));
// });

// router.get("/js/callStudentServicewithjwt.js", function (req, res) {
//   res.sendFile(path.join(__dirname + "/js/callStudentServicewithjwt.js"));
// });

// Route ไปยังหน้า About us
router.get('/aboutus', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/About_us.html`));
})

// router.get('/CSS/him-styles.css', (req,res) =>{
//     res.sendFile(path.join(`${__dirname}/HTML/CSS/him-styles.css`));
// })

// Route ไปยังหน้า Admin-product
router.get('/admin-product', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/admin-product.html`));
})

// Route ไปยังหน้า Admin(edit)
router.get('/admin-edit', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/User(edit).html`));
})

// Route ไปยังหน้า Delete-page
router.get('/delete-page', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/delete-page.html`));
})

// Route ไปยังหน้า Delete(Admin)
router.get('/delete-admin', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Delete(Admid).html`));
})

// Route ไปยังหน้า edit-page
router.get('/edit-page', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/edit-page.html`));
})

// Route ไปยังหน้า edit-product
router.get('/edit-product', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/edit-product.html`));
})

// Route ไปยังหน้า Home
router.get('/home', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Home.html`));
})

// Route ไปยังหน้า index
router.get('/index', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Index.html`));
})

// Route ไปยังหน้า Login
router.get('/login', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Login.html`));
})

// Route ไปยังหน้า Product1
router.get('/Product1', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Product1.html`));
})

// Route ไปยังหน้า Product2
router.get('/Product2', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Product2.html`));
})

// Route ไปยังหน้า Product3
router.get('/Product3', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Product3.html`));
})

// Route ไปยังหน้า Product4
router.get('/Product4', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Product4.html`));
})

// Route ไปยังหน้า Product5
router.get('/Product5', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Product5.html`));
})

// Route ไปยังหน้า Product6
router.get('/Product6', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Product6.html`));
})

// Route ไปยังหน้า Search page
router.get('/Searchpage', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Search_page.html`));
})

module.exports = router;