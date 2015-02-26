var Fluxxor = require('fluxxor');

var actions = require('../actions.jsx');

var PostStore = Fluxxor.createStore({
  initialize: function() {
    this.posts = [];

    this.bindActions(
      actions.constants.POST.ADD_TO_HISTORY, this.handleAddPostToHistory
    );
  },

  getPosts: function() {

  },

  getPost: function(slug) {

  },

  handleAddPostToHistory: function(payload) {

  }
});

module.exports = PostStore;