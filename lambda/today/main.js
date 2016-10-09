const request = require('request');
const _us     = require('underscore');

const original_data_url = "http://hirose.sendai-nct.ac.jp/~sue/wattmon/5min.csv"

console.log('Loading event');

exports.handler = function(event, context) {
  request(original_data_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const wattData = convert_to_wattData(body);
      context.done(null, wattData);
    }
  })
};

function convert_to_wattData(body) {
  // body...
  const dataList = body.split(/\s*\,\s*|\s+|\n/);
  const dataArranged = _us.groupBy(dataList, (data, i) => {return i % 4});
  const date = dataArranged[0][0];
  const timeList = dataArranged[1];
  const wattList = _us.map(dataArranged[3], (data) => {return parseInt(data)});

  return {time: timeList, watt: wattList, date: date, original_data_url: original_data_url};
}