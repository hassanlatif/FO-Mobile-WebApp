app.controller('mainController', ['$scope','$stateParams', '$state', '$interval', '$timeout', 'servicesAlarmData', 'RefreshPeriod',
	function($scope, $stateParams, $state, $interval, $timeout, servicesAlarmData, RefreshPeriod) {

		$scope.infoMessage = "";


		var mapOptions = {
			zoom: 4,
			center: new google.maps.LatLng(40.0000, -98.0000),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		}

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		drawUPENetworkStatus();
		drawTTChart();
	

	    function drawUPENetworkStatus() {
			var data = new google.visualization.arrayToDataTable([
				['Circuit Name', 'Value'],
				["Cricuit1", 8],
				["Circuit2", 4],
				["Circuit3", 2],
				["Circuit4", 1],
				]);

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

		function drawTTChart(){
			///Trouble Tickets Chart///
			var ticketsVal = google.visualization.arrayToDataTable([
				['Severity', 'Tickets', { role: 'style' }],
				['High', 1, '#DC3912'],
				['Medium', 2, '#FF9900'],
				['Low', 3, '#F9ED02']
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