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
    this.getFlux().actions.posts.loadPost(params);
  },

  render: function() {
    var post = this.state.post;
    return (
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html: post.content}}>
        </div>
      </div>
    );
  }
});

module.exports = Post;