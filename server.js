var express = require('express'),
  app = express();
  _ = require('underscore');

app.use(express.static('./dist'));

var port = process.env.PORT || 8080;

app.listen(port);

console.log('Running on port ' + port);
