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

    .controller('DashCtrl', function($scope,$state,$http,$ionicPopup,$timeout,$rootScope) {
    	$scope.data={};
        $rootScope.value = true;
//        var userid=$rootScope.super_user;
        var userid=8;       //change here userid
        var city="Delhi";   //change city here
//        var city=$rootScope.super_city;
        $scope.votes = 0;
	    //alert("damn");
        $scope.downvotes = 0;
        $scope.reguser = function(){
            if($scope.data.usercity==""||$scope.data.expertcity==""||$scope.data.username==""){
                alert("Invalid Data");
                return;
            }
    		$rootScope.value = false;
    		var req = {
                method: 'POST',
                url: 'http://172.26.42.212/register/'+$scope.data.username+'/'+$scope.data.usercity+'/',
                headers: {
                'Content-Type': 'application/json'
                },
            }
    		
    		$http(req).then(function (response) {
                $scope.userdata=response.data;
                try{
                    db.transaction(function(tx) {
                        tx.executeSql("INSERT INTO user_table (name, usr_id) VALUES (?,?)", [$scope.userdata.name, $scope.userdata.id], function(tx, res) {});	
                        tx.executeSql("select usr_id,name from user_table where id=1;", [], function(tx, res) {   }   );
                    });
                }  catch (error){
                alert(error);
                }
                var alertPopup = $ionicPopup.alert({
                title: ' ',
                template: 'Successfully Registered'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);

            }, function(response){
                alert("Please connect to internet");
            });
    	
    	
    	
    	}
        $scope.ask_question=function () {
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
            }, function(response){
                alert("Please connect to internet");
            });
            $scope.data.question="";
            var alertPopup = $ionicPopup.alert({
                title: 'Done..!!',
                template: 'Your question has been posted'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        
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
        var req = {
                method: 'GET',
                url: 'http://172.26.42.212/feed/'+userid+'/',
                headers: {
                'Content-Type': 'application/json'
                },
        }
        $http(req).then(function (response) {
				$scope.self = response.data;
		}, function(response){
            alert("No data found");
        });

    })
    .controller('ChatsCtrl', function($scope, Chats,$rootScope) {
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

    .controller('settingsCtrl', function($scope,$http,$ionicPopup,$timeout) {
        var fetchurl;
        userid=8;
        $scope.data={};
        $scope.change=function(){
            alert("calling");
        	if($scope.data.expertcity==""){
                fetchurl='http://172.26.42.212/addcity/'+userid+'/null/'+$scope.data.interestcity+'/';
            }
            else if($scope.data.interestcity==""){
                fetchurl='http://172.26.42.212/addcity/'+userid+'/'+$scope.data.expertcity+'/null/';
            }
            else
                fetchurl='http://172.26.42.212/addcity/'+userid+'/'+$scope.data.expertcity+'/'+$scope.data.interestcity+'/';

            var req = {
                method: 'POST',
                url: fetchurl,
                headers: {
                'Content-Type': 'application/json'
                    },

            }
            $http(req).then(function (response) {
                   // alert("okk");
                $Scope.response_data=response.data;
                try{
                    db.transaction(function(tx) {
                        tx.executeSql("INSERT INTO city_table (interest_city, expert_city) VALUES (?,?)", [data.interestcity, data.usercity],function(tx,res){alert(JSON.stringify(res))});	
                        tx.executeSql("select usr_id,name from user_table where id=1;", [], function(tx,res) { alert(JSON.stringify(res))});
                    });
                }  
                catch (error){
                alert(error);
                }	                


            }, function(response){
                alert("Please connect to internet");
            });	
	    }

    })



    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$rootScope) {
      $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AnswerCtrl', function($scope, $state, $http,$rootScope,$ionicPopup,$timeout) {
        $scope.Questions={};
        $scope.data={};
        $scope.go=function(){
            $state.go('tab.AnswerView');
        }
        var userid=8;
        var city="Delhi";
//        var userid=$rootScope.super_user;     //change user here
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
            }, function(response){
                alert("No data found");
            });
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.onClickUpVote=function (x) {
            x.upvotes++;
            var req = {
                method: 'GET',
                url: 'http://172.26.42.212/questionlike/'+userid+'/'+x.id+'/',
                headers: {
                'Content-Type': 'application/json'
                },
            }
    
            $http(req).then(function (response) {

             }, function(response){
                alert("Please connect to internet");
            });
        }
	$scope.goto_settings_ans=function () {
                $state.go('tab.settings_ans');
        }
        $scope.onClickAnswer=function (x) {
            $rootScope.question_passed=x;
            var req = {
            method: 'GET',
            url: 'http://172.26.42.212/answerslist/'+x.id+'/',
            headers: {
            'Content-Type': 'application/json'
                },

            }
            $http(req).then(function (response) {
            		
                    $rootScope.answerList=response.data;
                //    console.log($scope.routedata);
            }, function(response){
                alert("Please connect to internet");
            });
            
            $state.go('tab.AnswerView');
        }

        $scope.ask_question=function () {
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
            }, function(response){
                alert("Please connect to internet");
            });
            $scope.data.question="";
            var alertPopup = $ionicPopup.alert({
                title: ' ',
                template: 'Your question has been posted'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        }


        //var DownVotes=0;
        $scope.onClickDownVote=function (x) {
            x.downvotes++;
            var userid=8;
            var req = {
                method: 'GET',
                url: 'http://172.26.42.212/questiondislike/'+userid+'/'+x.id+'/',
                headers: {
                'Content-Type': 'application/json'
                },
            }
    
            $http(req).then(function (response) {

            }, function(response){
                alert("Please connect to internet");
            });
        }	
    })

    .controller('AnswerViewCtrl', function($scope,$ionicPopup,$state,$rootScope,$http,$timeout) {
        $scope.Answers = $rootScope.answerList;
        $scope.data={};
        $scope.Questions = $rootScope.question_passed;
        var userid=8;
    //  var userid=$rootScope.super_user;
    //  var city=$rootScope.super_city;
        $scope.onClickReturn=function () {
                 $state.go('tab.Answer');
        }
         $scope.onClickAnswer=function () {
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
            }, function(response){
                alert("Please connect to internet");
            });
            var alertPopup = $ionicPopup.alert({
                title: 'Done..!!',
                template: 'Your answer has been posted'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
            AnswerText="";
            var requested = {
            method: 'GET',
            url: 'http://172.26.42.212/answerslist/'+$scope.Questions.id+'/',
            headers: {
            'Content-Type': 'application/json'
                },
            }
            $http(requested).then(function (response) {
                    
                    $scope.Answers=response.data;
                //    console.log($scope.routedata);
            }, function(response){
                alert("Please connect to internet");
            });
        }	

        $scope.onClickUpvote=function (x) {
            alert("upvote");
            x.upvotes++;
            var req = {
                method: 'GET',
                url: 'http://172.26.42.212/answerlike/'+userid+'/'+x.id+'/',
                headers: {
                'Content-Type': 'application/json'
                },
            }
    
            $http(req).then(function (response) {

                $scope.Questions = response.data;
//                  alert(JSON.stringify($rootScope.question_list ));
             }, function(response){
                alert("Please connect to internet");
            });
        }

        $scope.onClickDownvote=function (x) {
            alert("upvote");
            x.downvotes++;
            var req = {
                method: 'GET',
                url: 'http://172.26.42.212/answerdislike/'+userid+'/'+x.id+'/',
                headers: {
                'Content-Type': 'application/json'
                },
            }
    
            $http(req).then(function (response) {

                $scope.Questions = response.data;
//                  alert(JSON.stringify($rootScope.question_list ));
            }, function(response){
                alert("Please connect to internet");
            });
        }   
    })

    .controller('OneAnsCtrl', function($scope,$rootScope) {


    })

    .controller('AccountCtrl', function($scope,$http,$state) {
        var userid=8;
    //  var userid=$rootScope.super_user;

          $scope.doRefresh=function(){
            var req = {
                method: 'GET',
                url: 'http://172.26.42.212/notify_ques/'+userid+'/',
                headers: {
                'Content-Type': 'application/json'
                },
            }
            $http(req).then(function (response) {

                    $scope.Questions = response.data;
//                  alert(JSON.stringify($rootScope.question_list ));
            }, function(response){
                alert("Please connect to internet");
            });
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.Answerpage=function (q) {
            $rootScope.question_passed=q;
            var req = {
            method: 'GET',
            url: 'http://172.26.42.212/answerslist/'+q.id+'/',
            headers: {
            'Content-Type': 'application/json'
                },
            }
            $http(req).then(function (response) {
                    $rootScope.answerList=response.data;
                //    console.log($scope.routedata);
            }, function(response){
                alert("Please connect to internet");
            });
            $state.go('tab.AnswerView');
        }

    });

