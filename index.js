var http = require('http'),
		fs = require("fs");
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
var admin=require("./modules/admin/admin.js");
var help=require("./modules/help/help.js");

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
app.get("/main",admin.main);
/* This area is for help page*/
app.get("/help", help.f1);
/* This area is for other user */
