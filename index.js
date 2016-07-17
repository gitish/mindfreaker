var http = require('http'),
		fs = require("fs");
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
var quiz=require("./modules/quiz/quiz.js");
var admin=require("./modules/admin/admin.js");
var help=require("./modules/help/help.js");

var home=function(req,resp){
	fs.readFile("./index.html", function(err, data) {
		resp.writeHeader(200, {"Content-Type": "text/html"});
		resp.write(data);
		resp.end();
	});
};

app.set('port', (process.env.PORT || 3055));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function(){
	console.log('Server listening to port : '+app.get('port'));
});
/* this section handle all quiz related path */
app.get("/",home);
app.get("/main",quiz.main);
app.get("/oldQPage",quiz.oldQPage);
app.get("/old",quiz.old);
app.post("/submitAnswer",quiz.submitAnswer);
app.get("/showWinner",quiz.showWinner);

/* This section handle all admin related path */
app.get("/showAllAnswer",admin.showUsersAnswer);
app.get("/setNew",admin.setNew);

/* This section is for help page*/
app.get("/help", help.f1);