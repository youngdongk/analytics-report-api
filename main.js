/*
* main.js
*/
if (process.argv.length < 5) {
    console.log('Usage: node main.js dimension metric YYYY-MM-DD YYYY-MM-DD');
    process.exit(1);
}
 
let dname = process.argv[2]; //ディメンション
let mname = process.argv[3]; //指標
let start = process.argv[4]; //レポート開始日
let end = process.argv[5]; //レポート終了日
 
const {google} = require('googleapis');
const analyticsreporting = google.analyticsreporting({
  version: 'v4'
});
 
let apikey = require('./my-sample-project.json'); //サービスアカウントの認証キーJSONのファイル名に書き換えて下さい
let client = new google.auth.JWT(apikey.client_email, null, apikey.private_key, ["https://www.googleapis.com/auth/analytics"], null);
 
let runReport = async() => {
    let res = await analyticsreporting.reports.batchGet({
        resource: {
            reportRequests: [{
                "viewId": "123456789", //GAのビューIDに書き換えてください
                "dateRanges": [{
                    "startDate": start,
                    "endDate": end
                }],
                "dimensions": [{
                    "name": dname
                }],
                "metrics": [{
                    "expression": mname
                }]
            }]
        },
        auth: client
    });
    let d = res.data.reports[0].data.rows
    for (let i=0; i<d.length; i++) {
        console.log(d[i].dimensions[0] + '\t' + d[i].dimensions[1]);
    }
};
client.authorize().then(c => runReport());
