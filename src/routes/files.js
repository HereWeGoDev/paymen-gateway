const router = require("express").Router();
const path = require("path");

router.get("/index.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../files/index.css"));
});

module.exports = router;
