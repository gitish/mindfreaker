var http = require('http'),
	 fs = require("fs");
var express = require('express'),
	app = express();
var dm=require('../../model/dataModel.js');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var result=0;
exports.main=function(req,res){
	try{
		load(req,res,showResult);
	}catch(e){
		console.log(e);
		res.end("failed");
	}
}
var showResult=function(req,res){
	console.log("game count="+result);
	var file=Math.floor((Math.random() * result) + 1);
	console.log("Random file is : " + file +".html");
	res.sendfile("./public/games/"+file+".html");
}
var load=function(req,res,fu){
	try{
		fs.readFile("./public/games/app.json", 'utf-8', function(err, data) {
			console.log(data);
			result=JSON.parse(data).count;
			console.log(result);
			fu(req,res);
		});
	}catch(e){
		console.log("No data found");
	}
}