var c = {
  POST: {
    ADD_TO_HISTORY: "POST:ADD_TO_HISTORY"
  }
};

var methods = {
  posts: {
    addToHistory: function() {
      this.dispatch(c.POST.ADD_TO_HISTORY, {

      });
    }
  }
};

module.exports = {
  methods: methods,
  constants: c
}