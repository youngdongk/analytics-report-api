# Google Analytics レポートAPI

Node.jsで実装してます。  
node.js v10以降で動作します。  
git cloneして使って下さい。  
  
main.jsの以下の箇所を修正して使って下さい。  
  
18行目:  
```
let apikey = require('./my-sample-project.json'); //サービスアカウントの認証キーJSONのファイル名に書き換えて下さい
```
  
26行目:  
```
"viewId": "123456789", //GAのビューIDに書き換えてください
```

## 使い方

1. まずはGCPのプロジェクトを作成してください。  
既存のプロジェクトを使ってもOKですし、新たにプロジェクトを作成してもOKです。  
  
2. 続いてGCPプロジェクトのReportingAPIを有効化します。

Google API コンソールで有効化出来ます。
https://console.developers.google.com/flows/enableapi?apiid=analyticsreporting.googleapis.com&credential=client_key&hl=ja&pli=1  
  
Google Analytics ReportingAPIの実行に使うプロジェクトを選び、有効化します。  
「認証情報」の項目で「サービスアカウント」が作成されるので、「新たなキーを作成」してください。(JSON形式を選んで下さい)  
  
作成したJSONキーをダウンロードして、main.jsと同じディレクトリに置いてください。  
  
3. サービスアカウントをGoogleAnalyticsのユーザーとして追加してください。  
サービスアカウントのIDは「@developer.gserviceaccount.com」というメールアドレス形式なので、そのまま追加出来ます。


## 実行方法  

実行syntaxは以下のとおりです。  

```
$ node main.js {dimension} {metric} {YYYY-MM-DD} {YYYY-MM-DD} > {output}.csv
```

dimension と metric の名前は下記のページに掲載されてます。   
  
https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/  
  
例えば、ページ別のページビュー数を2020年12月の1ヶ月分を取得したい場合はこうです。  
  
```
$ node main.js ga:pagePath ga:pageviews 2020-12-01 2020-12-31 > output.csv
```
