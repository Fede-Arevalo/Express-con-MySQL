const express = require("express");
const app = express();
const mysql = require("mysql2");
const PORT = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Redbull22*",
  database: "expressSQL",
});

db.connect();

// CREAR BASE DE DATOS
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE expressSQL";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Database created...");
  });
});

// CREAR TABLA PRODUCTS
app.get("/createTableProducts", (req, res) => {
  let sql =
    "CREATE TABLE products(id int AUTO_INCREMENT, name_product VARCHAR(50), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Products table created...");
  });
});

// CREAR TABLA CATEGORIES
app.get("/createTableCategories", (req, res) => {
  let sql =
    "CREATE TABLE categories(id int AUTO_INCREMENT, name_category VARCHAR(150), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Categories table created...");
  });
});

// CREAR TABLA CATEGORIES_PRODUCTS
app.get("/createTableProductsCategories", (req, res) => {
  let sql =
    "CREATE TABLE products_categories(id INT AUTO_INCREMENT, PRIMARY KEY(id), product_id INT, FOREIGN KEY(product_id) REFERENCES products(id), category_id INT, FOREIGN KEY(category_id) REFERENCES categories(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Products_Categories table created...");
  });
});

// CREAR NUEVO PRODUCTO
app.post("/createProduct", (req, res) => {
  let sql = `INSERT INTO products (name_product) values ('${req.body.name_product}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Product created...");
  });
});

// CREAR NUEVA CATEGORÍA
app.post("/createCategory", (req, res) => {
  let sql = `INSERT INTO categories (name_category) values ('${req.body.name_category}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Category created...");
  });
});

// ACTUALIZAR PRODUCTO
app.put("/products/id/:id", (req, res) => {
  let sql = `UPDATE products SET name_product = "${req.body.name_product}" WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Product updated...");
  });
});

// ACTUALIZAR CATEGORIA
app.put("/categories/id/:id", (req, res) => {
  let sql = `UPDATE categories SET name_category = "${req.body.name_category}" WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Category updated...");
  });
});

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));
