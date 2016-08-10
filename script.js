/* globals angular */
var arjuna = angular.module('arjuna', ['ngRoute']);

arjuna.config(function ($routeProvider) {
  $routeProvider
    .when('/signup', {
      templateUrl: './pages/signup.html',
      controller: 'signupController'
    })

    .when('/login', {
      templateUrl: './pages/login.html',
      controller: 'loginController'
    })
    .when('/logout', {
      templateUrl: './pages/logout.html',
      controller: 'logoutController'
    })
    .when('/promos', {
      templateUrl: './pages/promo.html',
      controller: 'promoController'
    });
});

// Sign-up controller
arjuna.controller('signupController', ['$scope', '$http', function ($scope, $http) {
  console.log('Signup Controller initialized...');

  $scope.runSignup = function () {
    $http.post('https://arjuna.herokuapp.com/signup/', {
      email: $scope.email,
      password: $scope.password
    })
    .then(function onSuccess (response) {
      console.log('Signup successfull!');
      window.location = '/user';
    })
    .catch(function onError (err) {
      console.log('Error: ' + err);
    });
  };
}]);

// Log-in controller
arjuna.controller('loginController', ['$scope', '$http', function ($scope, $http) {
  console.log('Login Controller initialized...');
  $scope.login = function () {
    $scope.email;
    $scope.password;

    $http.post('https://arjuna.herokuapp.com/login', {
      email: $scope.email,
      password: $scope.password
    }).then(function onSuccess (response) {
      console.log('login from angular success!');
      $scope.message = 'Logged-in!';
    })
    .catch(function onError (err) {
      console.log('Error: ' + err);
    });
  };
}]);

// Log-out controller
arjuna.controller('logoutController', ['$scope', '$http', function ($scope, $http) {
  $scope.message = 'Log-out page';
}]);

// Promos
arjuna.controller('promoController', ['$scope', '$http', function ($scope, $http) {
  console.log('Promos page initialized...');
  $http.get('https://arjuna.herokuapp.com/promos')
    .then(function onSuccess (promos) {
      $scope.message = 'Logged-in! Hence you can see Promos!';
      $scope.allPromos = promos;
    })
    .catch(function onError (err) {
      console.log('Error: ' + err);
      $scope.message = 'Error! Not Logged-in';
    });
}]);
