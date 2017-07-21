// this method is called when chart is first inited as we listen for "rendered" event
function zoomChart(chart, chartData) {
    if (chartData == null) {
        return;
    }
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(chartData.length - 30000, chartData.length - 1);
}

function generateChartData(data_from_python) {
    var chartData = [];

    for (i in data_from_python) {
        datetimeStr = data_from_python[i].datetime;
        dateTime = datetimeStr.split(" ")
        var date = dateTime[0].split("-");
        var yy = date[0];
        var mm = date[1]-1;
        var dd = date[2];

        var time = dateTime[1].split(":");
        var hh = time[0];
        var m = time[1];
        var ss = parseInt(time[2]);

        var newDate = new Date(yy, mm, dd, hh, m, ss);
        chartData.push({
            date: newDate,
            value1: parseFloat(data_from_python[i].value1),
            value2: parseFloat(data_from_python[i].value2),
            value3: parseFloat(data_from_python[i].value3),
            value4: parseFloat(data_from_python[i].value4),
            value5: parseFloat(data_from_python[i].value5),
            value6: parseFloat(data_from_python[i].value6),
            value7: parseFloat(data_from_python[i].value7),
            value8: parseFloat(data_from_python[i].value8),
            value9: parseFloat(data_from_python[i].value9)
        });
    }
    return chartData;
}

function update_amchart(json_data) {
    var chart_data = generateChartData(json_data);
	var chart = AmCharts.makeChart("my_amchart", {
		"type": "serial",
		"theme": "light",
		"marginRight": 80,
		"autoMarginOffset": 20,
		"marginTop": 7,
		"dataProvider": chart_data,
        "legend": {
            "align": "center",
            "autoMargins": false,
            "borderAlpha": 0.2,
            "equalWidths": false,
            "valueAlign": "left",
            "valueWidth": 100,
        },
		"valueAxes": [{
            "id": "currentAxis",
			"axisAlpha": 0.2,
			"dashLength": 1,
			"position": "left"
        }],
		"mouseWheelZoomEnabled": true,
		"graphs": [{
			"balloonText": "1: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第1站",
			"valueField": "value1",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
		}, {
			"balloonText": "2: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第2站",
			"valueField": "value2",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
		}, {
			"balloonText": "3: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第3站",
			"valueField": "value3",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
		}, {
			"balloonText": "4: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第4站",
			"valueField": "value4",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
		}, {
			"balloonText": "5: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第5站",
			"valueField": "value5",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
		}, {
			"balloonText": "6: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第6站",
			"valueField": "value6",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
		}, {
			"balloonText": "7: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第7站",
			"valueField": "value7",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
		}, {
			"balloonText": "8: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第8站",
			"valueField": "value8",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
		}, {
			"balloonText": "9: [[value]]",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"hideBulletsCount": 50,
			"title": "第9站",
			"valueField": "value9",
			"useLineColorForBulletBorder": true,
            "fillAlphas": 0.0,
            "valueAxis": "currentAxis",
        }],
		"chartScrollbar": {
			"autoGridCount": true,
			"scrollbarHeight": 40
		},
		"chartCursor": {
			"categoryBalloonAlpha": 0.6,
			"categoryBalloonColor": "#FF0000",
			"categoryBalloonFunction": function(d) {
				var year = d.getFullYear();
				var month = d.getMonth();
				var day = d.getDate();
				var hr = d.getHours();
				var min = d.getMinutes();
				var sec = d.getSeconds();
				return [year, month, day].join('/') + ' ' + [hr, min, sec].join(':');
			}
		},
		"categoryField": "date",
		"categoryAxis": {
            "minPeriod" : "ss",
			"parseDates": true,
			"axisColor": "#DADADA",
			"dashLength": 1,
			"minorGridEnabled": true,
		},
		"export": {
			"enabled": true
		}
	});
	chart.addListener("rendered", zoomChart);
	zoomChart(chart, chart_data);
}

$(function() {
        json_data = [];
        for (i = 0; i < qq['data'].length; ++i) {
            var toks = qq['data'][i].split(" ");
            json_data.push({'datetime': toks[0] + " " + toks[1], 
                    'value1': parseFloat(toks[2]), 
                    'value2': parseFloat(toks[3]),
                    'value3': parseFloat(toks[4]),
                    'value4': parseFloat(toks[5]),
                    'value5': parseFloat(toks[6]),
                    'value6': parseFloat(toks[7]),
                    'value7': parseFloat(toks[8]),
                    'value8': parseFloat(toks[9]),
                    'value9': parseFloat(toks[10]),
                    });
        }
        update_amchart(json_data)
});
