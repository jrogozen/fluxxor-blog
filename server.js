var express = require('express'),
  app = express(),
  path = require('path'),
  utils = require('./server/utils'),
  _ = require('underscore');

// app.use(express.static('./dist'));

app.use(function(req, res, next) {
  if (path.extname(req.path).length > 0) {
    next();
  }
  else {
    req.url = '/index.html';
    next();
  }
});

app.use(express.static('./dist'));

var port = process.env.PORT || 8080;

app.get('/api/posts/:year/:month/:day/:title', function(req, res) {
  var slug = req.originalUrl.replace('/api/posts/', '');
  
  utils.getPost(slug)
    .then(function(data) {
      if(!data) throw {error: 'no post found'}
      res.json(data);
    })
    .fail(function(error) {
      res.json(error)
    })
    .done();
});

app.get('/api/posts', function(req, res) {
  utils.getAllPosts()
    .then(function(data) {
      if(!data) throw {error: 'no posts found'}
      res.json(data);
    })
    .fail(function(error) {
      res.json(error)
    })
    .done();
});

app.listen(port);

console.log('Running on port ' + port);