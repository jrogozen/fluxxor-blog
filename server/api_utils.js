var q = require('q'),
  request = require('superagent');

function fetchPosts() {
  var deferred = q.defer();

  request.get('/api/posts', function(err, res) {
    if(err) throw err;
    deferred.resolve(res.body);
  });

  return deferred.promise;
}

function fetchPost(slug) {
  deferred = q.defer();

  request.get('/api/posts/' + slug, function(err, res) {
    if(err) throw err;
    setTimeout(function(){
deferred.resolve(res.body);
    },3000);
  })

  return deferred.promise;
}

module.exports = {
  fetchPosts: fetchPosts,
  fetchPost: fetchPost
}