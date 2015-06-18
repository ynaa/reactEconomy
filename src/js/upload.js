define(function(require){

  var React = require('react');

  var Common = require('common');


  var UploadHeader = React.createClass({
    render(){
      return (
        <div>
          <header>
            <hgroup>
              <h2>Last opp fil</h2>
            </hgroup>
          </header>
        </div>
      )
    }
  });

  var UploadForm = React.createClass({
    onChange(e) {
      this.setState({
        bank: e.currentTarget.value
      });
    },
    handleSubmit(){
      var fd = new FormData()
			fd.append("uploadedFile", this.state.file)
  		fd.append("bank", this.state.bank);
  		var xhr = new XMLHttpRequest();
  		xhr.open("POST", this.state.baseUrl + "fileupload");
  		xhr.send(fd);
      this.setState({
        bank: '',
        file: ''
      });

    },
    getInitialState: function () {
      return {
        bank: '',
        file: '',
        baseUrl: 'http://localhost:9000/'
      };
    },
    onFileChange: function (e) {
      this.setState({
        file: e.target.files[0]
      });
    },
    render(){
      return (
        <div>
        	<form name="regform" onSubmit={this.handleSubmit}>
        		<div>
        			<input type="radio" name="bank" onChange={this.onChange} checked={this.state.bank === "Mastercard"} value="Mastercard">Mastercard<br/></input>
        			<input type="radio" name="bank" onChange={this.onChange} checked={this.state.bank === "Sparebanken"} value="Sparebanken">Sparebanken<br/></input>
        			<input type="radio" name="bank" onChange={this.onChange} checked={this.state.bank === "Skandiabanken"} value="Skandiabanken">Skandiabanken<br/></input>
        			<input type="radio" name="bank" onChange={this.onChange} checked={this.state.bank === "Visakreditt"} value="Visakreditt">Visakreditt<br/></input>
        		</div>
        		<div>
        			<input type="file" onChange={this.onFileChange} />
        		</div>
        		<button type="submit" className="btn btn-primary">Last opp fil</button>
        	</form>
        </div>
      )
    }
  });

  var UploadUpdateButton = React.createClass({

    onChange(){
      $.ajax({
          url: this.state.baseUrl + 'update',
          dataType: 'json',
          success: function(data) {
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
    },
    getInitialState: function () {
      return {
        baseUrl: 'http://localhost:9000/'
      };
    },
    render(){
      return (
        <div>
          <header>
            <hgroup>
              <h2>Oppdater database</h2>
            </hgroup>
          </header>
          <div>
            <button onClick={this.onChange}>Oppdater utgifter</button>
          </div>
        </div>
      )
    }
  });

  var UploadWrapper = React.createClass({
    render(){
      return (
        <div>
          <UploadHeader />
          <UploadForm />
          <UploadUpdateButton />
        </div>
      )
    }
  });

  return UploadWrapper;
});
