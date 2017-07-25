
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