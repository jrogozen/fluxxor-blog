var React = require('react'),
  Fluxxor = require('fluxxor'),
  Router = require('react-router');

var Comment = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('post'),
    Router.State
  ],

  getStateFromFlux: function() {
    return {
    }
  },

  componentDidMount: function() {
    if (typeof DISQUS !== 'undefined') {
      DISQUS.reset({reload: true});
    } else {
        this.addDisqusScript();
    }
  },

  componentWillUnmount: function() {
    this.removeDisqusScript();
  },

  addDisqusScript: function() {
    console.log('adding disqus', this.props);

    var disqus_shortname = this.props.shortname,
      disqus_identifier = this.props.id.toString(),
      disqus_url = 'http://localhost:8080/post/' + this.props.url,
      disqus_title = this.props.title,
      disqus_developer = 1;

    var child = this.disqus = document.createElement('script');
    var parent = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];

    child.async = true;
    child.type = 'text/javascript';
    child.src = '//' + this.props.shortname + '.disqus.com/embed.js';
    
    parent.appendChild(child);
  },

  removeDisqusScript: function() {
    console.log('removing disqus');
    if(this.disqus && this.disqus.parentNode) {
      this.disqus.parentNode.removeChild(this.disqus);
      this.disqus = null;
    }
    return true
  },

  render: function() {
    return (
      <div>
        <h1>Comments</h1>
        <div id="disqus_thread"></div>
      </div>
    )
  }
});

module.exports = Comment;