var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Link = Router.Link,
  Fluxxor = require('fluxxor');

var Post = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('post'),
    Router.State
  ],

  getStateFromFlux: function() {
    return {
      post: this.getFlux().store('post').post
    }
  },

  componentDidMount: function() {
    var params = this.getParams();
    console.log('params', params);
    this.getFlux().actions.posts.loadPost(params);
  },

  render: function() {
    return (
      <div/>
    );
  }
});

module.exports = Post;