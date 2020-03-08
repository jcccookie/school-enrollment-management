var express = require('express');
var mysql = require('./dbcon.js');
const path = require('path');

var app = express();
var handlebars = require('express-handlebars');

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.set('port', process.argv[2]);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set mysql
app.set('mysql', mysql);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('index')
});

app.get('/account',function(req,res){
  res.render('account');
});

app.use('/classes', require('./classes.js'));

app.get('/edit',function(req,res){
  res.render('edit');
});

app.get('/search',function(req,res){
  res.render('search');
});

app.use('/admin', require('./admin.js'));

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

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});