var c = {
  POST: {
    LOAD_POSTS: "POST:LOAD_POSTS",
    LOAD_POST: "POST:LOAD_POST",
    LOAD_VIEWED_POSTS: "POST:LOAD_VIEWED_POSTS"
  }
};

var methods = {
  posts: {
    loadPosts: function() {
      this.dispatch(c.POST.LOAD_POSTS, {

      });
    },
    loadPost: function(post) {
      this.dispatch(c.POST.LOAD_POST, {
        post: post
      });
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