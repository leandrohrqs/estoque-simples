const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const db = new sqlite3.Database("./db/estoque_simples.db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.get("/api/products", (req, res) => {
  const query = `
    SELECT products.*, categories.name as category_name
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    ORDER BY products.id DESC
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT products.*, categories.name as category_name
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    WHERE products.id = ?
  `;
  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, description, category_id, quantity, price } = req.body;
  const image = req.file
    ? `/assets/images/${req.file.filename}`
    : "/assets/default.jpg";
  const query = `
    INSERT INTO products (name, description, category_id, quantity, price, image, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    name,
    description,
    category_id,
    quantity,
    price,
    image,
    Date.now(),
    Date.now(),
  ];
  db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.put("/api/products/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, quantity, price } = req.body;

  const query = `SELECT image FROM products WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const existingImage = row.image;
    const image = req.file
      ? `/assets/images/${req.file.filename}`
      : existingImage;

    const updateQuery = `
      UPDATE products
      SET name = ?, description = ?, category_id = ?, quantity = ?, price = ?, image = ?, updated_at = ?
      WHERE id = ?
    `;
    const params = [
      name,
      description,
      category_id,
      quantity,
      price,
      image,
      Date.now(),
      id,
    ];
    db.run(updateQuery, params, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    });
  });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM products WHERE id = ?`;
  db.run(query, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

app.get("/api/categories", (req, res) => {
  const query = `SELECT * FROM categories`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/categories", (req, res) => {
  const { name } = req.body;
  const query = `
    INSERT INTO categories (name, created_at, updated_at)
    VALUES (?, ?, ?)
  `;
  const params = [name, Date.now(), Date.now()];
  db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.put("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = `
    UPDATE categories
    SET name = ?, updated_at = ?
    WHERE id = ?
  `;
  const params = [name, Date.now(), id];
  db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updated: this.changes });
  });
});

app.delete("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM categories WHERE id = ?`;
  db.run(query, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
