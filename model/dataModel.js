exports.user=function user(email,pass,role,status){
	this.email=email;
	this.pass=pass;
	this.role=role;
	this.status=status;
};

exports.options=function options(id,text,isCorrect){
	this.id=id;
	this.text=text;
	this.isCorrect=isCorrect;
};

exports.question=function question(id,type,difficulty,options,que){
	this.id=id;
	this.type=type;
	this.difficulty=difficulty;
	this.options=options;
	this.que=que;
};

exports.answers=function answers(token, answer){
	this.token=token;
	this.answer=answer;
};

exports.answer=function answer(que, ans){
	this.que=que;
	this.ans=ans;
};

exports.option=function option(id,text,isCorrect){
	this.id=id;
	this.text=text;
	this.isCorrect=isCorrect;
};

exports.quiz=function quiz(id,type,difficulty,options,que){
	this.id=id;
	this.type=type;
	this.difficulty=difficulty;
	this.options=options;
	this.que=que;
};

exports.quizSet=function quizSet(id,queIds,answer,attempt,lastUpdate,resultStatus,status){
	this.id=id;
	this.queIds=queIds;
	this.answer=answer;
	this.attempt=attempt;
	this.lastUpdate=lastUpdate;
	this.resultStatus=resultStatus;
	this.status=status;
};