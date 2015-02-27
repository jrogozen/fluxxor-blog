var Fluxxor = require('fluxxor'),
  request = require('superagent'),
  q = require('q');

var actions = require('../actions.jsx');

var NOT_FOUND_TOKEN = {};

var PostStore = Fluxxor.createStore({
  initialize: function() {
    this.posts = [];
    this.post = {};
    this.viewedPosts = [];

    this.bindActions(
      actions.constants.POST.LOAD_POSTS, this.getPosts,
      actions.constants.POST.LOAD_POST, this.getPost,
      actions.constants.POST.LOAD_VIEWED_POSTS, this.getViewedPosts
    );
  },

  getPosts: function() {
    findAllPosts()
      .then(function(data) {
        this.posts = data;
        this.emit('change');
      }.bind(this))
      .done();
  },

  getPost: function(params) {
    var slug = paramsToSlug(params.post);
    findOnePost(slug)
      .then(function(data) {
        this.post = data;

        /* add post to history */
        this.handleAddPostToHistory(this.post);

        this.emit('change');
      }.bind(this))
      .done();
  },

  getViewedPosts: function() {
    this.emit('change');
    return this.viewedPosts;
  },

  handleAddPostToHistory: function(post) {
    /* make sure posts are truncated to 5
    check to make sure that this post isn't in the current list
    append this post to the end */
    
    var unique = true;

    while (this.viewedPosts.length > 5) {
      this.viewedPosts.pop();
    }

    this.viewedPosts.forEach(function(p) {
      if(p._id === post._id) {
        unique = false;
      }
    });

    if(unique) {
      this.viewedPosts.push(post);
    }
  }

});

function findAllPosts() {
  var deferred = q.defer();

  request.get('/api/posts', function(err, res) {
    if(err) throw err;
    deferred.resolve(res.body);
  });

  return deferred.promise;
}

function findOnePost(slug) {
  var deferred = q.defer();

  request.get('/api/posts/' + slug, function(err, res) {
    if(err) throw err;
    deferred.resolve(res.body);
  })

  return deferred.promise;
}

function paramsToSlug(params) {
  return params.year + '/' + params.month + '/' + params.day + '/' + params.title;
}

PostStore.NOT_FOUND_TOKEN = NOT_FOUND_TOKEN;

module.exports = PostStore;