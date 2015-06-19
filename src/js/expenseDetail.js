define(['react', 'jquery', 'myInput', 'common', 'react-router'], function(React, Router, MyInput, Common, Router){
  var Link = Router.Link;
  var ExpenseTypeHeader = React.createClass({
    render: function() {
      return (<header><hgroup><h2>Registrer ny utgiftstype</h2></hgroup></header>);
    }
  });

  var ExpenseDetail = React.createClass({
    onBlur: function(cid){
    	var expDet = this.props.expDet;
    	var value = cid.target.value;
    	if(cid.target.name == "expenseType"){
    		value = Common.findById(value, this.props.expTypeList);
    	}
    	if(expDet[cid.target.name] == value){
    		return;
    	}
    	if(cid.target.name == "searchTags"){
    		value = createJSONList(value);
    	}
    	expDet[cid.target.name] = value;
      this.props.onDetailEdit(expDet);
    },
    onDelete: function(){
        this.props.onDetailDelete(this.props.expDet._id);
    },
    render: function() {
      return (
    		<div className="Row">
          <div className="Cell">
              <MyInput key={this.props.expDet._id} name="description" value={this.props.expDet.description} onBlur={this.onBlur}/>
          </div>
          <div className="Cell">
          	<MyInput key={this.props.expDet._id} name="searchTags" value={this.props.expDet.searchTags} onBlur={this.onBlur}/>
          </div>
          <div className="Cell">
          	{Common.createSelect("expenseType", this.props.expTypeList,
          			this.props.expDet.expenseType._id,
          			this.onBlur, false)}
          </div>
          <div className="Cell">
            <Link to="/Purchases" query={{expDet: this.props.expDet._id}}>Vis</Link>
          </div>
          <div className="Cell">
              <button onClick={this.onDelete} >Slett</button>
          </div>
        </div>
      );
    }
  });

  var ExpenseDetailForm = React.createClass({
      handleSubmit: function(e) {
        e.preventDefault();
        var typeName = this.state.detName;
        var searchTags = this.state.searchTags;
        var expTypeId = this.state.expTypeId;

        this.props.onDetailNew(typeName, searchTags, expTypeId);
        this.setState({
          detName: '',
          searchTags: '',
          expTypeId: ''
        });
      },
      onChangeSearchTags(tags){
        this.setState({
          searchTags: tags.target.value
        });
      },
      onChangeExpType(expType){
        this.setState({
          expTypeId: expType.target.value
        });
      },
      onChangeDetName(detName){
        this.setState({
          detName: detName.target.value
        });
      },
      getInitialState: function() {
        return {
          detName: '',
          searchTags: '',
          expTypeId: ''
        };
      },
      render:
      function() {
        return (
          <div>
          <header>
            <hgroup>
              <h2>Registrer ny utgiftsdetalj</h2>
            </hgroup>
          </header>
          <form name='regform' onSubmit={this.handleSubmit}>
            <input name="detName" required onChange={this.onChangeDetName} placeholder='Navn på utgiftstype'/>
            <input name="searchTags" required onChange={this.onChangeSearchTags} placeholder="Tags" />
            {
            Common.createSelect("expTypeId", this.props.expTypesList,
        			this.state.expTypeId,
        			this.onChangeExpType, true)
            }
            <button type="submit" className="btn btn-primary">Legg til</button>
          </form>
          </div>
        );
      }
  });

  var ExpenseDetailFilter = React.createClass({
    filter: function(cid) {
    	var filterValue = cid.target.value;

      this.setState({
        selectedDetail: filterValue
      });

      this.props.filterFunc(filterValue);
    },
    getInitialState: function() {
      return {
        selectedDetail : this.props.selectedDetail
      };
    },
    render: function() {
    	var select =
        Common.createSelect("expTypeFilter", this.props.data.expTypesList,
    			this.state.selectedDetail,
    			this.filter, true);
      return (
        <div>
          <h4>Filtrer på type</h4>
          <div> {select} </div>
        </div>
      );
    }
  });

  var ExpenseDetailList = React.createClass({
    render: function() {
      var rows = {};
      var size = 0;
      if(this.props.data.expDetList){
      	var expTypeList = this.props.data.expTypesList;
      	var edit = this.props.onDetailEdit;
        var onDelete = this.props.onDetailDelete;
        size = this.props.data.expDetList.length;
        rows = this.props.data.expDetList.map(function(expDet) {
          return (
            <ExpenseDetail onDetailEdit={edit} onDetailDelete={onDelete} expDet={expDet} key={expDet._id} expTypeList={expTypeList} />
          );
        });
      }

      return (
        <div>
          <h2>Liste med utgiftstyper, {size} type(r)</h2>
          <div className="Table">
            <div className="Heading">
              <div className="Cell"><p>Beskrivelse</p></div>
              <div className="Cell"><p>Søkeord</p></div>
              <div className="Cell"><p>Type</p></div>
              <div className="Cell"><p>Vis utgifter</p></div>
              <div className="Cell"><p>Slett</p></div>
            </div>
          {rows}
        </div>
      </div>
      );
    }
  });

  function createJSONList(temp){
  	try {
  		var tags = temp.split(",");
  		var json = [];
  		for (var i = 0; i < tags.length; i++) {
  			json.push(tags[i]);
  		}
  		return json;
  	} catch (e) {
  		console.log(e);
  		return temp;
  	}
  }

  var ExpenseDetailWrapper = React.createClass({
      loadDataFromServer: function(expTypeId) {
      	var url = this.props.url;
      	if(expTypeId != undefined && expTypeId != ''){
      		url = 'http://localhost:9000/expenseDetails/list' + '/' + expTypeId
      	}
        else{
          url = 'http://localhost:9000/expenseDetails/list'
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
              this.setState({data: data.result});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
      handleEditTypeSubmit: function(newType) {
      	var types = this.state.data.expDetList;
        types.push(newType);
        var json = JSON.stringify(newType);
        this.setState({data: types}, function() {
          $.ajax({
            url: this.state.baseUrl + "expenseDetails/edit/" + newType._id,
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            data: json,
            success: function(data) {
              this.loadDataFromServer(this.props.params.id);
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
        });
      },
      handleNewDetailSubmit: function(detName, searchTags, expTypeId) {
        var jsonObject = {
          detName: detName,
          detTags: searchTags,
          expType: expTypeId
        };
        var json = JSON.stringify(jsonObject);
        $.ajax({
          url: this.state.baseUrl + "expenseDetails/add",
          contentType: "application/json; charset=utf-8",
          type: 'POST',
          data: json,
          success: function(data) {
            this.loadDataFromServer(this.props.params.id);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
      handleDetailDelete: function(theId) {
        var allData = this.state.data.expDetList;
        var expDet = allData.find(function(id, value){return id=theId});
        if(confirm("Er du sikker på du vil slette  " + expDet.description + "?")){
          $.ajax({
            url:  this.state.baseUrl + "expenseDetails/delete/" + theId,
            type: 'DELETE',
            data: {},
            success: function(data) {
              allData.splice(expDet, 1);
              this.state.data.expDetList = allData;
              var newData = {expTypesList : this.state.data.expTypesList, expDetList : allData}
              this.setState({data: newData});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
        }
      },
      getInitialState: function() {
        return {
          data: {
            expDetList : [],
            expTypesList : []
          },
          baseUrl: 'http://localhost:9000/'
        };
      },
      componentDidMount: function() {
        this.loadDataFromServer(this.props.params.id);
      },
      render: function() {
        return (
          <div>
            <ExpenseDetailForm expTypesList={this.state.data.expTypesList} onDetailNew={this.handleNewDetailSubmit}/>
            <ExpenseDetailFilter selectedDetail={this.props.params.id} data={this.state.data} filterFunc={this.loadDataFromServer}/>
            <ExpenseDetailList onDetailEdit={this.handleEditTypeSubmit} onDetailDelete={this.handleDetailDelete} data={this.state.data}/>
          </div>
          );
      }
  });

  return ExpenseDetailWrapper;

});
