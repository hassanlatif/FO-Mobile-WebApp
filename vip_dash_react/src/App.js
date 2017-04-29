import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import AlarmWidget from './components/AlarmWidget';
import GoogleMapWidget from './components/GoogleMapWidget';

class App extends Component {

  render() {
  

  return (
  <div className="container-fluid" style={{marginTop : "20px"}}>

  <div className="row">
    <div className="col-md-9">
      <div className="row">
        <div className="col-md-12">
          <GoogleMapWidget />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <div className="well">  
          <h4><b>UPE Network Status</b></h4>    
            <AlarmWidget id="UPE_Net_Status" value="1" trendShape="circle-lg red-circle"/>
            <h5><b>Down</b></h5>
          </div>
        </div>
        <div className="col-md-4 col-sm-4">
          <div className="well">    
            <h5><b>Highest Utilization (Top 5)</b></h5>
            <div id="utilization_chart">
            </div>    
          </div>
        </div>
        <div className="col-md-4 col-sm-4">
          <div className="well">
            <h5><b>Trouble Tickets Stats</b></h5>         
            <div id="tickets_chart">
            </div>    
          </div>
        </div>            
      </div>
    </div>
    <div className="col-md-3 hidden-sm">
      <div className="well">
        <h5><b>Trouble Ticket Statstics</b></h5>
        <h4><b>Service Unavailable - S1</b></h4>
        <AlarmWidget id="tt_S1_count" value="7" trendShape="circle-md red-circle"/>
        <div style={{paddingTop: "20px"}}></div>             
        <h4><b>Service Degraded - S2</b></h4>
        <AlarmWidget id="tt_S2_count" value="10" trendShape="circle-md orange-circle"/>
        <div style={{paddingTop: "20px"}}></div>             
        <h4><b>Non-service affecting - S3</b></h4>   
        <AlarmWidget id="tt_S3_count" value="5" trendShape="circle-md black-circle"/>
      </div>
    </div> 
  </div>
  <div className="row">
    <div className="col-md-5">
      <div className="well" style={{paddingTop: "5px"}}>
        <h5 style={{marginBottom: '0px'}}><b>DSL Circuits Status</b></h5> 
        <div className="row">     
          <div className="col-md-4 col-sm-4">
            <h4><b>Down</b></h4>   
            <AlarmWidget id="DSL_Down" value="11" trendShape="triangle black-triangle"/>
          </div>
          <div className="col-md-4 col-sm-4">
            <h4><b>SW Off</b></h4>   
            <AlarmWidget id="DSL_SW_OFF" value="12" trendShape="triangle red-triangle"/>
          </div>
          <div className="col-md-4 col-sm-4">
            <h4><b>Unknown</b></h4>   
            <AlarmWidget id="DSL_Unknown" value="2" trendShape="triangle orange-triangle"/>          
          </div>  
        </div>    
      </div>
    </div>
    <div className="col-md-7">
      <div className="well" style={{paddingTop: "5px"}}>
        <h5 style={{marginBottom: '0px'}}><b>FTTX Circuits Status</b></h5> 
        <div className="row">     
          <div className="col-md-3 col-sm-3">
            <h4><b>Down</b></h4>   
            <AlarmWidget id="FTTX_Down" value="11" trendShape="triangle invert black-triangle" textOrient="invert"/>                      
          </div>
          <div className="col-md-3 col-sm-3">
            <h4><b>SW Off</b></h4>   
            <AlarmWidget id="FTTX_SW_OFF" value="5" trendShape="triangle invert red-triangle" textOrient="invert"/>   
          </div>
          <div className="col-md-3 col-sm-3">
            <h4><b>Disconntd.</b></h4>   
            <AlarmWidget id="FTTX_Disconnect" value="5" trendShape="triangle invert orange-triangle" textOrient="invert"/>   
          </div>  
          <div className="col-md-3 col-sm-3">
            <h4><b>Never conntd.</b></h4>   
            <AlarmWidget id="FTTX_Never_Connected" value="5" trendShape="triangle invert yellow-triangle" textOrient="invert"/>   
          </div>          
        </div>    
      </div>
    </div>
  </div>

  </div>
    );
  }
}

export default App;
