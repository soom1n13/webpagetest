//426쪽부터 진짜 오백시간을 햇는데 안되서 못하겠습니다 ㅅ발


const express = require('express');
const app = express();

//body-parser 라이브러리 추가
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
    

//const db = require('node-mysql/lib/db');
app.set('view engine', 'ejs');


//const MongoClient = require('mongodb').MongoClient;
const url = 
'mongodb+srv://ulwnslo:1234@cluster0.odbemtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let mydb;



MongoClient.connect(url)
    .then(client => {
        console.log('Mongodb 연결 성공');
        mydb = client.db('myboard');
        // mydb.collection('post').find().toArray().then(result =>{
        //     console.log(result)
        // })
        app.listen(8080, function(){
            console.log('포트 8080으로 서버 대기중...');
        });
        
    })
    .catch(err => {
    console.log(err);
});


app.get('/list',function(req,res){
    mydb.collection('post').find().toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        res.render('list', { data : result });
        
    });
    //res.sendFile(__dirname + '/list.html');
    //res.render('list.ejs');
    //res.render('list', { data : result });
});

app.get('/enter', function(req,res){
    res.sendFile(__dirname + '/enter.html');
});


app.post('/save',function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);
    //몽고DB에 데이터 저장하기
    mydb.collection('post').insertOne(
        {title:req.body.title, content:req.body.content}
        ).then(result => {
            console.log(result);
            console.log('데이터 추가 성공');
        });
    res.send('데이터 추가 성공');
});



// app.post('/save',function(req, res){
//     console.log(req.body);
//     console.log("저장완료");
// });











//gpt가 써줌

// const express = require('express');
// const app = express();
// const { MongoClient } = require('mongodb');
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// const url = 'mongodb+srv://ulwnslo:1234@cluster0.odbemtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// let mydb;

// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(client => {
//     console.log('MongoDB 연결 성공');
//     mydb = client.db('myboard');
//     app.listen(8080, function () {
//       console.log('포트 8080으로 서버 대기중...');
//     });
//   })
//   .catch(err => {
//     console.error('MongoDB 연결 오류:', err);
//   });

// app.get('/list', function (req, res) {
//   console.log('/list 요청 받음');  // 로그 추가
//   if (!mydb) {
//     console.error('데이터베이스 연결이 초기화되지 않았습니다.');
//     return res.status(500).send('데이터베이스 연결 오류');
//   }
//   mydb.collection('post').find().toArray(function (err, result) {
//     if (err) {
//       console.error('데이터 조회 오류:', err);
//       return res.status(500).send('데이터 조회 오류');
//     }
//     console.log('데이터 조회 성공:', result);  // 추가 로그
//     res.render('list', { posts: result });
//   });
// });

// app.get('/enter', function (req, res) {
//   console.log('/enter 요청 받음');  // 로그 추가
//   res.sendFile(__dirname + '/enter.html', function (err) {
//     if (err) {
//       console.error('enter.html 파일 전송 오류:', err);  // 추가 로그
//       res.status(500).send('파일 전송 오류');
//     } else {
//       console.log('enter.html 파일 전송 성공');  // 추가 로그
//     }
//   });
// });

// app.post('/save', function (req, res) {
//   console.log('/save 요청 받음');  // 로그 추가
//   if (!mydb) {
//     console.error('데이터베이스 연결이 초기화되지 않았습니다.');
//     return res.status(500).send('데이터베이스 연결 오류');
//   }
//   console.log('요청 데이터:', req.body);  // 로그 추가
//   mydb.collection('post').insertOne(
//     { title: req.body.title, content: req.body.content }
//   ).then(result => {
//     console.log('데이터 추가 성공:', result);  // 추가 로그
//     res.redirect('/list'); // 데이터 추가 후 /list로 리디렉션
//   }).catch(err => {
//     console.error('데이터 추가 오류:', err);  // 추가 로그
//     res.status(500).send('데이터 추가 오류');
//   });
// });




