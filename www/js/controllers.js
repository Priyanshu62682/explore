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


.controller('DashCtrl', function($scope) {

	$scope.self = [{
    username: "Heena Meena",
    questiondate: "26,December 2016" ,
	questioncontent: "so much fucked up with this project"
  }, {
    username: "Priyanshu",
    questiondate: "19,May 2016" ,
	questioncontent: "I Hate this Boy"
  } ,{
    username: "Apoorva",
    questiondate: "8,January 2016" ,
	questioncontent: "Work for the nation"
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

.controller('AnswerCtrl', function($scope, $state) {
		
	var QuestionTemplate= {  
	UserName:"Apoorva",
	Date:"19 July 2016",
	Question:"Do you believe in murphy's law?",
	UpVote:"7",
	DownVote:"9" };		
	
	$scope.Questions=[ QuestionTemplate ];
	QuestionTemplate= {
	UserName:"Priyanshu",
	Date:"9 Jan 2016",
	Question:"Why did Hillary Lose?",
	UpVote:"71",
	DownVote:"5"
	};
	$scope.Questions[1]=QuestionTemplate;

	/*$scope.Questions=[
	{  
	UserName:"Apoorva",
	Date:"19 July 2016",
	Question:"Do you believe in murphy's law?",
	UpVote:"7",
	DownVote:"9" }	,
	{
	UserName:"Priyanshu",
	Date:"9 Jan 2016",
	Question:"Why did Hillary Lose?",
	UpVote:"71",
	DownVote:"5"
	}
	];*/
	
        $scope.onClickAnswer=function () {
			 $state.go('tab.AnswerView');
	}
	$scope.onClickDownvote=function () {
			document.getElementById("demo").innerHTML = "Hello Dollyyyy."
	}
	
})

.controller('AnswerViewCtrl', function($scope,$ionicPopup) {
	$scope.onClickAnswerTheQuestion=function() {
			// When button is clicked, the popup will be shown...

     var promptPopup = $ionicPopup.prompt({
         title: 'Your Answer',
	 cssClass: 'my-custom-popup',
         template: 'Template text',
         inputType: 'text',
         inputPlaceholder: 'Placeholder'
      });
        
      promptPopup.then(function(res) {
         console.log(res);
      });   
   };
	
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
