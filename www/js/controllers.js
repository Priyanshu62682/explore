angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})




.controller('DashCtrl', function($scope,$state) {

	$scope.valuefront = true;
	$scope.value = false;
	$scope.votes = 0;
	$scope.downvotes = 0;
	$state.reguser = function(){
		 $scope.$apply(function(){
            $scope.valuefront = false;
			$scope.value = true;
        });
		$state.go('tab.OneAns');
	}
	$scope.upVote = function(s){
		s.votes++;
	}
	$scope.downVote = function(s){
		s.downvotes++;
	}
	$scope.gotoans = function(s){
		$rootScope.usname = s.q_detail;
		$state.go('tab.OneAns');
	}
	$scope.self = [{
    id: 1,
    q_detail: "so much fucked up with this project",
	status:0,
	location:"roorkee",
	asked_on:"2016-11-20",
	upvotes: 0,
	downvotes: 0
  }, {
    id: 2,
    q_detail: "so with this project",
	status:0,
	location:"roorkee",
	asked_on:"2016-11-20",
	upvotes: 0,
	downvotes: 0
  } ,{
    id: 3,
    q_detail: "so much this project",
	status:0,
	location:"Lucknow",
	asked_on:"2016-11-20",
	upvotes: 0,
	downvotes: 0
  }];


})
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AnswerCtrl', function($scope, $state, $http,$rootScope) {
		
	var QuestionTemplate= {  
	id:1,
	ans_id:1,
	answer_detail:"Rajma Chawal is the most famous food here.",
	validity:1,
	asked_on:"2016-11-20",
	upvotes:0,
	downvotes:0,
	q_id:1
	};		
	
	$scope.Questions=[ QuestionTemplate ];
	QuestionTemplate= {
	id:1,
	ans_id:1,
	answer_detail:"Rajma Chawal is the most famous food here.",
	validity:1,
	asked_on:"2016-11-20",
	upvotes:0,
	downvotes:0,
	q_id:1
	};
	$scope.Questions[1]=QuestionTemplate;
	//$scope.Questions[1].UpVote=99;
	//var UpVotes=0;
	$scope.onClickUpVote=function (x) {
			x.upvotes++;
	}
        $scope.onClickAnswer=function (x) {
			$rootScope.ansdet = x.answer_detail;
			$state.go('tab.AnswerView');
	}
	//var DownVotes=0;
	$scope.onClickDownVote=function (x) {
			 x.downvotes++;
	}
/*
	$http.get(" http://www.w3schools.com/angular/customers.php").then(function(response) {
        	$scope.myData = response.data.records;
   	 });	
	
/*	$scope.onClickAnswer=function () {
		 $http.get("customers.php").then(function(response) {
        	$scope.myData = response.data.records;
   	 });	
	}
		
*/	
})

.controller('AnswerViewCtrl', function($scope,$ionicPopup,$state,$rootScope) {
	
	
 	$scope.onClickReturn=function () {
			
			 $state.go('tab.Answer');
	}
	 $scope.onClickSave=function () {
			var AnswerText = document.getElementById("TextArea").value;
			$scope.Ans=AnswerText;
	}
	$scope.NoOfAnswers="99";
	var AnswerTemplate= {  
	id:1,
	ans_id:1,
	answer_detail:"Rajma Chawal is the most famous food here.",
	validity:1,
	asked_on:"2016-11-20",
	upvotes:0,
	downvotes:0,
	q_id:1 };		
	
	$scope.Answers=[ AnswerTemplate ];
	AnswerTemplate= {
	id:1,
	ans_id:1,
	answer_detail:"Rajma Chawal is the most famous food here.",
	validity:1,
	asked_on:"2016-11-20",
	upvotes:0,
	downvotes:0,
	q_id:1
	};
	$scope.Answers[1]=AnswerTemplate;
	
})

.controller('OneAnsCtrl', function($scope,$rootScope) {
	
	
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

});
