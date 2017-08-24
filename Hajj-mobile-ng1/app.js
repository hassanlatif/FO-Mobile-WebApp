google.load('visualization', '1', {packages:['corechart']});
google.load('visualization', '1', {packages:['bar']});

'use strict';

var app = angular.module('app', ['ui.router', 'ui.bootstrap','ngStorage']);

//app.constant('BasePath', "/ibm/console/webtop/WBU-Dashboard/wbu_services/");
app.constant('BasePath', "");
app.constant('RefreshPeriod', 300);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	// $locationProvider.html5Mode(true);

	$stateProvider
	.state('main', {
		url: '/',
		params: {
			serviceCatId: 'All'
		},
		templateUrl: 'views/main.html',
		controller: 'mainController',
		resolve: {
			servicesAlarmData: ['AlarmsDataService', function (AlarmsDataService) {
				//console.log(AlarmsDataService.getServiceLevelAlarms());
				return AlarmsDataService.getServiceLevelAlarms();
			}],
			mapAlarmsData: ['AlarmsDataService', function (AlarmsDataService) {
				//console.log(AlarmsDataService.getMapAlarms());
				return AlarmsDataService.getMapAlarms();
			}]	
		}   

	})

}]);


app.factory('AlarmsDataService', ['$http', 'BasePath', function($http, BasePath) {
	return {

		getServiceLevelAlarms: function() {
			return $http.get(BasePath + 'json/HajjAlarmsData.json').then(function(response) {
				return response.data;
			}, function(){console.log("Failed to fetch service level alarms;")});
		},
		getMapAlarms: function() {
			return $http.get(BasePath + 'json/HajjMapMarkers.json').then(function(response) {
				return response.data;
			}, function(){console.log("Failed to fetch map alarms;")});
		}

	};
}]);



app.filter('formatTimer', function() {
	return function(input)
	{
		function z(n) {return (n<10? '0' : '') + n;}
		var seconds = input % 60;
		var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);            
        return (z(minutes)+':'+z(seconds));
    };
});

app.filter('numberSign', function() {
	return function(number)
	{

		if (number > 0) {
			return "(+" + number + ")";
		}
		else if (number < 0) {
			return "(" + number + ")";
		}
		else {
			return "";
		}
    };
});


