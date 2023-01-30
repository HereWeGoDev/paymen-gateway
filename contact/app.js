require('dotenv').config();
const { constants } = require('buffer');
const exp = require('constants')
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require('morgan');
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req,res) => {
    res.sendFile(path.json(__dirname,'home.html'));
}); 

app.post('/upload', fileUpload({createParentPath: true}),
(req,res) => {
    const files = req.files
    console.log(files)

    Object.keys(files).forEach(key => {
        const filepath = path.join(__dirname, 'files', files[key].name)
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
                console.log(err) 
        })
    })

    return res.json({ status: 'success', message: Object.keys(files).toString() })

});


app.listen(port, () => console.log(`Server running on port ${port}`));