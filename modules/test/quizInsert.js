var dbUrl='localhost/quiz';
var collections=['questions'];
var db=require('mongojs').connect(dbUrl,collections);

var dataModel=require("../../model/dataModel.js");

exports.uploadQuiz=function(req, resp){
	var options1=[];
	options1[0]=new dataModel.options("Abstraction",false);
	options1[1]=new dataModel.options("Polymorphism",false);
	options1[2]=new dataModel.options("Encapsulation",false);
	options1[3]=new dataModel.options("Global variables",true);
	
	var question1=new dataModel.question("1","JAVA","1",options1,"Which one is not supported by OOP?");
	
	db.questions.save(question1);
	
	var options2=[];
	options2[0]=new dataModel.options("Platform-dependant",false);
	options2[1]=new dataModel.options("Platform-independant",true);
	options2[2]=new dataModel.options("Interpreter-dependant",false);
	options2[3]=new dataModel.options("Interpreter-independant",false);
	
	var question2=new dataModel.question("2","JAVA","1",options2,"Java programs are:");
	
	db.questions.save(question2);
	
	var options3=[];
	options3[0]=new dataModel.options("Set",false);
	options3[1]=new dataModel.options("Linked List",false);
	options3[2]=new dataModel.options("Vector",true);
	options3[3]=new dataModel.options("WeakHashmap",false);
	
	var question3=new dataModel.question("3","JAVA","1",options3,"Which of the following is synchronised?");
	
	db.questions.save(question3);
	
	resp.sendfile("./modules/contestant/quizcontestant.html");
}