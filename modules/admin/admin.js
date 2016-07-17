var http = require('http'),
	fs = require("fs");
var express = require('express'),
	app = express();
var nodemailer = require('nodemailer');
var dm=require('../../model/dataModel.js');
var quiz=require("../quiz/quiz.js");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

exports.showUsersAnswer=function (req,res) {
	//callback feature
	currentQuestion(req,res,showCurrentAnswer);
	
};
exports.setNew=function(req,res){
	var currQue={"current":req.query.id,"count":5};
	var fileToUpdate="./public/games/app.json";
	writeToFile(fileToUpdate,currQue);
	res.end("Done");
};
var showCurrentAnswer=function(req,res){
	res.sendfile("./data/"+result+".json");
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