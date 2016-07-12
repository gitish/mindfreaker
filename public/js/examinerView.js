
var examApp = angular.module('quizApp', []);

examApp.controller('examController',function($scope, $http){
	$scope.loadView = function(){
		alert("loadView method call !!!");
	};
	
	$scope.sendExamRequest = function(data){
		alert("sendExamRequest method call !!!" + data); 
	};
	
});











/*function itemsParseIdController($scope, $location) {
	alert("Please select any option");
  $scope.id=(/items\/(\d+)/.exec($location.absUrl())[1]);
}*/


/*var myapp = angular.module('examinerApp', []);
myapp.controller('examController', function ($scope, $http) {

     var formData = {
        firstname: "default",
        emailaddress: "default"
    };

    $scope.loadexam = function() {
    	alert("Please select any option");
    	console.log("load data....");
        formData = $scope.form;
    };

    $scope.sendExamRequest = function() {
        console.log("posting data....");
        formData = $scope.form;
        console.log(formData);
       
    };

 });*/
/*var app = angular.module('examinerApp',[]); // Taking Angular Application in Javascript Variable
app.controller('examController',function($scope, $http){
	$scope.load = function(){
			$scope.options = JSON.parse();
			$scope.finalList = [];
			$scope.submitButton = true;
			$scope.previousButton = false;
			$scope.nextButton = true;
			$scope.quizMessage = false;
	};	
	
	$scope.sendExamRequest = function() {
		console.log("sendExamRequest 1")
		   // var jdata = 'mydata='+JSON.stringify($scope.finalList);
			 var jdata = $scope.finalList;
			//$http.post('http://localhost:3000/saveQuiz', postData).success(function(data){
			 $http({
				method: 'POST',
				url:'/sendExamRequest',
				data:jdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(response) { 
				console.log('success');
				$scope.quizMessage = true;
				$('.quizMessage').text('Success!!');
			}).error(function(response) { 
				console.log('error');
				$scope.quizMessage = true;
				$('.quizMessage').text('Error!!');
			});
			 //return false;
		};
	
});
		
*/