var React = require('react'),
  Fluxxor = require('fluxxor'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler;

var Sidebar = require('../common/sidebar.jsx');

var Post = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
  ],

  render: function() {
    return (
      <div>
        <Sidebar/>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = Post;