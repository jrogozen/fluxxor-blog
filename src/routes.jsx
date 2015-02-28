var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute;

var App = require('./components/app.jsx'),
  Post = require('./components/post/post.jsx'),
  PostContent = require('./components/post/post_content.jsx'),
  Archive = require('./components/archive/archive.jsx');


var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Archive}/>

    <Route name="post" path="/post/:year/:month/:day/:title" handler={Post}>
      <DefaultRoute handler={PostContent} />
    </Route>
  </Route>
);

module.exports = routes;