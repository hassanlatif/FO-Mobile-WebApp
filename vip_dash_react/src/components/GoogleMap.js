import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class GoogleMap extends Component {
	constructor() {
		super();
		this.state = {
			initialZoom: 4,
			mapCenterLat: 24.746863,
			mapCenterLng: 46.724298
		}
	}

	componentDidMount() {
		const mapOptions = {
			center: this.mapCenterLatLng(),
			zoom: this.state.initialZoom,
			mapTypeId: window.google.maps.MapTypeId.TERRAIN
		};

		let map = new window.google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);
		let marker = new window.google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
		
		this.setState({map: map});
	}

	mapCenterLatLng () {
		return new window.google.maps.LatLng(this.state.mapCenterLat, this.state.mapCenterLng);
	}

	render () {

		return (
			<div className="well map-well" id='map'></div>
			);
	}

}
