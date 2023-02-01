const router = require("express").Router();

router.get("/index.css", (req, res) => {
  res.sendFile(".src/files/index.css");
});

module.exports = router;
