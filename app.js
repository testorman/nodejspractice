var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

//MongoDB 접속
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //promise waning이 뜨지 않는다. 
 
var db = mongoose.connection;  // db connection
db.on('error', console.error);
db.once('open', function(){
    console.log('mongodb connect');
});
 
mongoose.connect('mongodb://127.0.0.1:27017/fastcampus', { useMongoClient: true });



var admin = require('./routes/admin');

var app = express()
var port = 3000;

//확장자가 ejs 로 끝나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname,'views'));
console.log(__dirname);
app.set('view engine', 'ejs');

// 미들웨어 셋팅 라우팅 셋팅 이전에 설정해줘야 함.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res){
    res.send('first app');
}); // get (사용자가 URL 을 치고 들어온다.)

app.use('/admin', admin);

app.listen(port, function(){
    console.log('Express listening on port', port);
});//terminal

