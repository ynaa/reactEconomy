define(function(require){

  var React = require('react');

  var Common = require('common');
  var Router = require('react-router');
  var Link = Router.Link;

	var OverviewHeader = React.createClass({
    render() {
      return (
        <div>
          <h2>Oversikt over utgifter</h2>
        </div>
      )
    }
  });
  var MyYearComponent = React.createClass({
    onClick(){
      this.props.onClick(this.props.name, this.state.toggle);
      this.setState({toggle: !this.state.toggle})
    },
    getInitialState: function() {
      return {
        toggle: true
      };
    },
    render(){
      return (
        <div className="Cell">
          <a href="#/Overview" onClick={this.onClick}>{this.props.name}</a>
        </div>
      );
    }
  });

  var OverviewTableRow = React.createClass({
    onClick: function(year, toggle) {
      this.props.filterYear(year, toggle);
    },
    getExpTypeId: function(key){
    	for(var i = 0; i < this.props.expenseTypes.length; i++){
        var item = this.props.expenseTypes[i];
    		if(key == item.typeName){
    			return item._id;
    		}
    	}
    },
    render() {
      var sumCells = [];
      var sums = this.props.sums;
      var i = 1002;
      for(var key in sums) {
        var value = sums[key];
        var cellen = (
          <div key={i++} className="Cell">
            {value}
          </div>
        );
        if(this.props.collapsable){
          cellen = (
            <div key={i++} className="Cell">
              <Link to="/Purchases" query={{expType: this.getExpTypeId(key), start: this.props.interval.start, stop: this.props.interval.stop}}>{value}</Link>
            </div>
          );
        }
        sumCells.push(cellen);
      }

      if(this.props.collapsable  && !this.props.rowName.contains("-")){
        return (
          <div key={this.props.key} className="Row">
            <MyYearComponent onClick={this.onClick} name={this.props.rowName}/>
            {sumCells}
          </div>
        )
      }
      else{
        return (
          <div id={this.props.collapsable ? 'msg' : ''} className="Row">
            <div className="Cell">{this.props.rowName}</div>
            {sumCells}
          </div>
        )
      }
    }
  });

  var OverviewTable = React.createClass({
    render() {
      var averageRows = [];
      var i = 0;
      for(interval in this.props.averageIntervals){
        var rowName = interval;
        var sums = this.props.averageIntervals[interval];
        averageRows.push(<OverviewTableRow filterYear={this.props.filterYear} key={i++} expenseTypes={this.props.expenseTypes} collapsable={false} sums={sums} rowName={rowName} />)
      }

      var yearAverages = [];
      var monthsAverages = [];

      for(interval in this.props.sumByIntervals){
        var rowName = interval;
        var sums = this.props.sumByIntervals[interval];

        if(rowName.contains("-")){
          monthsAverages.push(<OverviewTableRow filterYear={this.props.filterYear} key={rowName} interval={interval} expenseTypes={this.props.expenseTypes} collapsable={true} sums={sums} rowName={rowName} />)
        }
        else {
          yearAverages.push(<OverviewTableRow filterYear={this.props.filterYear} key={rowName} interval={interval} expenseTypes={this.props.expenseTypes} collapsable={true} sums={sums} rowName={rowName} />)
        }
      }

      var year = this.props.filteredYear;
      

      var elementPos = yearAverages.map(function(x) {return x.key; }).indexOf(year);

      if(elementPos >= 0){
        yearAverages.splice(elementPos + 1, 0, monthsAverages);
      }

      var sortedRows = yearAverages.sort(function(a, b){
        if(!a.key || !b.key){
          return 0;
        }
        if (a.key.contains("-") && b.key.contains("-")) {
          return (1) * a.key.localeCompare(b.key);
        }
        else if (a.key.contains("-")) {
          var year = a.key.substring(0, 4);
          if (year == b.key) {
            return 1;
          }
          else {
            return (1) * year.localeCompare(b.key);
          }
        }
        else if (b.key.contains("-")) {
          var year = b.key.substring(0, 4);
          if (year == a.key) {
            return -1;
          }
          else {
            return (1) * year.localeCompare(a.key);
          }
        }
        else {
          return (-1) * a.key.localeCompare(b.key);
        }
      });

      return (
        <div>
          <OverviewTableHeader expenseTypes={this.props.expenseTypes}/>
          <div className="Row"><div className="Cell" colSpan="5">Snitt siste tiden</div></div>
          {averageRows}
          <div className="Row"><div className="Cell" colSpan="5">Oversikt siden starten</div></div>
          {yearAverages}
        </div>
      )
    }
  });
  var OverviewTableHeader = React.createClass({
    render(){
      var columns = this.props.expenseTypes.map(function(expType, index){
        return <div key={index} className="Cell">
          <p>{expType.typeName}</p>
        </div>
      });
      return (
        <div className="Heading">
          <div className="Cell">&nbsp;</div>
          {columns}
        </div>
      )
    }
  });

	var OverviewWrapper = React.createClass({
    loadData: function(){
      this.loadExpenseTypesFromServer();
      this.loadIntervals();
    },
    loadExpenseTypesFromServer: function() {
      $.ajax({
        url: this.state.baseUrl + 'expenseTypes/list',
        dataType: 'json',
        success: function(data) {
          this.setState({expenseTypes: data.expTypesList});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    loadIntervals: function(){
      var loadAllIntervals = this.loadAllIntervals;
      $.ajax({
        url: this.state.baseUrl + 'intervals',
        dataType: 'json',
        success: function(data) {
          loadAllIntervals(data.result);
          this.setState({ intervals: data.result });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getByInterval: function(interval, callback){
      if(!interval){
        return;
      }
      var url = this.state.baseUrl + 'interval?start=' + interval.start + '&end=' + interval.end;
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
          callback.call(this, data, interval);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    loadAllIntervals: function(intervals){
      var oldState = this.state.averageIntervals;
			this.getByInterval(intervals.lastMonth, function(data) {
        intervals.lastMonth.name = "Siste måned";
        oldState[intervals.lastMonth.name] = data.result;
        this.setState({averageIntervals: oldState});
			});

      this.getByInterval(intervals.threeMonths, function(data) {
        intervals.threeMonths.name = "Siste 3 måneder";
        oldState[intervals.threeMonths.name] = data.result;
        this.setState({averageIntervals: oldState});
			});

      this.getByInterval(intervals.allMonths, function(data) {
        intervals.allMonths.name = "Siden starten";
        oldState[intervals.allMonths.name] = data.result;
        this.setState({averageIntervals: oldState});
			});

      var oldSumByIntervals = this.state.sumByIntervals;

      for (var i = 0; i < intervals.yearIntervals.length; i++) {
				var item = intervals.yearIntervals[i];
				this.getByInterval(item, function(data, theItem) {
          theItem.name = theItem.year;
          oldSumByIntervals[theItem.name] = data.result;
          this.setState({sumByIntervals: oldSumByIntervals});
				});
			}
    },
    pad: function(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    },
    filterYear: function(year, toggle){
      if (isNaN(year) || year.length != 4) {
  			return;
  		}
      var oldSumByIntervals = this.state.sumByIntervals;
      for ( var prop in oldSumByIntervals) {
        if (prop.startsWith(year + " ")) {
					delete oldSumByIntervals[prop];
				}
      }

      this.setState({sumByIntervals: oldSumByIntervals});
  		if (!toggle) {
        this.state.filteredYear = 0;
  			return;
  		}

      var url = this.state.baseUrl + 'yearinterval/' + year;
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
          var intervals = data.result;

          for (var i = 0; i < intervals.length; i++) {
  					var item = intervals[i];
  					this.getByInterval(item, function(data, theItem) {
  						theItem.name = theItem.year + " - " + this.pad(theItem.monthNum, 2) + " " + theItem.month;
              oldSumByIntervals[theItem.name] = data.result;
              this.setState({sumByIntervals: oldSumByIntervals});
  					});
	        }
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getInitialState: function() {
        return {
          expenseTypes: [],
          intervals: [],
          averageIntervals: {},
          sumByIntervals: [],
          filteredYear: 0,
          baseUrl: 'http://localhost:9000/'
        };
    },
    componentDidMount: function() {
      this.loadData();
    },
    render() {
      return (
        <div>
          <OverviewHeader />
          <div>
            <div className="Table" width="100%">
            <OverviewTable filterYear={this.filterYear} filteredYear={this.filterYeared} expenseTypes={this.state.expenseTypes} intervals={this.state.intervals} averageIntervals={this.state.averageIntervals} sumByIntervals={this.state.sumByIntervals}/>
            </div>
          </div>
      </div>
    )
    }
  });

  return OverviewWrapper;
});
