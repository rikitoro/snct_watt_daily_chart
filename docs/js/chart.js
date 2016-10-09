'use strict';

$(function() {
  //
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  //
  toastr.options.timeOut = 3000;
  toastr.options.closeButton = true;

  //
  let chart = new Highcharts.Chart(chart_options);

  // get today's data and draw chart
  $.getJSON(config.api_url.today)
  .done(function(res) {
    if (res.date) {
      const series_data = to_series_data(res, 'area');
      chart.addSeries(series_data);
    } else {
      toastr.error('本日の電力データを取得できませんでした');
    }
  });

  // get daily data and draw chart
  $("#btn_getdata").click(function() {
    const api_url = config.api_url.daily + $('#date').val();
    $.getJSON(api_url)
    .done(function(res) {
      if (res.date) {
        const series_data = to_series_data(res, 'line');
        chart.addSeries(series_data);
      } else {
        toastr.error('指定された日の電力データを取得できませんでした');
      }
    });
  });

});

function to_series_data(res, chart_type) {
  const data = _.zip(_.map(res.time,function(time) {return Date.parse('1970-01-01' + ' ' + time)}), res.watt);
  return {name: res.date, data: data, type: chart_type};
}