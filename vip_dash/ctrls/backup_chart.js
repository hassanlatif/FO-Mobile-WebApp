google.load("visu
    function drawUPENetworkStatus() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Name');
      data.addColumn('number', 'Value');
      data.addColumn({type: 'string', role: 'annotation'});

      data.addRows([
        ['Foo', 9, 'Foo text'],
        ['Bar', 6, 'Bar text'],
        ['Baz', 2.5, 'Baz text'],
        ['Cad', 4, 'Cad text']
        ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1, 1, 2]);

      var options = {
        height: 150,
        chartArea: {width: '75%', height:'75%', top:0, left:0},
        legend: { position: 'none' },
        series: {
          0: {
            type: 'bars'
          },
          1: {
            type: 'line',
            color: 'grey',
            lineWidth: 0,
            pointSize: 0,
            visibleInLegend: false
          }
        },
        vAxis: {
          maxValue: 10
        }

      }

      var chart = new google.visualization.BarChart(document.getElementById('utilization_chart'));

      chart.draw(view, options);
    }



    function drawUPENetworkStatus() {
      var data = new google.visualization.arrayToDataTable([
        ['Circuit Name', 'Value'],
        ["Cricuit1", 1],
        ["Circuit2", 2],
        ["Circuit3", 4],
        ["Circuit4", 8],
        ]);

      var options = {
        height: 150,
        chartArea: {width: '60%', height:'75%', top:0},
        legend: { position: 'none' },
        hAxis: {
          minValue: 0
        },
        vAxis: {
        }
      };


      var chart = new google.visualization.BarChart(document.getElementById('utilization_chart'));
      chart.draw(data,options)

    };