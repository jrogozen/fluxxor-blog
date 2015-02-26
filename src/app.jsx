var React = require('react'),
  Router = require('react-router'),
  Fluxxor = require('fluxxor');

var actions = require('./actions.jsx'),
  routes = require('./routes.jsx'),
  PostStore = require('./stores/post_store.jsx');

var router = Router.create({routes: routes});

var stores = {
  post: new PostStore()
};

var flux = new Fluxxor.Flux(stores, actions.methods);

flux.on('dispatch', function(type, payload) {
  console.log('dispatch:', type, payload);
});

router.run(function(Handler) {
  React.render(
    <Handler flux={flux} />,
    document.getElementById("app")
  );
});