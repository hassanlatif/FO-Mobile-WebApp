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
}]);



app.factory('ChartService', function() {
    return {
        
        /**
         * Loads the visualization module from the Google Charts API 
         * if available
         * @returns {boolean} - Returns true is successful, or false 
         * if not available
         */
        loadGoogleVisualization: function() {
            
            // Using a try/catch block to guard against unanticipated 
            // errors when loading the visualization lib
            try {

                // Arbitrary callback required in google.load() to 
                // support loading after initial page rendering
                google.load('visualization', '1', {
                    'callback':'console.log(\'success:corechart\');', 
                    'packages':['corechart']
                });

                google.load('visualization', '1', {
                    'callback':'console.log(\'success:barchart\');', 
                    'packages':['bar']
                });

              
                return true;
            
            } catch(e) {
                console.log('Could not load Google lib', e);
                return false;  
            }

        }
    };
});


app.directive('alarmWidget', function(){

	return {
		restrict: 'E',
		templateUrl: 'alarmWidget.html',
		scope: {
		  title: '@title',
	      alarmStatus: '@alarmStatus',
	      alarmCount: '@alarmCount',
	      color: '@color',
	      size: '@size',
	      id: '@id'
    	},
    	link: function(scope, element, attr) {
    			if (scope.alarmCount > 0){
    				scope.trendShape = 'triangle';
    				scope.shapeColor = scope.color + '-triangle';
    				scope.trend = 'red'    				
    			}
    			else if (scope.alarmCount < 0){
    				scope.trendShape = 'triangle invert';
    				scope.shapeColor = scope.color + '-triangle';
    				scope.textOrient = 'invert'
    				scope.trend = 'green'

    			}
    			else {
    				scope.trendShape = 'circle-' + scope.size;
    				scope.shapeColor = scope.color + '-circle';
    			}

    		}
	};


});

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


