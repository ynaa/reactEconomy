define(['react'], function(React){
  var MyInput = React.createClass({displayName: "MyInput",
  	getInitialState: function() {
  	    return {
  	    	field: '',
  	    	name: ''
  		};
  	},
  	componentWillMount: function() {
  	    this.setState({
  	    	field: this.props.value,
  	    	name: this.props.name
  	    });
  	  },
  	onChange: function(event){
  		this.setState({field: event.target.value});
  	},
  	render: function() {
      	var field = this.state.field;
      	var name = this.state.name;
          return (
              React.createElement("input", {name: name, value: field, onBlur: this.props.onBlur, onChange: this.onChange})
          );
      }
  });
  return MyInput;
});
