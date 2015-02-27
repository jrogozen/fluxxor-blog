var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Link = Router.Link,
  Fluxxor = require('fluxxor');

var ArchiveList = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('post')
  ],

  getStateFromFlux: function() {
    return {
      posts: this.getFlux().store('post').posts
    }
  },

  componentDidMount: function() {
    this.getFlux().actions.posts.loadPosts();
  },

  render: function() {
    return (
      <div>
        <h1>Hey</h1>
        <ul>
          {this.state.posts.map(this.renderPostLink)}
        </ul>
      </div>
    )
  },

  renderPostLink: function(post, i) {
    return (
      <li key={i}>
        <Link to="post" params={{year: post.date.year, month: post.date.month, day: post.date.day, title: post.title}}>{post.title}</Link>
      </li>
    );
  }
});

module.exports = ArchiveList;