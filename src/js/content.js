define(['react', 'router', 'expenseType', 'expenseDetail', 'purchases'],
function(React, Router, ExpenseTypeWrapper, ExpenseDetailWrapper, PurchasesWrapper){

	var Content = React.createClass({
			getInitialState: function() {
        return {
            page: null
        }
    	},
    	componentDidMount: function() {
				Router.addRoute('', function() {
          this.setState({page: <ExpenseTypeWrapper url='http://localhost:9000/expenseTypes/list' />});
        }.bind(this));
				Router.addRoute('Types', function(id) {
          this.setState({page: <ExpenseTypeWrapper url='http://localhost:9000/expenseTypes/list' />});
        }.bind(this));
				Router.addRoute('Details', function(id) {
          this.setState({page: <ExpenseDetailWrapper selectedDetail={id} url="http://localhost:9000/expenseDetails/list" />});
        }.bind(this));
				Router.addRoute('Details/:id', function(id) {
        	var url='http://localhost:9000/expenseDetails/list/';
          this.setState({page: <ExpenseDetailWrapper selectedDetail={id} url={url} />});
        }.bind(this));
				Router.addRoute('Purchases', function(id) {
          this.setState({page: <PurchasesWrapper url='http://localhost:9000/purchases/list' params={id}/>});
        }.bind(this));
				Router.addRoute('Overview', function(id) {
          this.setState({page: <ExpenseTypeWrapper url='http://localhost:9000/expenseTypes/list' />});
        }.bind(this));
				Router.addRoute('Upload', function(id) {
          this.setState({page: <ExpenseTypeWrapper url='http://localhost:9000/expenseTypes/list' />});
        }.bind(this));
				Router.start();
    	},
    	render: function() {
        return this.state.page;
    	}
	});
	return Content;
});
