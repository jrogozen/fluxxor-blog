var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler;

var Header = require('./common/header.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});