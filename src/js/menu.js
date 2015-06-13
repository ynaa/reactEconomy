define(function(require){

  var React = require('react');

  var Router = require('react-router');  
  var Link = Router.Link;

	var Menu = React.createClass({
    render: function() {
			return (
				<nav id='web-nav'>
					<ul id='menu'>
						<li className='active'><Link to="/Types">Typer</Link></li>
						<li><Link to="/Details">Detaljer</Link></li>
						<li><Link to="/Purchases">Utgifter</Link></li>
						<li><Link to="/Overview">Oversikt</Link></li>
						<li className='last'><Link to="/Upload">Last opp</Link></li>
					</ul>
				</nav>
			);
		}
	});

	return Menu;
});
