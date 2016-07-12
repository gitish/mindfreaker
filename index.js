var http = require('http'),
		fs = require("fs");
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
var quizcontestant=require("./modules/contestant/quizcontestant.js");
var admin=require("./modules/admin/admin.js");
var examiner=require("./modules/examiner/examiner.js");
var quizInsert=require("./modules/test/quizInsert.js");

var home=function(req,resp){
	fs.readFile("./index.html", function(err, data) {
		resp.writeHeader(200, {"Content-Type": "text/html"});
		resp.write(data);
		resp.end();
	});
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.listen(3040, function(){
	console.log('Server listening to port : 3040');
});
/* this redirection to home */
app.get("/",home);
/* This area is for contestant page*/
app.get("/contestant", quizcontestant.contesant);
app.get("/quiz",quizcontestant.quiz);
app.get("/quizList",quizcontestant.quizList);
app.post('/saveQuiz',quizcontestant.saveQuiz);
app.get("/examiner",examiner.loadpage);
app.get("/sendExamRequest",examiner.sendExamRequest);

/*to be removed later */
app.get("/uploadQuiz", quizInsert.uploadQuiz);

/* This area for admin page */
app.get("/entry", admin.entry);
app.post('/insert',admin.insert);
app.post('/insertForContestant',admin.insertForContestant);
app.get('/questions',admin.questions);
app.get('/load',admin.load);
app.get('/backup',admin.backup);
app.get('/find',admin.find);
app.get('/takeTest',admin.takeTest);
app.post("/getFromContestant",admin.getFromContestant);
/* This area is for other user */
