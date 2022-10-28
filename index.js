const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./config/database");

app.use(express.json());

// RUTAS

app.use("/products", require("./routes/products"));

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
    "CREATE TABLE products(id int AUTO_INCREMENT, name_product VARCHAR(50), PRIMARY KEY(id),category_id INT, FOREIGN KEY(category_id) REFERENCES products(id))";
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

// CREAR NUEVA CATEGORIA
app.post("/createCategory", (req, res) => {
  let sql = `INSERT INTO categories (name_category) values ('${req.body.name_category}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Category created...");
  });
});

// RELACIONAR CATEGORIA CON PRODUCTO
app.post("/relateCategory", (req, res) => {
  let sql = `INSERT INTO expresssql.products_categories (product_id, category_id) values (${req.body.product_id}, ${req.body.category_id});`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Category related...");
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

// SELECCIONAR TODOS LOS PRODUCTOS
app.get("/products", (req, res) => {
  let sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// SELECCIONAR TODAS LAS CATEGORIAS
app.get("/categories", (req, res) => {
  let sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// SELECCIONAR PRODUCTOS CON CATEGORIAS
app.get("/productsWithCategories", (req, res) => {
  let sql = `SELECT products.name_product AS "product", categories.name_category AS "category" FROM products LEFT JOIN categories ON category_id = categories.id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// SELECCIONAR PRODUCTOS POR ID
app.get("/productsById/id/:id", (req, res) => {
  let sql = `SELECT products.name_product AS "product" FROM products WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// SELECCIONAR PRODUCTOS DESCENDIENTES POR ID (La idea sería que muestre los "más recientes")
app.get("/productsIdDesc", (req, res) => {
  let sql = `SELECT * FROM products ORDER BY id DESC;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// SELECCIONAR CATEGORIA POR ID
app.get("/categoryById/id/:id", (req, res) => {
  let sql = `SELECT * FROM categories WHERE id = ${req.params.id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// BUSCAR PRODUCTO POR NOMBRE
app.get("/productByName/name/:name", (req, res) => {
  let sql = `SELECT * FROM products WHERE name_product LIKE "%${req.params.name}%";`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// BORRAR PRODUCTO POR ID
app.delete("/deleteProduct/id/:id", (req, res) => {
  let sql = `DELETE FROM products WHERE id = ${req.params.id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));
