var React = require('react'),
  Router = require('react-router'),
  Fluxxor = require('fluxxor');

var ArchiveList = require('./archive_list.jsx');

var Archive = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React)
  ],
  
  render: function() {
    return (
      <div>
        <ArchiveList/>
      </div>
    );
  }
});

module.exports = Archive;