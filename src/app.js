const fileUpload = require("express-fileupload");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("./config");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();
const server = require("http").Server(app);

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
    return res.json({ message: "Hello World" });
    // return res.sendFile(path.join(__dirname, "files/home.html"));
  } catch (error) {
    console.error("errrrrr", error);
    return error;
  }
});

app.use("/files", routes.files);
app.use("/api", routes.api);
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use("/upload", routes.upload);

server.listen(config.port, () =>
  console.log(`Server Running, URL: http://localhost:${config.port}/`)
);
