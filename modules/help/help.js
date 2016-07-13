var http = require('http');
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');

exports.f1=function(req, res){
	res.sendfile("./modules/help/help.html");
};