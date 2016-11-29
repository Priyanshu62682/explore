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

	.controller('TabCtrl' , function($scope,$http,$rootScope){
	       
		
	})

    .controller('DashCtrl', function($scope,$state,$http) {
    	$scope.data={};
        $scope.value = true;
        $scope.votes = 0;
        $scope.downvotes = 0;
        $scope.reguser = function(){
		$scope.value = false;
		var req = {
            method: 'POST',
            url: 'http://172.26.42.212/register/'+$scope.data.username+'/'+$scope.data.usercity+'/',
            headers: {
            'Content-Type': 'application/json'
            },
        }
		
		$http(req).then(function (response) {
                $scope.userdata=response.data;
            //    console.log($scope.routedata);
        });
	alert($scope.data.usercity );
        var firstname = $scope.data.username;
        var lastname =  $scope.data.usercity;

	var query = "INSERT INTO people (firstname,lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
		alert("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
            alert("err");
        });


	}
	$scope.goto_settings_feed=function () {
                $state.go('tab.settings_feed');
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
                url: 'http://172.26.42.212/feed/8/',
                headers: {
                'Content-Type': 'application/json'
                },

            }
            $http(req).then(function (response) {
					$scope.self = response.data;
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

    .controller('settingsCtrl', function($scope) {
      $scope.change=function(){
		 var req = {
            method: 'POST',
            url: 'http://172.26.42.212/cityadd/'+userid+'/'+data.usercity+'/'+data.interestcity+'/',
            headers: {
            'Content-Type': 'application/json'
                },

            }
            $http(req).then(function (response) {
                    
                    $Scope.response_data=response.data;
                //    console.log($scope.routedata);
            });	
	}

    })



    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
      $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AnswerCtrl', function($scope, $state, $http,$rootScope) {

        $scope.data={};
        $scope.go=function(){
            $state.go('tab.AnswerView');
        }
        var userid=8;
        $scope.doRefresh=function(){
            var req = {
                method: 'GET',
                url: 'http://172.26.42.212/answer_feed/'+userid+'/',
                headers: {
                'Content-Type': 'application/json'
                },
            }
        
            $http(req).then(function (response) {

                    $scope.Questions = response.data;
//                  alert(JSON.stringify($rootScope.question_list ));
            });
            $scope.$broadcast('scroll.refreshComplete');
        }
//        $scope.Questions = $rootScope.question_list; 
        $scope.onClickUpVote=function (x) {
                x.upvotes++;
        }
	$scope.goto_settings_ans=function () {
                $state.go('tab.settings_ans');
        }
        $scope.onClickAnswer=function (x) {
            $rootScope.question_passed=x;
	    url: 'http://172.26.42.212/answerslist/'+x.id+'/';
		var res = encodeURIComponent(url);
            var req = {
            method: 'GET',
            //url: 'http://172.26.42.212/answerslist/'+x.id+'/',
	    url: res,
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

        $scope.ask_question=function () {
            userid=9;
            city="roorkee";
            var req = {
            method: 'POST',
            url: 'http://172.26.42.212/questionpost/'+userid+'/'+$scope.data.question+'/'+city+'/',
            headers: {
            'Content-Type': 'application/json'
                },

            }
            $http(req).then(function (response) {
                    
                    $Scope.response_data=response.data;
                //    console.log($scope.routedata);
            });
            $scope.data.question="";
            $http(req).then(function (response) {
                    $scope.userdata=response.data;
                //    console.log($scope.routedata);
            });
            var alertPopup = $ionicPopup.alert({
                title: 'Done..!!',
                template: 'Your question has been posted'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        
        }


        //var DownVotes=0;
        $scope.onClickDownVote=function (x) {
                 x.downvotes++;
            }	
    })

    .controller('AnswerViewCtrl', function($scope,$ionicPopup,$state,$rootScope,$http,$timeout) {
        $scope.Answers = $rootScope.answerList;
        $scope.data={}
        $scope.Questions = $rootScope.question_passed;
        $scope.currDate = new Date();
        $scope.onClickReturn=function () {
                 $state.go('tab.Answer');
        }
         $scope.onClickAnswer=function () {
            
            var userid=9;
            var AnswerText = document.getElementById("TextArea").value;
            var req = {
                method: 'POST',
                url: 'http://172.26.42.212/answerpost/'+AnswerText+'/'+$scope.Questions.id+'/'+userid+'/',
                headers: {
                'Content-Type': 'application/json'
                },
            }

            $http(req).then(function (response) {
                    $scope.userdata=response.data;
                //    console.log($scope.routedata);
            });
            var alertPopup = $ionicPopup.alert({
                title: 'Done..!!',
                template: 'Your answer has been posted'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);

        }	
    })

    .controller('OneAnsCtrl', function($scope,$rootScope) {


    })

    .controller('AccountCtrl', function($scope) {
      $scope.settings = {
        enableFriends: true
      };

    });

