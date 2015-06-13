define(['react', 'menu', 'content'], function(React, Menu, Content){
	var App = React.createClass({displayName: "App",
		
			render: function() {
					return React.createElement("div", null, React.createElement(Menu, null), React.createElement("div", {id: "content"}, React.createElement(Content, null)));
			}
	});


  return App;
});
