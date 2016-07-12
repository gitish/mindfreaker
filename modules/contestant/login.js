var http = require('http'),
	dbUrl = 'localhost/quiz',
	collections = ['users'];
var express = require('express'),
	app = express();
var bodyParser = require('body-parser')
var db = require('mongojs').connect(dbUrl, collections);

/*app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});*/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.listen(3000, function(){
	console.log('Server listening to port : 3000');
});

app.get("/", function(req, resp){
	//resp.sendfile("quizcontestant.html");
	resp.sendfile("login.html");	
});

app.post('/login',function(req, resp){
	console.log("login");
	//resp.header("Access-Control-Allow-Origin", "http://localhost");
	//resp.header("Access-Control-Allow-Methods", "GET, POST");
	console.log(req.body.mydata);
	var data = req.body.mydata;
	//db.users.save(JSON.parse(data));
	
	console.log('saved!!!');
	//resp.send('/quizer');
	resp.send({redirect: '/quizer'});
	//req.method = 'get'; 
	//  resp.redirect('/quizer'); 
	//resp.statusCode = 302; 
	//resp.setHeader("Location", "http://localhost:3000/quizer");
	//resp.end();
	//resp.redirect('http://localhost:3000/quizer');
	//resp.contentType('application/json');
	//var data = JSON.stringify('http://localhost:3000/quizer')
	//resp.header('Content-Length', data.length);
	//resp.end(data);
});

app.get("/users",function(req, resp){
	db.users.find(function(err,users){
		if(err){
		cosole.log("Problem while fetching data");
		} else{
			resp.end(JSON.stringify(users));
			console.log(users);
		}
	});
});