var path          = require('path');  
var express       = require('express');  
var passport      = require('passport');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');  
var session       = require('express-session');                    
var mongoose      = require('./mongo/mongoose.js').mongoose();
var user          = require('./mongo/user.js');

var MongoClient   = require('mongodb').MongoClient;
var assert        = require('assert');

// Init App
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(session({
    secret: 'supermegapalavrachavequedeviasersecretamastanogit',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize()); 
app.use(passport.session());

var LocalStrategy = require('passport-local').Strategy;

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.get('/', function(req, res){ res.send("login.html"); });
app.use('/', require('./routes/dash')  ); 

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port')); 

console.log('Node app is running on port', app.get('port'));