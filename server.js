var express = require('express'),
  app = express(),
  path = require('path'),
  utils = require('./server/utils'),
  _ = require('underscore');

app.use(express.static('./dist'));

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
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
