# 仙台高専広瀬キャンパス電力グラフ

- https://rikitoro.github.io/snct_watt_daily_chart/index.html
- http://wat-chart.s3-website-ap-northeast-1.amazonaws.com/
- http://hirose.sendai-nct.ac.jp/~sue/wattmon/graphview.html

## デプロイ
### Amazon Lamdba
/lambda/today と/lambda/daily_data をAmazon Lambdaにデプロイする。

```
$ cd lambda/today
$ npm install
$ zip -r main.zip main.js node_modules/
```

main.zipをAWS Lambda functionへアップロードする。

/lambda/daily_data も同様にアップロードする。

### Amazon API Gateway

- リソース名 today で/lambda/todayの結果を返すようにする
- リソース名 daily-data/{date} で/lambda/daily_dataの結果を返すようにする