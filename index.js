const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// setup body parser
app.use(bodyParser.json());

// create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restnode_db'
});

// connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...')
});

// menampilkan semua data product
app.get('/api/products', (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  }));
});

// menampilkan data product berdasarkan id
app.get('/api/products/:id', (req, res) => {
  let sql = "SELECT * FROM product WHERE product_id = " + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});

// menambah data product baru
app.post('/api/products', (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price
  };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }))
  });
});

// Edit data product berdasar id
app.put('/api/products/:id', (req, res) => {
  let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "' WHERE product_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});

// Delete data product berdasarkan id
app.delete('/api/products/:id', (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }))
  });
});

// server listening
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server run on port ' + port);
});