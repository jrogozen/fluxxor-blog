var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute;

var EmptyView = require('./components/empty_view.jsx'),
  Post = require('./components/post/post.jsx');

var routes = (
  <Route handler={EmptyView} name="home" path="/">
    <Route handler={EmptyView} path="/posts/:slug">
    </Route>
    
    <DefaultRoute handler={PostList} />
  </Route>
);

module.exports = routes;