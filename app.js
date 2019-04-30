var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();
// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogSystem', {useNewUrlParser:true});
// 引入express-session模块
const session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//定义同源协议CORS
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials",true); //带cookies7     
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
 };
 
app.all('*',allowCrossDomain);//运用跨域的中间件

// 在路由中间件加载前定义session中间件
app.use(session({
  name: "UserID",
  secret:"dw3243dw",//混淆加密钥匙
  cookie: {maxAge: 1000*3600 }, //1小时
  resave: true,//是否在更新页面的时候从新设置cookie
  saveUninitialized: true
}))

// 定义路由中间件
const metaRouter = require('./routes/meta');
app.use('/meta',metaRouter);
const registerRouter = require('./routes/register');
app.use('/register',registerRouter);
const loginRouter = require('./routes/login')
app.use('/login',loginRouter);
const articleRouter = require('./routes/article');
app.use('/article',articleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
