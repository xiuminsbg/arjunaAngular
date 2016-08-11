/* globals angular */
var arjuna = angular.module('arjuna', ['ngRoute']);

arjuna.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'addController'
    })
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

arjuna.controller('addController', ['$scope', '$http', '$route', function ($scope, $http, $route) {
  $scope.promoTitle = '';
  $scope.promoAmount = '';
  $scope.promoDate = '';
  $scope.promoDetail = '';
  $scope.addPromo = function () {
    $http.post('https://arjuna.herokuapp.com/promo/add', {promoTitle: $scope.promoTitle, promoAmount: $scope.promoAmount, promoDate: $scope.promoDate, promoDetail: $scope.promoDetail})
      .success(function (promos) {
        $scope.promoTitle = '';
        $scope.promoAmount = '';
        $scope.promoDate = '';
        $scope.promoDetail = '';
        $route.reload();
        $scope.allPromos = promos;
      });
  };
}]);

// Sign-up controller
arjuna.controller('signupController', ['$scope', '$http', function ($scope, $http) {
  console.log('Signup Controller initialized...');

  $scope.runSignup = function () {
    $http.post('https://arjuna.herokuapp.com/signup', {
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
arjuna.controller('loginController', ['$scope', '$location', '$http', function ($scope, $location, $http) {
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
      window.localStorage.email = $scope.email;
      window.localStorage.password = $scope.password;
      $location.url = '/promos';
    })
    .catch(function onError (err) {
      console.log('Error: ' + err);
    });
  };
}]);

// Log-out controller
arjuna.controller('logoutController', ['$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {
  $scope.message = 'Log-out page';
  $http.get('https://arjuna.herokuapp.com/logout')
    .then(function onSuccess () {
      console.log('logged out');
      window.localStorage.clear();
      $location.url = '/login';
    });
}]);

// Promos
arjuna.controller('promoController', ['$scope', '$http', '$route', function ($scope, $http, $route) {
  console.log('Promos page initialized...');
  if (window.localStorage.email && window.localStorage.password) {
    // GET All Promos
    $http.get('https://arjuna.herokuapp.com/promos')
      .success(function (promos) {
        $scope.allPromos = promos;
        $scope.message = 'Logged-in! Hence you can see Promos!';
      })
      .error(function (err) {
        console.log('Error: ' + err);
        $scope.message = 'Error! Not Logged-in';
      });

    // ADD a Promo
    // $http.post('https://arjuna.herokuapp.com/promo/add')
    //   .success(function (promos) {
    //     $scope.allPromos = promos;
    //     $scope.message = 'Logged-in! Hence you can see Promos!';
    //   })
    //   .error(function (err) {
    //     console.log('Error: ' + err);
    //     $scope.message = 'Error! Not Logged-in';
    //   });

    // Delete a promo
    $scope.delPromo = function (data) {
      $http.delete('https://arjuna.herokuapp.com/promo/delete/' + data)
        .success(function (promos) {
          $route.reload();
          $scope.allPromos = promos;
          $scope.message = 'Logged-in! Hence you can see Promos!';
        })
        .error(function (err) {
          console.log('Error: ' + err);
          $scope.message = 'Error! Not Logged-in';
        });
    };
  } else {
    console.log('not logged in');
  }
}]);
