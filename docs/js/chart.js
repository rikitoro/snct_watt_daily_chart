$(function () {
  const api_endpoint = "https://m92j3c58q3.execute-api.ap-northeast-1.amazonaws.com/prod/";

  $("#btn").click(() => {
    const api_resource_name = api_endpoint + 'daily-data/' + $('#date').val();
    console.log(api_resource_name);
    $.get(api_resource_name)
    .done(res => {
      const wattData = padding_wattData(res);
      //console.log(wattData);
      const chartOptions = create_chartOptions(wattData);
      const chart = new  Highcharts.Chart(chartOptions);
    });

  });
});


function padding_wattData(res) {  // dataText = "2016/Sep/17 06:00:01, #0#, 88 2016/Sep/17 06:05:01, #1#, 94 ..."
  const date = res.date;
  // padding time, watt data
  const max_data_length = 156;
  const padding_length = max_data_length - res.time.length;
  const time_padding = Array(padding_length).fill("");
  const watt_padding = Array(padding_length).fill(null);
  const time_padded = res.time.concat(time_padding);
  const watt_padded = res.watt.concat(watt_padding);

  return {time: time_padded, watt: watt_padded, date: date};
}



function create_chartOptions(wattData) {
  const chartOptions = {
    chart: {
        renderTo: 'container',// 表示する要素のIDを指定
        type: 'area',// 表示するグラフのタイプを指定
        marginRight: 50,
        marginBottom: 100,
        zoomType: "x"
    },
    // グラフのタイトル
    title: {
        text: '仙台高専広瀬キャンパス電力モニター',
        x: -20 //center
    },
    // 横軸の設定
    xAxis: {
      categories: _.map(wattData.time,(time) => { return time.slice(0,5); }) // hh:mm
    },
    // 縦軸の設定
    yAxis: {
      title: { text: '使用電力[kW]'},
      max: 500,
      min: 0,
      tickInterval: 100,
      //
      plotLines : [{
        value : 416.5,
        color : 'red',
        dashStyle : 'dash',
        width : 1,
        label : {
          text : '使用電力上限(416.5[kW])'
        }
      }]

    },
    // グラフの上にカーソルをあわせた時に表示するtooptipの内容を設定
    tooltip: {
        formatter: function() {
                return this.x +': '+ this.y +'[kW]';
        }
    },
    legend: {
        //layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        //x: -10,
        //y: 100,
        borderWidth: 0
    },
    // データ
    series: [{
      name: wattData.date,
      data: wattData.watt
    }]
  };

  return chartOptions;

}
