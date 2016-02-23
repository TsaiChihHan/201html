var app = angular.module('News', ['ui.router']);


app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        template:
       "<div class='container-fluid'>\
          <div class='row center'>\
            <div class='col-md-6 col-md-offset-3'>\
              <h1>Please, enter your name<h1>\
              <form ng-submit='submitName()' style = 'margin-top30px;'>\
                <input type='text' ng-model='formContent'></input>\
                <button type='submit'>Submit</button>\
              </form>\
            </div>\
          </div>\
        </div>",
        //controller: 'MainCtrl'
      }).state('game', {
        url: '/game',
        template:
        "<div class='row'>\
        <div class='col-sm-2'></div>\
        <div class='col-sm-8'>\
        <div class='embed-responsive embed-responsive-16by9'>\
        <iframe class='embed-responsive-item' style='border:none' scrolling='no' marginwidth='0' marginheight='0' src='game.html'></iframe>\
        </div>\
        </div>\
        <div class='col-sm-2'></div>\
        </div>"

        //controller: 'PostCtrl'
      }).state('score', {
        url: '/score',
        template:
        "<div class='row'>\
        <div class='col-sm-2'></div>\
        <div class='col-sm-8'>\
        <div class='embed-responsive embed-responsive-16by9'>\
        <iframe class='embed-responsive-item' style='border:none' scrolling='no' marginwidth='0' marginheight='0' src='creativeproj3-master/index.html'></iframe>\
        </div>\
        </div>\
        <div class='col-sm-2'></div>\
        </div>"
      });
    $urlRouterProvider.otherwise('home');
  }
]);

app.controller('MainCtrl',['$scope',function($scope) {
  $scope.name="Welcome!";
  $scope.submitName = function() {
    if(this.formContent === "") {return ;}
    console.log(this.formContent);
    $scope.name = "Welcome, " + this.formContent + "!";
    console.log($scope.name);
    this.formContent = "";
  };
}]);

app.controller('ExampleController', ['$scope', function($scope) {
  $scope.list = [];
  $scope.text = 'hello';
  $scope.submit = function() {
    if ($scope.text) {
      $scope.list.push(this.text);
      $scope.text = '';
    }
  };
}]);
app.directive('gamescript', function() {
  return {
    restrict: 'E',
    templateUrl: 'http://ec2-54-201-219-34.us-west-2.compute.amazonaws.com/201html/setup/assets/html/gamescript.html'
  };
});
