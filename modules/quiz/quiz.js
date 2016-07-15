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
		showQnAResult(req,res);
	}catch(e){
		console.log(e);
		res.end("failed");
	}
};
exports.oldQPage=function(req,res){
	//callback feature
	currentQuestion(req,res,createOldQnAPage);
};

exports.submitAnswer=function (req,res) {
	var userName=req.body.userName;
	//callback feature
	currentQuestion(req,res,saveData);
	res.end("Thanks " + userName);
};

var createOldQnAPage=function (req,res) {
	var htmlData='';
	for(var i=1;i<result;i++){
		htmlData=htmlData+"<span class='queClass' data-val='"+i+"' href='#'>Q"+i+"</span> &nbsp;"
	}
	htmlData=htmlData+"<div id='dvQue' class='row2'></div><div id='dvAns' class='row2'></div>";
	res.end(htmlData);
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
var showQnAResult=function (req,res) {
	var qFile="./public/games/"+result+".html";
	var aFile="./public/games/"+result+"_a.html";
	var que,ans;
	try{
		fs.readFile(qFile, 'utf-8', function(err, data) {
			que=data;
			fs.readFile(aFile, 'utf-8', function(err, data1) {
				ans=data1;
				var obj=new dm.qna(que,ans);
				res.send(obj);
			});
		});
	}catch(e){
		console.log("No data found");
	}
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