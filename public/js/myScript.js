$(function() {
	var loadBody=function(uri,panel,callback){
		var dvHtml=panel==undefined?"#dvBody":panel;
		$.ajax({
			url : uri,
			type :"get",
			success : function(result) {
				if(callback!=undefined){
					callback(result);
				}else{
					$(dvHtml).html(result);
				}
			}
		});
	}
	$("#help").click(function(){
		loadBody("/help");
	});
	$("#home").click(function(){
		loadBody("/");
	});
	$("#oldQPage").click(function(){
		loadBody("/oldQPage");
	});
	$('input[type="submit"]').attr('disabled', true);
	$("textarea").on('keyup', function(){
		$('input[type="submit"]').attr('disabled' , !($("#txtAnswer").val() != ''));
	});

	$('body').on('click','span.queClass',function () {
		loadBody("/old?id="+$(this).data('val'),"#dvPanel1",loadQnAData);
	});
	$("#btnSubmit").click(function () {
		$.ajax({
			url : "/submitAnswer",
			type :"post",
			data : {
				"userName": $("#txtName").val(),
				"ans": $("#txtAnswer").val()
			},
			success : function(result) {
				$("#dvPanel1").html("<h4>"+result+"</h4>");
				resetAll();
			}
		});
	});
	var loadQnAData=function(result){
		$('#dvQue').html("<h3>Question</h3>"+result.que);
		$('#dvAns').html("<h3>Answer</h3>"+result.ans);
	};
	var resetAll=function(){
		$("#txtName").val('');
		$("#txtAnswer").val('')
		$("#btnSubmit").attr('disabled',true);
	};
	loadBody("/main");
});

