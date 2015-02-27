var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute;

var EmptyView = require('./components/empty_view.jsx'),
  Post = require('./components/post.jsx'),
  PostHistory = require('./components/post_history.jsx'),
  PostList = require('./components/post_list.jsx');


var routes = (
  <Route name="app" path="/" handler={EmptyView}>
    <Route handler={PostList}/>
    <Route handler={PostHistory}/>

    <Route path="/post/:year/:month/:day/:title" handler={EmptyView}>
      <DefaultRoute handler={Post} name="post"/>
    </Route>
  </Route>
);

module.exports = routes;