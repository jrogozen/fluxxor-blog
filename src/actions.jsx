var API = require('../server/api_utils.js');

var c = {
  POST: {
    LOAD_POST_START: "POST:LOAD_POST_START",
    LOAD_POST_SUCCESS: "POST:LOAD_POST_SUCCESS",

    LOAD_POSTS_START: "POST:LOAD_POSTS_START",
    LOAD_POSTS_SUCCESS: "POST:LOAD_POSTS_SUCCESS",

    LOAD_POSTS: "POST:LOAD_POSTS",
    LOAD_POST: "POST:LOAD_POST",
    LOAD_VIEWED_POSTS: "POST:LOAD_VIEWED_POSTS"
  }
};

var methods = {
  posts: {
    loadPosts: function() {
      this.dispatch(c.POST.LOAD_POSTS_START, {});

      API.fetchPosts()
        .then(function(data) {
          this.dispatch(c.POST.LOAD_POSTS_SUCCESS, {posts: data});
        }.bind(this))
        .done();
    },
    loadPost: function(slug) {
      this.dispatch(c.POST.LOAD_POST_START, {});

      API.fetchPost(slug)
        .then(function(data) {
          this.dispatch(c.POST.LOAD_POST_SUCCESS, {post: data});
        }.bind(this))
        .done();
    },
    loadViewedPosts: function(post) {
      this.dispatch(c.POST.LOAD_VIEWED_POSTS, {
        post: post
      });
    }
  }
};

module.exports = {
  methods: methods,
  constants: c
}