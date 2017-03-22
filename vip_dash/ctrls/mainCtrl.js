app.controller('mainController', ['$scope','$stateParams', '$state', '$interval', '$timeout', 'servicesAlarmData', 'RefreshPeriod', 'mapAlarmsData',
	function($scope, $stateParams, $state, $interval, $timeout, servicesAlarmData, RefreshPeriod, mapAlarmsData) {

		$scope.infoMessage = "";

		//Fetch Data
		$scope.UPEStats = jsonPath(servicesAlarmData, "$.alarmsData.UPEStats")[0];			
		$scope.DSLStats = jsonPath(servicesAlarmData, "$.alarmsData.DSLStats")[0];		
		$scope.FTTxStats = jsonPath(servicesAlarmData, "$.alarmsData.FTTXStats")[0];
		$scope.TTData = jsonPath(servicesAlarmData, "$.alarmsData.TTStats")[0];
		UtilData = jsonPath(servicesAlarmData, "$.alarmsData.Utilization")[0];


		draw_UPE_NetStat_Chart(UtilData);
		draw_TT_Chart($scope.TTData);

		var mapOptions = {
			zoom: 4,
			center: new google.maps.LatLng(24.746863, 46.724298),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		}

		AlarmsMap = new google.maps.Map(document.getElementById('map'), mapOptions);

		mapAlarms = jsonPath(mapAlarmsData, "$.mapMarkers")[0];
		//console.log(mapAlarms);

		var markers_UP = [];
		var markers_DOWN = [];

		for(var key in mapAlarms){
			if (mapAlarms.hasOwnProperty(key)){

				var latLng = new google.maps.LatLng(mapAlarms[key].latitude, mapAlarms[key].longitude);

				if (mapAlarms[key].circuitStatus == "UP") {
					var marker = new google.maps.Marker({
						position: latLng,
						icon: 'media/circuit_green.png'
					});						
					markers_UP.push(marker);
				}
				else {
					var marker = new google.maps.Marker({
						position: latLng,
						icon: 'media/circuit_red.png'						
					});					
					markers_DOWN.push(marker);
				}
			}
		}

		var clusterStyles_UP = [
		{   
			url: 'media/cluster_green.png',
			height: 55,
			width: 55,
			anchor: [0, 0],
			textColor: '#ffffff',
			textSize: 11
		}, ];		

		var options_UP = {
			styles: clusterStyles_UP
		};

		var clusterStyles_DOWN = [
		{   
			url: 'media/cluster_red.png',
			height: 55,
			width: 55,
			anchor: [0, 0],
			textColor: '#ffffff',
			textSize: 11
		}];		

		var options_DOWN = {
			styles: clusterStyles_DOWN
		};

		var markerCluster_UP = new MarkerClusterer(AlarmsMap, markers_UP, options_UP);
		var markerCluster_DOWN = new MarkerClusterer(AlarmsMap, markers_DOWN, options_DOWN);


		function draw_UPE_NetStat_Chart(Utilization_data) {

			var util_array = [['Circuit Name', 'Value']];
			for (var key in Utilization_data) {
				if (Utilization_data.hasOwnProperty(key)) {
					util_array.push([key, Utilization_data[key]]);
				}
			}

			var data = new google.visualization.arrayToDataTable(util_array);

			var options = {
				height: 150,
				chartArea: {width: '65%', height:'75%', top:0, left:'25%'},
				legend: { position: 'none' },
				hAxis: {
					minValue: 0
				},
			};

			var chart = new google.visualization.BarChart(document.getElementById('utilization_chart'));
			chart.draw(data,options)

		};		

		function draw_TT_Chart(TTSeverity){
			///Trouble Tickets Chart///
			var ticketsVal = google.visualization.arrayToDataTable([
				['Severity', 'Tickets', { role: 'style' }],
				['Critical', TTSeverity.Critical, '#DC3912'],    
				['High', TTSeverity.High, '#FF9900'],
				['Medium', TTSeverity.Medium, '#F9ED02']
				]);


			var ticketsOpts = {
				height: 150,
				chartArea: {width: '80%', height:'75%', top:5},	
				legend: { position: "none" },
				backgroundColor: 'White',
				vAxis: {
					minValue:0,
				}				
			};

			var barChart = new google.visualization.ColumnChart(document.getElementById("tickets_chart"));
			barChart.draw(ticketsVal, ticketsOpts);
		}


		var periodicRefresh = $interval(function () {
			$state.reload(); 
		}, RefreshPeriod * 1000);

		$scope.refreshDate = new Date();

		$scope.counter = RefreshPeriod; 	

		var counterInterval = $interval(function(){
			$scope.counter--;
		}, 1000);


		$scope.$on('$destroy', function() {
			$interval.cancel(periodicRefresh);
			$interval.cancel(counterInterval);
		});


	}]);