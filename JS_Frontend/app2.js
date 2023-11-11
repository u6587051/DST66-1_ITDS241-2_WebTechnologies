const express=require('express');
const path=require('path');
const port=8021 ;  
const app = express();
const router = express.Router();
app.use(router);

// Route ไปยังหน้า Home
router.get('/home', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Home.html`));
})

// Route ไปยังหน้า About us
router.get('/aboutus', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/About_us.html`));
})

// Route ไปยังหน้า Add-product
router.get('/add-product', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Add-Product.html`));
})

// Route ไปยังหน้า Admin-product
router.get('/admin-product', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/admin-product.html`));
})

// Route ไปยังหน้า Admin(edit)
router.get('/admin-edit', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Admin(edit).html`));
})

// Route ไปยังหน้า Admin(information)
router.get('/admin-info', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Admin(information).html`));
})

// Route ไปยังหน้า Delete(Admin)
router.get('/delete-admin', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Delete(Admid).html`));
})

// Route ไปยังหน้า Delete-page
router.get('/delete-page', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/delete-page.html`));
})

app.listen(port, ()=>{
    console.log(`Server is listening to Port: ${port}`);
})