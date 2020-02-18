var express = require('express');
var mysql = require('./dbcon.js');
const path = require('path');

var app = express();
var handlebars = require('express-handlebars');

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

const PORT = process.argv[2] || 3000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('index')
});

app.get('/signup',function(req,res){
  res.render('signup');
});

app.get('/account',function(req,res){
  res.render('account');
});

app.get('/classes',function(req,res){
  res.render('classes');
});

app.get('/edit',function(req,res){
  res.render('edit');
});

app.get('/search',function(req,res){
  res.render('search');
});

app.get('/admin', function(req,res){
  res.render('admin');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(PORT, function(){
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
