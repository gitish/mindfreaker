var http=require("http"),
    fs = require("fs");
var reqMap={"./entry":"./entry.html"};
var actionMap={"./insert":require("./insert.js")};
var mapData={"css":"text/css","js":"text/javascript","html":"text/html"};
var readFile=true;
function welcomeMsg(req,resp){
	var uri="." + req.url;
	if(uri.indexOf("?")>0){
		uri=uri.substr(0,uri.indexOf("?"));
	}
	var reqMapUri=reqMap[uri];
	var action=actionMap[uri];
	var fileToOpen="";
	var contentType="";

	if(req.url === "/") {
		fileToOpen="./index.html";
	}else if(reqMapUri != undefined){
		fileToOpen=reqMapUri;
	}else if(action !=undefined){
		action.execute(req,resp);
		readFile=false;
	}
	else{
		console.log("Uri:: " + uri);
		var ext = uri.substr(uri.lastIndexOf(".")+1, uri.length);
		if(ext==="ico"){
			return;
		}
		fileToOpen=uri;
		contentType=mapData[ext];
	}
	if(readFile){
		fs.readFile(fileToOpen, function(err, data) {
			resp.writeHeader(200, {"Content-Type": contentType});
			resp.write(data);
			resp.end();
		});
	}
}

http.createServer(welcomeMsg).listen(3040);