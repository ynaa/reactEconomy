define(function(require){

  var React = require('react');

	var ExpenseTypeWrapper = require('expenseType');
	var ExpenseDetailWrapper = require('expenseDetail');
	var PurchasesWrapper = require('purchases');
  var Menu = require('menu');
  var OverviewWrapper = require('overview');
  var UploadWrapper = require('upload');

  var Router = require('react-router');
  var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;

  var App = React.createClass({
  render () {
      return (
				<div id='page'>
          <nav id='web-nav'>
            <Menu/>
          </nav>
					<div id='content'>
        		<RouteHandler/>
					</div>
				</div>
    	)
  	}
  });

  var routes = (
    <Route handler={App}>
      <Route path="/" handler={ExpenseTypeWrapper}/>
      <Route path="/Types" handler={ExpenseTypeWrapper}/>
      <Route path="/Details" handler={ExpenseDetailWrapper}/>
      <Route path="/Details/:id" handler={ExpenseDetailWrapper}/>
      <Route path="/Purchases" handler={PurchasesWrapper}/>
      <Route path="/Overview" handler={OverviewWrapper}/>
      <Route path="/Upload" handler={UploadWrapper}/>
    </Route>
  );

	Router.run(routes, Router.HashLocation, (Root) => {
  	React.render(<Root/>, document.body);
	});

});
