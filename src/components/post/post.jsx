var React = require('react'),
  Fluxxor = require('fluxxor'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler;

var PostInfo = require('./post_info.jsx');

var Post = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
  ],

  render: function() {
    return (
      <div>
        <PostInfo/>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = Post;