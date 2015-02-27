var React = require('react'),
  Router = require('react-router'),
  Link = Router.Link;

var Header = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="app">Archive</Link>
      </div>
    );
  }
});

module.exports = Header;