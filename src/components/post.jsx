var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Link = Router.Link,
  Fluxxor = require('fluxxor');

var Post = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('post')
  ],

  getStateFromFlux: function() {
    return {
      post: this.getFlux().store('post').post
    }
  },

  componentDidMount: function() {
    /* how to get params? */
    this.getFlux().actions.posts.loadPost();
  },

  render: function() {
    return (
      <div/>
    );
  }
});

module.exports = Post;