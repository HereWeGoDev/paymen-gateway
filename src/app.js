const fileUpload = require("express-fileupload");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("passport");
const cookieParser = require("cookie-parser");
import config from "./config";
const connectDB = require("./config/db");
// const routes = require("./routes");

const app = express();

const whitelist = config.whitelistedDomains
  ? config.whitelistedDomains.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

connectDB();

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, "files/home.html"));
  } catch (error) {
    console.error("errrrrr", error);
    return error;
  }
});

app.get("/contact/index.css", (req, res) => {
  res.sendFile(path.join(__dirname, "files/index.css"));
});

app.post("/upload", fileUpload({ createParentPath: true }), (req, res) => {
  const files = req.files;
  console.log(files);

  Object.keys(files).forEach((key) => {
    const filepath = path.join(__dirname, "document_upload", files[key].name);
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
      console.log(err);
    });
  });

  app.post("/register", (req, res) => {
    const name = req.body.name;
    const emailId = req.body.emailId;
    const phoneNo = req.body.phoneNo;
    const nameOfCollege = req.body.nameOfCollege;
    const deliveryAddress = req.body.deliveryAddress;

    const data = {
      name: name,
      emailId: emailId,
      phoneNo: phoneNo,
      nameOfCollege: nameOfCollege,
      deliveryAddress: deliveryAddress,
    };

    db.collection("users").insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log("Record Inserted Successfully");
    });
  });

  return res.json({
    status: "success",
    message: Object.keys(files).toString(),
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
