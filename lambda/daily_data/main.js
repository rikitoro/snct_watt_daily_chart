"use strict";

const request = require('request');
const _us     = require('underscore');

const original_data_path = "http://hirose.sendai-nct.ac.jp/~sue/wattmon/backups/";

console.log('Loading event');

exports.handler = (event, context) => {
  // url for buckup files
  const date = event.date ? event.date : '2016-01-01';
  const filename = generate_filename_from_date(date);
  const original_data_url = original_data_path + filename;
  console.log(original_data_url);

  // request buckup data
  request(original_data_url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let wattData = convert_to_wattData(body);
      wattData.original_data_url = original_data_url;
      context.done(null, wattData);
    } else {
      context.fail(null, {"error":{"message":"cannot obtain watt data."}});
    }
  });
};

/////////////////

function convert_to_wattData(body) {
  const dataList = body.split(/\s*\,\s*|\s+|\n/);
  const dataArranged = _us.groupBy(dataList, (data, i) => {return i % 4});
  const date = dataArranged[0][0];
  const timeList = dataArranged[1];
  const wattList = _us.map(dataArranged[3], (data) => {return parseInt(data)});

  return {time: timeList, watt: wattList, date: date};
}

/////////////////

function generate_filename_from_date(date) {
  return date + '.csv';
}