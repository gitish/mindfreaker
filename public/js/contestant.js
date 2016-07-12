var answer=function answer(que, ans){
	this.que=que;
	this.ans=ans;
};

var currentQuestion = 0;
var displayQuestion = 0;
var correctAnswers = 0;


var app = angular.module('quizApp',[]); // Taking Angular Application in Javascript Variable
app.controller('quizController',function($scope, $http){
	$scope.load = function(){
		$http.get('./quizList').success(function(questions){
			$scope.quizList = questions;
			$scope.quiz = questions[currentQuestion];
			
			var quiz = questions[currentQuestion];
			$scope.options = JSON.parse(quiz.options);
			
			$scope.finalList = [];
			$scope.submitButton = false;
			$scope.previousButton = false;
			$scope.nextButton = true;
			$scope.quizMessage = false;
			$scope.queNo = 1;
		});
	};
	$scope.previous = function(){
		var questions = $scope.quizList;
		displayQuestion--;
		currentQuestion--;
		$scope.quiz = questions[displayQuestion];
		$scope.options = JSON
		.parse(questions[displayQuestion].options);
		console.log("displayQuestion::"+displayQuestion);
		if(displayQuestion === 0) {
			$scope.previousButton = false;
		}
		$scope.submitButton = false;
		$scope.nextButton = true;
		$scope.queNo--;
		console.log('$scope.queNo::'+$scope.queNo);
		$scope.finalList.splice($scope.queNo-1,1);
		console.log("Previous |finallist----"
				+ JSON.stringify($scope.finalList));
	};
	

	$scope.next = function() {
		var questions = $scope.quizList, selOption = '';
	
		$scope.ans = '';
		selOption = $scope.selected;

		if (selOption === '' | selOption === undefined) {
			alert("Please select any option");
		} else {
			$scope.ans = selOption;
			$scope.previousButton = true;
			
			var jsonArr = new answer(
					questions[currentQuestion].id,
					$scope.ans);
			$scope.finalList.push(jsonArr);
			
			if (displayQuestion < questions.length-1) {
				displayQuestion++;
				console.log("display next question");
				$scope.quiz = questions[displayQuestion];
				$scope.options = JSON
						.parse(questions[displayQuestion].options);
				currentQuestion++;
				$scope.queNo++;
			} else {
				$scope.submitButton = true;
				$scope.nextButton = false;
				console.log(" quiz over");
			}
			console.log("finallist----"
					+ JSON.stringify($scope.finalList));
			$scope.selected = '';
		}

	};
	
	
	$scope.saveQuiz = function() {
	
		console.log('saving');
		// var jdata = $scope.finalList;
		var jdata = 'mydata='+JSON.stringify($scope.finalList); 
		 console.log('saveQuiz::'+jdata);
		 $http({
			method: 'POST',
			url:'/saveQuiz',
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
	};
		 //return false;
	
	
	$scope.uploadQuiz = function() {
		
		$http.get('./uploadQuiz').success(function(questions){
			console.log('success');
			$scope.result = "Questions uploaded successfully. Click here to load!!";
			$scope.previousButton = false;
			});
	}; 
	
});
		
