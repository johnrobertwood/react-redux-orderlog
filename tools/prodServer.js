var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('../webpack.config.dev');
var open = require('open');
var pg = require('pg');
var bodyParser = require('body-parser');

// let port = process.env.PORT || 3000;
var port = 3000;
var compiler = webpack(config);
var pool = new pg.Pool(config);
var app = express();

app.use(express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/orders', function(req, res) {
  pool.query('SELECT * FROM orders', function(err, result) {
    if(err) throw(err);
    res.send(result.rows);
  });
});

app.post('/orders', function(req, res) {
    var text = 'INSERT INTO orders(authorid, partnumber, notes, workorder, complete) VALUES ($1, $2, $3, $4, $5)';
    pool.query(text, [req.body.authorid, req.body.partnumber, req.body.notes, req.body.workorder, req.body.complete], 
      function(err) {
      if(err) throw(err);

      pool.query('SELECT * FROM orders', function(err, result) {
        if(err) throw(err);
        res.send(result.rows[result.rows.length - 1]);
      });
    });
});

app.put('/orders', function(req, res) {
  var text = 'UPDATE orders SET authorid = $1, partnumber = $2, notes = $3, workorder = $4, complete = $5 WHERE id = $6';
  pool.query(text, [req.body.authorid, req.body.partnumber, req.body.notes, req.body.workorder, req.body.complete, req.body.id],
    function(err){if(err) throw(err);

    pool.query('SELECT * FROM orders', function(err, result) {
      if(err) throw(err);
      res.send(result.rows[result.rows.length - 1]);
    });
  });
});

app.delete('/orders', function(req, res) {
  var text = 'DELETE FROM orders WHERE id = $1';
  pool.query(text, [req.body.id], 
    function(err) {
    if(err) throw(err);

    pool.query('SELECT * FROM orders', function(err, result) {
      if(err) throw(err);
      res.send(result.rows);
    });
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

app.listen(port, function(err) {
  if (err) throw(err);
});