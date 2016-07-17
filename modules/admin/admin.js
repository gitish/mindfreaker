var http = require('http'),
	fs = require("fs");
var express = require('express'),
	app = express();
var dm=require('../../model/dataModel.js');
var quiz=require("../quiz/quiz.js");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var result, appFile="./public/games/app.json";
exports.showUsersAnswer=function (req,res) {
	//callback feature
	currentQuestion(req,res,showCurrentAnswer);
};
exports.next=function (req,res) {
	//callback feature
	currentQuestion(req,res,inc);
};
exports.previous=function (req,res) {
	//callback feature
	currentQuestion(req,res,dec);
};
exports.setNew=function(req,res){
	var currQue={"current":req.query.id,"count":5};
	writeToFile(fileToUpdate,currQue);
	res.end("Done");
};
exports.current=function (req,res) {
	currentQuestion(req,res,disp);
};
var disp=function (req,res) {
	res.end(result.current);
};
var inc=function(req,res){
	result.current=""+(parseInt(result.current)+1);
	writeToFile(appFile,result);
	disp(req,res);
};
var dec=function(req,res){
	result.current=""+(parseInt(result.current)-1);
	writeToFile(appFile,result);
	disp(req,res);
};
var showCurrentAnswer=function(req,res){
	res.sendfile("./data/"+result.current+".json");
};

var writeToFile=function (fileName,obj){
	fs.writeFile(fileName,JSON.stringify(obj),function(err){
		if(err!=undefined){
			return console.log(err);
		}
		console.log("File save successfully");
	});
};
var currentQuestion=function(req, res, fu){
	try{
		fs.readFile(appFile, 'utf-8', function(err, data) {
			console.log(data);
			result=JSON.parse(data);
			console.log(result);
			fu(req,res);
		});
	}catch(e){
		console.log("No data found");
	}
};