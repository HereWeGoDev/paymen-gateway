const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", (req, res) => {
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

  return res.json({
    status: "success",
    message: Object.keys(files).toString(),
  });
});

module.exports = router;
