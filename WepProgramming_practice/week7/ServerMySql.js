var mysql = require("mysql");
var cinn = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "1234",
    datebase: "myboard",
});

conn.connect();

connect.query("select*from post", function(err, rows, field){
    if(err) throw err;
    console.log(rows);
});

const express = require('express');
const app = express();

// app.listen(8080, function(){
//     console.log("포트 8080으로 서버 대기중...")
// });

// app.get('/book', function(req, res){
//     res.send('도서 목록 관련 페이지입니다.');
// })

// app.get('/', function(req, res){
//     res.send(
//         '<html>\
//         <body>\
//         <h1>홈입니다.</h1>\
//         <marquee>이창현님 반갑습니다.</marquee>\
//         </body>\
//         </html>'
//     );
// })

app.get('/list', function(req, res){
connect.query("select*from post", function(err, row, fields){
        if(err) throw err;
        console.log(rows);
    });
});
