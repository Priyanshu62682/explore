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


.controller('DashCtrl', function($scope,$http) {

	$scope.votes = 0;
	$scope.downvotes = 0;
	$scope.upVote = function(s){
		s.votes++;
	}
	$scope.downVote = function($event){
		s.downvotes++;
	}

	var req = {
	    method: 'GET',
	    url: 'http://localhost:8000/questions/',
	    headers: {
	    'Content-Type': 'application/json'
	    },

	}
    $http(req).then(function (response) {
        $scope.self=response.data;
        console.log(JSON.stringify($scope.self));
    });




	$scope.self = [{
    username: "Heena Meena",
    questiondate: "26,December 2016" ,
	questioncontent: "so much fucked up with this project",
	votes: 0,
	downvotes: 0
  }, {
    username: "Priyanshu",
    questiondate: "19,May 2016" ,
	questioncontent: "I Hate this Boy",
	votes: 0,
	downvotes: 0
  } ,{
    username: "Apoorva",
    questiondate: "8,January 2016" ,
	questioncontent: "Work for the nation",
	votes: 0,
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

.controller('AnswerCtrl', function($scope, $state, $http) {
		
	var QuestionTemplate= {  
	UserName:"Apoorva",
	Date:"19 July 2016",
	Question:"Do you believe in murphy's law?",
	UpVote:"7",
	DownVote:"9",
	QuestionId:"99" };		
	
	$scope.Questions=[ QuestionTemplate ];
	QuestionTemplate= {
	UserName:"Priyanshu",
	Date:"9 Jan 2016",
	Question:"Why did Hillary Lose?",
	UpVote:"71",
	DownVote:"5",
	QuestionId:"88"
	};
	$scope.Questions[1]=QuestionTemplate;
	//$scope.Questions[1].UpVote=99;
	//var UpVotes=0;
	$scope.onClickUpVote=function () {
			alert("kk");
			 $scope.Questions[0].UpVote=88;
	}
        $scope.onClickAnswer=function () {
			 $state.go('tab.AnswerView');
	}
	//var DownVotes=0;
	$scope.onClickDownVote=function () {
			 $scope.Questions[0].DownVote=DownVote+1;
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

.controller('AnswerViewCtrl', function($scope,$ionicPopup,$state) {
	
	$scope.UserName="Apoorva",
	$scope.Date="19 July 2016",
	$scope.Question="Do you believe in murphy's law?",
	$scope.UpVote="7",
	$scope.DownVote="9"	
	
	
 	$scope.onClickReturn=function () {
			 $state.go('tab.Answer');
	}
	 $scope.onClickSave=function () {
			var AnswerText = document.getElementById("TextArea").value;
			$scope.Ans=AnswerText;
	}
	$scope.NoOfAnswers="99";
	var AnswerTemplate= {  
	UserName:"Apoorva",
	Date:"19 July 2016",
	Answer:"I believe that anything that can go wrong, will go wrong.",
	UpVote:"7",
	DownVote:"9" };		
	
	$scope.Answers=[ AnswerTemplate ];
	AnswerTemplate= {
	UserName:"Priyanshu",
	Date:"9 Jan 2016",
	Answer:"She wasn't the ray of hope those stupid people needed her to be.",
	UpVote:"71",
	DownVote:"5"
	};
	$scope.Answers[1]=AnswerTemplate;
	
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
