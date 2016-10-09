const chart_options = {
  chart: {
    renderTo: 'container',
    type: 'line',// 表示するグラフのタイプを指定
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
    type: 'datetime',
    max: Date.parse('1970-01-01 19:00:00'),
    min: Date.parse('1970-01-01 06:00:00')
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
      label : { text : '使用電力上限(416.5[kW])'}
    }]
  },

  tooltip: {
    headerFormat: '{series.name}<br>',
    pointFormatter: function() {
       return new Date(this.x).toLocaleTimeString() + '<br>' + this.y +'[kW]';
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
  series: []
};
