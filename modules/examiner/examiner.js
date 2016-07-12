var http = require('http'),
	dbUrl = 'localhost/quiz',
	collections = ['applicate'];
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
var db = require('mongojs').connect(dbUrl, collections);


	exports.loadpage=function(req, resp){
	
		resp.sendfile("./modules/examiner/examinerPage.html")
	};


	exports.sendExamRequest= function(req, resp){
		alert("sendExamRequest method call !!!");
		console.log("sendExamRequest");
		//resp.header("Access-Control-Allow-Origin", "http://localhost");
		//resp.header("Access-Control-Allow-Methods", "GET, POST");
		console.log(req);
		//var data = JSON.parse(req.body);
		//var data = req.body;
		//db.answer.save([{"que":"Which one is not supported by OOP?","options":[{"text":"Abstraction","isCorrect":false},{"text":"Polymorphism","isCorrect":false},{"text":"Encapsulation","isCorrect":false},{"text":"Global variables","isCorrect":true}]},{"que":"Which of the following is synchronised?","options":[{"text":"Set","isCorrect":false},{"text":"Linked List","isCorrect":false},{"text":"Vector","isCorrect":true},{"text":"WeakHashmap","isCorrect":false}]},{"que":"Java programs are:","options":[{"text":"Platform-dependant","isCorrect":false},{"text":"Platform-independant","isCorrect":true},{"text":"Interpreter-dependant","isCorrect":false},{"text":"Interpreter-independant","isCorrect":false}]}]);
		//db.answer.save(data);
		console.log("updated");
		/*db.questions.update(
				{_id:req.body.mydata.id,'options.text':req.body.mydata.selOption},
				{$set :{'options.isCorrect':'Y' }}
		);*/
		resp.end('done');
	};

	

