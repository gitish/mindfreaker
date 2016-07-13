var http = require('http'),
	 fs = require("fs");
var express = require('express'),
	app = express();
var dm=require('../../model/dataModel.js');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.main=function(req,res){
	try{
		res.sendfile("./public/games/1.html");
	}catch(e){
		res.end("failed");
	}
}