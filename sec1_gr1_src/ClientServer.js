var express = require("express"),
  router = express.Router(),
  path = require("path"),
  app = express();

router.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'HTML')));

// Route ไปยังหน้า Home
router.get('/', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Home.html`));
})

// Route ไปยังหน้า About us
router.get('/aboutus', (req,res) =>{
    res.sendFile(path.join(__dirname + "/HTML/About_us.html"));
})

// Route ไปยังหน้า Admin-product
router.get('/admin-product', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/admin-product.html`));
})

// Route ไปยังหน้า Admin(edit)
router.get('/admin-edit', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/User(edit).html`));
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

// Route ไปยังหน้า Search page
router.get('/Searchpage', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Search_page.html`));
})

module.exports = router;