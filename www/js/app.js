// Ionic Starter App
var db;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $cordovaSQLite,$timeout,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $timeout(function( $cordovaSQLite){
        try {
           db = window.sqlitePlugin.openDatabase({ name: "my.db", location: 1 });  
	   //alert("fine");
	   db.transaction(function(tx) {
               // tx.executeSql('DROP TABLE IF EXISTS user_table');
                tx.executeSql('CREATE TABLE IF NOT EXISTS user_table (id integer primary key, name text, usr_id integer)');		
                tx.executeSql('CREATE TABLE IF NOT EXISTS city_table (id integer primary key, interest_city text, expert_city text)');

  	
		tx.executeSql("select * from user_table;",[], function(tx,res) { /*alert( JSON.stringify(res.rows))*/;
		if(res.rows.length==0){
		$rootScope.value = true;}
		else{
		$rootScope.value = false;
		$rootScope.super_user=res.rows.item(0).usr_id;
//    $rootScope.super_city=
		}
		 } );
				
		
           });

        }
        catch (error) {
            alert(error);
	}
        
     },0);

  });


})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  
  
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
	controller: 'TabCtrl'
  })
	
  // Each tab has its own nav history stack:
	
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.OneAns', {
    url: '/OneAns',
    views: {
      'tab-dash': {
        templateUrl: 'templates/OneAns.html',
        controller: 'OneAnsCtrl'
      }
    }
  })
  
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.settings_ans', {
      url: '/settings',
      views: {
        'tab-Answer': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })

.state('tab.settings_feed', {
      url: '/settings',
      views: {
        'tab-dash': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })

   .state('tab.Answer', {
      url: '/Answer',
      views: {
        'tab-Answer': {
          templateUrl: 'templates/Answer-page.html',
          controller: 'AnswerCtrl'
        }
      }
    })

.state('tab.AnswerView', {
      url:'/AnswerView',
      views: {
        'tab-Answer': {
          templateUrl: 'templates/AnswerView.html',
          controller: 'AnswerViewCtrl'
        }
      }
    })
.state('tab.view-answer-feed', {
      url:'/view-answer',
      views: {
        'tab-dash': {
          templateUrl: 'templates/view-answer.html',
          controller: 'view-answerCtrl'
        }
      }
    })
.state('tab.view-answer-account', {
      url:'/view-answer',
      views: {
        'tab-account': {
          templateUrl: 'templates/view-answer.html',
          controller: 'view-answerCtrl'
        }
      }
    })


  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
