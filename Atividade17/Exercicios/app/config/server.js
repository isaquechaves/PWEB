var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(bodyParser.urlencoded({extended:true}));

consign({cwd:'app'})
    .include('routes')
    .then('config/dbConnection.js')
    .then('models')
    .into(app);

module.exports  = app;

