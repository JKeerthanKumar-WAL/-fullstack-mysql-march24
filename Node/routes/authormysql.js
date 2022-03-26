var express = require("express");
var router = express.Router();
var connector = require("../connect");
router.get("/createtable", (req, res) => {
  connector.query(
    "CREATE TABLE authors (first_name varchar(50), last_name varchar(50), dob date, dod date)",
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.get("/", function (req, res) {
  const sql = `SELECT * FROM authors`;
  connector.query(sql, function (err, results, fields) {
    res.json({ results });
  });
});
router.post("/", function (req, res) {
  const { first_name, last_name, dob, dod } = req.body;
  const sql = `INSERT INTO authors VALUES ("${first_name}","${last_name}", "${dob}", "${dod}")`;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.delete("/:first_name", function (req, res) {
  let first_name = req.params.first_name;
  const sql = `DELETE FROM authors WHERE first_name = "${first_name}" `;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.put("/:first_name", function (req, res) {
  const { first_name, last_name, dob, dod } = req.body;
  const sql = `UPDATE authors SET first_name = "${first_name}",last_name = "${last_name}",dob="${dob}" ,dod="${dod}" WHERE first_name = "${req.params.first_name}" `;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get("/deleteall", function (req, res) {
  const sql = `DELETE FROM authors`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
