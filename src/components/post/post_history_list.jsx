var React = require('react'),
  Router = require('react-router'),
  Fluxxor = require('fluxxor'),
  Link = Router.Link;

var PostHistoryList = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('post'),
    Router.State
  ],

  getStateFromFlux: function() {
    return {
      viewedPosts: this.getFlux().store('post').viewedPosts
    }
  },

  componentDidMount: function() {
    this.getFlux().actions.posts.loadViewedPosts();
  },

  render: function() {
    console.log('rendering', this.state.viewedPosts);

    var viewedPosts = this.state.viewedPosts.map(function(post, i) {
      <li key={i}>{post}</li>
    });

    return (
      <section className="sidebar recently-viewed">
        <h1>Recently Viewed</h1>
        <ul>
          {this.state.viewedPosts.map(this.renderPostLink)}
        </ul>
      </section>
    );
  },

  renderPostLink: function(post, i) {
    return (
      <li key={i}>
        {post.title}
      </li>
    );
  }

});

module.exports = PostHistoryList;