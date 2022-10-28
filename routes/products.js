const express = require("express");
const router = express.Router();
const db = require("../config/database");

// CREAR NUEVO PRODUCTO
router.post("/createProduct", (req, res) => {
  let sql = `INSERT INTO products (name_product, category_id) values ('${req.body.name_product}', ${req.body.category_id});`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Product created...");
  });
});

module.exports = router;
