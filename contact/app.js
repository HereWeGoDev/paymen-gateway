require('dotenv').config();
const { constants } = require('buffer');
const exp = require('constants')
const express = require("express");
const fileUpload = require("express-fileupload");
const { request } = require('http');
const morgan = require('morgan');
const path = require("path");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json)
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://paymentUserId:newElement@initial.8c9l44z.mongodb.net/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'home.html'));
}); 

app.get('/contact/index.css',(req,res)  => {
    res.sendFile(path.join(__dirname,'index.css'));
});

app.post('/upload', fileUpload({createParentPath: true}),
(req,res) => {
    const files = req.files
    console.log(files)

    Object.keys(files).forEach(key => {
        const filepath = path.join(__dirname, 'document_upload', files[key].name)
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
                console.log(err) 
        })
    })

app.post("/register",(req,res) => {
    const name = req.body.name;
    const emailId = req.body.emailId;
    const phoneNo = req.body.phoneNo;
    const nameOfCollege = req.body.nameOfCollege;
    const deliveryAddress = req.body.deliveryAddress;

    const data = {
        "name": name,
        "emailId": emailId,
        "phoneNo": phoneNo,
        "nameOfCollege": nameOfCollege,
        "deliveryAddress": deliveryAddress
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

})  

    return res.json({ status: 'success', message: Object.keys(files).toString() })

});


app.listen(port, () => console.log(`Server running on port ${port}`));