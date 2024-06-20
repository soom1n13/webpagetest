// const mongoclient = require('mongodb').MongoClient;
// const url = 
// 'mongodb+srv://ulwnslo:1234@cluster0.odbemtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// let mydb;
// mongoclient.connect('mongodb+srv://ulwnslo:1234@cluster0.odbemtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', function(err, client){
//     if(err){console.log(err);}
    
//      mydb = client.db('myboard');
//     // mydb.collection('profile').find().toArray().then(result =>{
//     //     console.log(result)
//     // })

//     app.listen(8080, function(){
//         console.log("포트 8080으로 서버 대기중...")
//     });
// })

// //     .catch(err => {  
// //     console.log(err);
// // });

// const express = require('express');
// const app = express();


// app.get('/list',function(req,res){
//     mydb.collection('post').find().toArray().then(result => {
//         console.log('result');
//     })
// });


const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const url = 'mongodb+srv://ulwnslo:1234@cluster0.odbemtd.mongodb.net/myboard?retryWrites=true&w=majority';
let mydb;

MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log('몽고DB 접속 실패:', err);
        return;
    }
    console.log('몽고DB 접속 성공');

    mydb = client.db('myboard');

    app.listen(8080, function() {
        console.log('포트 8080으로 서버 대기중...');
    });
});

app.use(express.urlencoded({ extended: true }));

app.get('/list', function(req, res) {
    if (!mydb) {
        return res.status(500).send('데이터베이스 연결이 아직 완료되지 않았습니다.');
    }
    mydb.collection('post').find().toArray().then(result => {
        res.json(result);
    }).catch(err => {
        console.error('데이터 조회 중 오류 발생:', err);
        res.status(500).send('데이터 조회 중 오류 발생');
    });
});


