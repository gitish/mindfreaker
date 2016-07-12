var http = require('http'),
	 fs = require("fs"),
	dbUrl = 'localhost/quiz',
	collections = ['questions','contestant'];
var express = require('express'),
	app = express();
var dm=require('../../model/dataModel.js');
var bodyParser = require('body-parser');
var db = require('mongojs').connect(dbUrl, collections);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.entry=function(req, resp){
	resp.sendfile("./modules/admin/entry.html");	
};

exports.find=function(req,resp){
	var options = {
		host : 'http://localhost',
		path : '/quizList',
		port : 3040,
		method : 'GET'
	}

	var nodemailer = require('nodemailer');
	var ses = require('nodemailer-ses-transport');
	var transporter = nodemailer.createTransport(ses({
	    accessKeyId: 'AWSACCESSKEY',
	    secretAccessKey: 'AWS/Secret/key'
	}));
	transporter.sendMail({
	    from: 'mr.shailendra.shail@gmail.com',
	    to: 'sshail@sapient.com',
	    subject: 'hello',
	    text: 'hello world!'
	});
	resp.end("create aws accesskey and secret key to send mail");
	/*
	var request = http.request(options, function(response){
		var body = ""
		response.on('data', function(data) {
			body += data;
		});
		response.on('end', function() {
			res.send(JSON.parse(body));
		});
	});
	request.on('error', function(e) {
		console.log('Problem with request: ' + e.message);
	});
	request.end();*/
};

exports.insertForContestant=function(req, resp){
	var qId='quiz_' + new Date().getTime();
	var qBody = req.body;
	var qList=qBody.qList;
	var quizSet1=new dm.quizSet(qId,qList,"",0,new Date(),'','Active');
	db.contestant.save(quizSet1);
	resp.end("success");
};

exports.insert=function(req, resp){
	var data = req.body;
	var count=0;
	try{
		db.questions.count(function(err,cnt){
			count=cnt;
			count++;
			var qz=new dm.quiz(count,data.type,data.difficulty,data.options,data.que);
			db.questions.save(qz);
			resp.end("success");
		});
	}catch(e){
		resp.end("failed");
	}
};

exports.questions=function(req,resp){
	db.questions.find(function(err,ques){
		if(err){
			cosole.log("Problem while fetching data");
		} else{
			console.log(ques);
			var data=JSON.stringify(ques);
			console.log(data);
			resp.end(data);
			
		}
	});
};

exports.load=function(req,resp){
	try{
		db.questions.count(function(err,cnt){
			if(cnt==0){
				console.log("Load data file");
				var remaining = '';
				fs.readFile("./model/test.json", 'utf-8', function(err, data) {
					console.log(data);
					remaining += data;
				    var index = remaining.indexOf('\n');
				    var lc=1;
					while (index > -1) {
						var line = remaining.substring(0, index);
						saveToDb(line);
						remaining = remaining.substring(index + 1);
						index = remaining.indexOf('\n');
						lc++;
				    }
				    saveToDb(remaining);
				});
			}
			resp.sendfile("./modules/admin/init.html");
		});
	}catch(e){
		resp.end("failed");
	}
}

var saveToDb=function(line){
	if(line.trim()!=''){
		console.log("saving..\n" + line);
		db.questions.save(JSON.parse(line));
		console.log("saved!!");
	}
}
exports.backup=function(req,resp){
	db.questions.find(function(err,ques){
		if(err){
			cosole.log("Problem while fetching data");
		} else{
			console.log(ques);
			var fileData="";
			ques.forEach(function(question){
				var data=JSON.stringify(question);
				var res = data.replace(/"_id":"[^,]*,/g, "");
				console.log(res+"\n\n");
				fileData=fileData+res+"\n";
			});
			fs.writeFile("./model/test.json", fileData, function(err) {
				if(err) {
					return console.log(err);
				}
				console.log("The file was saved!");
			});
			resp.end("Saved");
		}
	});
}
exports.takeTest=function(req,resp){
	resp.sendfile("./modules/admin/takeTest.html");
}

exports.getFromContestant=function(req,resp){
	var data = req.body;
	console.log(data);
	if(data.quizId!=''){
		db.contestant.findOne({'id':data.quizId},function(err,quizNext){
			var queIds=quizNext.queIds;
			console.log(queIds);
			var iarr=queIds.split(',').map(Number);
			db.questions.find({'id':{$in:iarr}},function(err,questions){
				console.log(questions);
				console.log(err);
				resp.end(JSON.stringify(questions));
			});
		});
	}
}