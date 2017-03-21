app.controller('mainController', ['$scope','$stateParams', '$state', '$interval', '$timeout', 'servicesAlarmData', 'RefreshPeriod',
	function($scope, $stateParams, $state, $interval, $timeout, servicesAlarmData, RefreshPeriod) {

		$scope.infoMessage = "";


		var mapOptions = {
			zoom: 4,
			center: new google.maps.LatLng(40.0000, -98.0000),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		}

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		//Fetch Data
		$scope.UPEStats = jsonPath(servicesAlarmData, "$.alarmsData.UPEStats")[0];			
		$scope.DSLStats = jsonPath(servicesAlarmData, "$.alarmsData.DSLStats")[0];		
		$scope.FTTxStats = jsonPath(servicesAlarmData, "$.alarmsData.FTTXStats")[0];
		$scope.TTData = jsonPath(servicesAlarmData, "$.alarmsData.TTStats")[0];
		Utilization_data = jsonPath(servicesAlarmData, "$.alarmsData.Utilization")[0];


		drawUPENetworkStatus(Utilization_data);
		drawTTChart($scope.TTData);


		function drawUPENetworkStatus(Utilization_data) {

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

		function drawTTChart(TTSeverity){
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