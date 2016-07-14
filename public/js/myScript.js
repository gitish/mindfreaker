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
	loadBody("/main");
});

