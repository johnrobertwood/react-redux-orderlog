import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import pg from 'pg';
import bodyParser from 'body-parser';

// let port = process.env.PORT || 3000;
let port = 3000;
let compiler = webpack(config);
let pool = new pg.Pool(config);
let app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/orders', function(req, res) {
  pool.query('SELECT * FROM orders', function(err, result) {
    if(err) throw(err);
    res.send(result.rows);
  });
});

app.post('/orders', function(req, res) {
    let text = 'INSERT INTO orders(authorid, partnumber, notes, workorder, complete) VALUES ($1, $2, $3, $4, $5)';
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
  let text = 'UPDATE orders SET authorid = $1, partnumber = $2, notes = $3, workorder = $4, complete = $5 WHERE id = $6';
  pool.query(text, [req.body.authorid, req.body.partnumber, req.body.notes, req.body.workorder, req.body.complete, req.body.id],
    function(err){if(err) throw(err);

    pool.query('SELECT * FROM orders', function(err, result) {
      if(err) throw(err);
      res.send(result.rows[result.rows.length - 1]);
    });
  });
});

app.delete('/orders', function(req, res) {
  let text = 'DELETE FROM orders WHERE id = $1';
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
  // res.sendFile(path.join( __dirname, '../src/index.html'));
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

app.listen(port, function(err) {
  if (err) throw(err);
});