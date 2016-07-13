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
		var file=Math.floor((Math.random() * 10) + 1);
		res.sendfile("./public/games/"+file+".html");
	}catch(e){
		res.end("failed");
	}
}