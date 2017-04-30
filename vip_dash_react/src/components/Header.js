import React, {Component} from 'react';

export default class Header extends Component {

	render () {

		return (
			<div className="page-header" id="header" style={{margin:'0px'}}>
				<div className="row" style={{margin:'0px'}}>
					<div className="col-md-2 col-sm-3">&nbsp;&nbsp;&nbsp;<img src='media/stc-logo-white-transparent.png' alt="STC Logo" height="33" />&nbsp;&nbsp;&nbsp;&nbsp;</div>
					<div className="col-md-7 col-sm-6 text-center" ><font face="Calibri" color="White" size="3"><b>STC SQM/SLM</b> - IPVPN (VIP) Mobile dashboard&nbsp;&nbsp;</font></div>
					<div className="col-md-3 col-sm-3 text-right"><font face="Calibri" color="White" size="2"><b>Last Refreshed:</b> &nbsp;&nbsp;</font></div>
				</div>
			</div>
			);
	}

}
