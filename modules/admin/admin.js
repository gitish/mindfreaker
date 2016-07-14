var http = require('http'),
	 fs = require("fs");
var express = require('express'),
	app = express();
var dm=require('../../model/dataModel.js');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var result=0;
exports.main=function(req,res){
	try{
		load(req,res,showResult);
	}catch(e){
		console.log(e);
		res.end("failed");
	}
};
exports.old=function(req,res){
	try{
		result=req.query.id;
		showResult(req,res);
	}catch(e){
		console.log(e);
		res.end("failed");
	}
};
var showResult=function(req,res){
	console.log("game count="+result);
	console.log("Random file is : " + result +".html");
	res.sendfile("./public/games/"+result+".html");
};
var load=function(req,res,fu){
	try{
		fs.readFile("./public/games/app.json", 'utf-8', function(err, data) {
			console.log(data);
			result=JSON.parse(data).current;
			console.log(result);
			fu(req,res);
		});
	}catch(e){
		console.log("No data found");
	}
};