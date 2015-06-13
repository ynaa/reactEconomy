define(['react', 'jquery', 'myInput', 'common'], function(React, Router, MyInput, Common){

  var ExpenseTypeHeader = React.createClass({displayName: "ExpenseTypeHeader",
    render: function() {
      return (React.createElement("header", null, React.createElement("hgroup", null, React.createElement("h2", null, "Registrer ny utgiftstype"))));
  }
  });

  var ExpenseType = React.createClass({displayName: "ExpenseType",
      onChange: function(cid){
        console.log("Changing " + this.props.id);

        var value = cid.target.value;

      	var expType = this.props.expType;
        expType[cid.target.name] = value;
        this.props.onTypeEdit(expType);
      },
      onDelete: function(){
          this.props.onTypeDelete(this.props.id);
      },
      render: function() {
          return (
              React.createElement("div", {className: "Row"}, 
                  React.createElement("div", {className: "Cell"}, 
                      React.createElement(MyInput, {key: this.props.expType._id, name: "typeName", value: this.props.expType.typeName, onBlur: this.onChange})
                  ), 

                  React.createElement("input", {type: "hidden", name: "id", value: this.props.expType._id}), 

                  React.createElement("div", {className: "Cell"}, 
                      React.createElement("a", {href: "#Details/" + this.props.expType._id, title: ""}, "Vis")
                  ), 
                  React.createElement("div", {className: "Cell"}, 
                      React.createElement("button", {onClick: this.onDelete}, "Slett")
                  )
              )
          );
      }
  });

  var ExpenseTypeForm = React.createClass({displayName: "ExpenseTypeForm",
      handleSubmit: function(e) {
          e.preventDefault();
          var typeName = this.refs.typeName.getDOMNode().value.trim();
          this.props.onTypeSubmit({typeName: typeName});
          this.refs.typeName.getDOMNode().value = '';
          return;
      },
      render:
      function() {
          return (
              React.createElement("form", {name: "regform", onSubmit: this.handleSubmit}, 
                  React.createElement("input", {name: "typeName", placeholder: "Navn på utgiftstype", ref: "typeName"}), 
                  React.createElement("button", {type: "submit", className: "btn btn-primary", value: "Post"}, "Legg til")
              )
          );
      }
  });

  var ExpenseTypeList = React.createClass({displayName: "ExpenseTypeList",
      render: function() {
          var onDelete = this.props.onTypeDelete;
          var onEdit = this.props.onTypeEdit;
          var size = this.props.data.length;
          var rows = this.props.data.map(function(expType, index) {
              return (
                  React.createElement(ExpenseType, {onTypeDelete: onDelete, onTypeEdit: onEdit, expType: expType, key: index})
              );
          });
          return (
              React.createElement("div", null, 
                  React.createElement("h2", null, "Liste med utgiftstyper, ", size, " type(r)"), 
                  React.createElement("div", {className: "Table"}), 
                  React.createElement("div", {className: "Heading"}, 
                      React.createElement("div", {className: "Cell"}, React.createElement("p", null, "Utgiftsnavn")), 
                      React.createElement("div", {className: "Cell"}, React.createElement("p", null, "Detaljer")), 
                      React.createElement("div", {className: "Cell"}, React.createElement("p", null, "Slett"))
                  ), 
                  rows

              )
          );
      }
  });


    var ExpenseTypeWrapper = React.createClass({displayName: "ExpenseTypeWrapper",
    	loadExpenseTypesFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data.expTypesList});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        },
        handleNewTypeSubmit: function(newType) {
            var types = this.state.data;
            types.push(newType);
            var json = JSON.stringify(newType);
            this.setState({data: types}, function() {
                // `setState` accepts a callback. To avoid (improbable) race condition,
                // `we'll send the ajax request right after we optimistically set the new
                // `state.
                $.ajax({
                    url: "/expenseTypes/add",
                    contentType: "application/json; charset=utf-8",
                    type: 'POST',
                    data: json,
                    success: function(data) {
                        //this.setState({data: data});
                        this.loadExpenseTypesFromServer();
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
            });
        },
        handleTypeDelete: function(theId) {
            var allData = this.state.data;
            var expType = allData.find(function(id, value){return id=theId});
            if(confirm("Er du sikker på du vil slette  " + expType.typeName + "?")){
                $.ajax({
                    url: "/expenseTypes/delete/" + theId,
                    type: 'DELETE',
                    data: {},
                    success: function(data) {
                        allData.splice(expType, 1);
                        this.setState({data: allData});

                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
            }
        },
        handleTypeEdit: function(editType){
          var types = this.state.data;
          var json = JSON.stringify(editType);
          this.setState({data: types}, function() {
              // `setState` accepts a callback. To avoid (improbable) race condition,
              // `we'll send the ajax request right after we optimistically set the new
              // `state.
              $.ajax({
                  url: "/expenseTypes/edit/" + editType._id,
                  contentType: "application/json; charset=utf-8",
                  type: 'POST',
                  data: json,
                  success: function(data) {
                      //this.loadExpenseTypesFromServer();
                  }.bind(this),
                  error: function(xhr, status, err) {
                      console.error(this.props.url, status, err.toString());
                  }.bind(this)
              });
          });
        },
        getInitialState: function() {
            return {data: []};
        },
        componentDidMount: function() {
            this.loadExpenseTypesFromServer();
        },
        render: function() {
            return (
                React.createElement("div", null, 
                    React.createElement(ExpenseTypeHeader, null), 
                    React.createElement(ExpenseTypeForm, {onTypeSubmit: this.handleNewTypeSubmit}), 
                    React.createElement(ExpenseTypeList, {onTypeDelete: this.handleTypeDelete, onTypeEdit: this.handleTypeEdit, data: this.state.data})
                )
            );
        }
    });

  return ExpenseTypeWrapper;
});
//
//React.render(
//    <div>
//        <ExpenseTypeWrapper url="/expenseTypes/list" />
//    </div>,
//    document.getElementById('content')
//);
