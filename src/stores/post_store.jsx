var Fluxxor = require('fluxxor'),
  request = require('superagent'),
  q = require('q');

var actions = require('../actions.jsx');

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
      actions.constants.POST.LOAD_POST_SUCCESS, this.handleLoadPostSuccess
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
  }
});

module.exports = PostStore;