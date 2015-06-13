define(['react'], function(React){

	var Menu = React.createClass({displayName: "Menu",
    render: function() {
			return (
				React.createElement("nav", {id: "web-nav"}, 
					React.createElement("ul", {id: "menu"}, 
						React.createElement("li", {className: "active"}, React.createElement("a", {href: "#Types"}, React.createElement("span", null, "Typer"))), 
						React.createElement("li", null, React.createElement("a", {href: "#Details"}, React.createElement("span", null, "Detaljer"))), 
						React.createElement("li", null, React.createElement("a", {href: "#Purchases"}, React.createElement("span", null, "Utgifter"))), 
						React.createElement("li", null, React.createElement("a", {href: "#Overview"}, React.createElement("span", null, "Oversikt"))), 
						React.createElement("li", {className: "last"}, React.createElement("a", {href: "#Upload"}, React.createElement("span", null, "Last opp")))
					)
				)
			);
		}
	});

	return Menu;
});
