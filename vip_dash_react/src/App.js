import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
  const containerStyle = {
    marginTop : "20px"
  };

    return (
  <div className="container-fluid" id="mainView" style={containerStyle}>
    <div className="row">
          <div className="col-md-4 col-sm-4">
            <h4><b>Down</b></h4>
              <div id="DSL_Down" className="triangle">
                 <p className="">Hello</p>
              </div>  
          </div>
          <div className="col-md-4 col-sm-4">
            <h4><b>Down</b></h4>
              <div id="DSL_Down" className="triangle">
                 <p className="">Hello</p>
              </div>  
          </div>
          <div className="col-md-4 col-sm-4">
            <h4><b>Down</b></h4>
              <div id="DSL_Down" className="triangle">
                 <p className="">Hello</p>
              </div>  
          </div>
    </div>
  </div>
    );
  }
}

export default App;
