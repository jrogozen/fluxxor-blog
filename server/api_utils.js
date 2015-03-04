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

function fetchPost(params) {
  var slug = paramsToSlug(params.post),
    deferred = q.defer();

  request.get('/api/posts/' + slug, function(err, res) {
    if(err) throw err;
    deferred.resolve(res.body);
  })

  return deferred.promise;
}

module.exports = {
  fetchPosts: fetchPosts,
  fetchPost: fetchPost
}