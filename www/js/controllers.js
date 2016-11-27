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


    .controller('DashCtrl', function($scope,$state,$http) {

        $scope.value = true;
        $scope.votes = 0;
        $scope.downvotes = 0;
        $scope.reguser = function(){
		$scope.value = false;
		var req = {
            method: 'POST',
            url: 'http://172.20.18.158/register/'+$scope.data.username+'/',
            headers: {
            'Content-Type': 'application/json'
            },
        }
		
		$http(req).then(function (response) {
                $scope.userdata=response.data;
            //    console.log($scope.routedata);
        });
	/*	var req = {
			method: 'GET',
			url: 'http://172.26.40.219/feed/'+req+'/',
			headers:{
			'Content-Type' : 'application/json'
			},
		}*/
	}
        $scope.upVote = function(s){
            s.upvotes++;
        }
        $scope.downVote = function(s){
            s.downvotes++;
        }
        $scope.gotoans = function(s){
            $rootScope.usname = s.q_detail;
            $state.go('tab.OneAns');
        }

        //http request
        var user=2;
        var req = {
                method: 'GET',
                url: 'http://172.20.18.158/feed/3/',
                headers: {
                'Content-Type': 'application/json'
                },

            }
            $http(req).then(function (response) {
                    $scope.self=response.data;
                //    console.log($scope.routedata);
            });


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

        var tobeaccessed;
        $scope.Questions=tobeaccessed;
        $scope.onClickUpVote=function (x) {
                x.upvotes++;
        }
        $scope.onClickAnswer=function (x) {
            $rootScope.ansdet = x.answer_detail;
            var req = {
            method: 'GET',
            url: 'http://172.20.18.158/answerslist/x.id/',
            headers: {
            'Content-Type': 'application/json'
                },

            }
            $http(req).then(function (response) {
                    $rootScope.answerList=response.data;
                //    console.log($scope.routedata);
            });
                $state.go('tab.AnswerView');
        }
        //var DownVotes=0;
        $scope.onClickDownVote=function (x) {
                 x.downvotes++;
            }	
    })

    .controller('AnswerViewCtrl', function($scope,$ionicPopup,$state,$rootScope) {


        $scope.onClickReturn=function () {
                 $state.go('tab.Answer');
        }
         $scope.onClickSave=function () {
                var AnswerText = document.getElementById("TextArea").value;
                $scope.Ans=AnswerText;
        }	
        $scope.Answers = $rootScope.answerList;
        $scope.Questions = $rootScope.x;

    })

    .controller('OneAnsCtrl', function($scope,$rootScope) {


    })

    .controller('AccountCtrl', function($scope) {
      $scope.settings = {
        enableFriends: true
      };

    });

