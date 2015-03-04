var Fluxxor = require('fluxxor'),
  request = require('superagent'),
  q = require('q');

var actions = require('../actions.jsx');

var cookies = require('../common/cookies.js');

var NOT_FOUND_TOKEN = {};

var LOADING_TOKEN = "loading";

var PostStore = Fluxxor.createStore({
  initialize: function() {
    this.posts = [];
    this.post = {};
    this.viewedPosts = [];

    this.bindActions(
      actions.constants.POST.LOAD_POSTS_START, this.handleLoadPostsStart,
      actions.constants.POST.LOAD_POSTS_SUCCESS, this.handleLoadPostsSuccess,

      actions.constants.POST.LOAD_POST_START, this.handleLoadPostStart,
      actions.constants.POST.LOAD_POST_SUCCESS, this.handleLoadPostSuccess,

      actions.constants.POST.LOAD_POSTS, this.getPosts,
      actions.constants.POST.LOAD_POST, this.getPost,
      actions.constants.POST.LOAD_VIEWED_POSTS, this.getViewedPosts
    );
  },

  handleLoadPostsStart: function() {
    this.posts = LOADING_TOKEN;
    this.emit('change');
  },

  handleLoadPostsSuccess: function(data) {
    console.log('success triggered', data);
    this.posts = data.posts;
    this.emit('change')
  },

  handleLoadPostStart: function() {
    console.log('loading!!');
    this.post = LOADING_TOKEN;
    this.emit('change');
  },

  handleLoadPostSuccess: function(data) {
    console.log('success triggered', data);
    this.post = data.post;
    this.emit('change');
  },

  getPosts: function() {
    this.posts = [];

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

PostStore.NOT_FOUND_TOKEN = NOT_FOUND_TOKEN;

module.exports = PostStore;