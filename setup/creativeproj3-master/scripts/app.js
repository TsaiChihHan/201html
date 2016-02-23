angular.module('Game', ['ui.router']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      }).state('game', {
        url: '/game',
        templateUrl: '/game.html',
        controller: 'GameCtrl'
      }).state('score', {
        url: '/score',
        templateUrl: '/score.html',
        controller: 'ScoreCtrl'
      });
    $urlRouterProvider.otherwise('home');
}])

.controller('MainCtrl', ['$scope',function($scope){

}])
.controller('GameCtrl', ['$scope',function($scope){
	
}])
.controller('ScoreCtrl', ['$scope',function($scope){
	
}]);
