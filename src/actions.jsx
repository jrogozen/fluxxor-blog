var c = {
  POST: {
    ADD_TO_HISTORY: "POST:ADD_TO_HISTORY",
    LOAD_POSTS: "POST:LOAD_POSTS",
    LOAD_POST: "POST:LOAD_POST"
  }
};

var methods = {
  posts: {
    addToHistory: function(post) {
      this.dispatch(c.POST.ADD_TO_HISTORY, {

      });
    },
    loadPosts: function() {
      this.dispatch(c.POST.LOAD_POSTS, {

      });
    },
    loadPost: function(post) {
      this.dispatch(c.POST.LOAD_POST, {
        post: post
      });
    }
  }
};

module.exports = {
  methods: methods,
  constants: c
}