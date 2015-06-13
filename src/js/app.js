define(function(require){

  var React = require('react');
  var Menu = require('menu');
  var Content = require('content');

  function App() {
    this.AppView = React.createClass({
      render: function () {
        return (
					<div>
						<Menu/>
						<div id='content'>
							<Content/>
						</div>
					</div>
        );
      }
    });
  }

  App.prototype.init = function () {
    React.render(<this.AppView />, document.body);
  };

  return App;

});
