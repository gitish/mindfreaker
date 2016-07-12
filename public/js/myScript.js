var option=function option(id,text,isCorrect){
	this.id=id;
	this.text=text;
	this.isCorrect=isCorrect;
};

var quiz=function quiz(type,difficulty,options,que){
	this.type=type;
	this.difficulty=difficulty;
	this.options=options;
	this.que=que;
};

var quizList=[];
var generateQuizId=function(){
	var qList = "";
	$('input[type=checkbox]').each(function () {
		var id=$(this).val();
		if(isFinite(id) && this.checked){
			if(qList.trim()!=''){
				qList=qList+",";
			}
			qList=qList + id;
		}
	});
	if(qList.trim()!=''){
		$.ajax({
			url : "insertForContestant",
			type :"post",
			data : {'qList':qList},
			success : function(result) {
				alert(result+"!!");
			}
		});
	}
};

var startQuiz=function(){
	var quizId=$("#txtQuizId").val();
	$.ajax({
		url : "getFromContestant",
		type :"post",
		data : {'quizId':quizId},
		success : function(result) {
			$('<div />').addClass("quizDialog").html(result).dialog();
			//alert(result);
		}
	});
};

$(function() {
	$("#btnSubmit").click(function(){
		var type,difficulty,que;
		var options=[];
		que=$("#Q").val();
		type=$("#T").val();
		difficulty=$("#D").val();
		options.push(new option(1,$("#O1").val(),$("#C1").attr("checked")));
		options.push(new option(2,$("#O2").val(),$("#C2").attr("checked")));
		options.push(new option(3,$("#O3").val(),$("#C3").attr("checked")));
		options.push(new option(4,$("#O4").val(),$("#C4").attr("checked")));

		var formdata = new quiz(type,difficulty,JSON.stringify(options),que);
		if(isValidFormData(formdata)){
			$.ajax({
				url : "insert",
				type :"post",
				data : formdata,
				success : function(result) {
					alert(result+"!!");
				}
			});
		} else{
			alert("Use jquery validator");
		}
		
	});
	$("#btnListQue").click(function(){
		var template = '<ul>'+
				'{{#questions}}'+
					'<li><input type="checkbox" class="checkBoxWidth" value="{{id}}"/>{{que}}</li>' +
				'{{/questions}}' +
				'<input type="button" value="generate quiz id" onClick="generateQuizId();"/>'+
				'</ul>';    
		$.ajax({
			url : "quizList",
			type :"get",
			success : function(result) {
				console.log(result);
				quizList=JSON.parse("{\"questions\":"+result+"}");
				var info = Mustache.to_html(template, quizList);
			    $('#dvResult').html(info);
				
			}
		});
	});

	$("#btnBackup").click(function(){
		$.ajax({
			url : "backup",
			type :"get",
			success : function(result) {
				$("#dvResult").html(result);
			}
		});
	});

	$("#btnTest").click(function(){
		$.ajax({
			url : "takeTest",
			type :"get",
			success : function(result) {
				$("#dvResult").html(result);
			}
		});
	});

	$("#lnkSettings").click(function(){
		$.ajax( {
			url : "entry",
			type :"get",
			success : function(result) {
				$("#dvBody").html(result);
				$("#tabs").tabs();
				$("#btnSubmit").button();
			}
		});
	});
	$("#contestant").click(function(){
		$.ajax( {
			url : "contestant",
			type :"get",
			success : function(result) {
				$("#dvBody").html(result);
			}
		});
	});
	$("#lnkExaminer").click(function(){
		$.ajax( {
			url : "examiner",
			type :"get",
			success : function(result) {
				$("#dvBody").html(result);
			}
		});
	});
	$("#lnkHelp").click(function(){
		$.ajax( {
			url : "help",
			type :"get",
			success : function(result) {
				$("#dvBody").html(result);
			}
		});
	});
	var isValidFormData=function(formdata){
		var isValid=false;
		if(formdata.que.trim()==""){
			return false;
		}
		var opts=JSON.parse(formdata.options);
		for(var i=0;i<opts.length;i++){
			if(!isValid){
				isValid=opts[i].isCorrect;
			}
		}
		return isValid;
	}
});

