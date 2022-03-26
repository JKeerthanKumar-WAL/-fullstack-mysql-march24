var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/details", function (req, res) {
  res.send(
    `You are at details route and cookie are city = ${req.cookies.city} and name = ${req.cookies.name}`
  );
});
router.get("/info", function (req, res) {
  res.send("You are at info route");
});
router.get("/info/mine", function (req, res) {
  res.send("You are at /info/mine route");
});
module.exports = router;
