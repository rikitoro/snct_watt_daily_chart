'use strict;'

//
Highcharts.setOptions({
  global: {
    useUTC: false
  }
});
//
toastr.options.timeOut = 3000;
toastr.options.closeButton = true;

/////

$(function () {
  //
  let chart = new Highcharts.Chart(chart_options);

  // get today'data and draw chart
  $.getJSON(config.api_url.today)
  .done(res => {
    if (res.date) {
      const series_data = to_series_data(res, 'area');
      chart.addSeries(series_data);
    } else {
      toastr.info('データを取得できませんでした');
      //console.log("cannot obtain today's data");
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
        toastr.info('データを取得できませんでした');
        //console.log("cannot obtain daily data");
      }
    });
  });

});

function to_series_data(res, chart_type = 'line') {
  const data = _.zip(_.map(res.time,time => {return Date.parse('1970-01-01' + ' ' + time)}), res.watt);
  return {name: res.date, data: data, type: chart_type};
}





