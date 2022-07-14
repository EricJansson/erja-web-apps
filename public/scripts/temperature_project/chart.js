
var chartArray
var curDayAvgTemp
var data
var options

var googleDataArray = []


function initChart(door_or_curtain_mode = "none") {
    google.charts.load('current', { packages: ['corechart'] });
    chartArray = []
    colorArray = ['']
    google.charts.setOnLoadCallback(() => { updateChart(chartArray, colorArray, door_or_curtain_mode, true) });
}

/*
function initChart() {
    data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Time of Day');
    data.addColumn('number', 'Door Open');
    data.addColumn('number', 'Door closed');
    data.addRows([]);
    
    options = {
        title: 'Apartment Temperature Data',
        subtitle: 'Dots represent temperature measurements',
        width: 800,
        // backgroundColor: 'transparent',
        height: 360,
        colors: ['#1554c7', '#4bc70c', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        pointSize: 5,
        dataOpacity: 0,
        hAxis: {
            title: 'Time of day',
            viewWindow: {
                min: lowerTimeLimit,
                max: upperTimeLimit
            },
            gridlines: {
                count: -1,
                units: {
                    days: { format: ['MMM dd'] },
                    hours: { format: ['HH:mm', 'ha'] }
                }
            },
            minorGridlines: {
              units: {
                hours: {format: ['hh:mm:ss a', 'ha']},
                minutes: {format: ['HH:mm a Z', ':mm']}
              }
            }
        },
        vAxis: {
            title: 'Temperature (C)',
            viewWindow: {
                min: 0,
                max: 40
            }
        }
    };
    chart = new google.visualization.AreaChart(document.getElementById('myChart'));
    chart.draw(data, options);
}
*/


/*
function initChart(array) {
    data = new google.visualization.DataTable();
    //data = google.visualization.arrayToDataTable(
    //    googleDataArray
    //);
    // data.addColumn('datetime', 'Time of Day');
    data.addColumn('datetime', 'Temperature');
    data.addColumn('number', 'Average day');
    data.addColumn('number', 'day');
    
    data.addRows(
        googleDataArray
    );
    
    displayStats()
    
    options = {
        title: 'Company Performance',
        hAxis: {
            titleTextStyle: {color: '#333'},
            title: 'Time of day',
            viewWindow: {
                min: lowerTimeLimit,
                max: upperTimeLimit
            },
            gridlines: {
                count: -1,
                units: {
                    days: { format: ['MMM dd'] },
                    hours: { format: ['HH:mm', 'ha'] }
                }
            },
            minorGridlines: {
              units: {
                hours: {format: ['hh:mm:ss a', 'ha']},
                minutes: {format: ['HH:mm a Z', ':mm']}
              }
            }
        },
        
        vAxis: {
            title: 'Temperature (C)',
            minValue: 0,
            viewWindow: {
                min: 0,
                max: 40
            }
        }
    };
    chart = new google.visualization.AreaChart(document.getElementById('myChart'));
    chart.draw(data, options);
}
*/

function createGoogleDataArray(curtain_or_door) {
    googleDataArray = []
    var array = []
    var curtain_or_doorState = allData.data[0][0][curtain_or_door]
    for (let i = 0; i < allData.data.length; i++) {
        for (let j = 0; j < allData.data[i].length; j++) {
            if (curtain_or_doorState == allData.data[i][j][curtain_or_door]) {
                if (curtain_or_doorState == true) {
                    array = [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), allData.data[i][j].temperature, null]
                } else if (curtain_or_doorState == false) {
                    array = [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), null, allData.data[i][j].temperature]
                } else {
                    // if attribute undefined
                    array = [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), allData.data[i][j].temperature, null]
                }
                array = [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), allData.data[i][j].temperature, null]
            } else {
                array = [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), allData.data[i][j].temperature, allData.data[i][j].temperature]
                curtain_or_doorState = allData.data[i][j][curtain_or_door]
            }
            googleDataArray.push(
                array
            )
        }
    }
    return googleDataArray
}



/*
function initChart(array) {
    // var data = new google.visualization.DataTable();
    data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Time of Day');
    data.addColumn('number', 'Temperature');
    data.addColumn('number', 'Average day');
    data.addRows(
        array
    );
    
    displayStats()
    options = {
        title: 'Apartment Temperature Data',
        subtitle: 'Dots represent temperature measurements',
        width: 800,
        // backgroundColor: 'transparent',
        height: 360,
        colors: ['#1554c7', '#4bc70c', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        pointSize: 5,
        dataOpacity: 0.5,
        legend: { position: 'none' },
        hAxis: {
            title: 'Time of day',
            viewWindow: {
                min: lowerTimeLimit,
                max: upperTimeLimit
            },
            gridlines: {
                count: -1,
                units: {
                    days: { format: ['MMM dd'] },
                    hours: { format: ['HH:mm', 'ha'] }
                }
            },
            minorGridlines: {
              units: {
                hours: {format: ['hh:mm:ss a', 'ha']},
                minutes: {format: ['HH:mm a Z', ':mm']}
              }
            }
        },
        vAxis: {
            title: 'Temperature (C)',
            viewWindow: {
                min: 0,
                max: 40
            }
        }
    };
    chart = new google.visualization.LineChart(document.getElementById('myChart'));
    chart.draw(data, options);
}
*/

