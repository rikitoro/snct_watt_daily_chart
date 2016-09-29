'use strict;'

Highcharts.setOptions({
  global: {
    useUTC: false
  }
});

/////

$(function () {
  //
  console.log(chart_options);
  let chart = new Highcharts.Chart(chart_options);

  // get today'data and draw chart
  $.getJSON(config.api_url.today)
  .done(res => {
    if (res.date) {
      const series_data = to_series_data(res, 'area');
      chart.addSeries(series_data);
    } else {
      console.log("cannot obtain today's data");
    }
  });

  $("#btn_getdata").click(() => {
    const api_url = config.api_url.daily + $('#date').val();
    $.getJSON(api_url)
    .done(res => {
      if (res.date) {
        const series_data = to_series_data(res);
        chart.addSeries(series_data);
      } else {
        console.log("cannot obtain daily data");
      }
    });
  });

});



function to_series_data(res, chart_type = 'line') {
  const data = _.zip(_.map(res.time,time => {return Date.parse('1970-01-01' + ' ' + time)}), res.watt);
  return {name: res.date, data: data, type: chart_type};
}

function to_today_datetimedata(res) {
  const data = _.zip(_.map(res.time,time => {return Date.parse('1970-01-01' + ' ' + time)}), res.watt);
  return {name: res.date, data: data, color: colorGen(),type: 'area'};
}


function create_chartOptions(data) {

  return chartOptions;
}

function toLocaleString( datetime ) {
  const date = new Date(datetime);
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
    ].join( '/' ) + ' '
    + date.toLocaleTimeString();
}

function colorGen(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}
