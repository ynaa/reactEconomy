define(function(require){

  var React = require('react');

  var MyHref = React.createClass({
    htmlDecode: function(value){
      return $('<div/>').html(value).text();
    },
    onClick(){
      this.props.onClick(this.props.page);
    },
    render(){
        return <a href="#/Purchases" onClick={this.onClick}>{this.htmlDecode(this.props.text)}</a>
    }
  });

  var myPagination = React.createClass({
    getInitialState: function(){
      var pagination = {
        page: 0,
  			offset: 0,
  			totalSize: 0,
  			totalSum: 0,
  			current: 0,
  			numPages: 0,
  			pages: 0
      };
      return { pagination: pagination }
    },
    createPagination: function(purchasesList){
      var pagination = {
        page: purchasesList.page,
        offset: purchasesList.offset,
        totalSize: purchasesList.total,
        current: purchasesList.page,
        numPages: Math.ceil(purchasesList.total / purchasesList.numPerPages),
        pages: this.generatePagesArray(purchasesList.page, purchasesList.total, purchasesList.numPerPages, 9)
      };
      return pagination;
    },
    generatePagesArray: function(currentPage, collectionLength, rowsPerPage, paginationRange) {
      var pages = [];
      var totalPages = Math.ceil(collectionLength / rowsPerPage);
      var halfWay = Math.ceil(paginationRange / 2);
      var position;
      if (currentPage <= halfWay) {
          position = 'start';
      } else if (totalPages - halfWay < currentPage) {
          position = 'end';
      } else {
          position = 'middle';
      }
      var ellipsesNeeded = paginationRange < totalPages;
      var i = 1;
      while (i <= totalPages && i <= paginationRange) {
          var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
          var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
          var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
          if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
              pages.push('...');
          } else {
              pages.push(pageNumber);
          }
          i ++;
      }
      return pages;
    },
    calculatePageNumber: function(i, currentPage, paginationRange, totalPages) {
      var halfWay = Math.ceil(paginationRange/2);
      if (i === paginationRange) {
        return totalPages;
      } else if (i === 1) {
        return i;
      } else if (paginationRange < totalPages) {
        if (totalPages - halfWay < currentPage) {
            return totalPages - paginationRange + i;
        } else if (halfWay < currentPage) {
            return currentPage - halfWay + i;
        } else {
            return i;
        }
      } else {
          return i;
      }
    },
    onClick: function(pageNumber){
      this.state.pagination.current = (pageNumber - 1);
      //this.props.filterFunc(null, null, null, null, pageNumber);

      this.props.filterFunc(
        this.state.parameters.expType,
        this.state.parameters.expDet,
        this.state.parameters.startdate,
        this.state.parameters.enddate, pageNumber
      );
    },
    render () {
      this.state.pagination = this.createPagination(this.props.purchases);
      this.state.parameters = this.props.parameters;

      var onClick = this.onClick;
      var current = this.state.pagination.current;
      var numbers = this.state.pagination.pages.map(function(page, index) {
        var pageNumber = (page - 1);
        return (
          <li key={index} className={ current == pageNumber ? 'disabled' : ''}>
            <MyHref onClick={onClick} page={pageNumber} text={page}/>
          </li>
        );
      });

      return (
      <div id="content1">
        <ul className="pagination" >
          <li className={this.state.pagination.current == 0 ? 'disabled' : ''}>
            <MyHref onClick={this.onClick} page={0} text={ '&laquo;' }/>
          </li>
          <li className={ (this.state.pagination.current - 1) < 0 ? 'disabled' : ''}>
            <MyHref onClick={this.onClick} page={this.state.pagination.current - 1} text={ '‹' }/>
          </li>
          {numbers}
          <li className={ (this.state.pagination.current + 1) == this.state.pagination.numPages ? 'disabled' : ''}>
            <MyHref onClick={this.onClick} page={this.state.pagination.current + 1} text={ '›' }/>
          </li>
          <li className={ (this.state.pagination.current + 1) == this.state.pagination.numPages ? 'disabled' : ''}>
            <MyHref onClick={this.onClick} page={this.state.pagination.numPages - 1} text={ '&raquo;' }/>
          </li>
        </ul>
      </div>
      );
    }
  });

  return myPagination;
});
