var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(express.static('public'));

app.get('/index',function(req,res){
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

// app.listen(app.get('port'), function(){
//   console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
// });

module.exports = app;