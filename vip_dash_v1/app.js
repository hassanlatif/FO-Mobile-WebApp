google.load('visualization', '1', {packages:['corechart']});
google.load('visualization', '1', {packages:['bar']});

'use strict';

var app = angular.module('app', ['ui.router', 'ui.bootstrap','ngStorage']);

//app.constant('BasePath', "/ibm/console/webtop/WBU-Dashboard/wbu_services/");
app.constant('BasePath', "");
app.constant('RefreshPeriod', 300);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');
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
			return $http.get(BasePath + 'json/vipAlarmsData.json').then(function(response) {
				return response.data;
			}, function(){console.log("Failed to fetch service level alarms;")});
		},
		getMapAlarms: function() {
			return $http.get(BasePath + 'json/vipMapMarkers.json').then(function(response) {
				return response.data;
			}, function(){console.log("Failed to fetch map alarms;")});
		}

	};
}])



app.filter('formatTimer', function() {
	return function(input)
	{
		function z(n) {return (n<10? '0' : '') + n;}
		var seconds = input % 60;
		var minutes = Math.floor(input / 60);
        //var hours = Math.floor(minutes / 60);            
        return (z(minutes)+':'+z(seconds));
    };
});

