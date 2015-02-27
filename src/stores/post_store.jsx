var Fluxxor = require('fluxxor'),
  request = require('superagent'),
  q = require('q');

var actions = require('../actions.jsx');

var NOT_FOUND_TOKEN = {};

var PostStore = Fluxxor.createStore({
  initialize: function() {
    this.posts = [];
    this.post = {};

    this.bindActions(
      actions.constants.POST.ADD_TO_HISTORY, this.handleAddPostToHistory,
      actions.constants.POST.LOAD_POSTS, this.getPosts,
      actions.constants.POST.LOAD_POST, this.getPost
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
        this.emit('change');
      }.bind(this))
      .done();
  },

  handleAddPostToHistory: function(payload) {

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
    console.log(res.body);
    deferred.resolve(res.body);
  })

  return deferred.promise;
}

function paramsToSlug(params) {
  return params.year + '/' + params.month + '/' + params.day + '/' + params.title;
}

PostStore.NOT_FOUND_TOKEN = NOT_FOUND_TOKEN;

module.exports = PostStore;