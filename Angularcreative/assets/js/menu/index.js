angular.module('app.menu', [])
.config(function($stateProvider) {
  $stateProvider
    .state('menu', {
      url: '',
      templateUrl: 'assets/js/menu/main.html',
      controller: 'MenuController as ctrl'
    });
});
