const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/estoque_simples.db");

function fetchProducts(callback) {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
}

module.exports = fetchProducts;
