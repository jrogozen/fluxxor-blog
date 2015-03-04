var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Link = Router.Link,
  Fluxxor = require('fluxxor'),
  Utils = require('../../../server/utils.js');

var LOADING_TOKEN = "loading";

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
    var slug = Utils.paramsToSlug(params);
    this.getFlux().actions.posts.loadPost(slug);
  },

  componentWillReceiveProps: function() {
    var params = this.getParams();
    var slug = Utils.paramsToSlug(params);
    this.getFlux().actions.posts.loadPost(slug);
  },

  render: function() {
    var post = this.state.post;

    if(this.state.post === LOADING_TOKEN) {
      return (
        <h1>Loading...</h1>
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