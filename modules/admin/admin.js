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
		//callback feature
		currentQuestion(req,res,showResult);
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
exports.submitAnswer=function (req,res) {
	var userName=req.body.userName;
	//callback feature
	currentQuestion(req,res,saveData);
	res.end("Thanks " + userName);
};
var saveData=function(req,res){
	var userName=req.body.userName;
	var answer=req.body.ans;
	console.log(req.body);
	console.log(userName);
	console.log(answer);
	var obj=new dm.user(userName,answer);
	var fileToUpdate="./data/"+result+".json";
	try{
		fs.readFile(fileToUpdate, 'utf-8', function(err, data) {
			console.log(oldObj);
			if(data==undefined||data=='undefined'){
				var arr=[];
				arr.push(obj);
				writeToFile(fileToUpdate,arr);
			}else{
				var oldObj=JSON.parse(data);
				console.log(oldObj);
				oldObj.push(obj);
				writeToFile(fileToUpdate,oldObj);
			}
		});
	}catch(e){
		console.log("Error occurred");
	}
};
var writeToFile=function (fileName,obj){
	fs.writeFile(fileName,JSON.stringify(obj),function(err){
		if(err!=undefined){
			return console.log(err);
		}
		console.log("File save successfully");
	});
};
var showResult=function(req,res){
	res.sendfile("./public/games/"+result+".html");
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