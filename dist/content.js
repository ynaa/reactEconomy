define(['react', 'router', 'expenseType', 'expenseDetail', 'purchases'],
function(React, Router, ExpenseTypeWrapper, ExpenseDetailWrapper, PurchasesWrapper){

	var Content = React.createClass({displayName: "Content",
			getInitialState: function() {
        return {
            page: null
        }
    	},
    	componentDidMount: function() {
				Router.addRoute('', function() {
          this.setState({page: React.createElement(ExpenseTypeWrapper, {url: "/expenseTypes/list"})});
        }.bind(this));
				Router.addRoute('Types', function(id) {
          this.setState({page: React.createElement(ExpenseTypeWrapper, {url: "/expenseTypes/list"})});
        }.bind(this));
				Router.addRoute('Details', function(id) {
          this.setState({page: React.createElement(ExpenseDetailWrapper, {selectedDetail: id, url: "/expenseDetails/list"})});
        }.bind(this));
				Router.addRoute('Details/:id', function(id) {
        	var url='/expenseDetails/list/';
          this.setState({page: React.createElement(ExpenseDetailWrapper, {selectedDetail: id, url: url})});
        }.bind(this));
				Router.addRoute('Purchases', function(id) {
					console.log("Heisann " + id);
          this.setState({page: React.createElement(PurchasesWrapper, {url: "/purchases/list", params: id})});
        }.bind(this));
				Router.addRoute('Overview', function(id) {
          this.setState({page: React.createElement(ExpenseTypeWrapper, {url: "/expenseTypes/list"})});
        }.bind(this));
				Router.addRoute('Upload', function(id) {
          this.setState({page: React.createElement(ExpenseTypeWrapper, {url: "/expenseTypes/list"})});
        }.bind(this));
				Router.start();
    	},
    	render: function() {
        return this.state.page;
    	}
	});
	return Content;
});
