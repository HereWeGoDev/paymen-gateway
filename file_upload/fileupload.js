require('dotenv').config()
const exp = require('constants');
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require('morgan');
const path = require("path");

//const filesPayloadExist = require('./middleware/filesPayloadExist');
//const fileExtLimiter = require('./middleware/fileExtLimiter');
//const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "file.html"));
});

app.post('/upload',
    fileUpload({ createParentPath: true }),
    //filesPayloadExist,
    //fileExtLimiter(['.png', '.jpg', '.jpeg']),
    //fileSizeLimiter,
    (req, res) => {
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
    }
);




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));