function chartChangeDay(next_or_previous_day) {
    if (next_or_previous_day == "next") {
        allData.curDayOfYear++
        upperTimeLimit.setTime(upperTimeLimit.getTime() + ONE_DAY_IN_MILLIS)
        lowerTimeLimit.setTime(lowerTimeLimit.getTime() + ONE_DAY_IN_MILLIS)
    } else if (next_or_previous_day == "previous") {
        allData.curDayOfYear--
        upperTimeLimit.setTime(upperTimeLimit.getTime() - ONE_DAY_IN_MILLIS)
        lowerTimeLimit.setTime(lowerTimeLimit.getTime() - ONE_DAY_IN_MILLIS)
    }
    if (allData.dayOfYearList.includes(allData.curDayOfYear)) {
        allData.curDayOfYearIndex = allData.dayOfYearList.indexOf(allData.curDayOfYear)
    } else {
        allData.curDayOfYearIndex = -1
    }

    options.hAxis.viewWindow.max = upperTimeLimit
    options.hAxis.viewWindow.min = lowerTimeLimit
    chart.draw(data, options);
    
    dayAvgArray = []
    getCurDayArr(allData)
    curDayAvgTemp = calcAvgDayTemp();
    
    mymax = allData.curDayOfYearIndex >= 0 ? allData.maxList[allData.curDayOfYearIndex] : "none"
    mymin = allData.curDayOfYearIndex >= 0 ? allData.minList[allData.curDayOfYearIndex] : "none"
    displayStats()
}




// var googleDataArray = []
/*
function createGoogleDataArray() {
    googleDataArray = []

    for (let i = 0; i < allData.data.length; i++) {
        for (let j = 0; j < allData.data[i].length; j++) {
            googleDataArray.push(
                [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), allData.data[i][j].temperature, null]
            )
        }
    }
    return googleDataArray
}
*/



function updateChart(array, colorArray, door_or_curtain_mode, isLineChart) {
    data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Time of Day');
    if (door_or_curtain_mode == "curtainsClosed") {
        data.addColumn('number', 'Curtains Open');
        data.addColumn('number', 'Curtains Closed');
    } else if (door_or_curtain_mode == "doorClosed") {
        data.addColumn('number', 'Door Open');
        data.addColumn('number', 'Door Closed');    
    } else {
        data.addColumn('number', 'Temperature');
        data.addColumn({type: 'string', role:'annotation'});
    }
    data.addRows(
        array
    );
    
    options = {
        title: 'Apartment Temperature Data',
        subtitle: 'Dots represent temperature measurements',
        width: 800,
        // backgroundColor: 'transparent',
        height: 360,
        colors: colorArray,
        // colors: ['#1554c7', '#4bc70c', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        pointSize: 5,
        dataOpacity: 0,
        hAxis: {
            title: 'Time of day',
            viewWindow: {
                min: lowerTimeLimit,
                max: upperTimeLimit
            },
            gridlines: {
                count: -1,
                units: {
                    days: { format: ['MMM dd'] },
                    hours: { format: ['HH:mm', 'ha'] }
                }
            },
            minorGridlines: {
              units: {
                hours: {format: ['hh:mm:ss a', 'ha']},
                minutes: {format: ['HH:mm a Z', ':mm']}
              }
            }
        },
        vAxis: {
            title: 'Temperature (C)',
            viewWindow: {
                min: 0,
                max: 40
            }
        }
    };
    if (isLineChart == true) {
        chart = new google.visualization.LineChart(document.getElementById('myChart'));
        options.legend = { position: 'none' }
        // options.dataOpacity = 0
    } else {
        chart = new google.visualization.AreaChart(document.getElementById('myChart'));
    }
    chart.draw(data, options);
}


function createGoogleDataArray_LineChart() {
    googleDataArray = []
    for (let i = 0; i < allData.data.length; i++) {
        for (let j = 0; j < allData.data[i].length; j++) {
            if (allData.data[i][j].temperature == allData.maxList[i].temperature) {
                array = [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), allData.data[i][j].temperature, "Max"]
            } else if (allData.data[i][j].temperature == allData.minList[i].temperature) {
                array = [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), allData.data[i][j].temperature, "Min"]
            } else {
                array = [new Date(allData.data[i][j].year, allData.data[i][j].month, allData.data[i][j].day, allData.data[i][j].hour, allData.data[i][j].min), allData.data[i][j].temperature, null]
            }
            googleDataArray.push(array)
        }
    }
    return googleDataArray
}

function googleChartUpdate(colorArray, door_or_curtain_mode = "none") {
    google.charts.load('current', { packages: ['corechart'] });
    var isLineChart = false
    if (door_or_curtain_mode == "none") {
        chartArray = createGoogleDataArray_LineChart()
        isLineChart = true
    } else {
        chartArray = createGoogleDataArray(door_or_curtain_mode)
    }
    google.charts.setOnLoadCallback(() => { updateChart(chartArray, colorArray, door_or_curtain_mode, isLineChart) });
}


function selectDropdown() {
    var activeOption = document.getElementById("dataChartModeOptions").value
    if (activeOption == "curtain") {
        googleChartUpdate(['#4bc70c', '#346fed'], 'curtainsClosed')
    } else if (activeOption == "door") {
        googleChartUpdate(['#346fed', '#e38445'], 'doorClosed')
    } else if (activeOption == "data") {
        googleChartUpdate(['#1554c7'])
    }
}
