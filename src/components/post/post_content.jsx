var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Link = Router.Link,
  Fluxxor = require('fluxxor');

var Comment = require('../comment/comment.jsx');

var PostContent = React.createClass({
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

  componentWillReceiveProps: function() {
    var params = this.getParams();
    this.getFlux().actions.posts.loadPost(params);
  },

  render: function() {
    var post = this.state.post;
    if(this.state.post._id) {
      return (
        <div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: post.content}}></div>
          <Comment post={post} id={post._id} title={post.title} shortname="fluxxorblog" url={post.slug}/>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: post.content}}></div>
        </div>
      )
    }
  }
});

module.exports = PostContent;