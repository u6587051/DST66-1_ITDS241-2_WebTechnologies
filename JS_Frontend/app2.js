const express=require('express');
const path=require('path');
const port=8021 ;  
const app = express();
const router = express.Router();
app.use(router);

router.get('/home', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/HTML/Home.html`));
})

app.listen(port, ()=>{
    console.log(`Server is listening to Port: ${port}`);
})