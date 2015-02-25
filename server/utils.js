var fs = require('fs'),
  marked = require('marked'),
  q = require('q'),
  dir = __dirname + '/../data',
  _ = require('underscore');

function filenameToDate(filename) {
  var date;
  var time = filename.replace(/[^\d+|_]/g, '');
  var time = time.split('_');
  
  if (time.length !== 3) {
    return false;
  }

  return date = {
    year: time[0],
    month: time[1],
    day: time[2]
  }
}

function getPost(slug) {

}

function getAllPosts() {
  var posts = [],
    deferred = q.defer();

  fs.readdir(dir, function(err, files) {
    if(err) throw err;

    var i = 0;
    files.forEach(function(file) {
      i++;

      fs.readFile(dir + '/' + file, 'utf-8', function(err, data) {
        if(err) throw err;

        var date = filenameToDate(file);
        date = new Date(date.year, date.month, date.day);

        var post = {
          _id: posts.length,
          date: date.getTime()
        };

        posts.push(post);

        if (0 === --i) {
          var sortedPosts = _.sortBy(posts, function(post) { return -post.date });
          deferred.resolve(sortedPosts);
        }
      });
    });
  });

  return deferred.promise;
}

module.exports = {
  getPost: getPost,
  getAllPosts: getAllPosts
}