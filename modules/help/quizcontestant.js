var http = require('http'),
	dbUrl = 'localhost/quiz',
	collections = ['questions', 'answers'];
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
var model=require('../../model/dataModel.js');
var db = require('mongojs').connect(dbUrl, collections);


exports.contesant=function(req, resp){
	resp.sendfile("./modules/help/quizcontestant.html");
	console.log("loading contesant page!!!");
	//resp.sendfile("mytest.html");
};


exports.quizList=function(req, resp){
	db.questions.find(function(err,questions){
		if(err){
		cosole.log("Problem while fetching data");
		} else{
			resp.end(JSON.stringify(questions));
			console.log(questions);
		}
	});
};


exports.quiz=function(req, resp){
	db.questions.find(function(err,questions){
		if(err){
		cosole.log("Problem while fetching data");
		} else{
			questions.forEach(function(question){
				resp.end(JSON.stringify(question));
				console.log(question);
			});
			
		}
	});
};


exports.saveQuiz= function(req, resp){
	console.log('SAVE:::::::'+req.body.mydata);
	var data = JSON.parse(req.body.mydata);
	var answers = new model.answers(1,data);
	db.answers.update(answers, {'$inc':{'token':1}}, {'upsert':true});
	//db.answers.save(answers);
	console.log("updated");
	resp.end('Updated');
};



