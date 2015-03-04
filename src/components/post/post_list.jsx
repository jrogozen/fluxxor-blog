var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Link = Router.Link,
  Fluxxor = require('fluxxor');

var LOADING_TOKEN = "loading";

var PostList = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('post')
  ],

  getStateFromFlux: function() {
    var postStore = this.getFlux().store('post');

    return {
      posts: postStore.posts
    }
  },

  componentDidMount: function() {
    this.getFlux().actions.posts.loadPosts();
  },

  render: function() {
    if(this.state.posts === LOADING_TOKEN) {
      return (
        <div>
          <h1>Post List</h1>
          Loading...
        </div>
      )
    } else {
      return (
        <div>
          <h1>Post List</h1>
          <ul>
            {this.state.posts.map(this.renderPosts)}
          </ul>
        </div>
      )
    }
  },

  renderPosts: function(post, i) {
    return (
      <li key={i}>
        <Link to="post" params={{year: post.date.year, month: post.date.month, day: post.date.day, title: post.title}}>{post.title}</Link>
      </li>
    )
  }
});

module.exports = PostList;