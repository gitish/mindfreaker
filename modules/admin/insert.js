var http = require('http');
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
//give your page here js
var a=require("./quizcontestant.js");

var dbUrl='localhost/quiz';
var collections=['questions'];
var db=require('mongojs').connect(dbUrl,collections);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.listen(3040, function(){
	console.log('Server listening to port : 3040');
});

app.get("/entry", function(req, resp){
	//resp.sendfile("quizcontestant.html");
	resp.sendfile("entry.html");	
});

app.post('/insert',function(req, resp){
	console.log(req.body);
	var data = req.body.mydata;
	db.questions.save(JSON.parse(data));
	console.log("done");
});

app.get("/contestant", a.contesant);
app.get("/quiz",a.quiz);