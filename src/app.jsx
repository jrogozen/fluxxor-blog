var React = require('react'),
  Router = require('react-router'),
  Fluxxor = require('fluxxor');

var actions = require('./actions.jsx'),
  routes = require('./routes.jsx'),
  PostStore = require('./stores/post_store.jsx');

var stores = {
  post: new PostStore()
};

var flux = new Fluxxor.Flux(stores, actions.methods);

flux.on('dispatch', function(type, payload) {
  console.log('dispatch:', type, payload);
});

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler flux={flux} />, document.getElementById('app'));
});