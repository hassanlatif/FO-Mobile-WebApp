import React, { Component } from 'react';


export default class AlarmWidget extends Component {
	
	render () {

		return (

			<div id={this.props.id} className={this.props.trendShape}>
				<p className={this.props.textOrient}>{this.props.value}</p>
			</div>  

			);
	}	

}
