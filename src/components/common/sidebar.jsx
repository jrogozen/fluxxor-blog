var React = require('react'),
  Fluxxor = require('fluxxor'),
  Router = require('react-router'),
  Link = Router.Link;

var PostHistory = require('../post/post_history_list.jsx');

var Sidebar = React.createClass({
  render: function() {
    return (
      <PostHistory/>
    );
  }
});

module.exports = Sidebar;