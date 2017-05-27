var express = require('express');
var app = express();
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var open = require('open');
var pg = require('pg');
var bodyParser = require('body-parser');

var port = 3000;
var compiler = webpack(config);
var pool = new pg.Pool(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/orders', function(req, res) {
  pool.query('SELECT * FROM orders', function(err, result) {
    if(err) return console.log(err);
    res.send(result.rows);
  });
});

app.post('/orders', function(req, res) {

    let text = 'INSERT INTO orders(authorid, partnumber, notes, workorder, complete) VALUES ($1, $2, $3, $4, $5)'

    pool.query(text, [req.body.authorid, req.body.partnumber, req.body.notes, req.body.workorder, req.body.complete], 
      function(err) {
      if(err) return console.log(err);
        res.send(result.rows);

      pool.query('SELECT * FROM orders', function(err, result) {
        if(err) return console.log(err);
        console.log(result.rows)
      });
    });
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, './src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
