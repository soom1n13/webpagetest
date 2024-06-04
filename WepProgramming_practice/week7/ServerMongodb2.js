const mongoclient = require('mongodb').MongoClient;
const url = 
'mongodb+srv://ulwnslo:1234@cluster0.odbemtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoclient.connect(url)
    .then(client => {
        app.listen(8080, function(){
            console.log('포트 8080으로 서버 대기중...');
        });
}).catch(err => {
    console.log(err);
});

const express = require('express');
const app = express();