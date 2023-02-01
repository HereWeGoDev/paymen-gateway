const router = require("express").Router();
const path = require("path");

router.post("/files", (req, res) => {
  const files = req.files;
  console.log(files);

  Object.keys(files).forEach((key) => {
    const filepath = path.join(__dirname, `../uploads/${files[key].name}`);
    files[key].mv(filepath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "error", message: err });
      }
      return res.json({
        status: "success",
        message: `File ${files[key].name} uploaded successfully`,
      });
    });
  });
});

module.exports = router;
