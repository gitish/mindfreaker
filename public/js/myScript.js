$(function() {
	var loadBody=function(uri){
		$.ajax({
			url : uri,
			type :"get",
			success : function(result) {
				$("#dvBody").html(result);
			}
		});
	}
	$("#help").click(function(){
		loadBody("/help");
	});
	$("#home").click(function(){
		loadBody("/main");
	});
	$("#oldQ").click(function(){
		loadBody("/oldQPage");
	});
	$('input[type="submit"]').attr('disabled', true);
	$("textarea").on('keyup', function(){
		$('input[type="submit"]').attr('disabled' , !($("#txtAnswer").val() != ''));
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

	var resetAll=function(){
		$("#txtName").val('');
		$("#txtAnswer").val('')
		$("#btnSubmit").attr('disabled',true);
	};
	loadBody("/main");
});

