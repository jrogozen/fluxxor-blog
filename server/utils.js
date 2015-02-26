var fs = require('fs'),
  marked = require('marked'),
  q = require('q'),
  dir = __dirname + '/../data',
  _ = require('underscore');

var posts = [];

function filenameToDate(filename) {
  var date;
  var time = filename.replace(/[^\d+|_]/g, '');
  time = time.split('_');
  
  if (time.length !== 3) {
    return false;
  }

  return date = {
    year: time[0],
    month: time[1],
    day: time[2]
  }
}

function filenameToSlug(filename) {
  var slug = filename.replace(/_/g, '/');
  slug = slug.replace(/-/, '/');
  slug = slug.replace(/.md/, '');
  return slug;
}

function slugToFilename(slug) {
  var filename = slug;

  for (var i=0; i<2; i++) {
    filename = filename.replace(/\//, '_');
  }

  filename = filename.replace(/\//, '-');
  filename += '.md';
  return filename;
}

function createPost(file, data) {
  var post = {};

  var date = filenameToDate(file);
  date = new Date(date.year, date.month, date.day);

  var post = {
    date: date.getTime(),
    content: marked(data),
    slug: filenameToSlug(file)
  };
  
  return post;
}

function getPost(slug) {
  var deferred = q.defer(),
    filename = slugToFilename(slug);


  fs.readFile(dir + '/' + filename, 'utf-8', function(err, data) {
    if(err) throw err;

    var post = createPost(filename, data);

    deferred.resolve(post);
  })

  return deferred.promise;
}

function getAllPosts() {
  var deferred = q.defer();

  fs.readdir(dir, function(err, files) {
    if(err) throw err;

    var i = 0;
    files.forEach(function(file) {
      i++;

      fs.readFile(dir + '/' + file, 'utf-8', function(err, data) {
        if(err) throw err;

        var post = createPost(file, data);

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